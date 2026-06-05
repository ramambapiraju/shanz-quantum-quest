import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { encodeBase64 } from "https://deno.land/std@0.224.0/encoding/base64.ts";

const VOICE_BY_STYLE: Record<string, { id: string; name: string }[]> = {
  song: [
    { id: "EXAVITQu4vr4xnSDxMaL", name: "Sarah" },
    { id: "XrExE9yKIg1WjnnlVkGX", name: "Matilda" },
    { id: "cgSgspJ2msm6clMCkdW9", name: "Jessica" },
  ],
  poem: [
    { id: "FGY2WhTYpPnrIDTdsKH5", name: "Laura" },
    { id: "pFZP5JQG7iQjIQuC4Bku", name: "Lily" },
  ],
  story: [
    { id: "nPczCjzI2devNBz1zQrb", name: "Brian" },
    { id: "onwK4e9ZLuTAKqWW03F9", name: "Daniel" },
  ],
  explainer: [
    { id: "JBFqnCBsd6RMkjVDRZzb", name: "George" },
    { id: "TX3LPaxmHKxFdv7VOQHJ", name: "Liam" },
  ],
  movie: [
    { id: "JBFqnCBsd6RMkjVDRZzb", name: "George" },
    { id: "nPczCjzI2devNBz1zQrb", name: "Brian" },
    { id: "onwK4e9ZLuTAKqWW03F9", name: "Daniel" },
  ],
};

function pickVoice(style: string) {
  const list = VOICE_BY_STYLE[style] || VOICE_BY_STYLE.explainer;
  return list[Math.floor(Math.random() * list.length)];
}

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
const ELEVEN_KEY = Deno.env.get("ELEVENLABS_API_KEY");

async function ttsBase64(text: string, voiceId: string, style: string): Promise<{ audio: string | null; error?: string }> {
  if (!ELEVEN_KEY) return { audio: null, error: "Voice service not connected" };
  const isSong = style === "song";
  const resp = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
    {
      method: "POST",
      headers: { "xi-api-key": ELEVEN_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        text: text.slice(0, 4800),
        model_id: "eleven_multilingual_v2",
        voice_settings: isSong
          ? { stability: 0.35, similarity_boost: 0.8, style: 0.65, use_speaker_boost: true, speed: 1.0 }
          : { stability: 0.55, similarity_boost: 0.8, style: 0.4, use_speaker_boost: true, speed: 1.0 },
      }),
    }
  );
  if (!resp.ok) {
    const t = await resp.text();
    console.error("ElevenLabs error:", resp.status, t);
    let friendly = "Voice generation failed";
    try {
      const p = JSON.parse(t);
      const d = p?.detail?.message || p?.detail || p?.message;
      if (typeof d === "string") friendly = `Voice service: ${d}`;
    } catch { /* */ }
    return { audio: null, error: friendly };
  }
  const buf = await resp.arrayBuffer();
  return { audio: encodeBase64(new Uint8Array(buf)) };
}

