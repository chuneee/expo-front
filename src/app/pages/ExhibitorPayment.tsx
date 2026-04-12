import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { ArrowLeft, Upload, FileText, CreditCard, Building2 } from 'lucide-react';

export default function ExhibitorPayment() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'external' | 'direct'>('direct');
  const [packageData, setPackageData] = useState<any>(null);
  const [externalFormData, setExternalFormData] = useState({
    receipt: null as File | null,
    referenceNumber: '',
  });
  const [cardFormData, setCardFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const exhibitorData = localStorage.getItem('exhibitorData');
    const packageInfo = localStorage.getItem('selectedPackage');
    
    if (!exhibitorData || !packageInfo) {
      navigate('/registro-expositor');
      return;
    }
    
    setPackageData(JSON.parse(packageInfo));
  }, [navigate]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setExternalFormData({ ...externalFormData, receipt: file });
  };

  const handleExternalPayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!externalFormData.referenceNumber || !externalFormData.receipt) {
      alert('Por favor completa todos los campos y adjunta el comprobante');
      return;
    }

    // Limpiar datos previos
    localStorage.removeItem('exhibitorDirectPayment');
    
    // Guardar info de pago externo
    localStorage.setItem('exhibitorExternalPayment', JSON.stringify({
      referenceNumber: externalFormData.referenceNumber,
      pending: true,
    }));
    
    navigate('/confirmacion-expositor');
  };

  const handleDirectPayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cardFormData.cardNumber || !cardFormData.cardName || !cardFormData.expiryDate || !cardFormData.cvv) {
      alert('Por favor completa todos los campos de la tarjeta');
      return;
    }

    setIsProcessing(true);
    
    // Simular procesamiento
    setTimeout(() => {
      // Limpiar datos previos
      localStorage.removeItem('exhibitorExternalPayment');
      
      // Guardar pago directo
      localStorage.setItem('exhibitorDirectPayment', JSON.stringify({
        paid: true,
        method: 'card',
        amount: packageData?.price || 0,
      }));
      
      navigate('/confirmacion-expositor');
    }, 1500);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardFormData({ ...cardFormData, cardNumber: formatted });
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setCardFormData({ ...cardFormData, expiryDate: formatted });
  };

  if (!packageData) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-white/5 py-4 md:py-6">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 md:gap-4 min-w-0">
              <Link to="/paquetes-expositor" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors flex-shrink-0">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm hidden sm:inline">Volver</span>
              </Link>
              <div className="h-6 w-px bg-white/10 hidden sm:block"></div>
              <h1 className="text-sm sm:text-base md:text-xl truncate">EXPO CAR SHOW 2026</h1>
            </div>
            <div className="text-xs sm:text-sm text-gray-400 flex-shrink-0">
              <span className="hidden sm:inline">Paso </span><span className="text-white">3</span> de 4
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-600/30 rounded-full px-4 py-2 mb-6">
              <Building2 className="w-4 h-4 text-red-500" />
              <span className="text-sm text-red-400">Expositor</span>
            </div>
            <h2 className="text-3xl md:text-5xl mb-4">Método de pago</h2>
            <p className="text-gray-400">Selecciona cómo deseas realizar el pago</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Panel izquierdo - Resumen */}
            <div className="lg:col-span-1">
              <div className="bg-[#111111] border border-white/10 rounded-lg p-6 sticky top-6">
                <h3 className="text-lg mb-4">Resumen de compra</h3>
                <div className="space-y-4 pb-4 border-b border-white/10">
                  <div>
                    <div className="text-sm text-gray-400">Paquete seleccionado</div>
                    <div className="font-medium">{packageData.name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Total a pagar</div>
                    <div className="text-2xl text-red-500">
                      ${packageData.price.toLocaleString('es-MX')} <span className="text-sm text-gray-400">MXN</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-xs text-gray-500">
                  * La activación del stand y generación de gafetes se realizará una vez confirmado el pago.
                </div>
              </div>
            </div>

            {/* Panel derecho - Métodos de pago */}
            <div className="lg:col-span-2">
              <div className="bg-[#111111] border border-white/10 rounded-lg overflow-hidden">
                {/* Tabs */}
                <div className="grid grid-cols-2 border-b border-white/10">
                  <button
                    onClick={() => setPaymentMethod('direct')}
                    className={`py-4 px-6 text-sm transition-colors ${
                      paymentMethod === 'direct'
                        ? 'bg-red-600/10 border-b-2 border-red-600 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mx-auto mb-2" />
                    Pago directo
                  </button>
                  <button
                    onClick={() => setPaymentMethod('external')}
                    className={`py-4 px-6 text-sm transition-colors ${
                      paymentMethod === 'external'
                        ? 'bg-red-600/10 border-b-2 border-red-600 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Upload className="w-5 h-5 mx-auto mb-2" />
                    Pago externo
                  </button>
                </div>

                {/* Contenido */}
                <div className="p-8">
                  {paymentMethod === 'external' ? (
                    <form onSubmit={handleExternalPayment} className="space-y-6">
                      <div className="bg-blue-600/10 border border-blue-600/30 rounded p-4 mb-6">
                        <p className="text-sm text-blue-200/80 leading-relaxed">
                          Si realizas el pago por transferencia o plataforma externa, deberás subir el comprobante para validación.
                        </p>
                      </div>

                      {/* Datos bancarios */}
                      <div className="bg-black/50 border border-white/10 rounded p-4">
                        <h4 className="text-sm font-medium mb-3">Datos para transferencia:</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Banco:</span>
                            <span>BBVA México</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Cuenta:</span>
                            <span>0123456789</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">CLABE:</span>
                            <span>012345678901234567</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Titular:</span>
                            <span>Expo Car Show S.A. de C.V.</span>
                          </div>
                        </div>
                      </div>

                      {/* Número de referencia */}
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">
                          Número de referencia <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={externalFormData.referenceNumber}
                          onChange={(e) => setExternalFormData({ ...externalFormData, referenceNumber: e.target.value })}
                          className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-600/50 transition-colors"
                          placeholder="Ingresa el número de operación"
                          required
                        />
                      </div>

                      {/* Subir comprobante */}
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">
                          Comprobante de pago <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*,.pdf"
                            className="hidden"
                            id="receipt-upload"
                            required
                          />
                          <label
                            htmlFor="receipt-upload"
                            className="flex items-center justify-center gap-3 w-full bg-black/50 border border-white/10 rounded px-4 py-6 cursor-pointer hover:border-white/30 transition-colors"
                          >
                            {externalFormData.receipt ? (
                              <>
                                <FileText className="w-5 h-5 text-green-500" />
                                <span className="text-sm text-green-500">{externalFormData.receipt.name}</span>
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
                          Formatos permitidos: JPG, PNG, PDF • Máximo 10MB
                        </p>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 bg-red-600 hover:bg-red-700 transition-colors text-lg"
                      >
                        Enviar para validación
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleDirectPayment} className="space-y-6">
                      {/* Número de tarjeta */}
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">
                          Número de tarjeta <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={cardFormData.cardNumber}
                          onChange={handleCardNumberChange}
                          className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-600/50 transition-colors"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          required
                        />
                      </div>

                      {/* Nombre en tarjeta */}
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">
                          Nombre del titular <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={cardFormData.cardName}
                          onChange={(e) => setCardFormData({ ...cardFormData, cardName: e.target.value })}
                          className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-600/50 transition-colors"
                          placeholder="Como aparece en la tarjeta"
                          required
                        />
                      </div>

                      {/* Fecha y CVV */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">
                            Fecha de expiración <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={cardFormData.expiryDate}
                            onChange={handleExpiryDateChange}
                            className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-600/50 transition-colors"
                            placeholder="MM/AA"
                            maxLength={5}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">
                            CVV <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={cardFormData.cvv}
                            onChange={(e) => setCardFormData({ ...cardFormData, cvv: e.target.value })}
                            className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-600/50 transition-colors"
                            placeholder="123"
                            maxLength={4}
                            required
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="w-full py-4 bg-red-600 hover:bg-red-700 transition-colors text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isProcessing ? 'Procesando...' : `Confirmar pago de $${packageData.price.toLocaleString('es-MX')}`}
                      </button>

                      <div className="flex items-center justify-center gap-4 pt-4">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6 opacity-50" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 opacity-50" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="Amex" className="h-6 opacity-50" />
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}