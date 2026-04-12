import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowLeft, User, Users, Camera, ShoppingBag } from 'lucide-react';

type AttendeeType = 'general' | 'press' | 'influencer' | 'buyer';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  attendeeType: AttendeeType | '';
  howDidYouHear: string;
  acceptedTerms: boolean;
}

export default function Registration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    attendeeType: '',
    howDidYouHear: '',
    acceptedTerms: false,
  });

  const attendeeTypes = [
    { id: 'general', label: 'Público General', icon: Users },
    { id: 'press', label: 'Prensa', icon: Camera },
    { id: 'influencer', label: 'Influencer', icon: User },
    { id: 'buyer', label: 'Comprador Potencial', icon: ShoppingBag },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.attendeeType || !formData.acceptedTerms) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    // Guardar en localStorage y navegar a confirmación
    localStorage.setItem('registrationData', JSON.stringify(formData));
    navigate('/pago');
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
                <span className="text-sm hidden sm:inline">Volver</span>
              </Link>
              <div className="h-6 w-px bg-white/10 hidden sm:block"></div>
              <h1 className="text-sm sm:text-base md:text-xl truncate">EXPO CAR SHOW 2026</h1>
            </div>
            <div className="text-xs sm:text-sm text-gray-400 flex-shrink-0">
              <span className="hidden sm:inline">Paso </span><span className="text-white">1</span> de 3
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12 md:py-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="bg-[#111111] border border-white/10 rounded-lg p-8 md:p-12">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl mb-3">Registro de Asistente</h2>
              <p className="text-gray-400">Completa tus datos para generar tu acceso digital</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Datos Personales */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Nombre <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-600/50 transition-colors"
                    placeholder="Tu nombre"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Apellido <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-600/50 transition-colors"
                    placeholder="Tu apellido"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-600/50 transition-colors"
                    placeholder="tu@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-600/50 transition-colors"
                    placeholder="+52 123 456 7890"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-400 mb-2">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-600/50 transition-colors"
                    placeholder="Tu ciudad"
                  />
                </div>
              </div>

              {/* Tipo de Asistente */}
              <div>
                <label className="block text-sm text-gray-400 mb-4">
                  Tipo de asistente <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {attendeeTypes.map((type) => {
                    const Icon = type.icon;
                    const isSelected = formData.attendeeType === type.id;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, attendeeType: type.id as AttendeeType })}
                        className={`flex flex-col items-center gap-3 p-4 border rounded transition-colors ${
                          isSelected
                            ? 'bg-red-600/10 border-red-600 text-white'
                            : 'bg-black/30 border-white/10 text-gray-400 hover:border-white/30'
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                        <span className="text-sm text-center">{type.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ¿Cómo te enteraste? */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  ¿Cómo te enteraste del evento?
                </label>
                <select
                  value={formData.howDidYouHear}
                  onChange={(e) => setFormData({ ...formData, howDidYouHear: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-red-600/50 transition-colors"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="social">Redes sociales</option>
                  <option value="friend">Recomendación de un amigo</option>
                  <option value="web">Búsqueda en internet</option>
                  <option value="email">Correo electrónico</option>
                  <option value="other">Otro</option>
                </select>
              </div>

              {/* Términos y condiciones */}
              <div className="pt-4 border-t border-white/5">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.acceptedTerms}
                    onChange={(e) => setFormData({ ...formData, acceptedTerms: e.target.checked })}
                    className="mt-1 w-4 h-4 bg-black/50 border border-white/10 rounded accent-red-600"
                    required
                  />
                  <span className="text-sm text-gray-400">
                    Acepto los{' '}
                    <a href="#" className="text-red-500 hover:text-red-400">
                      términos y condiciones
                    </a>{' '}
                    y el{' '}
                    <a href="#" className="text-red-500 hover:text-red-400">
                      aviso de privacidad
                    </a>
                  </span>
                </label>
              </div>

              {/* Botón de envío */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 bg-red-600 hover:bg-red-700 transition-colors text-lg"
                >
                  Continuar al pago
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}