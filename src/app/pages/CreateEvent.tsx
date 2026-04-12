import { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  ArrowLeft,
  Upload,
  Info,
  Save,
  Send,
  X
} from 'lucide-react';
import AdminLayout from '../components/AdminLayout';

export default function CreateEvent() {
  const navigate = useNavigate();
  
  // Estados del formulario
  const [eventName, setEventName] = useState('');
  const [eventType, setEventType] = useState('');
  const [season, setSeason] = useState('2026');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [eventImage, setEventImage] = useState<string | null>(null);
  
  // Sección 2 - Configuración de Registro
  const [isFree, setIsFree] = useState(true);
  const [entryPrice, setEntryPrice] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('');
  const [attendeeTypes, setAttendeeTypes] = useState({
    general: true,
    vip: false,
    prensa: false,
  });
  const [registrationActive, setRegistrationActive] = useState(true);
  
  // Sección 3 - Proveedores
  const [providerRegistrationActive, setProviderRegistrationActive] = useState(true);
  const [packages, setPackages] = useState([
    { id: 1, name: 'Estándar', price: '5000', stands: '20' },
  ]);
  
  // Sección 4 - Integraciones
  const [ticketmasterUrl, setTicketmasterUrl] = useState('');
  
  // Estado del formulario
  const [eventStatus, setEventStatus] = useState('Borrador');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEventImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addPackage = () => {
    setPackages([...packages, { 
      id: packages.length + 1, 
      name: '', 
      price: '', 
      stands: '' 
    }]);
  };

  const removePackage = (id: number) => {
    setPackages(packages.filter(pkg => pkg.id !== id));
  };

  const updatePackage = (id: number, field: string, value: string) => {
    setPackages(packages.map(pkg => 
      pkg.id === id ? { ...pkg, [field]: value } : pkg
    ));
  };

  const handleSave = () => {
    console.log('Guardando evento como borrador...');
    navigate('/admin/eventos');
  };

  const handlePublish = () => {
    console.log('Publicando evento...');
    navigate('/admin/eventos');
  };

  return (
    <AdminLayout>
      <div className="p-4 lg:p-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/admin/eventos')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Volver a Eventos</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Crear Nuevo Evento</h1>
          <p className="text-gray-500">Completa la información para crear tu evento</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulario Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* 🧩 Sección 1 – Información General */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">1</span>
                </div>
                Información General
              </h2>

              <div className="space-y-4">
                {/* Nombre del Evento */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nombre del evento <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    placeholder="Ej. Expo Car Show 2026"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                {/* Tipo y Temporada */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tipo de evento <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    >
                      <option value="">Seleccionar tipo</option>
                      <option value="Automotriz">Automotriz</option>
                      <option value="Bodas">Bodas</option>
                      <option value="XV Años">XV Años</option>
                      <option value="Familiar">Familiar</option>
                      <option value="Tecnología">Tecnología</option>
                      <option value="Moda">Moda</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Temporada <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={season}
                      onChange={(e) => setSeason(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    >
                      <option value="2026">2026</option>
                      <option value="2025">2025</option>
                      <option value="2024">2024</option>
                    </select>
                  </div>
                </div>

                {/* Fechas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Fecha de inicio <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Fecha de fin <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>

                {/* Ubicación */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ubicación <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Ej. Centro de Convenciones CDMX"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                {/* Imagen del Evento */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Imagen principal del evento
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors">
                    {eventImage ? (
                      <div className="relative">
                        <img src={eventImage} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                        <button
                          onClick={() => setEventImage(null)}
                          className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center cursor-pointer">
                        <Upload className="w-12 h-12 text-gray-400 mb-3" />
                        <span className="text-sm font-medium text-gray-700 mb-1">Subir imagen</span>
                        <span className="text-xs text-gray-500">PNG, JPG hasta 5MB</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 🧩 Sección 2 – Configuración de Registro */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-sm">2</span>
                </div>
                Configuración de Registro
              </h2>

              <div className="space-y-4">
                {/* Evento Gratuito / Pago */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Tipo de entrada</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {isFree ? 'Evento gratuito' : 'Evento de pago'}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsFree(!isFree)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      isFree ? 'bg-gray-300' : 'bg-blue-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isFree ? 'translate-x-1' : 'translate-x-6'
                      }`}
                    />
                  </button>
                </div>

                {/* Precio de Entrada */}
                {!isFree && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Precio de entrada (MXN)
                    </label>
                    <input
                      type="number"
                      value={entryPrice}
                      onChange={(e) => setEntryPrice(e.target.value)}
                      placeholder="0.00"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>
                )}

                {/* Cupo Máximo */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Cupo máximo de asistentes
                  </label>
                  <input
                    type="number"
                    value={maxCapacity}
                    onChange={(e) => setMaxCapacity(e.target.value)}
                    placeholder="Ej. 5000"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                {/* Tipos de Asistentes */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Tipos de asistentes habilitados
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={attendeeTypes.general}
                        onChange={(e) => setAttendeeTypes({ ...attendeeTypes, general: e.target.checked })}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500/20"
                      />
                      <span className="text-sm text-gray-700">General</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={attendeeTypes.vip}
                        onChange={(e) => setAttendeeTypes({ ...attendeeTypes, vip: e.target.checked })}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500/20"
                      />
                      <span className="text-sm text-gray-700">VIP</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={attendeeTypes.prensa}
                        onChange={(e) => setAttendeeTypes({ ...attendeeTypes, prensa: e.target.checked })}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500/20"
                      />
                      <span className="text-sm text-gray-700">Prensa</span>
                    </label>
                  </div>
                </div>

                {/* Activar/Desactivar Registro */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Registro de asistentes</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {registrationActive ? 'Registro activado' : 'Registro desactivado'}
                    </p>
                  </div>
                  <button
                    onClick={() => setRegistrationActive(!registrationActive)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      registrationActive ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        registrationActive ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* 🧩 Sección 3 – Proveedores / Expositores */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-bold text-sm">3</span>
                </div>
                Proveedores / Expositores
              </h2>

              <div className="space-y-4">
                {/* Activar Registro de Proveedores */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Registro de proveedores</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {providerRegistrationActive ? 'Registro activado' : 'Registro desactivado'}
                    </p>
                  </div>
                  <button
                    onClick={() => setProviderRegistrationActive(!providerRegistrationActive)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      providerRegistrationActive ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        providerRegistrationActive ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Paquetes */}
                {providerRegistrationActive && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-semibold text-gray-700">
                        Paquetes disponibles
                      </label>
                      <button
                        onClick={addPackage}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        + Agregar paquete
                      </button>
                    </div>
                    <div className="space-y-3">
                      {packages.map((pkg) => (
                        <div key={pkg.id} className="border border-gray-300 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <span className="text-sm font-semibold text-gray-700">Paquete #{pkg.id}</span>
                            {packages.length > 1 && (
                              <button
                                onClick={() => removePackage(pkg.id)}
                                className="text-red-500 hover:text-red-600"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <input
                              type="text"
                              value={pkg.name}
                              onChange={(e) => updatePackage(pkg.id, 'name', e.target.value)}
                              placeholder="Nombre del paquete"
                              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                            />
                            <input
                              type="number"
                              value={pkg.price}
                              onChange={(e) => updatePackage(pkg.id, 'price', e.target.value)}
                              placeholder="Precio (MXN)"
                              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                            />
                            <input
                              type="number"
                              value={pkg.stands}
                              onChange={(e) => updatePackage(pkg.id, 'stands', e.target.value)}
                              placeholder="Stands disponibles"
                              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 🧩 Sección 4 – Integraciones */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                  <span className="text-amber-600 font-bold text-sm">4</span>
                </div>
                Integraciones (Opcional)
              </h2>

              <div className="space-y-4">
                {/* URL Ticketmaster */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    URL Ticketmaster
                  </label>
                  <input
                    type="url"
                    value={ticketmasterUrl}
                    onChange={(e) => setTicketmasterUrl(e.target.value)}
                    placeholder="https://ticketmaster.com.mx/..."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                  <div className="flex items-start gap-2 mt-2 p-3 bg-blue-50 rounded-lg">
                    <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-blue-700">
                      Estos códigos son proporcionados por el cliente. Si el evento tiene integración con Ticketmaster, pega aquí la URL.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Derecha - Acciones */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Publicación</h3>
              
              {/* Estado del Evento */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Estado del evento
                </label>
                <select
                  value={eventStatus}
                  onChange={(e) => setEventStatus(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                >
                  <option value="Borrador">Borrador</option>
                  <option value="Publicado">Publicado</option>
                  <option value="Cerrado">Cerrado</option>
                </select>
              </div>

              {/* Botones de Acción */}
              <div className="space-y-3">
                <button
                  onClick={handleSave}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-medium"
                >
                  <Save className="w-5 h-5" />
                  <span>Guardar borrador</span>
                </button>
                <button
                  onClick={handlePublish}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all font-medium"
                >
                  <Send className="w-5 h-5" />
                  <span>Publicar evento</span>
                </button>
              </div>

              {/* Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-gray-500">
                    Los eventos en borrador no son visibles para el público. Publica el evento cuando esté listo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
