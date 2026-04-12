import { useState } from 'react';
import { useNavigate } from 'react-router';
import { LogIn, Mail, Lock, Eye, EyeOff, Calendar } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Navegar directamente al dashboard sin validación por ahora
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-300 via-blue-200 to-cyan-200 relative overflow-hidden">
      {/* Efecto de nubes suaves */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-sky-300 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-200 rounded-full blur-3xl"></div>
      </div>

      {/* Logo - arriba izquierda */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10">
        <div className="flex items-center gap-2.5 text-gray-800">
          <div className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold">EventPro</span>
        </div>
      </div>

      {/* Card centrada */}
      <div className="min-h-screen flex items-center justify-center px-6 py-12 relative z-10">
        <div className="w-full max-w-md">
          {/* Card principal con glassmorphism */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-indigo-200/50 p-10 border border-white/20">
            {/* Icono superior */}
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl flex items-center justify-center shadow-sm">
                <LogIn className="w-7 h-7 text-gray-700" />
              </div>
            </div>

            {/* Encabezado */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Panel Administrativo
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                Accede al sistema de gestión de eventos<br />
                y controla tus expos en tiempo real.
              </p>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all text-gray-900 placeholder-gray-400 text-sm"
                  placeholder="Correo electrónico"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-11 pr-11 py-3 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all text-gray-900 placeholder-gray-400 text-sm"
                  placeholder="Contraseña"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Forgot password */}
              <div className="text-right">
                <button type="button" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              {/* Botón Get Started */}
              <button
                type="submit"
                className="w-full py-3.5 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-xl transition-all shadow-lg shadow-gray-900/20 hover:shadow-xl hover:shadow-gray-900/30 text-sm mt-2"
              >
                Iniciar Sesión
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}