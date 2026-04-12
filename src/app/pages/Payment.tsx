import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowLeft, ExternalLink, CreditCard } from 'lucide-react';

export default function Payment() {
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem('registrationData');
    if (!data) {
      navigate('/registro');
    }
  }, [navigate]);

  const handleTicketmaster = () => {
    // Simulación de redirección a Ticketmaster
    if (confirm('Serás redirigido a Ticketmaster para completar tu compra. ¿Deseas continuar?')) {
      navigate('/validacion');
    }
  };

  const handleDirectPayment = () => {
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-white/5 py-4 md:py-6">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 md:gap-4 min-w-0">
              <Link to="/registro" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors flex-shrink-0">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm hidden sm:inline">Volver</span>
              </Link>
              <div className="h-6 w-px bg-white/10 hidden sm:block"></div>
              <h1 className="text-sm sm:text-base md:text-xl truncate">EXPO CAR SHOW 2026</h1>
            </div>
            <div className="text-xs sm:text-sm text-gray-400 flex-shrink-0">
              <span className="hidden sm:inline">Paso </span><span className="text-white">2</span> de 3
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12 md:py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-5xl mb-4">Completa tu acceso</h2>
            <p className="text-gray-400 text-lg">Selecciona tu método de pago</p>
          </div>

          {/* Precio destacado */}
          <div className="text-center mb-12">
            <div className="inline-block px-6 py-3 bg-red-600/10 border border-red-600/40 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Precio por persona</div>
              <div className="text-4xl">$350 <span className="text-xl text-gray-400">MXN</span></div>
            </div>
          </div>

          {/* Opciones de pago */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Opción 1: Ticketmaster */}
            <div className="bg-[#111111] border border-white/10 rounded-lg p-8 hover:border-white/20 transition-all">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center">
                  <ExternalLink className="w-8 h-8 text-red-500" />
                </div>
              </div>

              <h3 className="text-2xl mb-3 text-center">Comprar en Ticketmaster</h3>
              
              <p className="text-gray-400 text-center mb-6">
                Serás redirigido a Ticketmaster para completar tu compra
              </p>

              <div className="bg-black/30 border border-white/5 rounded p-4 mb-6">
                <p className="text-sm text-gray-400 leading-relaxed">
                  Si realizas tu pago en Ticketmaster, deberás subir tu comprobante o ingresar tu número de orden para validar tu acceso y generar tu gafete.
                </p>
              </div>

              <button
                onClick={handleTicketmaster}
                className="w-full py-4 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                <span>Ir a Ticketmaster</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>

            {/* Opción 2: Pago Directo */}
            <div className="bg-[#111111] border border-red-600/40 rounded-lg p-8 hover:border-red-600/60 transition-all relative">
              {/* Badge recomendado */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <div className="px-4 py-1 bg-red-600 text-xs uppercase tracking-wider rounded-full">
                  Recomendado
                </div>
              </div>

              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-red-600/10 border border-red-600/40 rounded-full flex items-center justify-center">
                  <CreditCard className="w-8 h-8 text-red-500" />
                </div>
              </div>

              <h3 className="text-2xl mb-3 text-center">Pago Directo</h3>
              
              <p className="text-gray-400 text-center mb-6">
                Compra segura con tarjeta de crédito o débito
              </p>

              <div className="bg-red-600/5 border border-red-600/20 rounded p-4 mb-6">
                <p className="text-sm text-gray-400 leading-relaxed">
                  Si eliges pagar directamente aquí, tu acceso se activará automáticamente al confirmarse el pago.
                </p>
              </div>

              <button
                onClick={handleDirectPayment}
                className="w-full py-4 bg-red-600 hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>Pagar ahora</span>
              </button>
            </div>
          </div>

          {/* Información adicional */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500">
              Pago 100% seguro • Tus datos están protegidos
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
