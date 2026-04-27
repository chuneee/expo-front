import { Link } from 'react-router';

export function LandingCta() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(120deg,rgba(212,175,55,0.20),rgba(255,255,255,0.02),rgba(7,7,7,0.0))] p-10 md:p-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(212,175,55,0.22),rgba(7,7,7,0)_55%)]" />
          <div className="relative grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8">
              <h2 className="text-4xl md:text-6xl tracking-tight leading-[1.02]">
                Planea con calma.
                <span className="text-[#D4AF37]"> Elige con confianza</span>.
              </h2>
              <p className="mt-5 text-lg text-white/70 max-w-2xl">
                Registra tu acceso como asistente o postula tu marca como proveedor.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
              <Link
                to="/registro"
                className="w-full sm:w-auto inline-flex justify-center px-8 py-4 bg-[#D4AF37] text-black hover:bg-[#E2C35A] transition-colors rounded"
              >
                Registro asistentes
              </Link>
              <Link
                to="/registro-expositor"
                className="w-full sm:w-auto inline-flex justify-center px-8 py-4 border border-white/15 hover:bg-white/5 transition-colors rounded"
              >
                Registro proveedores
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
