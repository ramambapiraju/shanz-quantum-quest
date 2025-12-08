import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Atom } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { name: "Home", href: "#home", isHash: true },
  { name: "Learn", href: "#learning-paths", isHash: true },
  { name: "Resources", href: "#resources", isHash: true },
  { name: "Industries", href: "/industries", isHash: false },
  { name: "About", href: "#about", isHash: true },
  { name: "Play Game", href: "/quantum-collapse", isHash: false },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleNavClick = (href: string, isHash: boolean) => {
    if (isHash && location.pathname !== "/") {
      // Navigate to home first, then scroll
      window.location.href = "/" + href;
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Atom className="w-8 h-8 text-primary group-hover:animate-spin transition-transform" style={{ animationDuration: '3s' }} />
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
            </div>
            <span className="font-heading font-bold text-xl">
              <span className="text-gradient-quantum">SHAN Z</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.isHash ? (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => handleNavClick(link.href, link.isHash)}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button variant="quantum" size="sm">
              Start Learning
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                link.isHash ? (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => {
                      handleNavClick(link.href, link.isHash);
                      setIsOpen(false);
                    }}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium py-2"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium py-2"
                  >
                    {link.name}
                  </Link>
                )
              ))}
              <Button variant="quantum" size="sm" className="w-full mt-2">
                Start Learning
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
