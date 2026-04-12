import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { ArrowLeft, Check, Building2 } from 'lucide-react';

const packages = [
  {
    id: 'basic',
    name: 'Stand Básico',
    price: 15000,
    features: [
      'Espacio estándar',
      '1 gafete expositor',
      'Logo en directorio digital',
      'Acceso a zona expositores',
    ],
  },
  {
    id: 'premium',
    name: 'Stand Premium',
    price: 35000,
    popular: true,
    features: [
      'Espacio preferencial',
      '3 gafetes expositores',
      'Publicación en redes sociales',
      'Logo destacado',
      'Mobiliario básico incluido',
    ],
  },
  {
    id: 'sponsor',
    name: 'Patrocinador',
    price: 75000,
    features: [
      'Espacio VIP premium',
      '5 gafetes expositores',
      'Presencia en publicidad',
      'Logo en escenario principal',
      'Mención en inauguración',
      'Mobiliario premium incluido',
    ],
  },
];

export default function ExhibitorPackages() {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState('');

  useEffect(() => {
    const data = localStorage.getItem('exhibitorData');
    if (!data) {
      navigate('/registro-expositor');
    }
  }, [navigate]);

  const handleSelectPackage = (packageId: string) => {
    setSelectedPackage(packageId);
    const packageData = packages.find(p => p.id === packageId);
    localStorage.setItem('selectedPackage', JSON.stringify(packageData));
    navigate('/pago-expositor');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-white/5 py-4 md:py-6">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 md:gap-4 min-w-0">
              <Link to="/registro-expositor" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors flex-shrink-0">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm hidden sm:inline">Volver</span>
              </Link>
              <div className="h-6 w-px bg-white/10 hidden sm:block"></div>
              <h1 className="text-sm sm:text-base md:text-xl truncate">EXPO CAR SHOW 2026</h1>
            </div>
            <div className="text-xs sm:text-sm text-gray-400 flex-shrink-0">
              <span className="hidden sm:inline">Paso </span><span className="text-white">2</span> de 4
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-600/30 rounded-full px-4 py-2 mb-6">
              <Building2 className="w-4 h-4 text-red-500" />
              <span className="text-sm text-red-400">Expositor</span>
            </div>
            <h2 className="text-3xl md:text-5xl mb-4">Selecciona tu tipo de participación</h2>
            <p className="text-gray-400">Elige el paquete que mejor se adapte a tus necesidades</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative bg-[#111111] border rounded-lg overflow-hidden transition-all hover:scale-105 ${
                  pkg.popular
                    ? 'border-red-600 shadow-lg shadow-red-600/20'
                    : 'border-white/10'
                }`}
              >
                {pkg.popular && (
                  <div className="bg-red-600 text-white text-xs font-medium text-center py-2">
                    MÁS POPULAR
                  </div>
                )}
                
                <div className="p-8">
                  {/* Nombre y precio */}
                  <div className="mb-6 pb-6 border-b border-white/10">
                    <h3 className="text-2xl mb-2">{pkg.name}</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl">
                        ${pkg.price.toLocaleString('es-MX')}
                      </span>
                      <span className="text-gray-400 text-sm">MXN</span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 bg-red-600/20 rounded-full flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-red-500" />
                        </div>
                        <span className="text-sm text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Botón */}
                  <button
                    onClick={() => handleSelectPackage(pkg.id)}
                    className={`w-full py-3 transition-colors ${
                      pkg.popular
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-white/5 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    Seleccionar
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Información adicional */}
          <div className="mt-12 max-w-3xl mx-auto">
            <div className="bg-[#111111] border border-white/10 rounded-lg p-6">
              <h4 className="text-lg mb-4">Beneficios incluidos en todos los paquetes:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Acceso 2 días de montaje</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Energía eléctrica básica</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>WiFi en zona expositores</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Estacionamiento expositores</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
