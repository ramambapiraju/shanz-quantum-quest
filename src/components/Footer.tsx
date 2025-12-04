import { Atom, Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = {
  learn: [
    { name: "Getting Started", href: "#learning-paths" },
    { name: "Qiskit Basics", href: "#resources" },
    { name: "Quantum Algorithms", href: "#resources" },
    { name: "Certifications", href: "#resources" },
  ],
  resources: [
    { name: "IBM Quantum", href: "https://quantum.ibm.com/" },
    { name: "Qiskit Documentation", href: "https://docs.quantum.ibm.com/" },
    { name: "Qiskit Textbook", href: "https://qiskit.org/learn" },
    { name: "YouTube Channel", href: "https://www.youtube.com/qiskit" },
  ],
  connect: [
    { name: "About Us", href: "#about" },
    { name: "Contact", href: "mailto:hello@shanz.co.in" },
    { name: "Privacy Policy", href: "/privacy-policy", isRoute: true },
    { name: "Feedback", href: "#" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Mail, href: "mailto:hello@shanz.co.in", label: "Email" },
];

export const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-quantum-darker">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="#home" className="flex items-center gap-2 mb-4">
              <Atom className="w-8 h-8 text-primary" />
              <span className="font-heading font-bold text-xl text-gradient-quantum">SHAN Z</span>
            </a>
            <p className="text-muted-foreground text-sm mb-4">
              The Quantum World — Your free gateway to mastering quantum computing.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2 rounded-lg bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Learn */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Learn</h4>
            <ul className="space-y-2">
              {footerLinks.learn.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Connect</h4>
            <ul className="space-y-2">
              {footerLinks.connect.map((link) => (
                <li key={link.name}>
                  {link.isRoute ? (
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary text-sm transition-colors"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} SHAN Z. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            Made with 💙 for Gen Z India
          </p>
        </div>
      </div>
    </footer>
  );
};
