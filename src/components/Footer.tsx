import { Sword, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border bg-card/30">
      <div className="container mx-auto px-4">
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Sword className="w-6 h-6 text-primary" />
            </div>
            <span className="font-pixel text-xs text-foreground">
              <span className="text-primary">Dark</span>
              <span className="text-secondary">Fantasy</span>
            </span>
          </div>

          {/* Center text - Absolutely positioned to be truly centered */}
          <div className="md:absolute md:left-1/2 md:-translate-x-1/2 flex items-center gap-2 text-sm text-muted-foreground">
            <span>Feito por</span>
            <a
              href="https://www.linkedin.com/in/lucas-torquato-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 font-medium transition-opacity"
              style={{ color: '#ff0066' }}
            >
              Lucas Torquato
            </a>
          </div>

          {/* GitHub link */}
          <a
            href="https://github.com/Lucasstq/GamifiedPlatform"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Github className="w-5 h-5" />
            <span>GitHub</span>
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © 2026 GamifiedPlatform - Dark Fantasy. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
