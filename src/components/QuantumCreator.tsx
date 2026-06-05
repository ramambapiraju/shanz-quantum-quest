import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Sparkles, Wand2, Loader2, Film, BookOpen, Music, Feather, GraduationCap, Volume2 } from "lucide-react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";

type Level = "beginner" | "intermediate" | "advanced";
type Style = "story" | "song" | "poem" | "explainer" | "movie";

interface MovieScene { narration: string; caption: string; image: string | null; }
interface MovieData {
  kind: "movie";
  title: string;
  scenes: MovieScene[];
  key_concepts: string[];
  voice: string;
  audio: string | null;
}

const SUGGESTED_TOPICS = [
  "Superposition", "Entanglement", "Shor's Algorithm", "Quantum Teleportation",
  "Quantum Cryptography", "Grover's Search", "Qubits & Bloch Sphere", "Quantum Error Correction",
];

const STYLES: { id: Style; label: string; icon: any }[] = [
  { id: "story", label: "Story", icon: BookOpen },
  { id: "song", label: "Song", icon: Music },
  { id: "poem", label: "Poem", icon: Feather },
  { id: "explainer", label: "Explainer", icon: GraduationCap },
  { id: "movie", label: "Movie", icon: Film },
];

export const QuantumCreator = () => {
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState<Level>("beginner");
  const [duration, setDuration] = useState(3);
  const [style, setStyle] = useState<Style>("story");
  const [output, setOutput] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [voiceName, setVoiceName] = useState<string | null>(null);
  const [movie, setMovie] = useState<MovieData | null>(null);
  const [movieFrame, setMovieFrame] = useState(0);
  const [loading, setLoading] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!movie || !audioRef.current) return;
    const audio = audioRef.current;
    const onTime = () => {
      const dur = audio.duration;
      if (!dur || !isFinite(dur)) return;
      const idx = Math.min(movie.scenes.length - 1, Math.floor((audio.currentTime / dur) * movie.scenes.length));
      setMovieFrame(idx);
    };
    audio.addEventListener("timeupdate", onTime);
    return () => audio.removeEventListener("timeupdate", onTime);
  }, [movie]);

  useEffect(() => {
    if (!movie || movie.audio) return;
    const t = setInterval(() => {
      setMovieFrame((f) => (f + 1) % movie.scenes.length);
    }, 4500);
    return () => clearInterval(t);
  }, [movie]);

  const generate = async () => {
    if (!topic.trim()) { toast.error("Please enter or pick a quantum topic"); return; }
    setLoading(true);
    setOutput(""); setAudioUrl(null); setVoiceName(null); setMovie(null); setMovieFrame(0);
    try {
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/quantum-creator`;
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ topic: topic.trim(), level, duration, style }),
      });

      if (!resp.ok) {
        if (resp.status === 429) toast.error("Rate limit hit, please wait a moment.");
        else if (resp.status === 402) toast.error("AI credits exhausted.");
        else toast.error("Generation failed. Try again.");
        return;
      }

      const contentType = resp.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const data = await resp.json();
        if (data.error) toast.error(data.error);
        if (data.kind === "movie") {
          setMovie(data as MovieData);
          setVoiceName(data.voice ?? null);
          if (data.audio) setAudioUrl(`data:audio/mpeg;base64,${data.audio}`);
        } else {
          if (data.text) setOutput(data.text);
          if (data.voice) setVoiceName(data.voice);
          if (data.audio) setAudioUrl(`data:audio/mpeg;base64,${data.audio}`);
        }
        setTimeout(() => outputRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 100);
        return;
      }

      if (!resp.body) throw new Error("No stream");
      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buf = ""; let acc = ""; let done = false;
      while (!done) {
        const { value, done: d } = await reader.read();
        if (d) break;
        buf += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buf.indexOf("\n")) !== -1) {
          let line = buf.slice(0, nl);
          buf = buf.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const j = line.slice(6).trim();
          if (j === "[DONE]") { done = true; break; }
          try {
            const p = JSON.parse(j);
            const c = p.choices?.[0]?.delta?.content;
            if (c) { acc += c; setOutput(acc); }
          } catch { buf = line + "\n" + buf; break; }
        }
      }
      setTimeout(() => outputRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 100);
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const currentScene = movie?.scenes[movieFrame];

  return (
    <section id="quantum-creator" className="relative py-20 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-4 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI Quantum Creator</span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-quantum">Learn Quantum, Your Way</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Pick a topic, level, duration, and style. Our AI crafts a tailored, accurate quantum lesson — as a story, song, poem, explainer, or movie.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto p-6 md:p-8 bg-card/50 backdrop-blur-xl border-border/50">
          <label className="block text-sm font-semibold mb-2 text-foreground">1. Quantum topic or field</label>
          <Input value={topic} onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Entanglement, Shor's algorithm, Quantum Internet..."
            maxLength={200} className="mb-3"/>
          <div className="flex flex-wrap gap-2 mb-6">
            {SUGGESTED_TOPICS.map((t) => (
              <button key={t} type="button" onClick={() => setTopic(t)}
                className="text-xs px-3 py-1 rounded-full border border-primary/30 bg-primary/5 hover:bg-primary/15 text-foreground transition-colors">
                {t}
              </button>
            ))}
          </div>

          <label className="block text-sm font-semibold mb-2 text-foreground">2. Your level</label>
          <div className="grid grid-cols-3 gap-2 mb-6">
            {(["beginner", "intermediate", "advanced"] as Level[]).map((l) => (
              <button key={l} onClick={() => setLevel(l)}
                className={`py-2 px-3 rounded-lg border text-sm font-medium capitalize transition-all ${
                  level === l ? "border-primary bg-primary/20 text-primary"
                    : "border-border/50 bg-background/50 text-muted-foreground hover:border-primary/40"
                }`}>{l}</button>
            ))}
          </div>

          <label className="block text-sm font-semibold mb-2 text-foreground">
            3. Duration: <span className="text-primary">{duration} min</span>
          </label>
          <input type="range" min={1} max={15} value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full accent-primary mb-6"/>

          <label className="block text-sm font-semibold mb-2 text-foreground">4. Style</label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
            {STYLES.map((s) => {
              const Icon = s.icon;
              const active = style === s.id;
              return (
                <button key={s.id} onClick={() => setStyle(s.id)}
                  className={`relative py-3 px-2 rounded-lg border text-sm font-medium flex flex-col items-center gap-1 transition-all ${
                    active ? "border-primary bg-primary/20 text-primary"
                      : "border-border/50 bg-background/50 text-muted-foreground hover:border-primary/40"
                  }`}>
                  <Icon className="w-5 h-5" />{s.label}
                </button>
              );
            })}
          </div>

          <Button variant="quantum" size="lg" onClick={generate} disabled={loading} className="w-full text-base">
            {loading ? (
              <><Loader2 className="w-5 h-5 animate-spin mr-2" />
                {style === "movie" ? "Directing your quantum movie (images + voice)..." : `Crafting your quantum ${style}...`}
              </>
            ) : (
              <><Wand2 className="w-5 h-5 mr-2" />Generate My Quantum Lesson</>
            )}
          </Button>

          {movie && (
            <div ref={outputRef} className="mt-8 p-4 md:p-6 rounded-xl bg-background/60 border border-primary/20">
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-gradient-quantum">🎬 {movie.title}</h3>
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-primary/30">
                {movie.scenes.map((scene, i) => (
                  <div key={i}
                    className={`absolute inset-0 transition-opacity duration-700 ${i === movieFrame ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                    {scene.image ? (
                      <img src={scene.image} alt={scene.caption}
                        className={`w-full h-full object-cover ${i === movieFrame ? "animate-ken-burns" : ""}`}/>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 text-muted-foreground">
                        Scene {i + 1}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    {scene.caption && (
                      <div className="absolute bottom-4 left-4 right-4 text-white text-lg md:text-2xl font-bold drop-shadow-lg">
                        {scene.caption}
                      </div>
                    )}
                    <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/60 text-white text-xs">
                      {i + 1}/{movie.scenes.length}
                    </div>
                  </div>
                ))}
              </div>

              {audioUrl && (
                <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/30">
                  <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-primary">
                    <Volume2 className="w-4 h-4" /> Narrated by {voiceName ?? "AI Voice"} 🎙️
                  </div>
                  <audio ref={audioRef} controls autoPlay src={audioUrl} className="w-full" />
                </div>
              )}

              <p className="mt-4 text-sm md:text-base text-foreground/90 italic">
                {currentScene?.narration}
              </p>

              {movie.key_concepts?.length > 0 && (
                <div className="mt-5 p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <h4 className="font-bold text-primary mb-2">Key Concepts</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-foreground/90">
                    {movie.key_concepts.map((k, i) => <li key={i}>{k}</li>)}
                  </ul>
                </div>
              )}
            </div>
          )}

          {!movie && (output || audioUrl) && (
            <div ref={outputRef} className="mt-8 p-6 rounded-xl bg-background/60 border border-primary/20">
              {audioUrl && (
                <div className="mb-5 p-4 rounded-lg bg-primary/10 border border-primary/30">
                  <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-primary">
                    <Volume2 className="w-4 h-4" />
                    {style === "song" ? "Performed by" : "Narrated by"} {voiceName ?? "AI Voice"} 🎤
                  </div>
                  <audio controls autoPlay src={audioUrl} className="w-full" />
                </div>
              )}
              {output && (
                <div className="prose prose-invert prose-sm md:prose-base max-w-none prose-headings:text-gradient-quantum prose-strong:text-primary whitespace-pre-wrap">
                  <ReactMarkdown>{output}</ReactMarkdown>
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};
