import { Play, ExternalLink, Clock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const featuredVideos = [
  {
    id: "intro-qc",
    title: "What is Quantum Computing?",
    description: "A beginner-friendly introduction to quantum computing concepts and why they matter.",
    thumbnail: "https://img.youtube.com/vi/QuR969uMICM/maxresdefault.jpg",
    videoId: "QuR969uMICM",
    duration: "15:24",
    views: "1.2M",
    channel: "Qiskit",
  },
  {
    id: "coding-qiskit-1",
    title: "Coding with Qiskit - Hello World",
    description: "Your first quantum program! Learn to create and run a simple quantum circuit.",
    thumbnail: "https://img.youtube.com/vi/RrUTwq5jKM4/maxresdefault.jpg",
    videoId: "RrUTwq5jKM4",
    duration: "12:08",
    views: "500K",
    channel: "Qiskit",
  },
  {
    id: "quantum-entanglement",
    title: "Understanding Quantum Entanglement",
    description: "Explore the spooky action at a distance and how it's used in quantum computing.",
    thumbnail: "https://img.youtube.com/vi/F_Riqjdh2oM/maxresdefault.jpg",
    videoId: "F_Riqjdh2oM",
    duration: "18:32",
    views: "800K",
    channel: "Qiskit",
  },
  {
    id: "grovers-algorithm",
    title: "Grover's Algorithm Explained",
    description: "Learn how quantum computers can search unsorted databases quadratically faster.",
    thumbnail: "https://img.youtube.com/vi/ePr2MgQkqL0/maxresdefault.jpg",
    videoId: "ePr2MgQkqL0",
    duration: "22:15",
    views: "300K",
    channel: "Qiskit",
  },
];

const playlists = [
  {
    title: "Coding with Qiskit",
    videos: "35+ videos",
    link: "https://www.youtube.com/playlist?list=PLOFEBzvs-VvrgHZt3exM_NNiNKtZlHvZi",
    level: "Beginner",
  },
  {
    title: "Qiskit Summer School 2023",
    videos: "20+ videos",
    link: "https://www.youtube.com/playlist?list=PLOFEBzvs-VvqKKMXX4vbi4EB1uaErFMSO",
    level: "Intermediate",
  },
  {
    title: "Qiskit Summer School 2024",
    videos: "15+ videos",
    link: "https://www.youtube.com/playlist?list=PLOFEBzvs-VvpGkW3SqUQvfsKdrEMlmq9o",
    level: "Advanced",
  },
  {
    title: "Quantum Computing Basics",
    videos: "25+ videos",
    link: "https://www.youtube.com/playlist?list=PLOFEBzvs-VvqMQhREK2NZhJpVDV7Tg-T0",
    level: "Beginner",
  },
];

export const VideoSection = () => {
  return (
    <section id="videos" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-quantum-darker/50 via-transparent to-quantum-darker/50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-sm font-medium mb-4">
            <Play className="w-4 h-4" />
            Video Learning
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Learn with <span className="text-gradient-quantum">Qiskit Videos</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Curated video tutorials from the official Qiskit YouTube channel. Learn at your own pace.
          </p>
        </div>

        {/* Featured Videos Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16">
          {featuredVideos.map((video) => (
            <a
              key={video.id}
              href={`https://www.youtube.com/watch?v=${video.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl overflow-hidden bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:translate-y-[-4px] card-shadow"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center">
                    <Play className="w-6 h-6 text-white fill-white ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/80 text-white text-xs font-medium">
                  {video.duration}
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors mb-1 line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {video.description}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {video.views} views
                  </span>
                  <span className="text-primary font-medium">{video.channel}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Playlists */}
        <div className="max-w-4xl mx-auto">
          <h3 className="font-heading text-2xl font-bold text-center mb-8">
            Complete <span className="text-primary">Playlists</span>
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {playlists.map((playlist) => (
              <a
                key={playlist.title}
                href={playlist.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                    <Play className="w-5 h-5 text-red-400 fill-red-400" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
                      {playlist.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {playlist.videos} • {playlist.level}
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <a 
            href="https://www.youtube.com/@qiskit" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="lg" className="group">
              Visit Qiskit YouTube Channel
              <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};
