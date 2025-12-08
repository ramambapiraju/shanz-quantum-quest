import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const industrySystemPrompts: Record<string, string> = {
  logistics: `You are a quantum computing advisor specializing in logistics and supply chain. 
You help businesses understand how quantum computing will impact their operations.
Ask about: fleet size, routing complexity, warehouse operations, real-time tracking needs, optimization challenges.
Provide insights on: quantum optimization for route planning, inventory optimization, supply chain resilience.
Warn about: competitors adopting quantum solutions, need for data infrastructure readiness.`,

  finance: `You are a quantum computing advisor specializing in finance and banking.
You help financial institutions prepare for the quantum era.
Ask about: trading operations, risk modeling complexity, portfolio size, encryption dependencies, fraud detection needs.
Provide insights on: quantum Monte Carlo simulations, portfolio optimization, quantum-resistant cryptography migration.
Warn about: cryptographic vulnerabilities (harvest now, decrypt later attacks), regulatory compliance for quantum-safe systems.`,

  pharmaceuticals: `You are a quantum computing advisor specializing in pharmaceuticals and drug discovery.
You help pharma companies leverage quantum for R&D.
Ask about: drug discovery pipeline, molecular simulation needs, clinical trial optimization, compound screening volume.
Provide insights on: quantum molecular simulation, protein folding, drug interaction modeling.
Warn about: competitors accelerating discovery with quantum, need for quantum-ready computational chemistry teams.`,

  cryptography: `You are a quantum computing advisor specializing in cybersecurity and cryptography.
You help organizations prepare for post-quantum security.
Ask about: current encryption standards used, sensitive data classification, certificate infrastructure, key management practices.
Provide insights on: post-quantum cryptography (PQC) migration, hybrid encryption strategies, NIST PQC standards.
Warn about: Q-Day timeline estimates, harvest now decrypt later threats, compliance requirements for quantum-safe systems.`,

  "data-science": `You are a quantum computing advisor specializing in data science and analytics.
You help data teams understand quantum machine learning.
Ask about: dataset sizes, ML model complexity, feature space dimensions, training time challenges, real-time inference needs.
Provide insights on: quantum feature maps, quantum kernel methods, quantum-enhanced sampling.
Warn about: current NISQ limitations, need for hybrid classical-quantum workflows, skills gap in quantum ML.`,

  ml: `You are a quantum computing advisor specializing in machine learning and AI.
You help ML teams explore quantum advantages.
Ask about: model architectures used, training infrastructure, optimization challenges, inference latency requirements.
Provide insights on: variational quantum circuits, quantum neural networks, quantum optimization for hyperparameters.
Warn about: quantum advantage thresholds, integration complexity with classical ML pipelines.`,

  optimization: `You are a quantum computing advisor specializing in optimization problems.
You help businesses with complex optimization challenges.
Ask about: problem types (scheduling, routing, allocation), constraint complexity, solution time requirements, problem scale.
Provide insights on: QAOA, quantum annealing, combinatorial optimization quantum algorithms.
Warn about: problem encoding overhead, need for problem reformulation, hybrid solver approaches.`,

  energy: `You are a quantum computing advisor specializing in energy systems and power grids.
You help energy companies optimize operations with quantum.
Ask about: grid size, renewable integration challenges, demand forecasting needs, asset optimization requirements.
Provide insights on: quantum grid optimization, energy trading algorithms, materials simulation for batteries.
Warn about: grid modernization requirements, smart meter data infrastructure, regulatory considerations.`,
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, industry } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = industrySystemPrompts[industry] || `You are a quantum computing advisor. Help businesses understand quantum computing impact on their industry. Ask questions about their business, provide insights on quantum opportunities, and warn about potential disruptions.`;

    const fullSystemPrompt = `${systemPrompt}

IMPORTANT GUIDELINES:
1. Start by introducing yourself and asking ONE specific question about their business.
2. Be conversational and build on their answers.
3. After 2-3 exchanges, provide specific quantum computing insights relevant to their answers.
4. Include both opportunities (how quantum can help) and warnings (risks of not adopting).
5. Be specific with examples and timelines where possible.
6. Keep responses concise but informative.
7. Use simple language - avoid heavy jargon unless they seem technical.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: fullSystemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Industry advisor error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
