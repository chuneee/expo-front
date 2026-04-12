import { useState } from 'react';
import { 
  Download, 
  Filter,
  Search,
  Building2,
  CheckCircle,
  Clock,
  XCircle,
  CreditCard,
  MoreVertical,
  Eye,
  CheckSquare,
  Ban,
  Edit,
  FileDown,
  Calendar,
  Mail,
  Phone,
  Globe,
  MapPin,
  QrCode,
  X,
  TrendingUp,
  DollarSign,
  UserPlus,
  Plus,
  Image as ImageIcon,
  AlertCircle,
  Package
} from 'lucide-react';
import AdminLayout from '../components/AdminLayout';

type ProviderStatus = 'Aprobado' | 'Pagado' | 'Pendiente' | 'Rechazado';

interface Provider {
  id: number;
  empresa: string;
  logo?: string;
  contacto: string;
  email: string;
  telefono: string;
  categoria: string;
  paquete: string;
  precio: number;
  stand?: string;
  metodoPago: string;
  estado: ProviderStatus;
  fechaRegistro: string;
  sitioWeb?: string;
  evento: string;
  gafetesIncluidos: number;
  referencia?: string;
  fechaPago?: string;
  fechaAprobacion?: string;
  comprobante?: string;
}

export default function ProvidersManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEvent, setFilterEvent] = useState('Todos');
  const [filterStatus, setFilterStatus] = useState('Todos');
  const [filterCategory, setFilterCategory] = useState('Todas');
  const [filterPackage, setFilterPackage] = useState('Todos');
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);

  // Mock data
  const proveedores: Provider[] = [
    {
      id: 1,
      empresa: 'AutoParts Premium',
      contacto: 'Roberto Méndez',
      email: 'roberto@autoparts.com',
      telefono: '+52 555 1111 2222',
      categoria: 'Automotriz',
      paquete: 'Premium',
      precio: 15000,
      stand: 'A-101',
      metodoPago: 'Stripe',
      estado: 'Aprobado',
      fechaRegistro: '2026-02-10 09:30',
      sitioWeb: 'www.autoparts.com',
      evento: 'Expo Car Show 2026',
      gafetesIncluidos: 5,
      referencia: 'STR-20260210-034',
      fechaPago: '2026-02-10 10:15',
      fechaAprobacion: '2026-02-11 14:20'
    },
    {
      id: 2,
      empresa: 'Novias Elegantes',
      contacto: 'María Fernández',
      email: 'maria@noviaselegantes.com',
      telefono: '+52 555 3333 4444',
      categoria: 'Moda y Vestidos',
      paquete: 'Estándar',
      precio: 8000,
      stand: 'B-205',
      metodoPago: 'Transferencia',
      estado: 'Pagado',
      fechaRegistro: '2026-02-12 11:20',
      sitioWeb: 'www.noviaselegantes.com',
      evento: 'Expo Boda Dreams',
      gafetesIncluidos: 3,
      referencia: 'TRF-20260212-089',
      fechaPago: '2026-02-13 08:45'
    },
    {
      id: 3,
      empresa: 'Decoración XV Años',
      contacto: 'Ana López',
      email: 'ana@decoracion15.com',
      telefono: '+52 555 5555 6666',
      categoria: 'Decoración',
      paquete: 'Premium',
      precio: 12000,
      metodoPago: 'Stripe',
      estado: 'Pendiente',
      fechaRegistro: '2026-02-20 15:45',
      evento: 'Expo XV Años Mágicos',
      gafetesIncluidos: 4,
      referencia: 'STR-20260220-156'
    },
    {
      id: 4,
      empresa: 'Tech Motors',
      contacto: 'Carlos Ramírez',
      email: 'carlos@techmotors.com',
      telefono: '+52 555 7777 8888',
      categoria: 'Tecnología Automotriz',
      paquete: 'VIP',
      precio: 25000,
      stand: 'A-001',
      metodoPago: 'Transferencia',
      estado: 'Aprobado',
      fechaRegistro: '2026-02-05 10:10',
      sitioWeb: 'www.techmotors.com',
      evento: 'Expo Car Show 2026',
      gafetesIncluidos: 8,
      referencia: 'TRF-20260205-012',
      fechaPago: '2026-02-06 09:30',
      fechaAprobacion: '2026-02-07 11:00'
    },
    {
      id: 5,
      empresa: 'Fotografía Profesional',
      contacto: 'Luis Torres',
      email: 'luis@fotopro.com',
      telefono: '+52 555 9999 0000',
      categoria: 'Fotografía',
      paquete: 'Estándar',
      precio: 7000,
      metodoPago: 'Stripe',
      estado: 'Rechazado',
      fechaRegistro: '2026-01-28 13:20',
      evento: 'Expo Boda Dreams',
      gafetesIncluidos: 2,
      referencia: 'STR-20260128-078'
    },
    {
      id: 6,
      empresa: 'Baby Store',
      contacto: 'Patricia Sánchez',
      email: 'patricia@babystore.com',
      telefono: '+52 555 1234 5678',
      categoria: 'Productos Infantiles',
      paquete: 'Premium',
      precio: 10000,
      stand: 'C-308',
      metodoPago: 'Transferencia',
      estado: 'Aprobado',
      fechaRegistro: '2026-02-15 16:30',
      sitioWeb: 'www.babystore.com',
      evento: 'Expo Baby & Kids',
      gafetesIncluidos: 4,
      referencia: 'TRF-20260215-145',
      fechaPago: '2026-02-16 10:00',
      fechaAprobacion: '2026-02-17 09:15'
    },
  ];

  // Filtrar proveedores
  const filteredProviders = proveedores.filter((proveedor) => {
    const matchSearch = 
      proveedor.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proveedor.contacto.toLowerCase().includes(searchTerm.toLowerCase());
    const matchEvent = filterEvent === 'Todos' || proveedor.evento === filterEvent;
    const matchStatus = filterStatus === 'Todos' || proveedor.estado === filterStatus;
    const matchCategory = filterCategory === 'Todas' || proveedor.categoria === filterCategory;
    const matchPackage = filterPackage === 'Todos' || proveedor.paquete === filterPackage;
    return matchSearch && matchEvent && matchStatus && matchCategory && matchPackage;
  });

  // Calcular métricas
  const totalProveedores = proveedores.length;
  const totalAprobados = proveedores.filter(p => p.estado === 'Aprobado').length;
  const totalPendientes = proveedores.filter(p => p.estado === 'Pendiente').length;
  const ingresosStands = proveedores
    .filter(p => p.estado === 'Aprobado' || p.estado === 'Pagado')
    .reduce((sum, p) => sum + p.precio, 0);

  const getStatusColor = (estado: ProviderStatus) => {
    switch (estado) {
      case 'Aprobado':
        return 'bg-green-100 text-green-700';
      case 'Pagado':
        return 'bg-blue-100 text-blue-700';
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-700';
      case 'Rechazado':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (estado: ProviderStatus) => {
    switch (estado) {
      case 'Aprobado':
        return <CheckCircle className="w-4 h-4" />;
      case 'Pagado':
        return <CreditCard className="w-4 h-4" />;
      case 'Pendiente':
        return <Clock className="w-4 h-4" />;
      case 'Rechazado':
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Proveedores / Expositores</h1>
            <p className="text-gray-500">Gestiona, aprueba y administra la participación de marcas en tus eventos</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium">
              <Filter className="w-5 h-5" />
              <span>Filtros avanzados</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium">
              <UserPlus className="w-5 h-5" />
              <span>Crear proveedor manual</span>
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
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex items-center gap-1 text-green-600 text-xs font-medium">
                <TrendingUp className="w-3 h-3" />
                <span>8%</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{totalProveedores}</h3>
            <p className="text-xs text-gray-500">Total Proveedores</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-xs text-gray-500">{((totalAprobados / totalProveedores) * 100).toFixed(0)}%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{totalAprobados}</h3>
            <p className="text-xs text-gray-500">Total Aprobados</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <span className="text-xs text-gray-500">{((totalPendientes / totalProveedores) * 100).toFixed(0)}%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{totalPendientes}</h3>
            <p className="text-xs text-gray-500">Total Pendientes</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex items-center gap-1 text-green-600 text-xs font-medium">
                <TrendingUp className="w-3 h-3" />
                <span>15%</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">${ingresosStands.toLocaleString()}</h3>
            <p className="text-xs text-gray-500">Ingresos por Stands</p>
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
                placeholder="Buscar por empresa o contacto..."
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
              <option>Aprobado</option>
              <option>Pagado</option>
              <option>Pendiente</option>
              <option>Rechazado</option>
            </select>

            {/* Filtro Categoría */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            >
              <option>Todas</option>
              <option>Automotriz</option>
              <option>Moda y Vestidos</option>
              <option>Decoración</option>
              <option>Tecnología Automotriz</option>
              <option>Fotografía</option>
              <option>Productos Infantiles</option>
            </select>
          </div>

          {/* Segunda Fila de Filtros */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-3">
            {/* Filtro Paquete */}
            <select
              value={filterPackage}
              onChange={(e) => setFilterPackage(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            >
              <option>Todos los paquetes</option>
              <option>VIP</option>
              <option>Premium</option>
              <option>Estándar</option>
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

        {/* Tabla de Proveedores */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Empresa
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Contacto Principal
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Categoría
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Tipo de Paquete
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Stand Asignado
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
                {filteredProviders.map((proveedor) => (
                  <tr 
                    key={proveedor.id} 
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{proveedor.empresa}</p>
                          <p className="text-xs text-gray-500">{proveedor.evento}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{proveedor.contacto}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                          <Mail className="w-3 h-3" />
                          <span className="max-w-[150px] truncate">{proveedor.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-medium">
                        {proveedor.categoria}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700">{proveedor.paquete}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {proveedor.stand ? (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-semibold text-gray-900">{proveedor.stand}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 italic">Sin asignar</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <CreditCard className="w-4 h-4 text-gray-400" />
                        {proveedor.metodoPago}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${getStatusColor(proveedor.estado)}`}>
                        {getStatusIcon(proveedor.estado)}
                        {proveedor.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {proveedor.fechaRegistro.split(' ')[0]}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuId(openMenuId === proveedor.id ? null : proveedor.id);
                          }}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-5 h-5 text-gray-600" />
                        </button>

                        {/* Dropdown Menu */}
                        {openMenuId === proveedor.id && (
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
                                  setSelectedProvider(proveedor);
                                  setOpenMenuId(null);
                                }}
                                className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                              >
                                <Eye className="w-4 h-4 text-gray-400" />
                                Ver detalle
                              </button>
                              <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                                <CheckSquare className="w-4 h-4 text-gray-400" />
                                Aprobar proveedor
                              </button>
                              <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                Asignar número de stand
                              </button>
                              <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                                <FileDown className="w-4 h-4 text-gray-400" />
                                Ver comprobante de pago
                              </button>
                              <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                                <Edit className="w-4 h-4 text-gray-400" />
                                Editar información
                              </button>
                              <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                                <QrCode className="w-4 h-4 text-gray-400" />
                                Descargar gafetes
                              </button>
                              <div className="border-t border-gray-200 my-2" />
                              <button className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors">
                                <XCircle className="w-4 h-4" />
                                Rechazar solicitud
                              </button>
                              <button className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors">
                                <Ban className="w-4 h-4" />
                                Cancelar participación
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
          {filteredProviders.length === 0 && (
            <div className="py-12 text-center">
              <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-sm">No se encontraron proveedores</p>
            </div>
          )}
        </div>

        {/* Stats Footer */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <p>Mostrando {filteredProviders.length} de {proveedores.length} proveedores</p>
        </div>
      </div>

      {/* Panel Lateral de Detalle */}
      {selectedProvider && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-end sm:items-center justify-end z-50">
          <div 
            className="absolute inset-0" 
            onClick={() => setSelectedProvider(null)}
          />
          <div className="relative bg-white w-full sm:w-[600px] h-[90vh] sm:h-full sm:max-h-[90vh] overflow-y-auto shadow-2xl sm:rounded-l-2xl">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-purple-500 to-indigo-600 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">{selectedProvider.empresa}</h2>
                  <p className="text-purple-100 text-sm">ID: #{selectedProvider.id}</p>
                </div>
                <button
                  onClick={() => setSelectedProvider(null)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium ${getStatusColor(selectedProvider.estado)}`}>
                {getStatusIcon(selectedProvider.estado)}
                {selectedProvider.estado}
              </span>
            </div>

            {/* Contenido */}
            <div className="p-6 space-y-6">
              {/* Información General */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Información General</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Building2 className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Nombre de la empresa</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedProvider.empresa}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Contacto principal</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedProvider.contacto}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Email</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedProvider.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Teléfono</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedProvider.telefono}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Package className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Categoría</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedProvider.categoria}</p>
                    </div>
                  </div>
                  {selectedProvider.sitioWeb && (
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <Globe className="w-5 h-5 text-purple-600 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">Sitio web</p>
                        <a href={`https://${selectedProvider.sitioWeb}`} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-blue-600 hover:underline">
                          {selectedProvider.sitioWeb}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Participación */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Participación</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Evento</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedProvider.evento}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Package className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Tipo de paquete</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedProvider.paquete}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <DollarSign className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Precio del paquete</p>
                      <p className="text-sm font-semibold text-gray-900">${selectedProvider.precio.toLocaleString()} MXN</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Stand asignado</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedProvider.stand || 'Sin asignar'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <QrCode className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Gafetes incluidos</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedProvider.gafetesIncluidos} personas</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Estado del Pago */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Estado del Pago</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <CreditCard className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Método de pago</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedProvider.metodoPago}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Estado</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedProvider.estado}</p>
                    </div>
                  </div>
                  {selectedProvider.referencia && (
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <FileDown className="w-5 h-5 text-purple-600 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">Referencia</p>
                        <p className="text-sm font-semibold text-gray-900 font-mono">{selectedProvider.referencia}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Preview Comprobante */}
                  <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                    <div className="flex items-center justify-center mb-3">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                      </div>
                    </div>
                    <p className="text-xs text-center text-gray-500 mb-3">
                      {selectedProvider.estado === 'Pendiente' ? 'Esperando comprobante' : 'Comprobante subido'}
                    </p>
                    <button className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/30 transition-all font-medium text-sm">
                      Aprobar pago
                    </button>
                  </div>
                </div>
              </div>

              {/* Gafetes Expositor */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Gafetes del Expositor</h3>
                  <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium">
                    <Plus className="w-4 h-4" />
                    Agregar
                  </button>
                </div>
                <div className="space-y-3">
                  {[1, 2, 3].slice(0, selectedProvider.gafetesIncluidos).map((i) => (
                    <div key={i} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <QrCode className="w-6 h-6 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">Persona {i}</p>
                        <p className="text-xs text-gray-500">Gafete #{selectedProvider.id}0{i}</p>
                      </div>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <FileDown className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Historial */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Historial</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 border-l-4 border-purple-500 bg-purple-50 rounded-r-lg">
                    <Calendar className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Fecha de solicitud</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedProvider.fechaRegistro}</p>
                    </div>
                  </div>
                  {selectedProvider.fechaPago && (
                    <div className="flex items-start gap-3 p-3 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
                      <CreditCard className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">Fecha de pago</p>
                        <p className="text-sm font-semibold text-gray-900">{selectedProvider.fechaPago}</p>
                      </div>
                    </div>
                  )}
                  {selectedProvider.fechaAprobacion && (
                    <div className="flex items-start gap-3 p-3 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
                      <CheckSquare className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">Fecha de aprobación</p>
                        <p className="text-sm font-semibold text-gray-900">{selectedProvider.fechaAprobacion}</p>
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
                  <MapPin className="w-5 h-5" />
                  <span>Asignar stand</span>
                </button>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all font-medium">
                  <QrCode className="w-5 h-5" />
                  <span>Descargar todos los gafetes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
