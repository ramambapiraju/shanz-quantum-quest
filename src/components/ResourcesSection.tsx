import { useState } from "react";
import { ExternalLink, Play, FileText, BookOpen, Code, Video, Star, GraduationCap, Atom, Brain, Rocket, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const categories = [
  { id: "all", name: "All Resources", icon: Atom },
  { id: "qiskit", name: "IBM Qiskit", icon: Code },
  { id: "microsoft", name: "Microsoft", icon: Code },
  { id: "google", name: "Google", icon: Code },
  { id: "videos", name: "Video Courses", icon: Video },
  { id: "tutorials", name: "Tutorials", icon: GraduationCap },
  { id: "docs", name: "Documentation", icon: FileText },
  { id: "practice", name: "Practice", icon: Trophy },
];

const resources = [
  // Qiskit Official Resources
  {
    id: "qiskit-textbook",
    title: "IBM Qiskit Learning Platform",
    description: "The official comprehensive learning platform with interactive tutorials, courses, and hands-on quantum computing education.",
    category: "qiskit",
    type: "docs",
    icon: BookOpen,
    link: "https://learning.quantum.ibm.com/",
    featured: true,
    tags: ["Official", "Free", "Interactive"],
    difficulty: "All Levels",
  },
  {
    id: "qiskit-docs",
    title: "Qiskit Documentation",
    description: "Complete API reference, installation guides, and technical documentation for all Qiskit packages.",
    category: "qiskit",
    type: "docs",
    icon: FileText,
    link: "https://docs.quantum.ibm.com/",
    featured: true,
    tags: ["Official", "API Reference"],
    difficulty: "Intermediate",
  },
  {
    id: "ibm-quantum-composer",
    title: "IBM Quantum Composer",
    description: "Build and run quantum circuits on real quantum computers using the visual drag-and-drop interface.",
    category: "practice",
    type: "interactive",
    icon: Code,
    link: "https://quantum.ibm.com/composer",
    featured: true,
    tags: ["Interactive", "Real Hardware"],
    difficulty: "Beginner",
  },
  
  // Video Courses - Real Qiskit YouTube Playlists
  {
    id: "qiskit-youtube",
    title: "Qiskit Official YouTube Channel",
    description: "Official channel with tutorials, coding sessions, research talks, and quantum computing concepts explained.",
    category: "videos",
    type: "video",
    icon: Video,
    link: "https://www.youtube.com/@qikidit",
    featured: true,
    tags: ["Official", "Free"],
    difficulty: "All Levels",
  },
  {
    id: "coding-with-qiskit",
    title: "Coding with Qiskit Video Series",
    description: "Comprehensive video series teaching quantum programming from scratch using Qiskit framework.",
    category: "videos",
    type: "video",
    icon: Play,
    link: "https://www.youtube.com/playlist?list=PLOFEBzvs-VvrgHZt3exM_NNiNKtZlHvZi",
    featured: true,
    tags: ["Beginner", "Hands-on"],
    difficulty: "Beginner",
  },
  {
    id: "qiskit-summer-school-2023",
    title: "Qiskit Global Summer School 2023",
    description: "Quantum Computing & Quantum Machine Learning intensive program recordings with labs and exercises.",
    category: "videos",
    type: "video",
    icon: GraduationCap,
    link: "https://www.youtube.com/playlist?list=PLOFEBzvs-VvqKKMXX4vbi4EB1uaErFMSO",
    featured: true,
    tags: ["Certification", "Advanced"],
    difficulty: "Intermediate",
  },
  {
    id: "qiskit-summer-school-2024",
    title: "Qiskit Global Summer School 2024",
    description: "Latest quantum computing summer school focusing on utility-era quantum computing applications.",
    category: "videos",
    type: "video",
    icon: GraduationCap,
    link: "https://www.youtube.com/playlist?list=PLOFEBzvs-VvpGkW3SqUQvfsKdrEMlmq9o",
    featured: true,
    tags: ["Latest", "Research"],
    difficulty: "Advanced",
  },
  {
    id: "intro-qc-playlist",
    title: "Introduction to Quantum Computing",
    description: "Foundational playlist covering quantum mechanics basics, qubits, superposition, and entanglement.",
    category: "videos",
    type: "video",
    icon: Brain,
    link: "https://www.youtube.com/playlist?list=PLOFEBzvs-VvqMQhREK2NZhJpVDV7Tg-T0",
    featured: false,
    tags: ["Fundamentals", "Theory"],
    difficulty: "Beginner",
  },
  
  // Tutorials & Learning Paths
  {
    id: "qiskit-tutorials-github",
    title: "Qiskit Tutorials Repository",
    description: "Official GitHub repository with Jupyter notebooks covering algorithms, circuits, and applications.",
    category: "tutorials",
    type: "tutorial",
    icon: Code,
    link: "https://github.com/Qiskit/qiskit-tutorials",
    featured: false,
    tags: ["Notebooks", "GitHub"],
    difficulty: "Intermediate",
  },
  {
    id: "quantum-algorithms-course",
    title: "Quantum Algorithms Course",
    description: "In-depth course on Grover's, Shor's, VQE, QAOA, and other quantum algorithms with implementations.",
    category: "tutorials",
    type: "course",
    icon: Brain,
    link: "https://learning.quantum.ibm.com/course/fundamentals-of-quantum-algorithms",
    featured: true,
    tags: ["Algorithms", "Advanced"],
    difficulty: "Advanced",
  },
  {
    id: "variational-algorithms",
    title: "Variational Algorithms Course",
    description: "Deep dive into VQE, QAOA, and variational quantum computing for optimization problems.",
    category: "tutorials",
    type: "course",
    icon: Rocket,
    link: "https://learning.quantum.ibm.com/course/variational-algorithm-design",
    featured: false,
    tags: ["VQE", "QAOA"],
    difficulty: "Advanced",
  },
  
  // Documentation & References
  {
    id: "quantum-algorithm-zoo",
    title: "Quantum Algorithm Zoo",
    description: "Comprehensive catalog of known quantum algorithms with complexity analysis and references.",
    category: "docs",
    type: "reference",
    icon: BookOpen,
    link: "https://quantumalgorithmzoo.org/",
    featured: false,
    tags: ["Reference", "Research"],
    difficulty: "Advanced",
  },
  {
    id: "qiskit-nature",
    title: "Qiskit Nature Documentation",
    description: "Quantum chemistry and physics simulations using Qiskit. Solve molecular problems on quantum computers.",
    category: "docs",
    type: "docs",
    icon: Atom,
    link: "https://qiskit-community.github.io/qiskit-nature/",
    featured: false,
    tags: ["Chemistry", "Physics"],
    difficulty: "Expert",
  },
  {
    id: "qiskit-machine-learning",
    title: "Qiskit Machine Learning",
    description: "Quantum machine learning library for building and training quantum neural networks.",
    category: "docs",
    type: "docs",
    icon: Brain,
    link: "https://qiskit-community.github.io/qiskit-machine-learning/",
    featured: false,
    tags: ["ML", "QNN"],
    difficulty: "Advanced",
  },
  
  // Practice & Challenges
  {
    id: "ibm-quantum-challenges",
    title: "IBM Quantum Challenges",
    description: "Participate in global quantum challenges to test your skills and win certificates and prizes.",
    category: "practice",
    type: "challenge",
    icon: Trophy,
    link: "https://challenges.quantum.ibm.com/",
    featured: true,
    tags: ["Competition", "Prizes"],
    difficulty: "All Levels",
  },
  {
    id: "qiskit-certification",
    title: "Qiskit Developer Certification",
    description: "Get officially certified as a Qiskit developer and showcase your quantum programming expertise.",
    category: "practice",
    type: "certification",
    icon: GraduationCap,
    link: "https://www.ibm.com/training/certification/C0010300",
    featured: true,
    tags: ["Official", "Certification"],
    difficulty: "Intermediate",
  },
  {
    id: "quantum-exercises",
    title: "Quantum Computing Exercises",
    description: "Practice problems and exercises to strengthen your quantum computing fundamentals.",
    category: "practice",
    type: "exercises",
    icon: Code,
    link: "https://learning.quantum.ibm.com/",
    featured: false,
    tags: ["Practice", "Self-paced"],
    difficulty: "Beginner",
  },

  // Microsoft Azure Quantum Resources
  {
    id: "azure-quantum",
    title: "Azure Quantum Platform",
    description: "Microsoft's cloud quantum computing service with access to diverse quantum hardware and simulators.",
    category: "microsoft",
    type: "platform",
    icon: Code,
    link: "https://azure.microsoft.com/en-us/products/quantum",
    featured: true,
    tags: ["Cloud", "Multi-Hardware"],
    difficulty: "Intermediate",
  },
  {
    id: "azure-quantum-docs",
    title: "Azure Quantum Documentation",
    description: "Comprehensive documentation for Azure Quantum, Q# programming, and quantum development kit.",
    category: "microsoft",
    type: "docs",
    icon: FileText,
    link: "https://learn.microsoft.com/en-us/azure/quantum/",
    featured: true,
    tags: ["Official", "Q#"],
    difficulty: "Beginner",
  },
  {
    id: "microsoft-quantum-katas",
    title: "Quantum Katas",
    description: "Self-paced programming exercises to learn quantum computing and Q# through hands-on practice.",
    category: "microsoft",
    type: "tutorial",
    icon: GraduationCap,
    link: "https://quantum.microsoft.com/en-us/experience/quantum-katas",
    featured: true,
    tags: ["Interactive", "Free"],
    difficulty: "Beginner",
  },
  {
    id: "azure-quantum-copilot",
    title: "Azure Quantum Copilot",
    description: "AI-assisted quantum programming with natural language to code generation capabilities.",
    category: "microsoft",
    type: "tool",
    icon: Brain,
    link: "https://quantum.microsoft.com/en-us/experience/quantum-coding",
    featured: false,
    tags: ["AI", "Innovative"],
    difficulty: "Beginner",
  },
  {
    id: "microsoft-quantum-learn",
    title: "Microsoft Learn: Quantum",
    description: "Free learning paths covering quantum concepts, Q# programming, and quantum algorithms.",
    category: "microsoft",
    type: "course",
    icon: BookOpen,
    link: "https://learn.microsoft.com/en-us/training/paths/quantum-computing-fundamentals/",
    featured: true,
    tags: ["Free", "Structured"],
    difficulty: "Beginner",
  },

  // Google Quantum AI Resources
  {
    id: "google-quantum-ai",
    title: "Google Quantum AI",
    description: "Explore Google's quantum computing research, hardware breakthroughs, and the path to useful quantum computing.",
    category: "google",
    type: "platform",
    icon: Atom,
    link: "https://quantumai.google/",
    featured: true,
    tags: ["Research", "Cutting-edge"],
    difficulty: "All Levels",
  },
  {
    id: "cirq-framework",
    title: "Cirq Framework",
    description: "Google's open-source Python framework for writing, manipulating, and optimizing quantum circuits.",
    category: "google",
    type: "framework",
    icon: Code,
    link: "https://quantumai.google/cirq",
    featured: true,
    tags: ["Open Source", "Python"],
    difficulty: "Intermediate",
  },
  {
    id: "cirq-tutorials",
    title: "Cirq Tutorials & Examples",
    description: "Step-by-step tutorials and code examples for learning quantum programming with Cirq.",
    category: "google",
    type: "tutorial",
    icon: GraduationCap,
    link: "https://quantumai.google/cirq/tutorials",
    featured: true,
    tags: ["Hands-on", "Examples"],
    difficulty: "Intermediate",
  },
  {
    id: "tensorflow-quantum",
    title: "TensorFlow Quantum",
    description: "Hybrid quantum-classical machine learning library built on Cirq and TensorFlow.",
    category: "google",
    type: "library",
    icon: Brain,
    link: "https://www.tensorflow.org/quantum",
    featured: true,
    tags: ["ML", "Hybrid"],
    difficulty: "Advanced",
  },
  {
    id: "google-quantum-research",
    title: "Google Quantum Research Papers",
    description: "Access peer-reviewed research papers on quantum error correction, supremacy experiments, and more.",
    category: "google",
    type: "research",
    icon: FileText,
    link: "https://quantumai.google/research",
    featured: false,
    tags: ["Academic", "Papers"],
    difficulty: "Expert",
  },
  {
    id: "openfermion",
    title: "OpenFermion",
    description: "Open-source library for compiling and analyzing quantum algorithms for chemistry simulations.",
    category: "google",
    type: "library",
    icon: Atom,
    link: "https://quantumai.google/openfermion",
    featured: false,
    tags: ["Chemistry", "Open Source"],
    difficulty: "Advanced",
  },
];

const difficultyColors: Record<string, string> = {
  "Beginner": "bg-green-500/20 text-green-400 border-green-500/30",
  "Intermediate": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  "Advanced": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "Expert": "bg-red-500/20 text-red-400 border-red-500/30",
  "All Levels": "bg-primary/20 text-primary border-primary/30",
};

export const ResourcesSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewedResources, setViewedResources] = useState<Set<string>>(new Set());

  const filteredResources = activeCategory === "all" 
    ? resources 
    : resources.filter(r => r.category === activeCategory);

  const handleResourceClick = async (resourceId: string) => {
    setViewedResources(prev => new Set([...prev, resourceId]));
    
    // Log view to database for analytics
    try {
      await supabase.from('resource_views').insert({
        resource_id: resourceId,
        session_id: sessionStorage.getItem('session_id') || crypto.randomUUID()
      });
    } catch (error) {
      console.log('Analytics logging skipped');
    }
  };

  return (
    <section id="resources" className="py-24 relative bg-quantum-darker/50">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--primary)/0.08)_0%,_transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-secondary/30 bg-secondary/10 text-secondary text-sm font-medium mb-4 animate-pulse">
            <Atom className="w-4 h-4" />
            Multi-Platform Resources
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Curated <span className="text-gradient-quantum">Learning Resources</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Hand-picked tutorials from IBM Qiskit, Microsoft Azure Quantum, Google Cirq, and the global quantum computing community.
          </p>
        </div>

        {/* Category Filters - Enhanced */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground glow-button scale-105"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/50 hover:border-primary/30"
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Resources Count */}
        <div className="text-center mb-8">
          <span className="text-muted-foreground text-sm">
            Showing <span className="text-primary font-semibold">{filteredResources.length}</span> resources
          </span>
        </div>

        {/* Resources Grid - Enhanced Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredResources.map((resource, index) => (
            <a
              key={resource.id}
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleResourceClick(resource.id)}
              className={`group p-6 rounded-2xl bg-gradient-card border transition-all duration-500 card-shadow hover:translate-y-[-4px] relative overflow-hidden ${
                viewedResources.has(resource.id) 
                  ? "border-primary/30 bg-primary/5" 
                  : "border-border/50 hover:border-primary/50"
              }`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                    <resource.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex items-center gap-2">
                    {resource.featured && (
                      <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/30">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs text-yellow-500 font-medium">Featured</span>
                      </div>
                    )}
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
                
                <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors mb-2">
                  {resource.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-2">
                  {resource.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {resource.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs rounded-lg bg-muted/50 text-muted-foreground border border-border/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Difficulty Badge */}
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${difficultyColors[resource.difficulty]}`}>
                  {resource.difficulty}
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-12 flex flex-wrap justify-center gap-4">
          <a 
            href="https://learning.quantum.ibm.com/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="lg" className="group">
              IBM Quantum
              <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
          <a 
            href="https://quantum.microsoft.com/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="lg" className="group">
              Microsoft Quantum
              <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
          <a 
            href="https://quantumai.google/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="lg" className="group">
              Google Quantum AI
              <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};
