import { useState } from 'react';
import { 
  Download, 
  Filter,
  Search,
  Users,
  CheckCircle,
  Clock,
  XCircle,
  CreditCard,
  MoreVertical,
  Eye,
  Send,
  Edit,
  Ban,
  CheckSquare,
  FileDown,
  Calendar,
  Mail,
  Phone,
  MapPin,
  QrCode,
  X,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import AdminLayout from '../components/AdminLayout';

type AttendeeStatus = 'Pagado' | 'Pendiente' | 'Validado' | 'Cancelado';

interface Attendee {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  tipo: string;
  evento: string;
  metodoPago: string;
  estado: AttendeeStatus;
  fechaRegistro: string;
  ciudad?: string;
  referencia?: string;
  fechaValidacion?: string;
}

export default function AttendeesManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEvent, setFilterEvent] = useState('Todos');
  const [filterStatus, setFilterStatus] = useState('Todos');
  const [filterType, setFilterType] = useState('Todos');
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [selectedAttendee, setSelectedAttendee] = useState<Attendee | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Mock data
  const asistentes: Attendee[] = [
    {
      id: 1,
      nombre: 'Carlos Rodríguez',
      email: 'carlos.rodriguez@email.com',
      telefono: '+52 555 1234 5678',
      tipo: 'General',
      evento: 'Expo Car Show 2026',
      metodoPago: 'Stripe',
      estado: 'Pagado',
      fechaRegistro: '2026-02-15 14:30',
      ciudad: 'CDMX',
      referencia: 'STR-20260215-001',
      fechaValidacion: '2026-03-15 09:15'
    },
    {
      id: 2,
      nombre: 'María González',
      email: 'maria.gonzalez@email.com',
      telefono: '+52 555 9876 5432',
      tipo: 'VIP',
      evento: 'Expo Boda Dreams',
      metodoPago: 'Ticketmaster',
      estado: 'Validado',
      fechaRegistro: '2026-02-18 10:15',
      ciudad: 'Guadalajara',
      referencia: 'TM-20260218-045',
      fechaValidacion: '2026-04-22 11:30'
    },
    {
      id: 3,
      nombre: 'Juan Martínez',
      email: 'juan.martinez@email.com',
      telefono: '+52 555 2468 1357',
      tipo: 'Prensa',
      evento: 'Expo Car Show 2026',
      metodoPago: 'Gratuito',
      estado: 'Pendiente',
      fechaRegistro: '2026-02-20 16:45',
      ciudad: 'Monterrey'
    },
    {
      id: 4,
      nombre: 'Ana López',
      email: 'ana.lopez@email.com',
      telefono: '+52 555 3691 2580',
      tipo: 'General',
      evento: 'Expo XV Años Mágicos',
      metodoPago: 'Stripe',
      estado: 'Pagado',
      fechaRegistro: '2026-02-22 11:20',
      ciudad: 'CDMX',
      referencia: 'STR-20260222-089'
    },
    {
      id: 5,
      nombre: 'Pedro Sánchez',
      email: 'pedro.sanchez@email.com',
      telefono: '+52 555 7531 9642',
      tipo: 'General',
      evento: 'Expo Baby & Kids',
      metodoPago: 'Stripe',
      estado: 'Cancelado',
      fechaRegistro: '2026-01-05 09:10',
      ciudad: 'Puebla',
      referencia: 'STR-20260105-012'
    },
    {
      id: 6,
      nombre: 'Laura Fernández',
      email: 'laura.fernandez@email.com',
      telefono: '+52 555 8520 7413',
      tipo: 'VIP',
      evento: 'Expo Car Show 2026',
      metodoPago: 'Stripe',
      estado: 'Validado',
      fechaRegistro: '2026-02-25 13:50',
      ciudad: 'CDMX',
      referencia: 'STR-20260225-156',
      fechaValidacion: '2026-03-15 10:45'
    },
  ];

  // Filtrar asistentes
  const filteredAttendees = asistentes.filter((asistente) => {
    const matchSearch = 
      asistente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asistente.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchEvent = filterEvent === 'Todos' || asistente.evento === filterEvent;
    const matchStatus = filterStatus === 'Todos' || asistente.estado === filterStatus;
    const matchType = filterType === 'Todos' || asistente.tipo === filterType;
    return matchSearch && matchEvent && matchStatus && matchType;
  });

  // Calcular métricas
  const totalAsistentes = asistentes.length;
  const totalPagados = asistentes.filter(a => a.estado === 'Pagado').length;
  const totalPendientes = asistentes.filter(a => a.estado === 'Pendiente').length;
  const totalValidados = asistentes.filter(a => a.estado === 'Validado').length;

  const getStatusColor = (estado: AttendeeStatus) => {
    switch (estado) {
      case 'Pagado':
        return 'bg-green-100 text-green-700';
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-700';
      case 'Validado':
        return 'bg-blue-100 text-blue-700';
      case 'Cancelado':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (estado: AttendeeStatus) => {
    switch (estado) {
      case 'Pagado':
        return <CheckCircle className="w-4 h-4" />;
      case 'Pendiente':
        return <Clock className="w-4 h-4" />;
      case 'Validado':
        return <CheckSquare className="w-4 h-4" />;
      case 'Cancelado':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <AdminLayout>
      <div className="p-4 lg:p-8">
        {/* Header */}
        <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Asistentes</h1>
            <p className="text-gray-500">Gestiona y monitorea los registros de tus eventos</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium"
            >
              <Filter className="w-5 h-5" />
              <span>Filtros avanzados</span>
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all font-medium">
              <Download className="w-5 h-5" />
              <span>Exportar CSV</span>
            </button>
          </div>
        </div>

        {/* Métricas Rápidas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex items-center gap-1 text-green-600 text-xs font-medium">
                <TrendingUp className="w-3 h-3" />
                <span>12%</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{totalAsistentes}</h3>
            <p className="text-xs text-gray-500">Total Asistentes</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-xs text-gray-500">{((totalPagados / totalAsistentes) * 100).toFixed(0)}%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{totalPagados}</h3>
            <p className="text-xs text-gray-500">Total Pagados</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <span className="text-xs text-gray-500">{((totalPendientes / totalAsistentes) * 100).toFixed(0)}%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{totalPendientes}</h3>
            <p className="text-xs text-gray-500">Total Pendientes</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <CheckSquare className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-xs text-gray-500">{((totalValidados / totalAsistentes) * 100).toFixed(0)}%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{totalValidados}</h3>
            <p className="text-xs text-gray-500">Total Validados</p>
          </div>
        </div>

        {/* Barra de Filtros */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Buscador */}
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>

            {/* Filtro Evento */}
            <select
              value={filterEvent}
              onChange={(e) => setFilterEvent(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            >
              <option>Todos</option>
              <option>Expo Car Show 2026</option>
              <option>Expo Boda Dreams</option>
              <option>Expo XV Años Mágicos</option>
              <option>Expo Baby & Kids</option>
            </select>

            {/* Filtro Estado */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            >
              <option>Todos</option>
              <option>Pagado</option>
              <option>Pendiente</option>
              <option>Validado</option>
              <option>Cancelado</option>
            </select>

            {/* Filtro Tipo */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            >
              <option>Todos</option>
              <option>General</option>
              <option>VIP</option>
              <option>Prensa</option>
            </select>
          </div>
        </div>

        {/* Tabla de Asistentes */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Nombre Completo
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Teléfono
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Evento
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Método de Pago
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Fecha Registro
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAttendees.map((asistente) => (
                  <tr 
                    key={asistente.id} 
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-gray-900">{asistente.nombre}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="max-w-[200px] truncate">{asistente.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Phone className="w-4 h-4 text-gray-400" />
                        {asistente.telefono}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-purple-50 text-purple-700 rounded-lg text-xs font-medium">
                        {asistente.tipo}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-700 max-w-[180px] truncate">{asistente.evento}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <CreditCard className="w-4 h-4 text-gray-400" />
                        {asistente.metodoPago}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${getStatusColor(asistente.estado)}`}>
                        {getStatusIcon(asistente.estado)}
                        {asistente.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {asistente.fechaRegistro}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuId(openMenuId === asistente.id ? null : asistente.id);
                          }}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-5 h-5 text-gray-600" />
                        </button>

                        {/* Dropdown Menu */}
                        {openMenuId === asistente.id && (
                          <>
                            <div
                              className="fixed inset-0 z-10"
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenMenuId(null);
                              }}
                            />
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-20">
                              <button 
                                onClick={() => {
                                  setSelectedAttendee(asistente);
                                  setOpenMenuId(null);
                                }}
                                className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                              >
                                <Eye className="w-4 h-4 text-gray-400" />
                                Ver detalle
                              </button>
                              <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                                <Send className="w-4 h-4 text-gray-400" />
                                Reenviar QR
                              </button>
                              <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                                <Edit className="w-4 h-4 text-gray-400" />
                                Editar información
                              </button>
                              <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                                <CheckSquare className="w-4 h-4 text-gray-400" />
                                Marcar como validado
                              </button>
                              <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                                <FileDown className="w-4 h-4 text-gray-400" />
                                Descargar gafete
                              </button>
                              <div className="border-t border-gray-200 my-2" />
                              <button className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors">
                                <Ban className="w-4 h-4" />
                                Cancelar acceso
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredAttendees.length === 0 && (
            <div className="py-12 text-center">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-sm">No se encontraron asistentes</p>
            </div>
          )}
        </div>

        {/* Stats Footer */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <p>Mostrando {filteredAttendees.length} de {asistentes.length} asistentes</p>
        </div>
      </div>

      {/* Panel Lateral de Detalle */}
      {selectedAttendee && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-end sm:items-center justify-end z-50">
          <div 
            className="absolute inset-0" 
            onClick={() => setSelectedAttendee(null)}
          />
          <div className="relative bg-white w-full sm:w-[500px] h-[90vh] sm:h-full sm:max-h-[90vh] overflow-y-auto shadow-2xl sm:rounded-l-2xl">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Detalle del Asistente</h2>
                  <p className="text-blue-100 text-sm">ID: #{selectedAttendee.id}</p>
                </div>
                <button
                  onClick={() => setSelectedAttendee(null)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium ${getStatusColor(selectedAttendee.estado)}`}>
                {getStatusIcon(selectedAttendee.estado)}
                {selectedAttendee.estado}
              </span>
            </div>

            {/* Contenido */}
            <div className="p-6 space-y-6">
              {/* Información General */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Información General</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Nombre</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedAttendee.nombre}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Email</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedAttendee.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Teléfono</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedAttendee.telefono}</p>
                    </div>
                  </div>
                  {selectedAttendee.ciudad && (
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">Ciudad</p>
                        <p className="text-sm font-semibold text-gray-900">{selectedAttendee.ciudad}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Tipo de asistente</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedAttendee.tipo}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Evento</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedAttendee.evento}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Estado del Pago */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Estado del Pago</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <CreditCard className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Método de pago</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedAttendee.metodoPago}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Estado</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedAttendee.estado}</p>
                    </div>
                  </div>
                  {selectedAttendee.referencia && (
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <FileDown className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">Referencia</p>
                        <p className="text-sm font-semibold text-gray-900 font-mono">{selectedAttendee.referencia}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Código QR */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Código QR</h3>
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <div className="w-48 h-48 mx-auto bg-white rounded-lg border-2 border-gray-300 flex items-center justify-center mb-4">
                    <QrCode className="w-24 h-24 text-gray-400" />
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all font-medium">
                    <Send className="w-5 h-5" />
                    <span>Reenviar acceso por email</span>
                  </button>
                </div>
              </div>

              {/* Historial */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Historial</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
                    <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Fecha de registro</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedAttendee.fechaRegistro}</p>
                    </div>
                  </div>
                  {selectedAttendee.fechaValidacion && (
                    <div className="flex items-start gap-3 p-3 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
                      <CheckSquare className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">Fecha de validación</p>
                        <p className="text-sm font-semibold text-gray-900">{selectedAttendee.fechaValidacion}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-medium">
                  <Edit className="w-5 h-5" />
                  <span>Editar información</span>
                </button>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-medium">
                  <FileDown className="w-5 h-5" />
                  <span>Descargar gafete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
