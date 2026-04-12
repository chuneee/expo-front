import { useState } from 'react';
import { 
  QrCode,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Camera,
  Keyboard,
  Users,
  Building2,
  Clock,
  Calendar,
  ArrowRight,
  TrendingUp,
  X
} from 'lucide-react';
import AdminLayout from '../components/AdminLayout';

type ValidationStatus = 'idle' | 'valid' | 'duplicate' | 'invalid';

interface ValidationResult {
  status: ValidationStatus;
  nombre?: string;
  tipo?: 'Asistente' | 'Proveedor';
  evento?: string;
  tipoAcceso?: string;
  hora?: string;
  horaAnterior?: string;
}

interface ValidationHistory {
  id: number;
  nombre: string;
  tipo: 'Asistente' | 'Proveedor';
  hora: string;
  estado: 'Autorizado' | 'Duplicado';
}

export default function ValidationManagement() {
  const [selectedEvent, setSelectedEvent] = useState('Expo Car Show 2026');
  const [showEventSelector, setShowEventSelector] = useState(false);
  const [scanMode, setScanMode] = useState<'camera' | 'manual'>('camera');
  const [manualCode, setManualCode] = useState('');
  const [validationResult, setValidationResult] = useState<ValidationResult>({ status: 'idle' });
  
  // Estadísticas en tiempo real
  const [stats, setStats] = useState({
    totalIngresados: 247,
    asistentes: 198,
    proveedores: 49
  });

  // Historial
  const [history, setHistory] = useState<ValidationHistory[]>([
    { id: 1, nombre: 'Carlos Rodríguez', tipo: 'Asistente', hora: '09:15', estado: 'Autorizado' },
    { id: 2, nombre: 'AutoParts Premium', tipo: 'Proveedor', hora: '09:12', estado: 'Autorizado' },
    { id: 3, nombre: 'María González', tipo: 'Asistente', hora: '09:08', estado: 'Autorizado' },
    { id: 4, nombre: 'Tech Motors', tipo: 'Proveedor', hora: '09:05', estado: 'Autorizado' },
    { id: 5, nombre: 'Ana López', tipo: 'Asistente', hora: '09:02', estado: 'Duplicado' },
  ]);

  const handleScanQR = () => {
    // Simulación de escaneo (en producción, esto usaría una librería de QR)
    const scenarios: ValidationResult[] = [
      {
        status: 'valid',
        nombre: 'Juan Pérez',
        tipo: 'Asistente',
        evento: 'Expo Car Show 2026',
        tipoAcceso: 'General',
        hora: new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
      },
      {
        status: 'duplicate',
        nombre: 'María López',
        tipo: 'Proveedor',
        evento: 'Expo Car Show 2026',
        tipoAcceso: 'Expositor Premium',
        hora: new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }),
        horaAnterior: '08:45'
      },
      {
        status: 'invalid'
      }
    ];

    const randomResult = scenarios[Math.floor(Math.random() * scenarios.length)];
    setValidationResult(randomResult);

    // Actualizar stats si es válido
    if (randomResult.status === 'valid') {
      setStats(prev => ({
        totalIngresados: prev.totalIngresados + 1,
        asistentes: prev.asistentes + (randomResult.tipo === 'Asistente' ? 1 : 0),
        proveedores: prev.proveedores + (randomResult.tipo === 'Proveedor' ? 1 : 0)
      }));

      // Agregar al historial
      setHistory(prev => [{
        id: Date.now(),
        nombre: randomResult.nombre!,
        tipo: randomResult.tipo!,
        hora: randomResult.hora!,
        estado: 'Autorizado'
      }, ...prev].slice(0, 10));
    }
  };

  const handleManualValidation = () => {
    if (manualCode.trim()) {
      handleScanQR();
      setManualCode('');
    }
  };

  const resetValidation = () => {
    setValidationResult({ status: 'idle' });
    setManualCode('');
  };

  return (
    <AdminLayout>
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-50 to-gray-100 p-4 lg:p-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">Validación de Accesos</h1>
              <p className="text-gray-500">Escanea el código QR para permitir el ingreso</p>
            </div>
          </div>

          {/* Evento Activo */}
          <div className="flex items-center gap-3 mt-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold">
              <Calendar className="w-5 h-5" />
              <span>{selectedEvent}</span>
            </div>
            <button 
              onClick={() => setShowEventSelector(true)}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium text-sm"
            >
              Cambiar evento
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Área Principal */}
          <div className="lg:col-span-2">
            {validationResult.status === 'idle' ? (
              /* Estado Inicial - Escáner */
              <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 shadow-lg">
                {scanMode === 'camera' ? (
                  <div className="text-center">
                    {/* Marco de escaneo */}
                    <div className="relative mx-auto w-full max-w-md aspect-square mb-6">
                      <div className="absolute inset-0 border-4 border-blue-500 rounded-2xl animate-pulse">
                        <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-blue-600 rounded-tl-2xl"></div>
                        <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-blue-600 rounded-tr-2xl"></div>
                        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-blue-600 rounded-bl-2xl"></div>
                        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-blue-600 rounded-br-2xl"></div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <Camera className="w-20 h-20 text-blue-500 mx-auto mb-4" />
                          <p className="text-gray-600 font-medium">Coloca el código QR dentro del área</p>
                        </div>
                      </div>
                    </div>

                    {/* Botón para simular escaneo */}
                    <button
                      onClick={handleScanQR}
                      className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all font-bold text-lg mb-4"
                    >
                      Simular Escaneo QR
                    </button>

                    <button
                      onClick={() => setScanMode('manual')}
                      className="flex items-center justify-center gap-2 mx-auto text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <Keyboard className="w-5 h-5" />
                      <span>Ingresar código manualmente</span>
                    </button>
                  </div>
                ) : (
                  /* Modo Manual */
                  <div className="text-center max-w-md mx-auto">
                    <QrCode className="w-16 h-16 text-blue-500 mx-auto mb-6" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Ingreso Manual</h3>
                    <p className="text-gray-500 mb-6">Escribe el código del gafete</p>

                    <input
                      type="text"
                      value={manualCode}
                      onChange={(e) => setManualCode(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleManualValidation()}
                      placeholder="Ej: TXN-20260215-001"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-center text-lg font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 mb-4"
                      autoFocus
                    />

                    <button
                      onClick={handleManualValidation}
                      className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all font-bold text-lg mb-4"
                    >
                      Validar Código
                    </button>

                    <button
                      onClick={() => {
                        setScanMode('camera');
                        setManualCode('');
                      }}
                      className="flex items-center justify-center gap-2 mx-auto text-gray-600 hover:text-gray-700 font-medium"
                    >
                      <Camera className="w-5 h-5" />
                      <span>Volver a escanear QR</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Resultado de Validación */
              <div className={`bg-white rounded-2xl border-4 p-8 shadow-2xl ${
                validationResult.status === 'valid' ? 'border-green-500' :
                validationResult.status === 'duplicate' ? 'border-orange-500' :
                'border-red-500'
              }`}>
                <div className="text-center max-w-md mx-auto">
                  {/* Icono */}
                  <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
                    validationResult.status === 'valid' ? 'bg-green-100' :
                    validationResult.status === 'duplicate' ? 'bg-orange-100' :
                    'bg-red-100'
                  }`}>
                    {validationResult.status === 'valid' && (
                      <CheckCircle className="w-14 h-14 text-green-600" />
                    )}
                    {validationResult.status === 'duplicate' && (
                      <AlertTriangle className="w-14 h-14 text-orange-600" />
                    )}
                    {validationResult.status === 'invalid' && (
                      <XCircle className="w-14 h-14 text-red-600" />
                    )}
                  </div>

                  {/* Mensaje */}
                  <h2 className={`text-3xl font-bold mb-2 ${
                    validationResult.status === 'valid' ? 'text-green-600' :
                    validationResult.status === 'duplicate' ? 'text-orange-600' :
                    'text-red-600'
                  }`}>
                    {validationResult.status === 'valid' && 'Acceso Autorizado'}
                    {validationResult.status === 'duplicate' && 'Acceso ya Registrado'}
                    {validationResult.status === 'invalid' && 'Código Inválido'}
                  </h2>

                  {/* Detalles */}
                  {(validationResult.status === 'valid' || validationResult.status === 'duplicate') && (
                    <div className="space-y-4 mt-8 mb-8">
                      <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-xs text-gray-500 mb-1">Nombre</p>
                        <p className="text-lg font-bold text-gray-900">{validationResult.nombre}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 rounded-xl p-4">
                          <p className="text-xs text-gray-500 mb-1">Tipo</p>
                          <div className="flex items-center gap-2">
                            {validationResult.tipo === 'Asistente' ? (
                              <Users className="w-4 h-4 text-blue-600" />
                            ) : (
                              <Building2 className="w-4 h-4 text-purple-600" />
                            )}
                            <p className="text-sm font-bold text-gray-900">{validationResult.tipo}</p>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-4">
                          <p className="text-xs text-gray-500 mb-1">Acceso</p>
                          <p className="text-sm font-bold text-gray-900">{validationResult.tipoAcceso}</p>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-xs text-gray-500 mb-1">Hora de validación</p>
                        <div className="flex items-center justify-center gap-2">
                          <Clock className="w-4 h-4 text-gray-600" />
                          <p className="text-lg font-bold text-gray-900">{validationResult.hora}</p>
                        </div>
                      </div>

                      {validationResult.status === 'duplicate' && validationResult.horaAnterior && (
                        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                          <p className="text-xs text-orange-700 mb-1">Primer acceso registrado</p>
                          <p className="text-sm font-bold text-orange-900">{validationResult.horaAnterior}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {validationResult.status === 'invalid' && (
                    <p className="text-gray-600 mt-4 mb-8">
                      El código escaneado no es válido o no pertenece a este evento
                    </p>
                  )}

                  {/* Botón de Acción */}
                  <button
                    onClick={resetValidation}
                    className={`w-full px-6 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                      validationResult.status === 'valid' 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg hover:shadow-green-500/30'
                        : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/30'
                    }`}
                  >
                    {validationResult.status === 'valid' ? (
                      <>
                        <span>Validar Siguiente</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    ) : (
                      <span>Intentar Nuevamente</span>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Derecha */}
          <div className="space-y-6">
            {/* Contador en Tiempo Real */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">En Tiempo Real</h3>
                <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Activo</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-blue-700 font-medium">Total Ingresados</p>
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-4xl font-bold text-blue-600">{stats.totalIngresados}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <p className="text-sm text-gray-600 font-medium">Asistentes</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stats.asistentes}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Building2 className="w-5 h-5 text-purple-600" />
                    <p className="text-sm text-gray-600 font-medium">Proveedores</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stats.proveedores}</p>
                </div>
              </div>
            </div>

            {/* Historial Reciente */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Historial Reciente</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {history.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      item.tipo === 'Asistente' ? 'bg-blue-100' : 'bg-purple-100'
                    }`}>
                      {item.tipo === 'Asistente' ? (
                        <Users className="w-5 h-5 text-blue-600" />
                      ) : (
                        <Building2 className="w-5 h-5 text-purple-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{item.nombre}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{item.hora}</span>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      item.estado === 'Autorizado' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {item.estado}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Cambiar Evento */}
      {showEventSelector && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Seleccionar Evento</h2>
              <button
                onClick={() => setShowEventSelector(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="space-y-3">
              {['Expo Car Show 2026', 'Expo Boda Dreams', 'Expo XV Años Mágicos', 'Expo Baby & Kids'].map((event) => (
                <button
                  key={event}
                  onClick={() => {
                    setSelectedEvent(event);
                    setShowEventSelector(false);
                    resetValidation();
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                    selectedEvent === event
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                      : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5" />
                    <span className="font-semibold">{event}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
