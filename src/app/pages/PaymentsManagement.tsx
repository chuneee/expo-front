import { useState } from 'react';
import { 
  Download, 
  Filter,
  Search,
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
  CreditCard,
  MoreVertical,
  Eye,
  FileDown,
  Calendar,
  TrendingUp,
  AlertCircle,
  Send,
  X,
  Building2,
  Users,
  Image as ImageIcon,
  Ban,
  CheckSquare
} from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type PaymentStatus = 'Confirmado' | 'Pendiente' | 'En validación' | 'Fallido';
type PaymentType = 'Asistente' | 'Proveedor';

interface Payment {
  id: string;
  tipo: PaymentType;
  nombre: string;
  evento: string;
  metodo: string;
  monto: number;
  estado: PaymentStatus;
  fecha: string;
  referencia?: string;
  fechaConfirmacion?: string;
  gafeteGenerado: boolean;
  accesoActivo: boolean;
}

export default function PaymentsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEvent, setFilterEvent] = useState('Todos');
  const [filterStatus, setFilterStatus] = useState('Todos');
  const [filterMethod, setFilterMethod] = useState('Todos');
  const [filterType, setFilterType] = useState('Todos');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  // Mock data
  const pagos: Payment[] = [
    {
      id: 'TXN-20260215-001',
      tipo: 'Asistente',
      nombre: 'Carlos Rodríguez',
      evento: 'Expo Car Show 2026',
      metodo: 'Stripe',
      monto: 350,
      estado: 'Confirmado',
      fecha: '2026-02-15 14:30',
      referencia: 'STR-20260215-001',
      fechaConfirmacion: '2026-02-15 14:31',
      gafeteGenerado: true,
      accesoActivo: true
    },
    {
      id: 'TXN-20260218-045',
      tipo: 'Asistente',
      nombre: 'María González',
      evento: 'Expo Boda Dreams',
      metodo: 'Ticketmaster',
      monto: 450,
      estado: 'Confirmado',
      fecha: '2026-02-18 10:15',
      referencia: 'TM-20260218-045',
      fechaConfirmacion: '2026-02-18 10:16',
      gafeteGenerado: true,
      accesoActivo: true
    },
    {
      id: 'TXN-20260210-034',
      tipo: 'Proveedor',
      nombre: 'AutoParts Premium',
      evento: 'Expo Car Show 2026',
      metodo: 'Transferencia',
      monto: 15000,
      estado: 'Confirmado',
      fecha: '2026-02-10 09:30',
      referencia: 'TRF-20260210-034',
      fechaConfirmacion: '2026-02-11 14:20',
      gafeteGenerado: true,
      accesoActivo: true
    },
    {
      id: 'TXN-20260220-156',
      tipo: 'Proveedor',
      nombre: 'Decoración XV Años',
      evento: 'Expo XV Años Mágicos',
      metodo: 'Stripe',
      monto: 12000,
      estado: 'Pendiente',
      fecha: '2026-02-20 15:45',
      referencia: 'STR-20260220-156',
      gafeteGenerado: false,
      accesoActivo: false
    },
    {
      id: 'TXN-20260222-089',
      tipo: 'Asistente',
      nombre: 'Ana López',
      evento: 'Expo XV Años Mágicos',
      metodo: 'Stripe',
      monto: 300,
      estado: 'En validación',
      fecha: '2026-02-22 11:20',
      referencia: 'STR-20260222-089',
      gafeteGenerado: false,
      accesoActivo: false
    },
    {
      id: 'TXN-20260105-078',
      tipo: 'Proveedor',
      nombre: 'Fotografía Profesional',
      evento: 'Expo Boda Dreams',
      metodo: 'Stripe',
      monto: 7000,
      estado: 'Fallido',
      fecha: '2026-01-05 13:20',
      referencia: 'STR-20260105-078',
      gafeteGenerado: false,
      accesoActivo: false
    },
    {
      id: 'TXN-20260212-089',
      tipo: 'Proveedor',
      nombre: 'Novias Elegantes',
      evento: 'Expo Boda Dreams',
      metodo: 'Transferencia',
      monto: 8000,
      estado: 'En validación',
      fecha: '2026-02-12 11:20',
      referencia: 'TRF-20260212-089',
      gafeteGenerado: false,
      accesoActivo: false
    },
  ];

  // Filtrar pagos
  const filteredPayments = pagos.filter((pago) => {
    const matchSearch = 
      pago.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pago.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (pago.referencia?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    const matchEvent = filterEvent === 'Todos' || pago.evento === filterEvent;
    const matchStatus = filterStatus === 'Todos' || pago.estado === filterStatus;
    const matchMethod = filterMethod === 'Todos' || pago.metodo === filterMethod;
    const matchType = filterType === 'Todos' || pago.tipo === filterType;
    return matchSearch && matchEvent && matchStatus && matchMethod && matchType;
  });

  // Calcular métricas
  const totalIngresos = pagos
    .filter(p => p.estado === 'Confirmado')
    .reduce((sum, p) => sum + p.monto, 0);
  const pagosConfirmados = pagos.filter(p => p.estado === 'Confirmado').length;
  const pagosPendientes = pagos.filter(p => p.estado === 'Pendiente' || p.estado === 'En validación').length;
  const pagosFallidos = pagos.filter(p => p.estado === 'Fallido').length;

  // Datos para gráfica
  const chartData = [
    { nombre: 'Car Show', ingresos: 30000 },
    { nombre: 'Boda Dreams', ingresos: 25000 },
    { nombre: 'XV Años', ingresos: 18000 },
    { nombre: 'Baby & Kids', ingresos: 15000 },
  ];

  const getStatusColor = (estado: PaymentStatus) => {
    switch (estado) {
      case 'Confirmado':
        return 'bg-green-100 text-green-700';
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-700';
      case 'En validación':
        return 'bg-blue-100 text-blue-700';
      case 'Fallido':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (estado: PaymentStatus) => {
    switch (estado) {
      case 'Confirmado':
        return <CheckCircle className="w-4 h-4" />;
      case 'Pendiente':
        return <Clock className="w-4 h-4" />;
      case 'En validación':
        return <AlertCircle className="w-4 h-4" />;
      case 'Fallido':
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Pagos</h1>
            <p className="text-gray-500">Monitorea ingresos, transacciones y validaciones</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium">
              <Download className="w-5 h-5" />
              <span>Exportar reporte</span>
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all font-medium">
              <FileDown className="w-5 h-5" />
              <span>Descargar resumen financiero</span>
            </button>
          </div>
        </div>

        {/* KPIs Financieros */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex items-center gap-1 text-green-600 text-xs font-medium">
                <TrendingUp className="w-3 h-3" />
                <span>10%</span>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">${totalIngresos.toLocaleString()}</h3>
            <p className="text-xs text-gray-500">Total Ingresos</p>
            <p className="text-xs text-gray-400 mt-1">+10% vs periodo anterior</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{pagosConfirmados}</h3>
            <p className="text-xs text-gray-500">Pagos Confirmados</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-yellow-600 mb-1">{pagosPendientes}</h3>
            <p className="text-xs text-gray-500">Pagos Pendientes</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-red-600 mb-1">{pagosFallidos}</h3>
            <p className="text-xs text-gray-500">Pagos Fallidos / Rechazados</p>
          </div>
        </div>

        {/* Gráfica de Ingresos */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Ingresos por Evento</h3>
            <div className="flex items-center gap-3">
              <select className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all">
                <option>Todos los eventos</option>
                <option>Expo Car Show 2026</option>
                <option>Expo Boda Dreams</option>
                <option>Expo XV Años Mágicos</option>
                <option>Expo Baby & Kids</option>
              </select>
              <select className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all">
                <option>Todos los tipos</option>
                <option>Asistentes</option>
                <option>Proveedores</option>
              </select>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="nombre" tick={{ fill: '#6B7280', fontSize: 12 }} />
                <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Ingresos']}
                />
                <Bar dataKey="ingresos" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#6366F1" stopOpacity={1}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Buscador */}
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre o referencia..."
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

            {/* Filtro Método */}
            <select
              value={filterMethod}
              onChange={(e) => setFilterMethod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            >
              <option>Todos</option>
              <option>Stripe</option>
              <option>Ticketmaster</option>
              <option>Transferencia</option>
            </select>

            {/* Filtro Estado */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            >
              <option>Todos</option>
              <option>Confirmado</option>
              <option>Pendiente</option>
              <option>En validación</option>
              <option>Fallido</option>
            </select>
          </div>

          {/* Segunda Fila */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-3">
            {/* Filtro Tipo */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            >
              <option>Todos</option>
              <option>Asistente</option>
              <option>Proveedor</option>
            </select>

            {/* Rango de Fechas */}
            <input
              type="date"
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
            <input
              type="date"
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
        </div>

        {/* Tabla de Transacciones */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    ID Transacción
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Nombre / Empresa
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Evento
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Método de Pago
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Monto
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPayments.map((pago) => (
                  <tr 
                    key={pago.id} 
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="text-sm font-mono font-semibold text-gray-900">{pago.id}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${
                        pago.tipo === 'Asistente' 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'bg-purple-50 text-purple-700'
                      }`}>
                        {pago.tipo === 'Asistente' ? <Users className="w-3 h-3" /> : <Building2 className="w-3 h-3" />}
                        {pago.tipo}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-gray-900">{pago.nombre}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-700 max-w-[180px] truncate">{pago.evento}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <CreditCard className="w-4 h-4 text-gray-400" />
                        {pago.metodo}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-gray-900">${pago.monto.toLocaleString()}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${getStatusColor(pago.estado)}`}>
                        {getStatusIcon(pago.estado)}
                        {pago.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {pago.fecha.split(' ')[0]}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuId(openMenuId === pago.id ? null : pago.id);
                          }}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-5 h-5 text-gray-600" />
                        </button>

                        {/* Dropdown Menu */}
                        {openMenuId === pago.id && (
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
                                  setSelectedPayment(pago);
                                  setOpenMenuId(null);
                                }}
                                className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                              >
                                <Eye className="w-4 h-4 text-gray-400" />
                                Ver detalle
                              </button>
                              <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                                <FileDown className="w-4 h-4 text-gray-400" />
                                Ver comprobante
                              </button>
                              <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                                <CheckSquare className="w-4 h-4 text-gray-400" />
                                Aprobar manualmente
                              </button>
                              <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                                <Send className="w-4 h-4 text-gray-400" />
                                Reenviar confirmación
                              </button>
                              <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                                <Download className="w-4 h-4 text-gray-400" />
                                Descargar recibo
                              </button>
                              <div className="border-t border-gray-200 my-2" />
                              <button className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors">
                                <Ban className="w-4 h-4" />
                                Rechazar
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
          {filteredPayments.length === 0 && (
            <div className="py-12 text-center">
              <DollarSign className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-sm">No se encontraron transacciones</p>
            </div>
          )}
        </div>

        {/* Stats Footer */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <p>Mostrando {filteredPayments.length} de {pagos.length} transacciones</p>
          <p className="font-semibold text-gray-900">Total filtrado: ${filteredPayments.reduce((sum, p) => sum + p.monto, 0).toLocaleString()}</p>
        </div>
      </div>

      {/* Panel Lateral de Detalle */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-end sm:items-center justify-end z-50">
          <div 
            className="absolute inset-0" 
            onClick={() => setSelectedPayment(null)}
          />
          <div className="relative bg-white w-full sm:w-[500px] h-[90vh] sm:h-full sm:max-h-[90vh] overflow-y-auto shadow-2xl sm:rounded-l-2xl">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-green-500 to-emerald-600 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Detalle de Transacción</h2>
                  <p className="text-green-100 text-sm font-mono">{selectedPayment.id}</p>
                </div>
                <button
                  onClick={() => setSelectedPayment(null)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium ${getStatusColor(selectedPayment.estado)}`}>
                {getStatusIcon(selectedPayment.estado)}
                {selectedPayment.estado}
              </span>
            </div>

            {/* Contenido */}
            <div className="p-6 space-y-6">
              {/* Información General */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Información General</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">ID Transacción</p>
                      <p className="text-sm font-mono font-semibold text-gray-900">{selectedPayment.id}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    {selectedPayment.tipo === 'Asistente' ? (
                      <Users className="w-5 h-5 text-green-600 mt-0.5" />
                    ) : (
                      <Building2 className="w-5 h-5 text-green-600 mt-0.5" />
                    )}
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Tipo</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedPayment.tipo}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Users className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Nombre / Empresa</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedPayment.nombre}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Evento</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedPayment.evento}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Fecha de transacción</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedPayment.fecha}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <CreditCard className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Método de pago</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedPayment.metodo}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 border-2 border-green-200 rounded-lg">
                    <DollarSign className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Monto</p>
                      <p className="text-xl font-bold text-green-600">${selectedPayment.monto.toLocaleString()} MXN</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Estado */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Estado</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Estado actual</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedPayment.estado}</p>
                    </div>
                  </div>
                  {selectedPayment.fechaConfirmacion && (
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">Fecha de confirmación</p>
                        <p className="text-sm font-semibold text-gray-900">{selectedPayment.fechaConfirmacion}</p>
                      </div>
                    </div>
                  )}
                  {selectedPayment.referencia && (
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <FileDown className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">Referencia externa</p>
                        <p className="text-sm font-mono font-semibold text-gray-900">{selectedPayment.referencia}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Comprobante */}
              {selectedPayment.metodo === 'Transferencia' && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Comprobante</h3>
                  <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                    <div className="flex items-center justify-center mb-3">
                      <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                        <ImageIcon className="w-10 h-10 text-gray-400" />
                      </div>
                    </div>
                    <p className="text-xs text-center text-gray-500 mb-3">
                      {selectedPayment.estado === 'Confirmado' ? 'Comprobante aprobado' : 'Comprobante subido'}
                    </p>
                    {selectedPayment.estado !== 'Confirmado' && (
                      <div className="flex gap-2">
                        <button className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/30 transition-all font-medium text-sm">
                          Aprobar pago
                        </button>
                        <button className="flex-1 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all font-medium text-sm">
                          Rechazar pago
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Impacto */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Impacto</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className={`w-5 h-5 ${selectedPayment.gafeteGenerado ? 'text-green-600' : 'text-gray-400'}`} />
                      <p className="text-sm font-medium text-gray-900">Gafete generado</p>
                    </div>
                    <span className={`text-sm font-semibold ${selectedPayment.gafeteGenerado ? 'text-green-600' : 'text-gray-400'}`}>
                      {selectedPayment.gafeteGenerado ? 'Sí' : 'No'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className={`w-5 h-5 ${selectedPayment.accesoActivo ? 'text-green-600' : 'text-gray-400'}`} />
                      <p className="text-sm font-medium text-gray-900">Acceso activo</p>
                    </div>
                    <span className={`text-sm font-semibold ${selectedPayment.accesoActivo ? 'text-green-600' : 'text-gray-400'}`}>
                      {selectedPayment.accesoActivo ? 'Sí' : 'No'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-medium">
                  <Send className="w-5 h-5" />
                  <span>Reenviar confirmación</span>
                </button>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/30 transition-all font-medium">
                  <Download className="w-5 h-5" />
                  <span>Descargar recibo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
