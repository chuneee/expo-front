import { useState } from 'react';
import { 
  Settings,
  Building2,
  Palette,
  CreditCard,
  Mail,
  Plug,
  Users,
  Shield,
  Save,
  Plus,
  Upload,
  Eye,
  Check,
  X,
  MoreVertical,
  Trash2,
  Edit
} from 'lucide-react';
import AdminLayout from '../components/AdminLayout';

type TabType = 'general' | 'correos' | 'usuarios' | 'seguridad';

export default function SettingsManagement() {
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [showUserModal, setShowUserModal] = useState(false);

  // Estados de métodos de pago
  const [stripeEnabled, setStripeEnabled] = useState(true);
  const [ticketmasterEnabled, setTicketmasterEnabled] = useState(true);
  const [transferenciaEnabled, setTransferenciaEnabled] = useState(true);

  // Estados de notificaciones
  const [autoQR, setAutoQR] = useState(true);
  const [confirmacionPago, setConfirmacionPago] = useState(true);
  const [recordatorioEvento, setRecordatorioEvento] = useState(true);

  // Estados de seguridad
  const [dobleAuth, setDobleAuth] = useState(false);
  const [autoLogout, setAutoLogout] = useState(true);

  const usuarios = [
    { id: 1, nombre: 'Carlos Mendoza', email: 'carlos@expoevents.mx', rol: 'Super Admin', estado: 'Activo' },
    { id: 2, nombre: 'Ana García', email: 'ana@expoevents.mx', rol: 'Administrador', estado: 'Activo' },
    { id: 3, nombre: 'Luis Torres', email: 'luis@expoevents.mx', rol: 'Operador', estado: 'Activo' },
    { id: 4, nombre: 'María López', email: 'maria@expoevents.mx', rol: 'Administrador', estado: 'Inactivo' },
  ];

  const tabs = [
    { id: 'general', label: 'General', icon: Building2 },
    { id: 'correos', label: 'Correos y Notificaciones', icon: Mail },
    { id: 'usuarios', label: 'Usuarios y Roles', icon: Users },
    { id: 'seguridad', label: 'Seguridad', icon: Shield },
  ];

  return (
    <AdminLayout>
      <div className="p-4 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Configuración del Sistema</h1>
              <p className="text-gray-500">Personaliza y configura tu plataforma</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar con Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-2 sticky top-4">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as TabType)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Contenido Principal */}
          <div className="lg:col-span-3">
            {/* Sección General */}
            {activeTab === 'general' && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Configuración General</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nombre de la empresa organizadora
                    </label>
                    <input
                      type="text"
                      defaultValue="Expo Events México"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Logo de la empresa
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                        <Upload className="w-6 h-6 text-gray-400" />
                      </div>
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-medium">
                        Subir logo
                      </button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email de contacto
                      </label>
                      <input
                        type="email"
                        defaultValue="contacto@expoevents.mx"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        defaultValue="+52 55 1234 5678"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Dirección
                    </label>
                    <input
                      type="text"
                      defaultValue="Av. Reforma 123, Ciudad de México"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Zona horaria
                      </label>
                      <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                        <option>América/México (GMT-6)</option>
                        <option>América/Tijuana (GMT-8)</option>
                        <option>América/Cancún (GMT-5)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Moneda
                      </label>
                      <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                        <option>MXN - Peso Mexicano</option>
                        <option>USD - Dólar Americano</option>
                        <option>EUR - Euro</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all font-bold">
                      <Save className="w-5 h-5" />
                      <span>Guardar cambios</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Sección Correos y Notificaciones */}
            {activeTab === 'correos' && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Correos y Notificaciones</h2>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-bold text-gray-900">Configuraciones Automáticas</h3>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-semibold text-gray-900">Envío automático de QR</p>
                          <p className="text-sm text-gray-500">Enviar gafete digital al confirmar pago</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={autoQR}
                          onChange={() => setAutoQR(!autoQR)}
                          className="sr-only peer"
                        />
                        <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-semibold text-gray-900">Confirmación de pago</p>
                          <p className="text-sm text-gray-500">Notificar al usuario sobre pago exitoso</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={confirmacionPago}
                          onChange={() => setConfirmacionPago(!confirmacionPago)}
                          className="sr-only peer"
                        />
                        <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-purple-600" />
                        <div>
                          <p className="font-semibold text-gray-900">Recordatorio previo al evento</p>
                          <p className="text-sm text-gray-500">Enviar recordatorio 1 día antes</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={recordatorioEvento}
                          onChange={() => setRecordatorioEvento(!recordatorioEvento)}
                          className="sr-only peer"
                        />
                        <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="font-bold text-gray-900 mb-4">Plantillas de Correo</h3>
                    
                    <div className="space-y-3">
                      <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-all cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-900">Confirmación Asistente</p>
                            <p className="text-sm text-gray-500">Correo de bienvenida para asistentes</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <Eye className="w-4 h-4 text-gray-600" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <Edit className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-all cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-900">Confirmación Proveedor</p>
                            <p className="text-sm text-gray-500">Correo de aprobación para expositores</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <Eye className="w-4 h-4 text-gray-600" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <Edit className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-all cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-900">Pago Confirmado</p>
                            <p className="text-sm text-gray-500">Notificación de pago exitoso</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <Eye className="w-4 h-4 text-gray-600" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <Edit className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all font-bold">
                      <Save className="w-5 h-5" />
                      <span>Guardar cambios</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Sección Usuarios y Roles */}
            {activeTab === 'usuarios' && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Usuarios y Roles</h2>
                  <button
                    onClick={() => setShowUserModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all font-medium"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Agregar usuario</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Nombre</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Rol</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Estado</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {usuarios.map((usuario) => (
                        <tr key={usuario.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-semibold text-gray-900">{usuario.nombre}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{usuario.email}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-medium ${
                              usuario.rol === 'Super Admin' ? 'bg-purple-100 text-purple-700' :
                              usuario.rol === 'Administrador' ? 'bg-blue-100 text-blue-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {usuario.rol}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${
                              usuario.estado === 'Activo' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                            }`}>
                              {usuario.estado === 'Activo' ? (
                                <Check className="w-3 h-3" />
                              ) : (
                                <X className="w-3 h-3" />
                              )}
                              {usuario.estado}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <Edit className="w-4 h-4 text-gray-600" />
                              </button>
                              <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                                <Trash2 className="w-4 h-4 text-red-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800 mb-2">
                    <strong>Roles disponibles:</strong>
                  </p>
                  <ul className="text-sm text-blue-800 space-y-1 ml-4">
                    <li>• <strong>Super Admin:</strong> Acceso total a la plataforma</li>
                    <li>• <strong>Administrador:</strong> Gestión de eventos, usuarios y reportes</li>
                    <li>• <strong>Operador:</strong> Solo validaciones de acceso</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Sección Seguridad */}
            {activeTab === 'seguridad' && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Seguridad</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-semibold text-gray-900">Doble autenticación (2FA)</p>
                        <p className="text-sm text-gray-500">Requerir código adicional al iniciar sesión</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={dobleAuth}
                        onChange={() => setDobleAuth(!dobleAuth)}
                        className="sr-only peer"
                      />
                      <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-orange-600" />
                      <div>
                        <p className="font-semibold text-gray-900">Cierre automático de sesión</p>
                        <p className="text-sm text-gray-500">Cerrar sesión después de 30 minutos de inactividad</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={autoLogout}
                        onChange={() => setAutoLogout(!autoLogout)}
                        className="sr-only peer"
                      />
                      <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="font-bold text-gray-900 mb-4">Registro de Actividad</h3>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <div>
                            <p className="font-semibold text-gray-900">Carlos Mendoza</p>
                            <p className="text-gray-500">Inicio de sesión exitoso</p>
                          </div>
                          <p className="text-gray-500">Hace 5 min</p>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div>
                            <p className="font-semibold text-gray-900">Ana García</p>
                            <p className="text-gray-500">Modificó configuración de pagos</p>
                          </div>
                          <p className="text-gray-500">Hace 1 hora</p>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div>
                            <p className="font-semibold text-gray-900">Luis Torres</p>
                            <p className="text-gray-500">Validó 15 accesos</p>
                          </div>
                          <p className="text-gray-500">Hace 2 horas</p>
                        </div>
                      </div>
                      <button className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
                        Ver registro completo →
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all font-bold">
                      <Save className="w-5 h-5" />
                      <span>Guardar cambios</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Agregar Usuario */}
      {showUserModal && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Agregar Usuario</h2>
              <button
                onClick={() => setShowUserModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre completo</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Rol</label>
                <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                  <option>Super Admin</option>
                  <option>Administrador</option>
                  <option>Operador</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Contraseña temporal</label>
                <input
                  type="password"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  onClick={() => setShowUserModal(false)}
                  className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => setShowUserModal(false)}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all font-bold"
                >
                  Crear usuario
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}