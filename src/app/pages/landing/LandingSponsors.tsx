export function LandingSponsors(props: {
  sponsors: string[];
}) {
  const { sponsors } = props;

  return (
    <section className="py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-10">
          <p className="text-white/45 text-sm uppercase tracking-widest">Patrocinadores</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {sponsors.map((s) => (
            <div
              key={s}
              className="flex items-center justify-center h-20 border border-white/10 bg-white/[0.02] rounded-xl"
            >
              <span className="text-white/45 text-xs tracking-widest">{s}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
