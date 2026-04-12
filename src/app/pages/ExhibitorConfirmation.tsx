import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Download, Share2, MapPin, Check, Clock, Building2, MessageCircle, Facebook as FacebookIcon, Link2 } from 'lucide-react';

interface ExhibitorData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
}

interface PackageData {
  id: string;
  name: string;
  price: number;
}

export default function ExhibitorConfirmation() {
  const navigate = useNavigate();
  const [exhibitorData, setExhibitorData] = useState<ExhibitorData | null>(null);
  const [packageData, setPackageData] = useState<PackageData | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [badges, setBadges] = useState<Array<{ name: string; email: string }>>([]);
  const [newBadgeName, setNewBadgeName] = useState('');
  const [newBadgeEmail, setNewBadgeEmail] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const exhibitor = localStorage.getItem('exhibitorData');
    const pkg = localStorage.getItem('selectedPackage');
    const directPayment = localStorage.getItem('exhibitorDirectPayment');
    const externalPayment = localStorage.getItem('exhibitorExternalPayment');

    if (!exhibitor || !pkg) {
      navigate('/registro-expositor');
      return;
    }

    const exhibitorInfo = JSON.parse(exhibitor);
    const packageInfo = JSON.parse(pkg);

    setExhibitorData(exhibitorInfo);
    setPackageData(packageInfo);

    // Inicializar primer gafete con contacto principal
    setBadges([{ name: exhibitorInfo.contactName, email: exhibitorInfo.email }]);

    // Determinar estado según método de pago
    if (directPayment) {
      setIsPending(false);
    } else if (externalPayment) {
      setIsPending(true);
    }
  }, [navigate]);

  const handleAddBadge = () => {
    if (!newBadgeName.trim() || !newBadgeEmail.trim()) {
      alert('Por favor completa el nombre y email');
      return;
    }

    const maxBadges = packageData?.id === 'basic' ? 1 : packageData?.id === 'premium' ? 3 : 5;
    
    if (badges.length >= maxBadges) {
      alert(`Tu paquete permite un máximo de ${maxBadges} gafete(s)`);
      return;
    }

    setBadges([...badges, { name: newBadgeName, email: newBadgeEmail }]);
    setNewBadgeName('');
    setNewBadgeEmail('');
  };

  const handleShare = (platform: string) => {
    const shareUrl = 'https://expocarshow2026.com';
    const shareText = `¡${exhibitorData?.companyName} participará en Expo Car Show 2026! 🏎️ No te lo pierdas.`;

    if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadBadges = () => {
    alert('La descarga de gafetes se habilitará próximamente');
  };

  if (!exhibitorData || !packageData) return null;

  const standNumber = Math.floor(Math.random() * 200) + 1;

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
              <span className="hidden sm:inline">Paso </span><span className="text-white">4</span> de 4
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          {/* Título según estado */}
          <div className="text-center mb-12">
            {isPending ? (
              <>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-600/10 border border-yellow-600/40 rounded-full mb-6">
                  <Clock className="w-8 h-8 text-yellow-500" />
                </div>
                <h2 className="text-3xl md:text-5xl mb-4">¡Solicitud recibida!</h2>
                <p className="text-gray-400">Tu participación será activada pronto</p>
                <div className="inline-block bg-yellow-600/10 border border-yellow-600/30 rounded-lg px-6 py-3 mt-6">
                  <p className="text-sm text-yellow-200/80">
                    Recibirás un correo cuando tu pago sea validado
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600/10 border border-green-600/40 rounded-full mb-6">
                  <Check className="w-8 h-8 text-green-500" />
                </div>
                <h2 className="text-3xl md:text-5xl mb-4">¡Participación confirmada!</h2>
                <p className="text-gray-400">Tu stand está reservado</p>
              </>
            )}
          </div>

          {/* Información de la empresa */}
          <div className="bg-[#111111] border border-white/10 rounded-lg p-6 md:p-8 mb-6">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
              <Building2 className="w-6 h-6 text-red-500" />
              <h3 className="text-xl">Detalles de participación</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-gray-400 mb-1">Empresa</div>
                <div className="font-medium">{exhibitorData.companyName}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Contacto principal</div>
                <div className="font-medium">{exhibitorData.contactName}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Email</div>
                <div className="font-medium">{exhibitorData.email}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Teléfono</div>
                <div className="font-medium">{exhibitorData.phone}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Tipo de stand</div>
                <div className="font-medium text-red-500">{packageData.name}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Número de stand</div>
                <div className="font-medium">#{standNumber.toString().padStart(3, '0')}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Estado</div>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                  isPending 
                    ? 'bg-yellow-600/10 border border-yellow-600/30 text-yellow-400'
                    : 'bg-green-600/10 border border-green-600/30 text-green-400'
                }`}>
                  {isPending ? (
                    <>
                      <Clock className="w-3 h-3" />
                      Pendiente de validación
                    </>
                  ) : (
                    <>
                      <Check className="w-3 h-3" />
                      Confirmado
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Gafetes digitales - solo si está confirmado */}
          {!isPending && (
            <div className="bg-[#111111] border border-white/10 rounded-lg p-6 md:p-8 mb-6">
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/10">
                <h3 className="text-xl">Gafetes de expositor</h3>
                <span className="text-sm text-gray-400">
                  {badges.length} / {packageData.id === 'basic' ? '1' : packageData.id === 'premium' ? '3' : '5'}
                </span>
              </div>

              {/* Lista de gafetes */}
              <div className="space-y-4 mb-6">
                {badges.map((badge, index) => (
                  <div key={index} className="bg-gradient-to-r from-red-600/10 to-transparent border border-red-600/30 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="text-xs text-gray-400 bg-black/50 px-2 py-1 rounded">
                            Gafete #{index + 1}
                          </div>
                          {index === 0 && (
                            <div className="text-xs text-red-400 bg-red-600/10 px-2 py-1 rounded">
                              Contacto principal
                            </div>
                          )}
                        </div>
                        <div className="font-medium mb-1">{badge.name}</div>
                        <div className="text-sm text-gray-400">{exhibitorData.companyName}</div>
                        <div className="text-xs text-gray-500 mt-1">{badge.email}</div>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        <div className="w-20 h-20 bg-white rounded flex items-center justify-center">
                          <div className="text-xs text-black text-center p-2">
                            <div className="font-mono text-[8px] leading-tight">QR CODE</div>
                            <div className="font-mono text-[6px] text-gray-500">{badge.email}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Agregar más gafetes */}
              {badges.length < (packageData.id === 'basic' ? 1 : packageData.id === 'premium' ? 3 : 5) && (
                <div className="bg-black/50 border border-white/10 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-4">
                    Agregar expositor adicional ({(packageData.id === 'basic' ? 1 : packageData.id === 'premium' ? 3 : 5) - badges.length} disponible(s))
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={newBadgeName}
                      onChange={(e) => setNewBadgeName(e.target.value)}
                      className="bg-black/50 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-red-600/50"
                      placeholder="Nombre completo"
                    />
                    <input
                      type="email"
                      value={newBadgeEmail}
                      onChange={(e) => setNewBadgeEmail(e.target.value)}
                      className="bg-black/50 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-red-600/50"
                      placeholder="Email"
                    />
                  </div>
                  <button
                    onClick={handleAddBadge}
                    className="mt-3 w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 transition-colors text-sm"
                  >
                    Agregar gafete
                  </button>
                </div>
              )}

              {/* Botones de acción */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
                <button
                  onClick={handleDownloadBadges}
                  className="flex items-center justify-center gap-2 py-3 bg-red-600 hover:bg-red-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar gafetes</span>
                </button>
                <button className="flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 transition-colors">
                  <MapPin className="w-4 h-4" />
                  <span>Ver ubicación del stand</span>
                </button>
              </div>
            </div>
          )}

          {/* Compartir participación */}
          <div className="bg-[#111111] border border-white/10 rounded-lg p-6 md:p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-red-600/10 border border-red-600/40 rounded-full mb-4">
                <Share2 className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-2xl mb-2">Comparte tu participación</h3>
              <p className="text-gray-400 text-sm">
                Anuncia que estarás presente en el evento más grande del año
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
                    <div className="text-xs text-gray-400">Compartir</div>
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

          {/* Volver al inicio */}
          <div className="mt-8 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
