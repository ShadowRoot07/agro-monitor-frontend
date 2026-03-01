import { Droplets, ThermometerSnowflake, CheckCircle } from 'lucide-react';

export const AgroAlert = ({ temp, humidity }) => {
  const isFrostRisk = temp <= 4;
  const isDroughtRisk = humidity < 30;

  let config = {
    color: 'bg-green-500/10 border-green-500 text-green-500',
    label: 'Condiciones Óptimas',
    icon: <CheckCircle className="w-5 h-5" />
  };

  if (isFrostRisk) {
    config = {
      color: 'bg-blue-500/10 border-blue-500 text-blue-500',
      label: 'Riesgo de Helada',
      icon: <ThermometerSnowflake className="w-5 h-5" />
    };
  } else if (isDroughtRisk) {
    config = { color: 'bg-amber-500/10 border-amber-500 text-amber-500', label: 'Estrés Hídrico', icon: <Droplets className="w-5 h-5" /> };
  }

  return (
    <div className={`p-4 rounded-xl border-2 flex items-center gap-3 ${config.color} mb-4`}>
      {config.icon}
      <span className="font-bold uppercase text-xs tracking-wider">{config.label}</span>
    </div>
  );
};

