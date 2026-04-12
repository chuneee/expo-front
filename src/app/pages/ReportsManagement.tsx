import { useState } from 'react';
import { 
  Download, 
  FileText,
  Filter,
  TrendingUp,
  Users,
  Building2,
  DollarSign,
  Target,
  Calendar,
  BarChart3,
  FileSpreadsheet,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  Clock
} from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';

export default function ReportsManagement() {
  const [selectedEvent, setSelectedEvent] = useState('Todos');
  const [selectedTab, setSelectedTab] = useState<'asistentes' | 'proveedores' | 'pagos'>('asistentes');

  // Datos para gráficas
  const comparativaEventos = [
    { evento: 'Car Show', registros: 850, ingresos: 298000, proveedores: 45 },
    { evento: 'Boda Dreams', registros: 720, ingresos: 252000, proveedores: 38 },
    { evento: 'XV Años', registros: 620, ingresos: 186000, proveedores: 32 },
    { evento: 'Baby & Kids', registros: 540, ingresos: 162000, proveedores: 28 },
  ];

  const evolucionRegistros = [
    { fecha: 'Sem 1', asistentes: 120, proveedores: 8 },
    { fecha: 'Sem 2', asistentes: 280, proveedores: 15 },
    { fecha: 'Sem 3', asistentes: 450, proveedores: 24 },
    { fecha: 'Sem 4', asistentes: 680, proveedores: 35 },
    { fecha: 'Sem 5', asistentes: 850, proveedores: 45 },
  ];

  // Datos de tablas
  const asistentesData = [
    { nombre: 'Carlos Rodríguez', tipo: 'General', estado: 'Pagado', fecha: '2026-02-15' },
    { nombre: 'María González', tipo: 'VIP', estado: 'Validado', fecha: '2026-02-18' },
    { nombre: 'Juan Martínez', tipo: 'Prensa', estado: 'Pendiente', fecha: '2026-02-20' },
    { nombre: 'Ana López', tipo: 'General', estado: 'Pagado', fecha: '2026-02-22' },
    { nombre: 'Laura Fernández', tipo: 'VIP', estado: 'Validado', fecha: '2026-02-25' },
  ];

  const proveedoresData = [
    { empresa: 'AutoParts Premium', categoria: 'Automotriz', paquete: 'Premium', estado: 'Aprobado' },
    { empresa: 'Novias Elegantes', categoria: 'Moda', paquete: 'Estándar', estado: 'Pagado' },
    { empresa: 'Decoración XV Años', categoria: 'Decoración', paquete: 'Premium', estado: 'Pendiente' },
    { empresa: 'Tech Motors', categoria: 'Tecnología', paquete: 'VIP', estado: 'Aprobado' },
    { empresa: 'Baby Store', categoria: 'Infantil', paquete: 'Premium', estado: 'Aprobado' },
  ];

  const pagosData = [
    { transaccion: 'TXN-001', monto: 350, metodo: 'Stripe', estado: 'Confirmado' },
    { transaccion: 'TXN-045', monto: 450, metodo: 'Ticketmaster', estado: 'Confirmado' },
    { transaccion: 'TXN-034', monto: 15000, metodo: 'Transferencia', estado: 'Confirmado' },
    { transaccion: 'TXN-156', monto: 12000, metodo: 'Stripe', estado: 'Pendiente' },
    { transaccion: 'TXN-089', monto: 300, metodo: 'Stripe', estado: 'En validación' },
  ];

  return (
    <AdminLayout>
      <div className="p-4 lg:p-8">
        {/* Header */}
        <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Reportes</h1>
            <p className="text-gray-500">Analiza el rendimiento y desempeño de tus eventos</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium">
              <FileSpreadsheet className="w-5 h-5" />
              <span>Exportar a Excel</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium">
              <FileText className="w-5 h-5" />
              <span>Exportar PDF</span>
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all font-medium">
              <BarChart3 className="w-5 h-5" />
              <span>Generar reporte personalizado</span>
            </button>
          </div>
        </div>

        {/* Filtros Globales */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            >
              <option>Todos los eventos</option>
              <option>Expo Car Show 2026</option>
              <option>Expo Boda Dreams</option>
              <option>Expo XV Años Mágicos</option>
              <option>Expo Baby & Kids</option>
            </select>

            <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all">
              <option>Temporada 2026</option>
              <option>Temporada 2025</option>
              <option>Temporada 2024</option>
            </select>

            <input
              type="date"
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
            
            <input
              type="date"
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>

          <div className="mt-3">
            <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all">
              <option>Tipo de reporte: General</option>
              <option>Tipo de reporte: Financiero</option>
              <option>Tipo de reporte: Asistencia</option>
              <option>Tipo de reporte: Proveedores</option>
            </select>
          </div>
        </div>

        {/* KPIs - Rendimiento General */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Rendimiento General</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex items-center gap-1 text-green-600 text-xs font-medium">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>12%</span>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">2,730</h3>
              <p className="text-xs text-gray-500">Total Asistentes</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex items-center gap-1 text-green-600 text-xs font-medium">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>8%</span>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">143</h3>
              <p className="text-xs text-gray-500">Total Proveedores</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex items-center gap-1 text-green-600 text-xs font-medium">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>15%</span>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">$898K</h3>
              <p className="text-xs text-gray-500">Ingresos Totales</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex items-center gap-1 text-red-600 text-xs font-medium">
                  <ArrowDownRight className="w-3 h-3" />
                  <span>3%</span>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">87%</h3>
              <p className="text-xs text-gray-500">Tasa de Conversión</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="flex items-center gap-1 text-green-600 text-xs font-medium">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>5%</span>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">92%</h3>
              <p className="text-xs text-gray-500">% Ocupación</p>
            </div>
          </div>
        </div>

        {/* Gráficas */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Comparativa de Eventos */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Comparativa de Eventos</h3>
              <select className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all">
                <option>Registros</option>
                <option>Ingresos</option>
                <option>Proveedores</option>
              </select>
            </div>
            <div style={{ width: '100%', height: '320px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparativaEventos}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="evento" tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#FFFFFF', 
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="registros" fill="#3B82F6" name="Registros" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="proveedores" fill="#8B5CF6" name="Proveedores" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Evolución de Registros */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Evolución de Registros</h3>
            <div style={{ width: '100%', height: '320px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={evolucionRegistros}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="fecha" tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#FFFFFF', 
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="asistentes" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    name="Asistentes"
                    dot={{ fill: '#3B82F6', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="proveedores" 
                    stroke="#8B5CF6" 
                    strokeWidth={3}
                    name="Proveedores"
                    dot={{ fill: '#8B5CF6', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Reporte Financiero Resumido */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Reporte Financiero Resumido</h3>
              <p className="text-sm text-gray-600">Resumen ejecutivo de ingresos</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-blue-600" />
                <p className="text-sm text-gray-600 font-medium">Ingresos por Asistentes</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">$230,500</p>
              <p className="text-xs text-gray-500 mt-1">26% del total</p>
            </div>

            <div className="bg-white rounded-xl p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-4 h-4 text-purple-600" />
                <p className="text-sm text-gray-600 font-medium">Ingresos por Proveedores</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">$667,500</p>
              <p className="text-xs text-gray-500 mt-1">74% del total</p>
            </div>

            <div className="bg-white rounded-xl p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <p className="text-sm text-gray-600 font-medium">Total Bruto</p>
              </div>
              <p className="text-2xl font-bold text-green-600">$898,000</p>
              <p className="text-xs text-gray-500 mt-1">Ingresos confirmados</p>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-4 text-white">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4" />
                <p className="text-sm font-medium">Estimación de Utilidad</p>
              </div>
              <p className="text-2xl font-bold">$629,000</p>
              <p className="text-xs opacity-90 mt-1">70% margen proyectado</p>
            </div>
          </div>
        </div>

        {/* Reportes Detallados con Pestañas */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200 bg-gray-50">
            <div className="flex gap-1 p-2">
              <button
                onClick={() => setSelectedTab('asistentes')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all ${
                  selectedTab === 'asistentes'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Asistentes</span>
              </button>
              <button
                onClick={() => setSelectedTab('proveedores')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all ${
                  selectedTab === 'proveedores'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Proveedores</span>
              </button>
              <button
                onClick={() => setSelectedTab('pagos')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all ${
                  selectedTab === 'pagos'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>Pagos</span>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                {selectedTab === 'asistentes' && 'Reporte Detallado de Asistentes'}
                {selectedTab === 'proveedores' && 'Reporte Detallado de Proveedores'}
                {selectedTab === 'pagos' && 'Reporte Detallado de Pagos'}
              </h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all font-medium text-sm">
                <Download className="w-4 h-4" />
                <span>Exportar</span>
              </button>
            </div>

            {/* Tabla Asistentes */}
            {selectedTab === 'asistentes' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Nombre</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tipo</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Estado</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Fecha</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {asistentesData.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">{item.nombre}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{item.tipo}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${
                            item.estado === 'Pagado' ? 'bg-green-100 text-green-700' :
                            item.estado === 'Validado' ? 'bg-blue-100 text-blue-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {item.estado === 'Pagado' || item.estado === 'Validado' ? (
                              <CheckCircle className="w-3 h-3" />
                            ) : (
                              <Clock className="w-3 h-3" />
                            )}
                            {item.estado}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">{item.fecha}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Tabla Proveedores */}
            {selectedTab === 'proveedores' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Empresa</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Categoría</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Paquete</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {proveedoresData.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">{item.empresa}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{item.categoria}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{item.paquete}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${
                            item.estado === 'Aprobado' ? 'bg-green-100 text-green-700' :
                            item.estado === 'Pagado' ? 'bg-blue-100 text-blue-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {item.estado === 'Aprobado' || item.estado === 'Pagado' ? (
                              <CheckCircle className="w-3 h-3" />
                            ) : (
                              <Clock className="w-3 h-3" />
                            )}
                            {item.estado}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Tabla Pagos */}
            {selectedTab === 'pagos' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Transacción</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Monto</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Método</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {pagosData.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-mono font-semibold text-gray-900">{item.transaccion}</td>
                        <td className="px-6 py-4 text-sm font-bold text-gray-900">${item.monto.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{item.metodo}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${
                            item.estado === 'Confirmado' ? 'bg-green-100 text-green-700' :
                            item.estado === 'En validación' ? 'bg-blue-100 text-blue-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {item.estado === 'Confirmado' ? (
                              <CheckCircle className="w-3 h-3" />
                            ) : (
                              <Clock className="w-3 h-3" />
                            )}
                            {item.estado}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}