import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const TrendArrow = ({ current, previous, unit = "°" }) => {
  if (previous === undefined || previous === null) return null;

  const diff = current - previous;
  const isStable = Math.abs(diff) < 0.1; // Umbral de estabilidad

  if (isStable) return <Minus size={14} className="text-slate-500" />;

  return (
    <div className="flex items-center gap-1">
      {diff > 0 ? (
        <TrendingUp size={14} className="text-rose-400" />
      ) : (
        <TrendingDown size={14} className="text-cyan-400" />
      )}
      <span className={`text-[10px] font-bold ${diff > 0 ? 'text-rose-400' : 'text-cyan-400'}`}>
        {diff > 0 ? '+' : ''}{diff.toFixed(1)}{unit}
      </span>
    </div>
  );
};

