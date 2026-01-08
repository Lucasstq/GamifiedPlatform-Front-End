import { 
  Swords, 
  ScrollText, 
  Trophy, 
  Crown, 
  Shield, 
  Wand2 
} from "lucide-react";

const features = [
  {
    icon: Wand2,
    title: "Sistema de XP",
    description: "Ganhe experiência completando missões e evolua do nível 1 (Camponês) até o 25 (Imperador Imortal).",
    color: "primary",
  },
  {
    icon: ScrollText,
    title: "Missões Épicas",
    description: "Complete missões diárias, semanais e mensais para ganhar XP e desbloquear novos conteúdos.",
    color: "secondary",
  },
  {
    icon: Swords,
    title: "Boss Fights",
    description: "Enfrente desafios de programação como bosses épicos. Derrote-os para provar seu conhecimento.",
    color: "accent",
  },
  {
    icon: Trophy,
    title: "Badges & Conquistas",
    description: "Colete badges únicos por suas realizações e exiba-os em seu perfil de guerreiro.",
    color: "primary",
  },
  {
    icon: Crown,
    title: "Ranking Global",
    description: "Compete com outros aventureiros e suba no ranking semanal e all-time.",
    color: "secondary",
  },
  {
    icon: Shield,
    title: "Grimórios (PDFs)",
    description: "Acesse materiais de estudo exclusivos desbloqueados conforme você progride na jornada.",
    color: "accent",
  },
];

const colorClasses = {
  primary: {
    icon: "text-primary",
    iconColor: "#ff00ff",
    glow: "shadow-[0_0_30px_hsl(280_100%_65%/0.3)]",
    border: "hover:border-primary/50",
  },
  secondary: {
    icon: "text-secondary",
    iconColor: "#00ffcc",
    glow: "shadow-[0_0_30px_hsl(160_100%_50%/0.3)]",
    border: "hover:border-secondary/50",
  },
  accent: {
    icon: "text-accent",
    iconColor: "#ffaa00",
    glow: "shadow-[0_0_30px_hsl(45_100%_55%/0.3)]",
    border: "hover:border-accent/50",
  },
};

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium mb-4" style={{ backgroundColor: 'rgba(255, 0, 255, 0.15)', color: '#ff00ff' }}>
            RECURSOS
          </span>
          <h2 className="font-pixel text-xl md:text-2xl lg:text-3xl mb-4">
            <span className="text-foreground">Sistema</span>{" "}
            <span style={{ color: '#ff00ff', textShadow: '0 0 20px rgba(255, 0, 255, 0.6)' }}>Gamificado</span>
          </h2>
          <p className="max-w-2xl mx-auto text-base" style={{ color: 'rgba(156, 163, 175, 0.7)' }}>
            Transforme seu aprendizado em uma aventura épica com nosso sistema
            completo de gamificação inspirado em RPGs clássicos.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const colors = colorClasses[feature.color as keyof typeof colorClasses];
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className={`card-fantasy p-6 group transition-all duration-500 ${colors.border} ${colors.glow}`}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-muted">
                      <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" style={{ color: colors.iconColor }} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-pixel text-xs text-foreground mb-3 font-bold">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(156, 163, 175, 0.7)' }}>
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
