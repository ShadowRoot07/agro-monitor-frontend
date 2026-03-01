import { MapPin, ExternalLink } from 'lucide-react';

export const GeoWidget = ({ lat, lon, name }) => {
  // Generamos la URL para abrir en Google Maps o Apple Maps según el dispositivo
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
  
  return (
    <div className="mt-4 p-3 bg-slate-950/50 border border-slate-800 rounded-2xl flex items-center justify-between group">
      <div className="flex items-center gap-3">
        <div className="bg-emerald-500/10 p-2 rounded-xl text-emerald-500">
          <MapPin size={18} />
        </div>
        <div>
          <p className="text-[10px] uppercase text-slate-500 font-bold tracking-tighter">Coordinates</p>
          <p className="text-xs font-mono text-slate-300">
            {parseFloat(lat).toFixed(4)}° , {parseFloat(lon).toFixed(4)}°
          </p>
        </div>
      </div>

      <a 
        href={mapsUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="p-2 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-emerald-400 transition-colors"
      >
        <ExternalLink size={16} />
      </a>
    </div>
  );
};

