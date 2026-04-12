import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowLeft, Upload, FileText } from 'lucide-react';

export default function TicketmasterValidation() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    orderNumber: '',
    email: '',
    receipt: null as File | null,
  });

  useEffect(() => {
    const data = localStorage.getItem('registrationData');
    if (!data) {
      navigate('/registro');
    }
  }, [navigate]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, receipt: file });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.orderNumber || !formData.email) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    // Limpiar cualquier dato de pago directo previo
    localStorage.removeItem('paymentData');
    
    // Guardar info de validación y navegar a confirmación
    localStorage.setItem('validationData', JSON.stringify({
      orderNumber: formData.orderNumber,
      email: formData.email,
      pending: true,
    }));
    
    navigate('/confirmacion');
  };

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
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-5xl mb-4">Validar compra</h2>
            <p className="text-gray-400">Ingresa los datos de tu compra en Ticketmaster</p>
          </div>

          <div className="bg-[#111111] border border-white/10 rounded-lg p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Número de orden */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Número de orden <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.orderNumber}
                  onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-600/50 transition-colors"
                  placeholder="Ej: TM123456789"
                  required
                />
              </div>

              {/* Email de compra */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Email de compra <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-600/50 transition-colors"
                  placeholder="email@ejemplo.com"
                  required
                />
              </div>

              {/* Subir comprobante */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Comprobante de pago (opcional)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*,.pdf"
                    className="hidden"
                    id="receipt-upload"
                  />
                  <label
                    htmlFor="receipt-upload"
                    className="flex items-center justify-center gap-3 w-full bg-black/50 border border-white/10 rounded px-4 py-6 cursor-pointer hover:border-white/30 transition-colors"
                  >
                    {formData.receipt ? (
                      <>
                        <FileText className="w-5 h-5 text-green-500" />
                        <span className="text-sm text-green-500">{formData.receipt.name}</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-400">Haz clic para subir archivo</span>
                      </>
                    )}
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Formatos permitidos: JPG, PNG, PDF • Máximo 5MB
                </p>
              </div>

              {/* Mensaje informativo */}
              <div className="bg-yellow-600/10 border border-yellow-600/30 rounded p-4">
                <p className="text-sm text-yellow-200/80 leading-relaxed">
                  <strong>Nota:</strong> Tu acceso será activado una vez validado por el equipo organizador. 
                  Recibirás un correo de confirmación en las próximas 24-48 horas.
                </p>
              </div>

              {/* Botón de envío */}
              <button
                type="submit"
                className="w-full py-4 bg-red-600 hover:bg-red-700 transition-colors text-lg"
              >
                Enviar para validación
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}