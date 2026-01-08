'use client';

import { Check, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "Q1",
    title: "Crie sua conta",
    description: "Faça login com Google ou GitHub via OAuth2 e receba seu personagem inicial.",
    features: ["Login OAuth2", "Personagem Nv. 1", "Avatar inicial"],
  },
  {
    number: "Q2",
    title: "Complete missões",
    description: "Resolva desafios de programação e ganhe XP para evoluir seu personagem.",
    features: ["Missões diárias", "Missões semanais", "Missões mensais"],
  },
  {
    number: "Q3",
    title: "Enfrente Bosses",
    description: "Prove seu conhecimento derrotando bosses com desafios práticos de código.",
    features: ["Boss Fights", "Rewards exclusivos", "Badges especiais"],
  },
  {
    number: "Q4",
    title: "Domine a arte",
    description: "Torne-se um Imperador Imortal dominando toda a stack tecnológica.",
    features: ["Ranking Global", "Grimórios", "Conquistas"],
  },
];

const JourneySection = () => {
  return (
    <section id="journey" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-1 h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent -translate-y-1/2 hidden lg:block" />

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium mb-4" style={{ backgroundColor: 'rgba(255, 170, 0, 0.15)', color: '#ffaa00' }}>
            SUA JORNADA
          </span>
          <h2 className="font-pixel text-xl md:text-2xl lg:text-3xl mb-4">
            <span style={{ color: '#ffaa00', textShadow: '0 0 20px rgba(255, 170, 0, 0.7), 0 0 35px rgba(255, 170, 0, 0.4)' }}>Como</span>{" "}
            <span className="text-foreground">Funciona</span>
          </h2>
          <p className="max-w-2xl mx-auto text-base" style={{ color: 'rgba(156, 163, 175, 0.7)' }}>
            Siga o caminho do aprendizado gamificado e transforme-se de um
            simples Camponês em um Imperador Imortal da programação.
          </p>
        </div>

        <div className="space-y-12 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative group">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5">
                  <div className="h-full bg-gradient-to-r from-primary/50 to-primary/30" />
                  <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#ff00ff' }} />
                </div>
              )}

              <div className="card-fantasy p-6 h-full transition-all duration-300 hover:translate-y-[-4px] group/card">
                <div 
                  className="circle-badge inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 transition-all duration-300" 
                  style={{ 
                    backgroundColor: 'rgba(255, 0, 255, 0.15)', 
                    border: '2px solid rgba(255, 0, 255, 0.4)',
                    cursor: 'pointer'
                  }}
                >
                  <span className="font-pixel text-lg" style={{ color: '#ff00ff' }}>
                    {step.number}
                  </span>
                </div>

                <h3 className="font-pixel text-xs text-foreground mb-2">
                  {step.title}
                </h3>

                <p className="text-sm mb-4" style={{ color: 'rgba(156, 163, 175, 0.7)' }}>
                  {step.description}
                </p>

                <ul className="space-y-2">
                  {step.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm"
                      style={{ color: 'rgba(156, 163, 175, 0.7)' }}
                    >
                      <Check className="w-4 h-4 flex-shrink-0" style={{ color: '#00ffcc' }} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
