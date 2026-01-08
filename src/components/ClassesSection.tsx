const classes = [
  {
    name: "Camponês",
    level: "1-3",
    description: "Início da jornada. Fundamentos de programação.",
    xpRange: "0 - 299",
    badgeColor: "#6366f1",
  },
  {
    name: "Aprendiz Arcano",
    level: "4-6",
    description: "Domínio de variáveis, loops e funções básicas.",
    xpRange: "300 - 899",
    badgeColor: "#3b82f6",
  },
  {
    name: "Mago Iniciante",
    level: "7-9",
    description: "Orientação a Objetos e estruturas de dados.",
    xpRange: "900 - 1799",
    badgeColor: "#a855f7",
  },
  {
    name: "Arquimago",
    level: "10-12",
    description: "Spring Boot, APIs REST e bancos de dados.",
    xpRange: "1800 - 3199",
    badgeColor: "#d946ef",
  },
  {
    name: "Senhor das Sombras",
    level: "13-15",
    description: "Arquitetura de software e padrões avançados.",
    xpRange: "3200 - 5099",
    badgeColor: "#f43f5e",
  },
  {
    name: "Imperador Imortal",
    level: "22-25",
    description: "Mestre absoluto. Domínio completo da stack.",
    xpRange: "12800+",
    badgeColor: "#f59e0b",
  },
];

const ClassesSection = () => {
  return (
    <section id="classes" className="py-24 relative bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium mb-4" style={{ backgroundColor: 'rgba(0, 255, 136, 0.15)', color: '#00ff88' }}>
            PROGRESSÃO
          </span>
          <h2 className="font-pixel text-xl md:text-2xl lg:text-3xl mb-4">
            <span style={{ color: '#00ff88', textShadow: '0 0 20px rgba(0, 255, 136, 0.7), 0 0 35px rgba(0, 255, 136, 0.4)' }}>Classes</span>{" "}
            <span className="text-foreground">de Personagem</span>
          </h2>
          <p className="max-w-2xl mx-auto text-base" style={{ color: 'rgba(156, 163, 175, 0.7)' }}>
            Evolua através de 25 níveis e desbloqueie classes cada vez mais
            poderosas conforme domina as artes da programação.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((classItem, index) => (
            <div
              key={classItem.name}
              className="relative group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="card-fantasy p-6 h-full transition-all duration-300 hover:translate-y-[-4px]">
                <div
                  className="absolute top-4 right-4 px-3 py-1 rounded-full text-white text-xs font-bold"
                  style={{ backgroundColor: classItem.badgeColor }}
                >
                  Nv. {classItem.level}
                </div>

                <div className="relative z-10">
                  <h3 className="font-pixel text-sm text-foreground mb-2 pr-16">
                    {classItem.name}
                  </h3>

                  <p className="text-sm mb-4" style={{ color: 'rgba(156, 163, 175, 0.7)' }}>
                    {classItem.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span style={{ color: 'rgba(156, 163, 175, 0.7)' }}>XP Necessário</span>
                      <span className="font-medium" style={{ color: '#ffaa00' }}>{classItem.xpRange}</span>
                    </div>
                    <div className="xp-bar">
                      <div
                        className="xp-bar-fill"
                        style={{ width: `${Math.min(100, (index + 1) * 16.6)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          * Existem 25 níveis no total, cada um com requisitos de XP crescentes
        </p>
      </div>
    </section>
  );
};

export default ClassesSection;
