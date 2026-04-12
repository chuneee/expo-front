import { QRCodeSVG } from 'qrcode.react';

interface BadgeProps {
  firstName: string;
  lastName: string;
  attendeeType: string;
  email: string;
}

const attendeeTypeLabels: Record<string, string> = {
  general: 'PÚBLICO GENERAL',
  press: 'PRENSA',
  influencer: 'INFLUENCER',
  buyer: 'COMPRADOR POTENCIAL',
};

export function Badge({ firstName, lastName, attendeeType, email }: BadgeProps) {
  const fullName = `${firstName} ${lastName}`;
  const qrValue = `EXPOCARSHOW2026:${email}:${attendeeType}`;

  return (
    <div className="relative w-full max-w-md mx-auto bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-white/10 rounded-lg overflow-hidden">
      {/* Líneas decorativas superiores */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-red-600/5 to-transparent"></div>

      {/* Contenido */}
      <div className="relative p-8">
        {/* Header del gafete */}
        <div className="text-center mb-6 pb-6 border-b border-white/5">
          <div className="text-xs text-gray-500 uppercase tracking-widest mb-2">
            Evento Oficial
          </div>
          <h3 className="text-2xl tracking-tight mb-1">
            EXPO CAR SHOW
          </h3>
          <div className="text-red-500 text-lg">2026</div>
          <div className="text-xs text-gray-400 mt-2">
            15 de Junio, 2026 • Hermosillo, Sonora
          </div>
        </div>

        {/* Información del asistente */}
        <div className="mb-6 text-center">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
            Asistente
          </div>
          <div className="text-2xl mb-3">{fullName}</div>
          <div className="inline-block px-3 py-1 bg-red-600/20 border border-red-600/40 rounded text-xs text-red-400 uppercase tracking-wider">
            {attendeeTypeLabels[attendeeType] || attendeeType}
          </div>
        </div>

        {/* Código QR */}
        <div className="flex justify-center mb-6">
          <div className="bg-white p-4 rounded">
            <QRCodeSVG
              value={qrValue}
              size={200}
              level="H"
              includeMargin={false}
            />
          </div>
        </div>

        {/* Instrucciones */}
        <div className="text-center text-xs text-gray-500 border-t border-white/5 pt-4">
          Presenta este código QR al ingresar al evento
        </div>
      </div>

      {/* Líneas decorativas inferiores */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-1 bg-gradient-to-r from-transparent via-red-600/50 to-transparent"></div>
      </div>

      {/* Patrón decorativo de fondo */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent"></div>
        <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent"></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent"></div>
      </div>
    </div>
  );
}
