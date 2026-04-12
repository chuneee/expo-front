import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { ArrowLeft, Building2, Users, Wrench, Cpu, DollarSign, Package } from 'lucide-react';

const categories = [
  { id: 'dealership', name: 'Agencia automotriz', icon: Building2 },
  { id: 'accessories', name: 'Accesorios', icon: Package },
  { id: 'tuning', name: 'Tuning & Performance', icon: Wrench },
  { id: 'tech', name: 'Tecnología automotriz', icon: Cpu },
  { id: 'finance', name: 'Financiera', icon: DollarSign },
  { id: 'other', name: 'Otro', icon: Users },
];

export default function ExhibitorRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    city: '',
    website: '',
    social: '',
    category: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.companyName || !formData.contactName || !formData.email || !formData.phone || !formData.category) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    // Guardar datos y continuar
    localStorage.setItem('exhibitorData', JSON.stringify(formData));
    navigate('/paquetes-expositor');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-white/5 py-4 md:py-6">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 md:gap-4 min-w-0">
              <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors flex-shrink-0">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm hidden sm:inline">Inicio</span>
              </Link>
              <div className="h-6 w-px bg-white/10 hidden sm:block"></div>
              <h1 className="text-sm sm:text-base md:text-xl truncate">EXPO CAR SHOW 2026</h1>
            </div>
            <div className="text-xs sm:text-sm text-gray-400 flex-shrink-0">
              <span className="hidden sm:inline">Paso </span><span className="text-white">1</span> de 4
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-600/30 rounded-full px-4 py-2 mb-6">
              <Building2 className="w-4 h-4 text-red-500" />
              <span className="text-sm text-red-400">Expositor</span>
            </div>
            <h2 className="text-3xl md:text-5xl mb-4">Registro de Expositor</h2>
            <p className="text-gray-400">Postula tu marca para participar en Expo Car Show 2026</p>
          </div>

          <div className="bg-[#111111] border border-white/10 rounded-lg p-6 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Información de la Empresa */}
              <div>
                <h3 className="text-xl mb-6 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-red-500" />
                  Información de la Empresa
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nombre de la empresa */}
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-400 mb-2">
                      Nombre de la empresa <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-600/50 transition-colors"
                      placeholder="Ej: AutoMax Performance"
                      required
                    />
                  </div>

                  {/* Nombre del contacto */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Nombre del contacto principal <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-600/50 transition-colors"
                      placeholder="Nombre completo"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-600/50 transition-colors"
                      placeholder="contacto@empresa.com"
                      required
                    />
                  </div>

                  {/* Teléfono */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Teléfono <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-600/50 transition-colors"
                      placeholder="+52 123 456 7890"
                      required
                    />
                  </div>

                  {/* Ciudad */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Ciudad
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-600/50 transition-colors"
                      placeholder="Ej: Ciudad de México"
                    />
                  </div>

                  {/* Página web */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Página web
                    </label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-600/50 transition-colors"
                      placeholder="https://tuempresa.com"
                    />
                  </div>

                  {/* Redes sociales */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Redes sociales
                    </label>
                    <input
                      type="text"
                      value={formData.social}
                      onChange={(e) => setFormData({ ...formData, social: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-600/50 transition-colors"
                      placeholder="@tuempresa"
                    />
                  </div>
                </div>
              </div>

              {/* Categoría */}
              <div>
                <label className="block text-sm text-gray-400 mb-4">
                  Categoría <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    const isSelected = formData.category === category.id;
                    
                    return (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, category: category.id })}
                        className={`group relative bg-black/50 border rounded-lg p-4 transition-all hover:scale-105 ${
                          isSelected
                            ? 'border-red-600 bg-red-600/10'
                            : 'border-white/10 hover:border-white/30'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2 text-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                            isSelected ? 'bg-red-600/20' : 'bg-white/5 group-hover:bg-white/10'
                          }`}>
                            <Icon className={`w-5 h-5 ${isSelected ? 'text-red-500' : 'text-gray-400'}`} />
                          </div>
                          <span className={`text-sm ${isSelected ? 'text-white' : 'text-gray-400'}`}>
                            {category.name}
                          </span>
                        </div>
                        {isSelected && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Información adicional */}
              <div className="bg-blue-600/10 border border-blue-600/30 rounded p-4">
                <p className="text-sm text-blue-200/80 leading-relaxed">
                  <strong>Nota importante:</strong> Una vez enviada tu solicitud, el equipo organizador 
                  revisará tu aplicación. Recibirás respuesta en un plazo máximo de 48 horas.
                </p>
              </div>

              {/* Botón continuar */}
              <button
                type="submit"
                className="w-full py-4 bg-red-600 hover:bg-red-700 transition-colors text-lg"
              >
                Continuar a selección de paquete
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
