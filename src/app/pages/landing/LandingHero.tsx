import { Link } from 'react-router';
import { MapPin, Store } from 'lucide-react';
import { CountdownTimer } from '../../components/CountdownTimer';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

export function LandingHero(props: {
  eventDate: Date;
}) {
  const { eventDate } = props;

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=2000&q=80"
          alt="Boda"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-[#070707]" />
        <div className="absolute -top-24 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.26),rgba(7,7,7,0)_62%)] blur-2xl" />
      </div>

      <header className="absolute top-0 left-0 right-0 z-20">
        <div className="container mx-auto px-6 max-w-6xl py-6 sm:py-7 flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3 min-w-0">
            <ImageWithFallback
              src="/img/logo.jpeg"
              alt="EXPO"
              className="h-14 sm:h-16 md:h-18 w-auto rounded-md object-contain border border-white/10 bg-black/30 px-2"
            />
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/login"
              className="text-xs px-4 py-2 border border-white/10 text-white/60 hover:text-white hover:border-white/25 transition-colors rounded"
            >
              Panel
            </Link>
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-6 max-w-6xl pt-28 pb-16 md:pb-24">
          <div className="max-w-4xl">
            <div className="inline-flex items-center border border-[#D4AF37]/25 bg-[#D4AF37]/10 px-4 py-2 rounded-full text-sm text-[#E7D08A]">
              Registro abierto
            </div>

            <h1 className="mt-7 text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.92]">
              Boda
              <span className="text-[#D4AF37]"> ·</span> 18 Septiembre 2026
            </h1>

          <p className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl">
            Conoce todo sobre la boda: fecha, sede, agenda y como registrarte para asistir.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm md:text-base text-white/60">
            <div className="inline-flex items-center gap-2">
              <MapPin className="w-4.5 h-4.5 text-[#D4AF37]" />
              Sede por confirmar
            </div>
            <span className="text-white/20">•</span>
            <div className="inline-flex items-center gap-2">
              <Store className="w-4.5 h-4.5 text-[#D4AF37]" />
              Proveedores verificados
            </div>
          </div>

          <div className="mt-10">
            <div className="text-xs md:text-sm uppercase tracking-[0.32em] text-white/50 mb-4">Cuenta regresiva</div>
            <div className="inline-block origin-left scale-105 sm:scale-115 md:scale-125">
              <CountdownTimer targetDate={eventDate} />
            </div>
          </div>

          <div id="como-registrarte" className="mt-12 flex flex-col sm:flex-row gap-4">
            <Link
              to="/registro"
              className="px-9 py-4.5 bg-[#D4AF37] text-black hover:bg-[#E2C35A] transition-colors text-center rounded text-base md:text-lg"
            >
              Registro de asistentes
            </Link>
            <Link
              to="/registro-expositor"
              className="px-9 py-4.5 border border-white/15 hover:bg-white/5 transition-colors text-center rounded text-base md:text-lg"
            >
              Soy proveedor
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
