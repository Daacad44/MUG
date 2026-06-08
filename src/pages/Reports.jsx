import { useState } from 'react';
import { FileText, Download, Image, Table } from 'lucide-react';
import { reportService } from '../services/reportService';
import { useUrbanGrowth, useBuildingDensity, useLandUse } from '../hooks/useUrbanGrowth';

export default function Reports() {
  const { data: growthData } = useUrbanGrowth();
  const { data: densityData } = useBuildingDensity();
  const { data: landUseData } = useLandUse();
  const [exporting, setExporting] = useState(null);

  const handleExportCSV = (type) => {
    setExporting(type);
    const datasets = {
      growth: growthData,
      density: densityData,
      landuse: landUseData,
    };
    reportService.exportCSV(datasets[type], `mogadishu_${type}_${Date.now()}.csv`);
    setTimeout(() => setExporting(null), 1000);
  };

  const reportTypes = [
    {
      icon: FileText,
      title: 'PDF Report',
      description: 'Comprehensive urban growth analysis report with maps and statistics.',
      action: 'Export PDF',
      color: 'text-[#2563EB]',
    },
    {
      icon: Table,
      title: 'CSV Statistics',
      description: 'Export growth, density, and land use data as CSV files.',
      action: 'Export CSV',
      color: 'text-[#22c55e]',
      onClick: () => handleExportCSV('growth'),
    },
    {
      icon: Image,
      title: 'Map Screenshot',
      description: 'Export current map view as high-resolution PNG image.',
      action: 'Export PNG',
      color: 'text-[#9333EA]',
    },
  ];

  return (
    <div className="h-full overflow-y-auto p-4 space-y-4">
      <div>
        <h1 className="text-lg font-bold text-white">Reports</h1>
        <p className="text-xs text-[#64748b]">Export analysis data, reports, and map screenshots</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {reportTypes.map(({ icon: Icon, title, description, action, color, onClick }) => (
          <div key={title} className="rounded-xl border border-[#1e293b] bg-[#111827] p-5">
            <Icon className={`w-8 h-8 ${color} mb-3`} />
            <h2 className="text-sm font-semibold text-white mb-1">{title}</h2>
            <p className="text-[11px] text-[#64748b] mb-4">{description}</p>
            <button
              type="button"
              onClick={onClick}
              disabled={exporting}
              className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-[#2563EB] rounded-lg hover:bg-[#1d4ed8] transition-colors disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              {exporting ? 'Exporting...' : action}
            </button>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-[#1e293b] bg-[#111827] p-4">
        <h2 className="text-sm font-semibold text-white mb-4">Available Data Exports</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { key: 'growth', label: 'Urban Growth Data', records: growthData?.length },
            { key: 'density', label: 'Building Density Data', records: densityData?.length },
            { key: 'landuse', label: 'Land Use Data', records: landUseData?.length },
          ].map(({ key, label, records }) => (
            <button
              key={key}
              type="button"
              onClick={() => handleExportCSV(key)}
              className="flex items-center justify-between p-3 rounded-lg bg-[#1a2332] border border-[#1e293b] hover:border-[#334155] transition-colors text-left"
            >
              <div>
                <div className="text-xs font-medium text-white">{label}</div>
                <div className="text-[10px] text-[#64748b]">{records || 0} records</div>
              </div>
              <Download className="w-4 h-4 text-[#2563EB]" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
