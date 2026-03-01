import { useQuery } from '@tanstack/react-query';
import api from './api';
import { AgroAlert } from './components/AgroAlert';
import { WeatherChart } from './components/WeatherChart';
import { useLocationWeather } from './hooks/useWeather';
import { VpdWidget } from './components/VpdWidget';
import { TrendArrow } from './components/TrendArrow';
import { ExportButton } from './components/ExportButton';
import { GeoWidget } from './components/GeoWidget';


/**
 * Componente para cada Tarjeta de Ubicación
 * Maneja su propia lógica de carga y datos meteorológicos
 */
const LocationCard = ({ loc }) => {
  const { data: weatherHistory, isLoading, isError } = useLocationWeather(loc.id);

  if (isLoading) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 mb-6 animate-pulse">
        <div className="h-6 w-32 bg-slate-800 rounded mb-4"></div>
        <div className="h-16 bg-slate-800 rounded-xl mb-4"></div>
        <div className="h-32 bg-slate-800 rounded-xl"></div>
      </div>
    );
  }

  // Obtenemos la última lectura para el Widget de Alerta
  const history = weatherHistory || [];
  const lastReading = history.length > 0 ? history[history.length - 1] : null;
  const previousReading = history.length > 1 ? history[history.length - 2] : null;

  if (!lastReading) return null;

  console.log(history.slice(-2))

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 mb-6 shadow-xl transition-all hover:border-emerald-500/30">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-slate-100">{loc.name}</h2>
        <span className="text-[10px] text-slate-500 font-mono">ID: {loc.id}</span>
      </div>

      {/* Datos en tiempo real desde el Backend */}
      <GeoWidget lat={loc.latitude} lon={loc.longitude} name={loc.name} />

      <AgroAlert 
        temp={lastReading.temp} 
        humidity={lastReading.humidity} 
      />

      <VpdWidget 
        temp={lastReading.temp} 
        humidity={lastReading.humidity} 
      />

      <div className="mt-8">
        <div className="flex justify-between items-center mb-3">
          <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">
            Analytics Engine
          </p>
          
          {/* Botón de exportación con datos reales */}
          <ExportButton data={history} locationName={loc.name} />
        </div>

      <div className="mt-4">
        <div className="flex justify-between items-end mb-2">
          <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">
            Thermal History
          </p>
          <span className="text-emerald-400 text-[10px] font-mono">
            {lastReading.temp}°C
          </span>
        </div>
        
        {/* Gráfica con datos reales de la BD */}
        <WeatherChart data={weatherHistory || []} />
      </div>

      {isError && (
        <p className="text-red-400 text-[10px] mt-2 italic text-center">
          Error al sincronizar datos en tiempo real
        </p>
      )}
    </div>
  );
};

/**
 * Componente Principal
 */
function App() {
  // Query principal para obtener la lista de huertos
  const { data: locations, isLoading, error } = useQuery({
    queryKey: ['locations'],
    queryFn: () => api.get('/locations/').then(res => res.data)
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6">
        <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
        <p className="text-emerald-500 font-mono text-xs tracking-widest uppercase animate-pulse">
          Sincronizando con Satélite...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-10 text-center">
        <p className="text-red-400 font-mono text-sm">
          [ERROR_SISTEMA]: No se pudo conectar con el Backend en Render.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pb-10">
      {/* Header Estilo Tech */}
      <header className="p-6 pt-10 sticky top-0 bg-slate-950/80 backdrop-blur-md z-10 border-b border-slate-900 mb-6">
        <h1 className="text-2xl font-black text-emerald-400 italic tracking-tighter">
          SHADOWROOT<span className="text-slate-100 font-light">AGRO</span>
        </h1>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
          <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em]">Sistemas Operativos</p>
        </div>
      </header>

      <main className="px-4 max-w-md mx-auto">
        {locations?.length === 0 ? (
          <div className="border-2 border-dashed border-slate-800 rounded-3xl p-10 text-center">
            <p className="text-slate-500 text-sm">No hay huertos registrados.</p>
          </div>
        ) : (
          locations?.map(loc => <LocationCard key={loc.id} loc={loc} />)
        )}
      </main>

      <footer className="text-center p-6">
        <p className="text-slate-700 text-[10px] font-mono uppercase tracking-widest">
          Terminal ID: ShadowRoot-07 // 2026
        </p>
      </footer>
    </div>
  );
}

export default App;

