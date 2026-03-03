import { useQuery } from '@tanstack/react-query';
import api from './api';
import { AgroAlert } from './components/AgroAlert';
import { WeatherChart } from './components/WeatherChart';
import { VpdWidget } from './components/VpdWidget';
import { ExportButton } from './components/ExportButton';
import { GeoWidget } from './components/GeoWidget';

/**
 * Componente para cada Tarjeta de Ubicación
 */
const LocationCard = ({ loc }) => {
  // Extraemos el historial que ya viene en el objeto 'loc' desde el Backend
  const history = loc.history || [];
  
  // El backend devuelve los datos con la clave 'temperature', no 'temp'
  // Tomamos el primer elemento (índice 0) que suele ser el más reciente en el serializer
  const lastReading = history.length > 0 ? history[0] : null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 mb-6 shadow-xl transition-all hover:border-emerald-500/30">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-slate-100">{loc.name}</h2>
        <span className="text-[10px] text-slate-500 font-mono tracking-tighter">ID: {loc.id}</span>
      </div>

      {/* Coordenadas Geográficas */}
      <GeoWidget lat={loc.latitude} lon={loc.longitude} name={loc.name} />

      {!lastReading ? (
        <div className="py-10 text-center border border-dashed border-slate-800 rounded-2xl mt-4">
          <p className="text-slate-500 text-[10px] uppercase tracking-widest animate-pulse">
            Esperando transmisión de datos...
          </p>
        </div>
      ) : (
        <>
          {/* Usamos lastReading.temperature (Mapeo correcto del JSON) */}
          <AgroAlert
            temp={lastReading.temperature}
            humidity={lastReading.humidity}
          />

          <VpdWidget
            temp={lastReading.temperature}
            humidity={lastReading.humidity}
          />

          <div className="mt-8">
            <div className="flex justify-between items-center mb-3">
              <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">
                Analytics Engine
              </p>
              <ExportButton data={history} locationName={loc.name} />
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between items-end mb-2">
              <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">
                Thermal History
              </p>
              <span className="text-emerald-400 text-[10px] font-mono">
                {lastReading.temperature}°C
              </span>
            </div>

            {/* Gráfica con la historia real */}
            <WeatherChart data={history} />
          </div>
        </>
      )}
    </div>
  );
};

/**
 * Componente Principal
 */
function App() {
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
        <div className="border border-red-500/20 bg-red-500/5 p-6 rounded-3xl max-w-xs">
          <p className="text-red-400 font-mono text-xs uppercase tracking-tighter mb-2">
            [ERROR_DE_SISTEMA]
          </p>
          <p className="text-slate-400 text-xs">
            No se pudo establecer conexión con el núcleo en Render. Verifica la API.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pb-10">
      <header className="p-6 pt-10 sticky top-0 bg-slate-950/80 backdrop-blur-md z-10 border-b border-slate-900 mb-6">
        <h1 className="text-2xl font-black text-emerald-400 italic tracking-tighter">
          SHADOWROOT<span className="text-slate-100 font-light">AGRO</span>
        </h1>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
          <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em]">Sistemas Operativos // Online</p>
        </div>
      </header>

      <main className="px-4 max-w-md mx-auto">
        {locations?.length === 0 ? (
          <div className="border-2 border-dashed border-slate-800 rounded-3xl p-12 text-center">
            <p className="text-slate-500 text-xs font-mono">BASE DE DATOS VACÍA</p>
          </div>
        ) : (
          locations?.map(loc => <LocationCard key={loc.id} loc={loc} />)
        )}
      </main>

      <footer className="text-center p-8 mt-4">
        <p className="text-slate-800 text-[10px] font-mono uppercase tracking-[0.4em]">
          Terminal ID: ShadowRoot-07 // 2026
        </p>
      </footer>
    </div>
  );
}

export default App;

