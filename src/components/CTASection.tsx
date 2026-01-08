'use client';

import { Sparkles, Github, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="card-fantasy p-8 md:p-12 lg:p-16 text-center max-w-4xl mx-auto">
          <div className="relative z-10">
            {/* Title */}
            <h2 className="font-pixel text-xl md:text-2xl lg:text-3xl mb-6">
              <span className="block text-foreground">Pronto para</span>
              <span className="block mt-2" style={{ color: '#ff00ff', textShadow: '0 0 20px rgba(255, 0, 255, 0.7), 0 0 35px rgba(255, 0, 255, 0.4)' }}>
                sua Aventura?
              </span>
            </h2>

            {/* Developer info */}
            <div className="flex items-center justify-center gap-2 text-sm mb-8" style={{ color: 'rgba(156, 163, 175, 0.7)' }}>
              <span>Desenvolvido por</span>
              <a
                href="https://www.linkedin.com/in/lucas-torquato-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary/80 font-medium inline-flex items-center gap-1"
                style={{ color: '#ff00ff' }}
              >
                Lucas Torquato
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/Lucasstq/GamifiedPlatform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 font-pixel text-xs px-8 py-6 h-auto transition-all duration-300 hover:scale-105"
                style={{ 
                  backgroundColor: '#ff00ff',
                  color: '#ffffff',
                  border: 'none',
                  boxShadow: '0 4px 20px rgba(255, 0, 255, 0.5)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#aa00aa'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ff00ff'}
              >
                <Github className="w-5 h-5 mr-2" />
                Ver Repositório
              </a>
            </div>

            {/* Tech Stack */}
            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-xs mb-4" style={{ color: 'rgba(156, 163, 175, 0.7)' }}>Stack Tecnológica</p>
              <div className="flex flex-wrap justify-center gap-3">
                {["Java 17", "Spring Boot 3.x", "PostgreSQL", "MinIO", "OAuth2"].map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 text-xs font-medium rounded-full border"
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                      color: 'rgba(156, 163, 175, 0.8)',
                      borderColor: 'rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
