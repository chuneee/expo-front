import { MapPin, ShieldCheck, Sparkles, Star, Ticket, Users } from 'lucide-react';
import { LandingCta } from './landing/LandingCta';
import { LandingFooter } from './landing/LandingFooter';
import { LandingHero } from './landing/LandingHero';
import { LandingHighlights, type LandingHighlight } from './landing/LandingHighlights';
import { LandingSponsors } from './landing/LandingSponsors';
import { LandingVendors, type LandingVendorBenefit } from './landing/LandingVendors';

export default function Landing() {
  // Proximo evento (placeholder): actualizalo cuando tengas fecha/sede final.
  const eventDate = new Date('2026-09-18T18:00:00');

  const attendeeHighlights: LandingHighlight[] = [
    {
      title: 'Vestidos & Moda',
      description: 'Tendencias para XV y boda, colecciones y asesorias.',
      icon: Sparkles,
    },
    {
      title: 'Banquetes & Pasteleria',
      description: 'Degustaciones, paquetes y proveedores verificados.',
      icon: Star,
    },
    {
      title: 'Foto, Video & Cabina',
      description: 'Opciones para capturar cada momento sin complicaciones.',
      icon: Ticket,
    },
    {
      title: 'Musica & Shows',
      description: 'DJ, grupos, animacion y experiencias en vivo.',
      icon: Users,
    },
    {
      title: 'Salones & Locaciones',
      description: 'Sedes, paquetes y disponibilidad en un solo recorrido.',
      icon: MapPin,
    },
    {
      title: 'Decoracion & Detalles',
      description: 'Ambientacion, flores, invitaciones y mesas de dulces.',
      icon: ShieldCheck,
    },
  ];

  const vendorBenefits: LandingVendorBenefit[] = [
    {
      title: 'Genera prospectos',
      description: 'Conecta con personas listas para cotizar y apartar.',
    },
    {
      title: 'Visibilidad premium',
      description: 'Tu marca presente en un evento curado por el equipo EXPO.',
    },
    {
      title: 'Operacion ordenada',
      description: 'Registro, control y comunicacion centralizada para proveedores.',
    },
    {
      title: 'Networking',
      description: 'Alianzas con otros proveedores y oportunidades de colaboracion.',
    },
  ];

  const sponsors = ['PROVEEDOR UNO', 'PROVEEDOR DOS', 'PROVEEDOR TRES', 'PROVEEDOR CUATRO', 'PROVEEDOR CINCO', 'PROVEEDOR SEIS'];

  return (
    <div className="min-h-screen bg-[#070707] text-white">
      <LandingHero eventDate={eventDate} />
      <LandingHighlights highlights={attendeeHighlights} />
      <LandingVendors benefits={vendorBenefits} />
      <LandingSponsors sponsors={sponsors} />
      <LandingCta />
      <LandingFooter />
    </div>
  );
}
