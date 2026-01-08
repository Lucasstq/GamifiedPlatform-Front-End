'use client';

import { ArrowDown, Sparkles, Github } from "lucide-react";
import { Button } from "./ui/button";
import wizardImage from "@/assets/wizard.png";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-particles"
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse-glow delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm mb-6">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-xs text-muted-foreground font-medium">
                Plataforma Gamificada de Estudos
              </span>
            </div>

            {/* Title */}
            <h1 className="font-pixel text-2xl md:text-3xl lg:text-4xl leading-tight mb-4">
              <span className="block text-foreground" style={{ textShadow: '0 0 15px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.3)' }}>Aprenda</span>
              <span className="block text-primary" style={{ color: '#ff00ff', textShadow: '0 0 20px rgba(255, 0, 255, 0.7), 0 0 35px rgba(255, 0, 255, 0.4)' }}>Programação</span>
              <span className="block text-secondary" style={{ color: '#00ff88', textShadow: '0 0 20px rgba(0, 255, 136, 0.7), 0 0 35px rgba(0, 255, 136, 0.4)' }}>
                Como um RPG
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed" style={{ color: 'rgba(156, 163, 175, 0.7)' }}>
              Evolua seu personagem, complete missões épicas e derrote bosses
              enquanto domina{" "}
              <span className="font-semibold" style={{ color: '#ffaa00' }}>Java</span>,{" "}
              <span className="font-semibold" style={{ color: '#ff00ff' }}>Spring Boot</span> e
              muito mais, do zero ao avançado.
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
              {["Java 17", "Spring Boot", "PostgreSQL", "MinIO"].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-xs font-medium rounded-md bg-muted text-muted-foreground border border-border hover:border-primary/50 hover:text-primary transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="font-pixel text-xs px-8 py-6 transition-all duration-300 hover:scale-105"
                style={{ 
                  backgroundColor: '#ff00ff',
                  color: '#ffffff',
                  border: 'none',
                  boxShadow: '0 4px 20px rgba(255, 0, 255, 0.5)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#aa00aa'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ff00ff'}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Começar Aventura
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-medium px-8 py-6 transition-all duration-300 hover:scale-105"
                style={{
                  border: '2px solid #00ff88',
                  color: '#00ff88',
                  backgroundColor: 'transparent',
                  boxShadow: '0 0 15px rgba(0, 255, 136, 0.3)'
                }}
                asChild
              >
                <a
                  href="https://github.com/Lucasstq/GamifiedPlatform"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-5 h-5 mr-2" />
                  Ver no GitHub
                </a>
              </Button>
            </div>
          </div>

          {/* Wizard Image */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glow effect behind wizard */}
              <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full scale-90 animate-pulse-glow" />
              <div className="absolute inset-0 bg-secondary/10 blur-2xl rounded-full scale-75 animate-pulse-glow delay-500" />
              
              {/* Wizard */}
              <img
                src={wizardImage.src}
                alt="Dark Fantasy Wizard"
                className="relative w-64 md:w-80 lg:w-96 h-auto float pixel-frame drop-shadow-2xl rounded-2xl"
                style={{
                  filter: "drop-shadow(0 0 40px hsl(280 100% 65% / 0.5))",
                }}
              />

              {/* Floating particles */}
              <div className="absolute top-10 right-10 w-3 h-3 bg-accent rounded-full animate-float delay-100 blur-sm" />
              <div className="absolute bottom-20 left-5 w-2 h-2 bg-secondary rounded-full animate-float delay-300" />
              <div className="absolute top-1/2 right-0 w-4 h-4 bg-primary rounded-full animate-float delay-500 blur-sm" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <a
            href="#features"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="text-xs">Explorar</span>
            <ArrowDown className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
