import { useState, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Building2, 
  CreditCard, 
  CheckSquare, 
  BarChart3, 
  Settings, 
  Search, 
  Bell, 
  ChevronDown,
  Menu,
  X,
  LogOut,
  User
} from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    navigate('/admin/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Calendar, label: 'Eventos', path: '/admin/eventos' },
    { icon: Users, label: 'Asistentes', path: '/admin/asistentes' },
    { icon: Building2, label: 'Proveedores', path: '/admin/proveedores' },
    { icon: CreditCard, label: 'Pagos', path: '/admin/pagos' },
    { icon: CheckSquare, label: 'Validaciones', path: '/admin/validaciones' },
    { icon: BarChart3, label: 'Reportes', path: '/admin/reportes' },
    { icon: Settings, label: 'Configuración', path: '/admin/configuracion' },
  ];

  return (
    <div className="min-h-screen bg-[#F5F6F8]">
      {/* Sidebar Desktop */}
      <aside className={`fixed left-0 top-0 h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 transition-all duration-300 z-30 shadow-2xl ${sidebarOpen ? 'w-64' : 'w-20'} hidden lg:flex flex-col`}>
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-white/10 flex-shrink-0">
          {sidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-white text-lg tracking-tight">Event Manager</span>
            </div>
          ) : (
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto shadow-lg shadow-blue-500/30">
              <Calendar className="w-5 h-5 text-white" />
            </div>
          )}
        </div>

        {/* Menu Items */}
        <nav className="py-6 px-3 flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={index}>
                  <button
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    )}
                    <item.icon className={`w-5 h-5 flex-shrink-0 relative z-10 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                    {sidebarOpen && <span className="text-sm font-medium relative z-10">{item.label}</span>}
                    {isActive && sidebarOpen && (
                      <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full relative z-10" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Section - Bottom */}
        <div className="border-t border-white/10 p-4 bg-white/5 backdrop-blur-sm flex-shrink-0 mt-auto">
          {sidebarOpen ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/10">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">Admin Usuario</p>
                  <p className="text-xs text-slate-400">Administrador</p>
                </div>
              </div>
              <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 group">
                <LogOut className="w-4 h-4 group-hover:text-red-400 transition-colors" />
                <span>Cerrar sesión</span>
              </button>
            </div>
          ) : (
            <button onClick={handleLogout} className="w-full flex items-center justify-center p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 group">
              <LogOut className="w-5 h-5 group-hover:text-red-400 transition-colors" />
            </button>
          )}
        </div>

        {/* Toggle Sidebar Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-8 w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 border-2 border-slate-700 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-200"
        >
          <ChevronDown className={`w-3 h-3 text-white transition-transform ${sidebarOpen ? 'rotate-90' : '-rotate-90'}`} />
        </button>
      </aside>

      {/* Sidebar Mobile */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <aside className="fixed left-0 top-0 bottom-0 w-72 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl flex flex-col">
            {/* Logo */}
            <div className="h-16 flex items-center justify-between px-6 border-b border-white/10 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-white text-lg tracking-tight">Event Manager</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Menu Items */}
            <nav className="py-6 px-3 flex-1 overflow-y-auto">
              <ul className="space-y-2">
                {menuItems.map((item, index) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <li key={index}>
                      <button
                        onClick={() => {
                          navigate(item.path);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                          isActive
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                            : 'text-slate-300 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {isActive && (
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        )}
                        <item.icon className={`w-5 h-5 relative z-10 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                        <span className="text-sm font-medium relative z-10">{item.label}</span>
                        {isActive && (
                          <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full relative z-10" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* User Section */}
            <div className="border-t border-white/10 p-4 bg-white/5 backdrop-blur-sm flex-shrink-0 mt-auto">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Admin Usuario</p>
                    <p className="text-xs text-slate-400">Administrador</p>
                  </div>
                </div>
                <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 group">
                  <LogOut className="w-4 h-4 group-hover:text-red-400 transition-colors" />
                  <span>Cerrar sesión</span>
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-20">
          <div className="h-full px-4 lg:px-6 flex items-center justify-between gap-4">
            {/* Left Side */}
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3 ml-auto">
              {/* Search */}
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg flex-1 max-w-md">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="bg-transparent border-none outline-none text-sm text-gray-900 placeholder-gray-400 w-full"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Avatar */}
              <button className="flex items-center gap-2 p-1 pr-3 hover:bg-gray-100 rounded-lg transition-colors">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        {children}
      </div>
    </div>
  );
}