async function generateImage(prompt: string): Promise<string | null> {
  try {
    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image-preview",
        messages: [{ role: "user", content: prompt }],
        modalities: ["image", "text"],
      }),
    });
    if (!resp.ok) { console.error("img err", resp.status, await resp.text()); return null; }
    const data = await resp.json();
    const url = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    return url ?? null; // data URL
  } catch (e) { console.error("img exception", e); return null; }
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
    const allowedStyles = ["story", "song", "poem", "explainer", "movie"];
    if (!allowedLevels.includes(level) || !allowedStyles.includes(style)) {
      return new Response(JSON.stringify({ error: "Invalid level or style" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const mins = Math.max(1, Math.min(15, Number(duration) || 3));

    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY missing");

    const styleInstruction: Record<string, string> = {
      story: `Write an engaging, VIVID short STORY with named characters, dialogue, and a clear narrative arc that teaches the concept.
Sprinkle relevant emojis generously (🌌⚛️✨🔮🚀🧠💫🪐🌀🎭). Short paragraphs.`,
      song: `Write SONG LYRICS that can be sung. Rhyming, rhythmic, strong meter.
Structure: [Verse 1], [Chorus], [Verse 2], [Chorus], [Bridge], [Final Chorus]. Around ${mins * 60} words max.
Do NOT include stage directions — voice will read literally.`,
      poem: `Write a rhythmic POEM with rich imagery, metaphors, and clear cadence. ~${mins * 80} words. No stage directions.`,
      explainer: `Write a crystal-clear EXPLAINER with short paragraphs, real-world analogies, and a "Quick Recap" at the end.`,
    };

    const system = `You are SHAN Z's Quantum Creator: a world-class quantum computing educator and creative writer.
Produce 100% scientifically accurate, real, current quantum computing knowledge — never invent facts.
Adapt depth to learner level. Use markdown. End with a brief "## Key Concepts" bullet list of 3-5 real takeaways.`;

    // ============ MOVIE PATH ============
    if (style === "movie") {
      const sceneCount = Math.max(4, Math.min(8, Math.round(mins * 1.5)));
      const movieSystem = `You are SHAN Z's Quantum Movie Director. Output ONLY valid JSON (no markdown fences).
Scientifically accurate quantum content adapted to the learner's level.`;
      const movieUser = `Create a ${mins}-minute educational quantum MOVIE about: "${topic}" for a ${level} learner.
Produce ${sceneCount} scenes. Return STRICT JSON:
{
  "title": "string",
  "scenes": [
    {
      "narration": "1-3 sentences spoken aloud by a narrator, conversational, clear, accurate",
      "image_prompt": "detailed cinematic image prompt — describe a single dramatic still frame illustrating this scene. Style: ultra-detailed digital cinematic art, dramatic lighting, vivid colors, quantum/cosmic/scientific aesthetic. No text, no labels, no captions in the image.",
      "caption": "short 3-6 word on-screen caption"
    }
  ],
  "key_concepts": ["3-5 short real takeaways"]
}`;

      const scriptResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [{ role: "system", content: movieSystem }, { role: "user", content: movieUser }],
          response_format: { type: "json_object" },
        }),
      });
      if (!scriptResp.ok) {
        const t = await scriptResp.text();
        if (scriptResp.status === 429) return new Response(JSON.stringify({ error: "Rate limit exceeded." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        if (scriptResp.status === 402) return new Response(JSON.stringify({ error: "AI credits exhausted." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        console.error("movie script err", t);
        return new Response(JSON.stringify({ error: "Movie script failed" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      const scriptData = await scriptResp.json();
      let script: any;
      try { script = JSON.parse(scriptData.choices?.[0]?.message?.content ?? "{}"); }
      catch { script = {}; }
      const scenes: any[] = Array.isArray(script.scenes) ? script.scenes.slice(0, 8) : [];
      if (scenes.length === 0) {
        return new Response(JSON.stringify({ error: "Movie script invalid" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      // Parallel: images + single voiceover
      const fullNarration = scenes.map((s, i) => s.narration).join(" ");
      const voice = pickVoice("movie");

      const [images, tts] = await Promise.all([
        Promise.all(scenes.map((s) => generateImage(s.image_prompt || `cinematic quantum physics illustration of ${topic}`))),
        ttsBase64(fullNarration, voice.id, "movie"),
      ]);

      const builtScenes = scenes.map((s, i) => ({
        narration: s.narration,
        caption: s.caption || "",
        image: images[i], // data URL or null
      }));

      return new Response(JSON.stringify({
        kind: "movie",
        title: script.title || topic,
        scenes: builtScenes,
        key_concepts: script.key_concepts || [],
        voice: voice.name,
        audio: tts.audio,
        error: tts.error,
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const user = `Create quantum learning content with these preferences:
- Topic / Field: ${topic}
- Learner Level: ${level}
- Target Duration: ~${mins} minute(s)
- Style: ${style.toUpperCase()}

${styleInstruction[style]}

Keep it accurate, interesting, perfectly tailored. Start IMMEDIATELY (no preamble).`;

    // ============ SONG + POEM: text + audio ============
    if (style === "song" || style === "poem") {
      const aiResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
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
      const text: string = data.choices?.[0]?.message?.content ?? "";
      const speakable = text
        .replace(/^#+\s.*$/gm, "")
        .replace(/\*\*/g, "")
        .replace(/^- /gm, "")
        .trim()
        .slice(0, 4500);
      const voice = pickVoice(style);
      const tts = await ttsBase64(speakable, voice.id, style);
      return new Response(JSON.stringify({ text, audio: tts.audio, voice: voice.name, error: tts.error }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ============ STORY + EXPLAINER: stream ============
    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
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
