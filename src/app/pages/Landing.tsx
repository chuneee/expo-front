import { Link } from 'react-router';
import { CountdownTimer } from '../components/CountdownTimer';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function Landing() {
  // Fecha del evento: 15 de Junio 2026
  const eventDate = new Date('2026-06-15T10:00:00');

  const features = [
    {
      title: 'Autos Deportivos',
      description: 'Las últimas novedades en vehículos de alto rendimiento',
    },
    {
      title: 'Autos Clásicos',
      description: 'Colecciones exclusivas y modelos icónicos',
    },
    {
      title: 'Zona Tuning & Performance',
      description: 'Modificaciones extremas y personalización',
    },
    {
      title: 'Tecnología Automotriz',
      description: 'Innovación eléctrica e inteligencia artificial',
    },
    {
      title: 'Accesorios y Refacciones',
      description: 'Todo para potenciar tu vehículo',
    },
    {
      title: 'Zona de Pruebas',
      description: 'Experimenta la potencia en vivo',
    },
  ];

  const experiences = [
    {
      title: 'Networking con Marcas',
      description: 'Conecta con las marcas automotrices más importantes del mundo',
    },
    {
      title: 'Lanzamientos Exclusivos',
      description: 'Sé testigo de revelaciones mundiales y ediciones limitadas',
    },
    {
      title: 'Activaciones en Vivo',
      description: 'Experiencias inmersivas y demostraciones en tiempo real',
    },
    {
      title: 'Experiencia Interactiva',
      description: 'Simuladores, realidad virtual y tecnología de vanguardia',
    },
  ];

  const sponsors = ['SPEED TECH', 'PERFORMANCE PRO', 'AUTO DYNAMICS', 'TURBO MAX', 'ELITE MOTORS', 'RACING GEAR'];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        {/* Header con botón Admin */}
        <header className="absolute top-0 left-0 right-0 z-20 py-6">
          <div className="container mx-auto px-6 max-w-6xl flex justify-end">
            <Link 
              to="/admin/login" 
              className="text-xs px-4 py-2 border border-white/20 text-gray-400 hover:text-white hover:border-white/40 transition-colors rounded"
            >
              Demo Admin
            </Link>
          </div>
        </header>

        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1759783351212-acbec1a2d807?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBjYXIlMjBoZWFkbGlnaHRzJTIwZGFyayUyMGRyYW1hdGljfGVufDF8fHx8MTc3MjMwMTk4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Expo Car Show Hero"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-6xl">
          <div className="max-w-4xl">
            <div className="inline-block px-3 py-1 border border-red-600/60 text-red-500 text-sm mb-6 uppercase tracking-widest">
              15 Junio 2026
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl mb-6 tracking-tighter">
              EXPO CAR<br />SHOW 2026
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
              La experiencia automotriz más potente del año
            </p>

            <div className="text-gray-400 mb-12">
              Expo Forum Hermosillo, Sonora
            </div>

            <div className="mb-12">
              <CountdownTimer targetDate={eventDate} />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/registro" className="px-8 py-4 bg-red-600 hover:bg-red-700 transition-colors text-center">
                Registrarme
              </Link>
              <Link to="/registro-expositor" className="px-8 py-4 border border-white/20 hover:bg-white/5 transition-colors text-center">
                Quiero exponer mi marca
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ¿Qué encontrarás en el evento? */}
      <section className="py-24 md:py-32 bg-[#0a0a0a]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="mb-16">
            <h2 className="text-4xl md:text-6xl mb-6">
              ¿Qué encontrarás?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl">
              Una experiencia completa diseñada para los verdaderos amantes del automovilismo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {features.map((feature, index) => (
              <div key={index}>
                <h3 className="text-xl mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experiencia del Evento */}
      <section className="py-24 md:py-32 bg-[#0f0f0f]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-4xl md:text-6xl mb-6">
                Vive la experiencia
              </h2>
              <p className="text-gray-400 text-lg">
                Más que un evento, es una celebración de la cultura automotriz
              </p>
            </div>
            <div className="relative h-[400px] md:h-[500px]">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1644749700856-a82a92828a1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjBzaG93cm9vbSUyMGVsZWdhbnR8ZW58MXx8fHwxNzcyMjY1NjYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Experiencia del evento"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {experiences.map((exp, index) => (
              <div key={index} className="border-l border-red-600/40 pl-6">
                <h3 className="text-2xl mb-3">{exp.title}</h3>
                <p className="text-gray-400 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patrocinadores */}
      <section className="py-24 bg-black border-y border-white/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="mb-12">
            <p className="text-gray-500 text-sm uppercase tracking-widest">Patrocinadores</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {sponsors.map((sponsor, index) => (
              <div
                key={index}
                className="flex items-center justify-center h-20 border border-white/5"
              >
                <span className="text-gray-600 text-xs tracking-widest">
                  {sponsor}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Potente */}
      <section className="py-32 md:py-40 bg-[#0a0a0a]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="max-w-4xl">
            <h2 className="text-5xl md:text-7xl lg:text-8xl mb-10 tracking-tight leading-none">
              Vive la adrenalina.<br />
              Sé parte del evento.
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl">
              No te quedes fuera de la experiencia automotriz más esperada del año
            </p>
            <Link to="/registro" className="inline-block px-10 py-5 bg-red-600 hover:bg-red-700 text-lg transition-colors">
              Reserva tu acceso
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/5 py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <h3 className="text-2xl mb-4">
                EXPO CAR SHOW 2026
              </h3>
              <p className="text-gray-500 max-w-md text-sm leading-relaxed">
                La plataforma líder en eventos automotrices. Conectando marcas, entusiastas y profesionales de la industria.
              </p>
            </div>

            <div>
              <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-4">Contacto</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>info@expocarshow.com</li>
                <li>+52 (55) 1234-5678</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-4">Ubicación</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Expo Forum Hermosillo<br />
                Blvd. Solidaridad s/n<br />
                Hermosillo, Sonora
              </p>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                Instagram
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                Facebook
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                Twitter
              </a>
            </div>
            <div className="flex gap-6 text-xs text-gray-600">
              <a href="#" className="hover:text-gray-400 transition-colors">
                Aviso de Privacidad
              </a>
              <a href="#" className="hover:text-gray-400 transition-colors">
                Términos y Condiciones
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}