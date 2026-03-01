import { Download } from 'lucide-react';

export const ExportButton = ({ data, locationName }) => {
  const exportToCSV = () => {
    if (!data || data.length === 0) return;

    // 1. Definir encabezados
    const headers = ["Time", "Temperature (°C)", "Humidity (%)"];
    
    // 2. Transformar los datos a filas de texto
    const csvRows = data.map(item => [
      item.time,
      item.temp,
      item.humidity
    ].join(","));

    // 3. Unir encabezados con filas
    const csvContent = [headers.join(","), ...csvRows].join("\n");

    // 4. Crear el archivo (Blob) y disparar la descarga
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    const fileName = `Report_${locationName.replace(/\s+/g, '_')}_${new Date().toLocaleDateString()}.csv`;
    
    link.setAttribute("href", url);
    link.setAttribute("download", fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button 
      onClick={exportToCSV}
      className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 py-1.5 px-3 rounded-lg border border-slate-700 transition-colors text-[10px] font-bold uppercase tracking-wider"
    >
      <Download size={14} />
      Export CSV
    </button>
  );
};

