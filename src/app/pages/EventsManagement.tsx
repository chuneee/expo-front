import { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Building2, 
  MoreVertical,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Copy,
  Power,
  Trash2,
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
  X,
  TrendingUp,
  BarChart3,
  ExternalLink,
  FileText
} from 'lucide-react';
import AdminLayout from '../components/AdminLayout';

type EventStatus = 'Próximo' | 'Activo' | 'Finalizado';

interface Event {
  id: number;
  nombre: string;
  tipo: string;
  temporada: string;
  fecha: string;
  ubicacion: string;
  estado: EventStatus;
  asistentes: number;
  proveedores: number;
}

export default function EventsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeason, setFilterSeason] = useState('Todas');
  const [filterStatus, setFilterStatus] = useState('Todos');
  const [filterType, setFilterType] = useState('Todos');
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const navigate = useNavigate();

  // Mock data
  const eventos: Event[] = [
    {
      id: 1,
      nombre: 'Expo Car Show 2026',
      tipo: 'Automotriz',
      temporada: '2026',
      fecha: '15 Mar 2026',
      ubicacion: 'Centro de Convenciones CDMX',
      estado: 'Activo',
      asistentes: 1247,
      proveedores: 87,
    },
    {
      id: 2,
      nombre: 'Expo Boda Dreams',
      tipo: 'Bodas',
      temporada: '2026',
      fecha: '22 Abr 2026',
      ubicacion: 'Expo Guadalajara',
      estado: 'Próximo',
      asistentes: 2150,
      proveedores: 142,
    },
    {
      id: 3,
      nombre: 'Expo XV Años Mágicos',
      tipo: 'XV Años',
      temporada: '2026',
      fecha: '10 May 2026',
      ubicacion: 'World Trade Center',
      estado: 'Próximo',
      asistentes: 1680,
      proveedores: 95,
    },
    {
      id: 4,
      nombre: 'Expo Baby & Kids',
      tipo: 'Familiar',
      temporada: '2026',
      fecha: '05 Ene 2026',
      ubicacion: 'Expo Santa Fe',
      estado: 'Finalizado',
      asistentes: 890,
      proveedores: 54,
    },
  ];

  // Filtrar eventos
  const filteredEvents = eventos.filter((evento) => {
    const matchSearch = evento.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchSeason = filterSeason === 'Todas' || evento.temporada === filterSeason;
    const matchStatus = filterStatus === 'Todos' || evento.estado === filterStatus;
    const matchType = filterType === 'Todos' || evento.tipo === filterType;
    return matchSearch && matchSeason && matchStatus && matchType;
  });

  const getStatusColor = (estado: EventStatus) => {
    switch (estado) {
      case 'Activo':
        return 'bg-green-100 text-green-700';
      case 'Próximo':
        return 'bg-blue-100 text-blue-700';
      case 'Finalizado':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (estado: EventStatus) => {
    switch (estado) {
      case 'Activo':
        return <CheckCircle className="w-4 h-4" />;
      case 'Próximo':
        return <Clock className="w-4 h-4" />;
      case 'Finalizado':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <AdminLayout>
      <div className="p-4 lg:p-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Eventos</h1>
            <p className="text-gray-500">Administra, configura y monitorea tus expos y eventos</p>
          </div>
          <button 
            onClick={() => navigate('/admin/eventos/crear')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all font-medium"
          >
            <Plus className="w-5 h-5" />
            <span>Crear nuevo evento</span>
          </button>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Buscador */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar evento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>

            {/* Filtro Temporada */}
            <select
              value={filterSeason}
              onChange={(e) => setFilterSeason(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            >
              <option>Todas</option>
              <option>2026</option>
              <option>2025</option>
              <option>2024</option>
            </select>

            {/* Filtro Estado */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            >
              <option>Todos</option>
              <option>Activo</option>
              <option>Próximo</option>
              <option>Finalizado</option>
            </select>

            {/* Filtro Tipo */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            >
              <option>Todos</option>
              <option>Automotriz</option>
              <option>Bodas</option>
              <option>XV Años</option>
              <option>Familiar</option>
            </select>
          </div>
        </div>

        {/* Tabla de Eventos */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Evento
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Ubicación
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Asistentes
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Proveedores
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredEvents.map((evento) => (
                  <tr 
                    key={evento.id} 
                    onClick={() => setSelectedEvent(evento)}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{evento.nombre}</p>
                        <p className="text-xs text-gray-500">Temporada {evento.temporada}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-purple-50 text-purple-700 rounded-lg text-xs font-medium">
                        {evento.tipo}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {evento.fecha}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="max-w-[200px] truncate">{evento.ubicacion}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${getStatusColor(evento.estado)}`}>
                        {getStatusIcon(evento.estado)}
                        {evento.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Users className="w-4 h-4 text-gray-400" />
                        {evento.asistentes.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Building2 className="w-4 h-4 text-gray-400" />
                        {evento.proveedores}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuId(openMenuId === evento.id ? null : evento.id);
                          }}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-5 h-5 text-gray-600" />
                        </button>

                        {/* Dropdown Menu */}
                        {openMenuId === evento.id && (
                          <>
                            <div
                              className="fixed inset-0 z-10"
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenMenuId(null);
                              }}
                            />
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-20"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                                <Eye className="w-4 h-4 text-gray-400" />
                                Ver Dashboard del evento
                              </button>
                              <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                                <Edit className="w-4 h-4 text-gray-400" />
                                Editar evento
                              </button>
                              <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                                <Users className="w-4 h-4 text-gray-400" />
                                Ver asistentes
                              </button>
                              <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                                <Building2 className="w-4 h-4 text-gray-400" />
                                Ver proveedores
                              </button>
                              <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                                <DollarSign className="w-4 h-4 text-gray-400" />
                                Ver pagos
                              </button>
                              <div className="border-t border-gray-200 my-2" />
                              <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                                <Copy className="w-4 h-4 text-gray-400" />
                                Duplicar evento
                              </button>
                              <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                                <Power className="w-4 h-4 text-gray-400" />
                                Activar/Desactivar registros
                              </button>
                              <div className="border-t border-gray-200 my-2" />
                              <button className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors">
                                <Trash2 className="w-4 h-4" />
                                Desactivar evento
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
          {filteredEvents.length === 0 && (
            <div className="py-12 text-center">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-sm">No se encontraron eventos</p>
            </div>
          )}
        </div>

        {/* Stats Footer */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <p>Mostrando {filteredEvents.length} de {eventos.length} eventos</p>
        </div>
      </div>

      {/* Modal de Detalles del Evento */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header del Modal */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-t-2xl">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedEvent.nombre}</h2>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 text-white rounded-lg text-sm font-medium backdrop-blur-sm">
                      {selectedEvent.tipo}
                    </span>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(selectedEvent.estado)}`}>
                      {getStatusIcon(selectedEvent.estado)}
                      {selectedEvent.estado}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            {/* Contenido del Modal */}
            <div className="p-6">
              {/* Información General */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Información General</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-xs text-gray-500">Fecha</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedEvent.fecha}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-xs text-gray-500">Ubicación</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedEvent.ubicacion}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-xs text-gray-500">Temporada</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedEvent.temporada}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-xs text-gray-500">ID del Evento</p>
                      <p className="text-sm font-semibold text-gray-900">#{selectedEvent.id}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* KPIs Rápidos */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Métricas del Evento</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Asistentes */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex items-center gap-1 text-green-600 text-xs font-medium">
                        <TrendingUp className="w-3 h-3" />
                        <span>12%</span>
                      </div>
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-1">{selectedEvent.asistentes.toLocaleString()}</h4>
                    <p className="text-xs text-gray-600">Asistentes registrados</p>
                  </div>

                  {/* Proveedores */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/30">
                        <Building2 className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex items-center gap-1 text-orange-600 text-xs font-medium">
                        <span>15 pendientes</span>
                      </div>
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-1">{selectedEvent.proveedores}</h4>
                    <p className="text-xs text-gray-600">Proveedores activos</p>
                  </div>

                  {/* Ingresos */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/30">
                        <DollarSign className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex items-center gap-1 text-green-600 text-xs font-medium">
                        <TrendingUp className="w-3 h-3" />
                        <span>8%</span>
                      </div>
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-1">$163,000</h4>
                    <p className="text-xs text-gray-600">Ingresos totales</p>
                  </div>
                </div>
              </div>

              {/* Botones de Acción Rápida */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Acciones Rápidas</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <button className="flex flex-col items-center gap-2 p-4 border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-blue-500 transition-all group">
                    <div className="w-10 h-10 bg-gray-100 group-hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors">
                      <BarChart3 className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                    </div>
                    <span className="text-xs font-medium text-gray-700 text-center">Dashboard</span>
                  </button>

                  <button className="flex flex-col items-center gap-2 p-4 border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-blue-500 transition-all group">
                    <div className="w-10 h-10 bg-gray-100 group-hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors">
                      <Users className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                    </div>
                    <span className="text-xs font-medium text-gray-700 text-center">Asistentes</span>
                  </button>

                  <button className="flex flex-col items-center gap-2 p-4 border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-blue-500 transition-all group">
                    <div className="w-10 h-10 bg-gray-100 group-hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors">
                      <Building2 className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                    </div>
                    <span className="text-xs font-medium text-gray-700 text-center">Proveedores</span>
                  </button>

                  <button className="flex flex-col items-center gap-2 p-4 border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-blue-500 transition-all group">
                    <div className="w-10 h-10 bg-gray-100 group-hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors">
                      <ExternalLink className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                    </div>
                    <span className="text-xs font-medium text-gray-700 text-center">Ver Landing</span>
                  </button>
                </div>
              </div>

              {/* Configuración Adicional */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Configuración</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Registro de asistentes</p>
                        <p className="text-xs text-gray-500">Actualmente activado</p>
                      </div>
                    </div>
                    <span className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-lg font-medium">Activo</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Registro de proveedores</p>
                        <p className="text-xs text-gray-500">Actualmente activado</p>
                      </div>
                    </div>
                    <span className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-lg font-medium">Activo</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Tipo de entrada</p>
                        <p className="text-xs text-gray-500">Precio: $150 MXN</p>
                      </div>
                    </div>
                    <span className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-lg font-medium">De pago</span>
                  </div>
                </div>
              </div>

              {/* Botones de Footer */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-medium">
                  <Edit className="w-5 h-5" />
                  <span>Editar evento</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all font-medium">
                  <Eye className="w-5 h-5" />
                  <span>Ver Dashboard completo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}