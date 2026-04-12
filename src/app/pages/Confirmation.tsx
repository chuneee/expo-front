import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Download, Smartphone, Share2, Check, MessageCircle, Facebook as FacebookIcon, Link2 } from 'lucide-react';
import { Badge } from '../components/Badge';

interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  attendeeType: string;
  howDidYouHear: string;
  acceptedTerms: boolean;
}

export default function Confirmation() {
  const navigate = useNavigate();
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);
  const [copied, setCopied] = useState(false);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('registrationData');
    const validationData = localStorage.getItem('validationData');
    const paymentData = localStorage.getItem('paymentData');
    
    if (data) {
      setRegistrationData(JSON.parse(data));
      
      // Priorizar paymentData sobre validationData
      if (paymentData) {
        const payment = JSON.parse(paymentData);
        setIsPending(false); // Pago confirmado
      } else if (validationData) {
        const validation = JSON.parse(validationData);
        setIsPending(validation.pending === true);
      }
    } else {
      // Si no hay datos, redirigir al registro
      navigate('/registro');
    }
  }, [navigate]);

  const handleDownload = () => {
    alert('Función de descarga en desarrollo');
  };

  const handleSaveToPhone = () => {
    alert('Función de guardar en celular en desarrollo');
  };

  const handleShare = (platform: string) => {
    const eventUrl = window.location.origin;
    const message = '¡Ven conmigo a Expo Car Show 2026! La experiencia automotriz más potente del año.';
    
    if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(message + ' ' + eventUrl)}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventUrl)}`, '_blank');
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(eventUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!registrationData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-white/5 py-4 md:py-6">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 md:gap-4 min-w-0">
              <h1 className="text-sm sm:text-base md:text-xl truncate">EXPO CAR SHOW 2026</h1>
            </div>
            <div className="text-xs sm:text-sm text-gray-400 flex-shrink-0">
              <span className="hidden sm:inline">Paso </span><span className="text-white">3</span> de 3
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12 md:py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Mensaje de confirmación */}
          <div className="text-center mb-12">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${
              isPending 
                ? 'bg-yellow-600/20 border border-yellow-600/40' 
                : 'bg-green-600/20 border border-green-600/40'
            }`}>
              <Check className={`w-8 h-8 ${isPending ? 'text-yellow-500' : 'text-green-500'}`} />
            </div>
            <h2 className="text-4xl md:text-5xl mb-4">
              {isPending ? '¡Solicitud recibida!' : '¡Pago confirmado!'}
            </h2>
            <p className="text-xl text-gray-400 mb-2">
              {isPending ? 'Tu acceso será activado pronto' : 'Tu acceso digital está listo'}
            </p>
            <p className="text-sm text-gray-500">
              {isPending 
                ? 'Recibirás un correo cuando tu compra sea validada' 
                : 'Muestra tu código QR el día del evento para ingresar'
              }
            </p>
          </div>

          {/* Mensaje de validación pendiente */}
          {isPending && (
            <div className="mb-12 bg-yellow-600/10 border border-yellow-600/30 rounded-lg p-6">
              <p className="text-sm text-yellow-200/80 leading-relaxed text-center">
                <strong>Estado:</strong> Tu compra de Ticketmaster está siendo validada. 
                Te notificaremos por correo cuando tu acceso sea activado (24-48 horas).
              </p>
            </div>
          )}

          {/* Gafete Digital - Solo mostrar si no está pendiente */}
          {!isPending && (
            <div className="mb-12">
              <Badge
                firstName={registrationData.firstName}
                lastName={registrationData.lastName}
                attendeeType={registrationData.attendeeType}
                email={registrationData.email}
              />
            </div>
          )}

          {/* Botones de acción - Solo mostrar si no está pendiente */}
          {!isPending && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
              <button
                onClick={handleDownload}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors rounded"
              >
                <Download className="w-5 h-5" />
                <span>Descargar PDF</span>
              </button>
              <button
                onClick={handleSaveToPhone}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors rounded"
              >
                <Smartphone className="w-5 h-5" />
                <span>Guardar en celular</span>
              </button>
              <button
                onClick={() => handleShare('copy')}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-red-600 hover:bg-red-700 transition-colors rounded"
              >
                <Share2 className="w-5 h-5" />
                <span>{copied ? '¡Copiado!' : 'Compartir evento'}</span>
              </button>
            </div>
          )}

          {/* Invitación a compartir */}
          <div className="bg-[#111111] border border-white/10 rounded-lg p-6 md:p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-red-600/10 border border-red-600/40 rounded-full mb-4">
                <Share2 className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-2xl mb-2">Invita a tus amigos</h3>
              <p className="text-gray-400 text-sm">
                Comparte este evento con otros entusiastas del motor
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
              {/* WhatsApp */}
              <button
                onClick={() => handleShare('whatsapp')}
                className="group relative bg-gradient-to-br from-[#25D366]/10 to-transparent border border-[#25D366]/30 hover:border-[#25D366]/60 rounded-lg p-4 transition-all hover:scale-105"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-[#25D366]/20 rounded-full flex items-center justify-center group-hover:bg-[#25D366]/30 transition-colors">
                    <MessageCircle className="w-6 h-6 text-[#25D366]" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">WhatsApp</div>
                    <div className="text-xs text-gray-400">Compartir chat</div>
                  </div>
                </div>
              </button>

              {/* Facebook */}
              <button
                onClick={() => handleShare('facebook')}
                className="group relative bg-gradient-to-br from-[#1877F2]/10 to-transparent border border-[#1877F2]/30 hover:border-[#1877F2]/60 rounded-lg p-4 transition-all hover:scale-105"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-[#1877F2]/20 rounded-full flex items-center justify-center group-hover:bg-[#1877F2]/30 transition-colors">
                    <FacebookIcon className="w-6 h-6 text-[#1877F2]" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Facebook</div>
                    <div className="text-xs text-gray-400">Publicar</div>
                  </div>
                </div>
              </button>

              {/* Copiar enlace */}
              <button
                onClick={() => handleShare('copy')}
                className="group relative bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-white/30 rounded-lg p-4 transition-all hover:scale-105"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    {copied ? (
                      <Check className="w-6 h-6 text-green-500" />
                    ) : (
                      <Link2 className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{copied ? '¡Copiado!' : 'Copiar enlace'}</div>
                    <div className="text-xs text-gray-400">
                      {copied ? 'Listo para pegar' : 'Link directo'}
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Volver a inicio */}
          <div className="text-center mt-12">
            <Link
              to="/"
              className="inline-block text-gray-400 hover:text-white transition-colors"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}