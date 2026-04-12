import { useState } from 'react';
import { 
  Users, 
  Building2, 
  TrendingUp,
  AlertCircle,
  DollarSign,
  Package,
  Clock
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import AdminLayout from '../components/AdminLayout';

export default function AdminDashboard() {
  const [chartView, setChartView] = useState<'asistentes' | 'proveedores'>('asistentes');
  
  // Estados para filtros
  const [selectedEvent, setSelectedEvent] = useState('Expo Car Show 2026');
  const [selectedSeason, setSelectedSeason] = useState('Temporada 2026');
  const [selectedPeriod, setSelectedPeriod] = useState('Últimos 7 días');

  // Datos dinámicos según evento seleccionado
  const getEventData = () => {
    const dataByEvent: Record<string, any> = {
      'Expo Car Show 2026': {
        asistentes: 1247,
        proveedores: 87,
        ingresos: 163000,
        pagos: 23,
        crecimientoAsistentes: 12,
        crecimientoIngresos: 8,
        proveedoresPendientes: 15,
      },
      'Expo Boda 2026': {
        asistentes: 2150,
        proveedores: 142,
        ingresos: 245000,
        pagos: 18,
        crecimientoAsistentes: 18,
        crecimientoIngresos: 15,
        proveedoresPendientes: 8,
      },
      'Expo XV 2026': {
        asistentes: 1680,
        proveedores: 95,
        ingresos: 187000,
        pagos: 12,
        crecimientoAsistentes: 9,
        crecimientoIngresos: 5,
        proveedoresPendientes: 6,
      },
      'Todos los eventos': {
        asistentes: 5077,
        proveedores: 324,
        ingresos: 595000,
        pagos: 53,
        crecimientoAsistentes: 14,
        crecimientoIngresos: 11,
        proveedoresPendientes: 29,
      },
    };
    return dataByEvent[selectedEvent] || dataByEvent['Expo Car Show 2026'];
  };

  // Datos de gráfica según periodo
  const getChartData = () => {
    const dataByPeriod: Record<string, any[]> = {
      'Hoy': [
        { fecha: '8:00', asistentes: 12, proveedores: 2 },
        { fecha: '10:00', asistentes: 25, proveedores: 4 },
        { fecha: '12:00', asistentes: 38, proveedores: 6 },
        { fecha: '14:00', asistentes: 45, proveedores: 8 },
        { fecha: '16:00', asistentes: 52, proveedores: 9 },
        { fecha: '18:00', asistentes: 48, proveedores: 7 },
        { fecha: '20:00', asistentes: 35, proveedores: 5 },
      ],
      'Últimos 7 días': [
        { fecha: '20 Feb', asistentes: 45, proveedores: 8 },
        { fecha: '21 Feb', asistentes: 52, proveedores: 12 },
        { fecha: '22 Feb', asistentes: 61, proveedores: 15 },
        { fecha: '23 Feb', asistentes: 58, proveedores: 10 },
        { fecha: '24 Feb', asistentes: 73, proveedores: 18 },
        { fecha: '25 Feb', asistentes: 86, proveedores: 22 },
        { fecha: '26 Feb', asistentes: 95, proveedores: 25 },
      ],
      'Últimos 30 días': [
        { fecha: 'Sem 1', asistentes: 180, proveedores: 35 },
        { fecha: 'Sem 2', asistentes: 210, proveedores: 42 },
        { fecha: 'Sem 3', asistentes: 245, proveedores: 48 },
        { fecha: 'Sem 4', asistentes: 280, proveedores: 55 },
      ],
      'Personalizado': [
        { fecha: 'Ene', asistentes: 320, proveedores: 65 },
        { fecha: 'Feb', asistentes: 410, proveedores: 82 },
        { fecha: 'Mar', asistentes: 380, proveedores: 75 },
      ],
    };
    return dataByPeriod[selectedPeriod] || dataByPeriod['Últimos 7 días'];
  };

  const eventData = getEventData();
  const registrosData = getChartData();

  const ingresosData = [
    { evento: 'Expo Boda', ingresos: 45000 },
    { evento: 'Expo XV', ingresos: 32000 },
    { evento: 'Car Show', ingresos: 58000 },
    { evento: 'Expo Baby', ingresos: 28000 },
  ];

  const alertas = [
    { id: 1, tipo: 'pago', mensaje: '5 pagos pendientes por validar', icono: DollarSign, color: 'text-amber-600 bg-amber-50' },
    { id: 2, tipo: 'aprobacion', mensaje: '3 proveedores sin aprobar', icono: Building2, color: 'text-blue-600 bg-blue-50' },
    { id: 3, tipo: 'evento', mensaje: 'Evento próximo en 10 días', icono: AlertCircle, color: 'text-purple-600 bg-purple-50' },
    { id: 4, tipo: 'cupo', mensaje: 'Cupo al 85%', icono: AlertCircle, color: 'text-orange-600 bg-orange-50' },
  ];

  const ultimosAsistentes = [
    { id: 1, nombre: 'Carlos Méndez', tipo: 'General', estado: 'Confirmado', fecha: '26 Feb 2026' },
    { id: 2, nombre: 'Ana Rodríguez', tipo: 'VIP', estado: 'Confirmado', fecha: '26 Feb 2026' },
    { id: 3, nombre: 'Luis Torres', tipo: 'General', estado: 'Pendiente', fecha: '25 Feb 2026' },
    { id: 4, nombre: 'María García', tipo: 'Prensa', estado: 'Confirmado', fecha: '25 Feb 2026' },
    { id: 5, nombre: 'Jorge Ramírez', tipo: 'General', estado: 'Confirmado', fecha: '24 Feb 2026' },
  ];

  const ultimosProveedores = [
    { id: 1, empresa: 'AutoMaster Parts', paquete: 'Premium', estado: 'Aprobado', fecha: '26 Feb 2026' },
    { id: 2, empresa: 'Speed Racing', paquete: 'Estándar', estado: 'Pendiente', fecha: '26 Feb 2026' },
    { id: 3, empresa: 'Turbo Tech', paquete: 'Premium', estado: 'Aprobado', fecha: '25 Feb 2026' },
    { id: 4, empresa: 'Elite Motors', paquete: 'VIP', estado: 'Aprobado', fecha: '25 Feb 2026' },
    { id: 5, empresa: 'Car Care Solutions', paquete: 'Estándar', estado: 'Pendiente', fecha: '24 Feb 2026' },
  ];

  return (
    <AdminLayout>
      {/* Page Content */}
      <main className="p-4 lg:p-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-500">Resumen general de tus eventos</p>
        </div>

        {/* 1️⃣ Barra Superior de Filtros */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap gap-3">
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            >
              <option>Expo Car Show 2026</option>
              <option>Expo Boda 2026</option>
              <option>Expo XV 2026</option>
              <option>Todos los eventos</option>
            </select>
            
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            >
              <option>Temporada 2026</option>
              <option>Temporada 2025</option>
              <option>Temporada 2024</option>
            </select>
            
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            >
              <option>Últimos 7 días</option>
              <option>Hoy</option>
              <option>Últimos 30 días</option>
              <option>Personalizado</option>
            </select>
          </div>
        </div>

        {/* 2️⃣ Fila de KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Tarjeta 1 - Total Asistentes */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                <TrendingUp className="w-4 h-4" />
                <span>{eventData.crecimientoAsistentes}%</span>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{eventData.asistentes}</h3>
            <p className="text-sm text-gray-500">Total Asistentes</p>
            <p className="text-xs text-green-600 mt-2">+{eventData.crecimientoAsistentes}% vs periodo anterior</p>
          </div>

          {/* Tarjeta 2 - Total Proveedores */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 text-orange-600 text-sm font-medium">
                <AlertCircle className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{eventData.proveedores}</h3>
            <p className="text-sm text-gray-500">Total Proveedores</p>
            <p className="text-xs text-orange-600 mt-2">{eventData.proveedoresPendientes} pendientes de aprobación</p>
          </div>

          {/* Tarjeta 3 - Ingresos Totales */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/30">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                <TrendingUp className="w-4 h-4" />
                <span>{eventData.crecimientoIngresos}%</span>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">${eventData.ingresos.toLocaleString()}</h3>
            <p className="text-sm text-gray-500">Ingresos Totales</p>
            <p className="text-xs text-green-600 mt-2">+{eventData.crecimientoIngresos}% crecimiento</p>
          </div>

          {/* Tarjeta 4 - Pagos Pendientes */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/30">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 text-amber-600 text-sm font-medium">
                <AlertCircle className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{eventData.pagos}</h3>
            <p className="text-sm text-gray-500">Pagos Pendientes</p>
            <p className="text-xs text-amber-600 mt-2">Requieren validación</p>
          </div>
        </div>

        {/* 3️⃣ Gráfica Principal - Registros por Día */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Registros por Día</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setChartView('asistentes')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  chartView === 'asistentes'
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Asistentes
              </button>
              <button
                onClick={() => setChartView('proveedores')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  chartView === 'proveedores'
                    ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Proveedores
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={registrosData}>
              <defs>
                <linearGradient id="colorAsistentes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorProveedores" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#A855F7" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#A855F7" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="fecha" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E5E7EB', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }} 
              />
              <Area
                type="monotone"
                dataKey={chartView}
                stroke={chartView === 'asistentes' ? '#3B82F6' : '#A855F7'}
                strokeWidth={2}
                fillOpacity={1}
                fill={chartView === 'asistentes' ? 'url(#colorAsistentes)' : 'url(#colorProveedores)'}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* 4️⃣ Sección Ingresos + Alertas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Columna izquierda - Gráfica de Ingresos */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Ingresos por Evento</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ingresosData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="evento" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E5E7EB', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                  formatter={(value: number) => `$${value.toLocaleString()}`}
                />
                <Bar dataKey="ingresos" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#6366F1" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Columna derecha - Panel de Alertas */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Alertas</h2>
            <div className="space-y-3">
              {alertas.map((alerta) => (
                <div key={alerta.id} className={`flex items-start gap-3 p-3 rounded-lg ${alerta.color}`}>
                  <div className="mt-0.5">
                    <alerta.icono className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-medium flex-1">{alerta.mensaje}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 5️⃣ Tabla Resumen Inferior */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Últimos Asistentes */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Últimos Asistentes Registrados</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Ver todos</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nombre</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tipo</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Estado</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Fecha</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {ultimosAsistentes.map((asistente) => (
                    <tr key={asistente.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{asistente.nombre}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asistente.tipo}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          asistente.estado === 'Confirmado' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {asistente.estado}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asistente.fecha}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Últimos Proveedores */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Últimos Proveedores Registrados</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Ver todos</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Empresa</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Paquete</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Estado</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Fecha</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {ultimosProveedores.map((proveedor) => (
                    <tr key={proveedor.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{proveedor.empresa}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{proveedor.paquete}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          proveedor.estado === 'Aprobado' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {proveedor.estado}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{proveedor.fecha}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </AdminLayout>
  );
}