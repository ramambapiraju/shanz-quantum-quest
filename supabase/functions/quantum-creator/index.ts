import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

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
      story: `Write an engaging, vivid short STORY with characters and narrative arc that teaches the concept.`,
      song: `Write SONG LYRICS with clear verses, a catchy chorus, and a bridge. Mark [Verse 1], [Chorus] etc.`,
      poem: `Write a rhythmic POEM with rich imagery and metaphors that explain the concept.`,
      explainer: `Write a crystal-clear EXPLAINER with short paragraphs, analogies, and a quick recap.`,
    };

    const system = `You are SHAN Z's Quantum Creator: a world-class quantum computing educator and creative writer.
Your job: produce 100% scientifically accurate, real, and current quantum computing knowledge — never invent facts.
Adapt depth strictly to the learner's level. Make it captivating in the requested creative style.
Use markdown. Include a brief "Key Concepts" bullet list at the end with 3-5 real takeaways.`;

    const user = `Create quantum learning content with these preferences:
- Topic / Field: ${topic}
- Learner Level: ${level}
- Target Reading/Listening Duration: ~${mins} minute(s)
- Style: ${style.toUpperCase()}

${styleInstruction[style]}

Keep it accurate, interesting, and perfectly tailored. Start immediately with the content (no preamble).`;

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        stream: true,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      }),
    });

    if (!resp.ok) {
      if (resp.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Try again shortly." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (resp.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits in Lovable Cloud." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await resp.text();
      console.error("AI gateway error:", resp.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(resp.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("quantum-creator error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
