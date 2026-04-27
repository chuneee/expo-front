import { Link } from 'react-router';

export type LandingVendorBenefit = {
  title: string;
  description: string;
};

export function LandingVendors(props: {
  benefits: LandingVendorBenefit[];
}) {
  const { benefits } = props;

  return (
    <section className="py-20 md:py-28 bg-[#0b0b0b] border-y border-white/5">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl md:text-5xl tracking-tight">Si eres proveedor</h2>
            <p className="mt-4 text-white/65 text-lg">
              Registra tu marca para participar y recibir informacion de espacios, requisitos y fechas.
            </p>
            <div className="mt-8">
              <Link
                to="/registro-expositor"
                className="inline-flex px-7 py-3.5 bg-[#D4AF37] text-black hover:bg-[#E2C35A] transition-colors rounded"
              >
                Registro de proveedores
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="text-lg tracking-tight">{b.title}</div>
                <div className="mt-2 text-white/65">{b.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
