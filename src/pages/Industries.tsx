import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ParticleBackground } from "@/components/ParticleBackground";
import { IndustryChat } from "@/components/industries/IndustryChat";
import { 
  Truck, 
  Landmark, 
  Pill, 
  Shield, 
  Database, 
  Brain, 
  LineChart, 
  Zap,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";

const industries = [
  {
    id: "logistics",
    name: "Logistics & Supply Chain",
    icon: Truck,
    description: "Route optimization, inventory management, and supply chain resilience",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "finance",
    name: "Finance & Banking",
    icon: Landmark,
    description: "Risk modeling, portfolio optimization, and quantum-safe cryptography",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: "pharmaceuticals",
    name: "Pharmaceuticals",
    icon: Pill,
    description: "Drug discovery, molecular simulation, and clinical trial optimization",
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "cryptography",
    name: "Cryptography & Security",
    icon: Shield,
    description: "Post-quantum cryptography, encryption migration, and threat assessment",
    color: "from-purple-500 to-violet-500",
  },
  {
    id: "data-science",
    name: "Data Science",
    icon: Database,
    description: "Quantum machine learning, feature engineering, and data analytics",
    color: "from-orange-500 to-amber-500",
  },
  {
    id: "ml",
    name: "Machine Learning & AI",
    icon: Brain,
    description: "Quantum neural networks, optimization, and hybrid quantum-classical systems",
    color: "from-red-500 to-orange-500",
  },
  {
    id: "optimization",
    name: "Optimization",
    icon: LineChart,
    description: "Combinatorial optimization, scheduling, and resource allocation",
    color: "from-indigo-500 to-blue-500",
  },
  {
    id: "energy",
    name: "Energy & Power Grids",
    icon: Zap,
    description: "Grid optimization, renewable integration, and energy trading",
    color: "from-yellow-500 to-lime-500",
  },
];

const Industries = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

  const selected = industries.find((i) => i.id === selectedIndustry);

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <ParticleBackground />
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-gradient-quantum">Quantum Impact</span>
              <br />
              <span className="text-foreground">By Industry</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore how quantum computing will transform your industry. Our AI advisor will analyze your business 
              and provide personalized insights, opportunities, and warnings.
            </p>
          </div>

          {selectedIndustry ? (
            /* Chat View */
            <div className="max-w-3xl mx-auto">
              <Button
                variant="ghost"
                onClick={() => setSelectedIndustry(null)}
                className="mb-6 gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Industries
              </Button>

              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl overflow-hidden">
                <div className={`p-6 bg-gradient-to-r ${selected?.color} text-white`}>
                  <div className="flex items-center gap-4">
                    {selected && <selected.icon className="w-10 h-10" />}
                    <div>
                      <h2 className="font-heading text-2xl font-bold">{selected?.name}</h2>
                      <p className="opacity-90">{selected?.description}</p>
                    </div>
                  </div>
                </div>
                <IndustryChat 
                  industry={selectedIndustry} 
                  industryName={selected?.name || ""} 
                />
              </div>
            </div>
          ) : (
            /* Industry Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {industries.map((industry) => (
                <button
                  key={industry.id}
                  onClick={() => setSelectedIndustry(industry.id)}
                  className="group relative p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 text-left overflow-hidden"
                >
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${industry.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                  
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${industry.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <industry.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {industry.name}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {industry.description}
                  </p>
                  
                  <div className="mt-4 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Start Analysis →
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Industries;
