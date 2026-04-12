import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowLeft, CreditCard, Lock } from 'lucide-react';

export default function Checkout() {
  const navigate = useNavigate();
  const [registrationData, setRegistrationData] = useState<any>(null);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  useEffect(() => {
    const data = localStorage.getItem('registrationData');
    if (data) {
      setRegistrationData(JSON.parse(data));
    } else {
      navigate('/registro');
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.cardNumber || !formData.cardName || !formData.expiryDate || !formData.cvv) {
      alert('Por favor completa todos los campos');
      return;
    }

    // Simular procesamiento de pago
    setTimeout(() => {
      // Limpiar cualquier dato de validación de Ticketmaster previo
      localStorage.removeItem('validationData');
      
      localStorage.setItem('paymentData', JSON.stringify({
        paid: true,
        method: 'direct',
        amount: 350,
      }));
      navigate('/confirmacion');
    }, 1500);
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted;
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\//g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
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
              <Link to="/pago" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors flex-shrink-0">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm hidden sm:inline">Volver</span>
              </Link>
              <div className="h-6 w-px bg-white/10 hidden sm:block"></div>
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
          <div className="grid md:grid-cols-2 gap-8">
            {/* Resumen del pedido */}
            <div>
              <h2 className="text-2xl mb-6">Resumen del pedido</h2>
              
              <div className="bg-[#111111] border border-white/10 rounded-lg p-6 mb-6">
                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/5">
                  <div className="w-12 h-12 bg-red-600/10 border border-red-600/40 rounded flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Expo Car Show 2026</h3>
                    <p className="text-sm text-gray-400">15 de Junio, 2026</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Asistente</span>
                    <span>{registrationData.firstName} {registrationData.lastName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Email</span>
                    <span className="text-xs">{registrationData.email}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Tipo</span>
                    <span className="capitalize">{registrationData.attendeeType}</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#111111] border border-white/10 rounded-lg p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Subtotal</span>
                  <span>$350.00</span>
                </div>
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/5">
                  <span className="text-gray-400">Cargo por servicio</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between items-center text-xl">
                  <span>Total</span>
                  <span className="text-red-500">$350.00 MXN</span>
                </div>
              </div>
            </div>

            {/* Formulario de pago */}
            <div>
              <h2 className="text-2xl mb-6">Información de pago</h2>

              <div className="bg-[#111111] border border-white/10 rounded-lg p-6 md:p-8">
                <div className="flex items-center gap-2 mb-6 text-sm text-green-500">
                  <Lock className="w-4 h-4" />
                  <span>Conexión segura</span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Número de tarjeta */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Número de tarjeta <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.cardNumber}
                      onChange={(e) => {
                        const formatted = formatCardNumber(e.target.value);
                        if (formatted.replace(/\s/g, '').length <= 16) {
                          setFormData({ ...formData, cardNumber: formatted });
                        }
                      }}
                      className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-600/50 transition-colors"
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>

                  {/* Nombre en la tarjeta */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Nombre en la tarjeta <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.cardName}
                      onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-600/50 transition-colors"
                      placeholder="JUAN PÉREZ"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Fecha de expiración */}
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Vencimiento <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.expiryDate}
                        onChange={(e) => {
                          const formatted = formatExpiryDate(e.target.value);
                          if (formatted.length <= 5) {
                            setFormData({ ...formData, expiryDate: formatted });
                          }
                        }}
                        className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-600/50 transition-colors"
                        placeholder="MM/AA"
                        required
                      />
                    </div>

                    {/* CVV */}
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        CVV <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.cvv}
                        onChange={(e) => {
                          if (e.target.value.length <= 4 && /^\d*$/.test(e.target.value)) {
                            setFormData({ ...formData, cvv: e.target.value });
                          }
                        }}
                        className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-600/50 transition-colors"
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>

                  {/* Mensaje de seguridad */}
                  <div className="bg-black/30 border border-white/5 rounded p-4">
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Tus datos de pago están protegidos con encriptación de nivel bancario. 
                      No almacenamos información de tarjetas.
                    </p>
                  </div>

                  {/* Botón de pago */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-red-600 hover:bg-red-700 transition-colors text-lg flex items-center justify-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Confirmar pago • $350.00 MXN</span>
                  </button>
                </form>
              </div>

              <p className="text-xs text-gray-500 text-center mt-4">
                Al confirmar el pago, aceptas nuestros términos y condiciones
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}