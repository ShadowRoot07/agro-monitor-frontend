import { Activity } from 'lucide-react';
import { calculateVPD } from '../utils/agroPhysics';

export const VpdWidget = ({ temp, humidity }) => {
  const vpdData = calculateVPD(temp, humidity);

  return (
    <div className="flex items-center justify-between bg-slate-800/40 border border-slate-700/50 p-3 rounded-2xl mt-3">
      <div className="flex items-center gap-2">
        <div className={`p-1.5 rounded-lg bg-slate-900 ${vpdData.status.color}`}>
          <Activity size={16} />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-tighter text-slate-500 font-bold">VPD Status</p>
          <p className={`text-xs font-bold ${vpdData.status.color}`}>
            {vpdData.status.label}
          </p>
        </div>
      </div>
      
      <div className="text-right">
        <p className="text-xl font-black text-slate-100">
          {vpdData.value} <span className="text-[10px] text-slate-500 font-normal">kPa</span>
        </p>
      </div>
    </div>
  );
};

