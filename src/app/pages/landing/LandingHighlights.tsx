import type { LucideIcon } from 'lucide-react';

export type LandingHighlight = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export function LandingHighlights(props: {
  highlights: LandingHighlight[];
}) {
  const { highlights } = props;

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl tracking-tight">Que encontraras</h2>
          <p className="mt-4 text-white/65 text-lg max-w-2xl">
            Un recorrido completo para planear, comparar y elegir con confianza.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-7 overflow-hidden"
              >
                <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.16),rgba(7,7,7,0)_60%)] blur-2xl" />
                <div className="relative">
                  <div className="w-11 h-11 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/20 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-xl tracking-tight mb-2">{item.title}</h3>
                  <p className="text-white/65 leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
