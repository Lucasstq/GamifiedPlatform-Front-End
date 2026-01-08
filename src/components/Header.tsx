'use client';

import { Sword, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Início", href: "#hero" },
    { name: "Features", href: "#features" },
    { name: "Classes", href: "#classes" },
    { name: "Jornada", href: "#journey" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative">
              <Sword className="w-8 h-8 text-primary transition-all duration-300 group-hover:text-secondary" />
              <div className="absolute inset-0 blur-lg bg-primary/30 group-hover:bg-secondary/30 transition-all duration-300" />
            </div>
            <span className="font-pixel text-xs md:text-sm text-foreground">
              <span className="text-primary">Dark</span>
              <span className="text-secondary">Fantasy</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 relative group pb-1"
              >
                {link.name}
                <span className="absolute -bottom-0 left-0 w-0 h-0.5 transition-all duration-500 ease-out group-hover:w-full" style={{ backgroundColor: '#ff00ff', boxShadow: '0 0 8px rgba(255, 0, 255, 0.8)' }} />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button 
              className="bg-primary hover:bg-primary/80 text-primary-foreground font-pixel text-xs px-6 py-2.5 transition-all duration-300"
              style={{ 
                backgroundColor: '#ff00ff',
                border: 'none',
                boxShadow: '0 4px 20px rgba(255, 0, 255, 0.4)',
                color: '#ffffff'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#aa00aa'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ff00ff'}
            >
              Iniciar Jornada
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in-up">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors px-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <Button 
                className="bg-primary hover:bg-primary/80 text-primary-foreground font-pixel text-xs w-full mt-2 transition-all duration-300" 
                onClick={() => setIsOpen(false)}
                style={{ 
                  backgroundColor: '#ff00ff',
                  border: 'none',
                  boxShadow: '0 4px 20px rgba(255, 0, 255, 0.4)',
                  color: '#ffffff'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#aa00aa'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ff00ff'}
              >
                Iniciar Jornada
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
