import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { encodeBase64 } from "https://deno.land/std@0.224.0/encoding/base64.ts";

// Different ElevenLabs voices chosen to fit each creative style
const VOICE_BY_STYLE: Record<string, { id: string; name: string }[]> = {
  song: [
    { id: "EXAVITQu4vr4xnSDxMaL", name: "Sarah" },     // bright, melodic
    { id: "XrExE9yKIg1WjnnlVkGX", name: "Matilda" },   // warm, expressive
    { id: "cgSgspJ2msm6clMCkdW9", name: "Jessica" },   // youthful, playful
  ],
  poem: [
    { id: "FGY2WhTYpPnrIDTdsKH5", name: "Laura" },     // soft, lyrical
    { id: "pFZP5JQG7iQjIQuC4Bku", name: "Lily" },      // gentle reader
  ],
  story: [
    { id: "nPczCjzI2devNBz1zQrb", name: "Brian" },     // warm storyteller
    { id: "onwK4e9ZLuTAKqWW03F9", name: "Daniel" },    // animated narrator
  ],
  explainer: [
    { id: "JBFqnCBsd6RMkjVDRZzb", name: "George" },    // clear, professorial
    { id: "TX3LPaxmHKxFdv7VOQHJ", name: "Liam" },      // confident educator
  ],
};

function pickVoice(style: string) {
  const list = VOICE_BY_STYLE[style] || VOICE_BY_STYLE.explainer;
  return list[Math.floor(Math.random() * list.length)];
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { topic, level, duration, style } = await req.json();

    if (!topic || typeof topic !== "string" || topic.length > 200) {
      return new Response(JSON.stringify({ error: "Invalid topic" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const allowedLevels = ["beginner", "intermediate", "advanced"];
    const allowedStyles = ["story", "song", "poem", "explainer"];
    if (!allowedLevels.includes(level) || !allowedStyles.includes(style)) {
      return new Response(JSON.stringify({ error: "Invalid level or style" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const mins = Math.max(1, Math.min(15, Number(duration) || 3));

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY missing");

    const styleInstruction: Record<string, string> = {
      story: `Write an engaging, VIVID short STORY with named characters, dialogue, and a clear narrative arc that teaches the concept.
Make it FUN and SHAREABLE — sprinkle relevant emojis generously throughout (🌌⚛️✨🔮🚀🧠💫🪐🌀🎭) to mark scenes, moods, and quantum moments. Use short paragraphs.`,
      song: `Write SONG LYRICS that can be sung aloud. Use simple, rhyming, rhythmic lines with a strong meter.
Structure clearly: [Verse 1], [Chorus], [Verse 2], [Chorus], [Bridge], [Final Chorus]. Keep total lyrics around ${mins * 60} words maximum so they fit the duration when sung.
Do NOT include stage directions, sound cues, or anything that isn't sung — those will be read aloud literally by a voice model.`,
      poem: `Write a rhythmic POEM with rich imagery, metaphors, and a clear cadence. Add a few subtle emojis (🌌⚛️✨) at stanza breaks.`,
      explainer: `Write a crystal-clear EXPLAINER with short paragraphs, vivid real-world analogies, simple language, and a "Quick Recap" at the end.`,
    };

    const system = `You are SHAN Z's Quantum Creator: a world-class quantum computing educator and creative writer.
Your job: produce 100% scientifically accurate, real, and current quantum computing knowledge — never invent facts.
Adapt depth strictly to the learner's level. Make it captivating in the requested creative style.
Use markdown. End with a brief "## Key Concepts" bullet list of 3-5 real takeaways.`;

    const user = `Create quantum learning content with these preferences:
- Topic / Field: ${topic}
- Learner Level: ${level}
- Target Duration: ~${mins} minute(s)
- Style: ${style.toUpperCase()}

${styleInstruction[style]}

Keep it accurate, interesting, and perfectly tailored. Start IMMEDIATELY with the content (no preamble).`;

    // SONG path: generate full lyrics (non-stream) + ElevenLabs TTS
    if (style === "song") {
      const aiResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [{ role: "system", content: system }, { role: "user", content: user }],
        }),
      });
      if (!aiResp.ok) {
        const t = await aiResp.text();
        console.error("AI error:", aiResp.status, t);
        if (aiResp.status === 429) return new Response(JSON.stringify({ error: "Rate limit exceeded." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        if (aiResp.status === 402) return new Response(JSON.stringify({ error: "AI credits exhausted." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        return new Response(JSON.stringify({ error: "AI gateway error" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      const data = await aiResp.json();
      const lyrics: string = data.choices?.[0]?.message?.content ?? "";

      // Strip markdown markers like [Verse 1] kept (they sound natural) but remove ## headings and stars
      const speakable = lyrics
        .replace(/^#+\s.*$/gm, "")
        .replace(/\*\*/g, "")
        .replace(/^- /gm, "")
        .trim()
        .slice(0, 4500);

      const ELEVEN_KEY = Deno.env.get("ELEVENLABS_API_KEY");
      if (!ELEVEN_KEY) {
        return new Response(JSON.stringify({ text: lyrics, audio: null, voice: null, error: "Voice service not connected" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const voice = pickVoice("song");
      const ttsResp = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${voice.id}?output_format=mp3_44100_128`,
        {
          method: "POST",
          headers: { "xi-api-key": ELEVEN_KEY, "Content-Type": "application/json" },
          body: JSON.stringify({
            text: speakable,
            model_id: "eleven_multilingual_v2",
            voice_settings: { stability: 0.35, similarity_boost: 0.8, style: 0.65, use_speaker_boost: true, speed: 1.0 },
          }),
        }
      );

      if (!ttsResp.ok) {
        const t = await ttsResp.text();
        console.error("ElevenLabs error:", ttsResp.status, t);
        let friendly = "Voice generation failed";
        try {
          const parsed = JSON.parse(t);
          const detailMsg = parsed?.detail?.message || parsed?.detail || parsed?.message;
          if (typeof detailMsg === "string") friendly = `Voice service: ${detailMsg}`;
        } catch { /* keep default */ }
        return new Response(JSON.stringify({ text: lyrics, audio: null, voice: voice.name, error: friendly }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const audioBuf = await ttsResp.arrayBuffer();
      const audioB64 = encodeBase64(new Uint8Array(audioBuf));
      return new Response(JSON.stringify({ text: lyrics, audio: audioB64, voice: voice.name }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Other styles: stream text
    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        stream: true,
        messages: [{ role: "system", content: system }, { role: "user", content: user }],
      }),
    });

    if (!resp.ok) {
      if (resp.status === 429) return new Response(JSON.stringify({ error: "Rate limit exceeded." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (resp.status === 402) return new Response(JSON.stringify({ error: "AI credits exhausted." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      const t = await resp.text();
      console.error("AI gateway error:", resp.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(resp.body, { headers: { ...corsHeaders, "Content-Type": "text/event-stream" } });
  } catch (e) {
    console.error("quantum-creator error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
