import { useState } from "react";
import { ExternalLink, Play, FileText, BookOpen, Code, Video, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  { id: "all", name: "All Resources" },
  { id: "qiskit", name: "Qiskit" },
  { id: "tutorials", name: "Tutorials" },
  { id: "videos", name: "Videos" },
  { id: "docs", name: "Documentation" },
];

const resources = [
  {
    id: 1,
    title: "IBM Qiskit Textbook",
    description: "The comprehensive open-source textbook for learning quantum computing with Qiskit.",
    category: "qiskit",
    type: "docs",
    icon: BookOpen,
    link: "https://qiskit.org/learn",
    featured: true,
    tags: ["Official", "Free"],
  },
  {
    id: 2,
    title: "Qiskit YouTube Channel",
    description: "Official tutorials, coding sessions, and quantum computing concepts explained visually.",
    category: "videos",
    type: "video",
    icon: Video,
    link: "https://www.youtube.com/qiskit",
    featured: true,
    tags: ["Official", "Video"],
  },
  {
    id: 3,
    title: "Quantum Computing Playground",
    description: "Interactive platform to experiment with quantum circuits in your browser.",
    category: "tutorials",
    type: "tutorial",
    icon: Code,
    link: "https://quantum-computing.ibm.com/composer",
    featured: false,
    tags: ["Interactive", "Practice"],
  },
  {
    id: 4,
    title: "Introduction to Quantum Mechanics",
    description: "MIT OpenCourseWare's foundational course on quantum mechanics principles.",
    category: "tutorials",
    type: "docs",
    icon: FileText,
    link: "https://ocw.mit.edu/courses/physics/",
    featured: false,
    tags: ["University", "Theory"],
  },
  {
    id: 5,
    title: "Qiskit Global Summer School",
    description: "Annual intensive program covering quantum computing from basics to advanced applications.",
    category: "qiskit",
    type: "video",
    icon: Video,
    link: "https://qiskit.org/events/summer-school",
    featured: true,
    tags: ["Event", "Certification"],
  },
  {
    id: 6,
    title: "Quantum Algorithm Zoo",
    description: "Comprehensive catalog of quantum algorithms with complexity analysis and implementations.",
    category: "docs",
    type: "docs",
    icon: BookOpen,
    link: "https://quantumalgorithmzoo.org/",
    featured: false,
    tags: ["Algorithms", "Reference"],
  },
  {
    id: 7,
    title: "Coding with Qiskit Series",
    description: "Step-by-step video series building quantum programs from scratch.",
    category: "qiskit",
    type: "video",
    icon: Play,
    link: "https://youtube.com/playlist?list=PLOFEBzvs-VvrgHZt3exM_NNiNKtZlHvZi",
    featured: false,
    tags: ["Beginner", "Hands-on"],
  },
  {
    id: 8,
    title: "Qiskit Documentation",
    description: "Official API reference and guides for all Qiskit libraries and tools.",
    category: "qiskit",
    type: "docs",
    icon: FileText,
    link: "https://docs.quantum.ibm.com/",
    featured: true,
    tags: ["Official", "API"],
  },
];

export const ResourcesSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredResources = activeCategory === "all" 
    ? resources 
    : resources.filter(r => r.category === activeCategory);

  return (
    <section id="resources" className="py-24 relative bg-quantum-darker/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full border border-secondary/30 bg-secondary/5 text-secondary text-sm font-medium mb-4">
            Resource Library
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Curated <span className="text-gradient-quantum">Learning Resources</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Hand-picked tutorials, documentation, and videos from the best sources in quantum computing.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground glow-button"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/50"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredResources.map((resource, index) => (
            <a
              key={resource.id}
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-xl bg-gradient-card border border-border/50 hover:border-primary/50 transition-all duration-300 card-shadow hover:translate-y-[-2px]"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                  <resource.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex items-center gap-2">
                  {resource.featured && (
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  )}
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
              
              <h3 className="font-heading font-semibold text-lg text-foreground group-hover:text-primary transition-colors mb-2">
                {resource.title}
              </h3>
              
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {resource.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {resource.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs rounded bg-muted/50 text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Resources
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};
