import { Building2, Database, Code, Map, BarChart3, Shield } from 'lucide-react';

const technologies = [
  'Vite', 'React.js', 'Tailwind CSS', 'React Router DOM', 'TanStack Query',
  'Recharts', 'Leaflet', 'Lucide React', 'Supabase', 'PostgreSQL', 'Python',
];

const dataSources = [
  'OpenStreetMap (Roads & Landmarks)',
  'Esri World Imagery (Satellite Basemap)',
  'Sentinel-2 Land Cover Analysis',
  'Global Human Settlement Layer',
  'Mogadishu Administrative Boundaries',
  'Custom Building Footprint Extraction',
];

export default function About() {
  return (
    <div className="h-full overflow-y-auto p-4 space-y-6 max-w-4xl">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#2563EB] flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Mogadishu Urban Growth Observatory</h1>
            <p className="text-xs text-[#64748b]">Enterprise GIS Platform (2016–2026)</p>
          </div>
        </div>
      </div>

      <section className="rounded-xl border border-[#1e293b] bg-[#111827] p-5">
        <h2 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <Map className="w-4 h-4 text-[#2563EB]" /> Project Description
        </h2>
        <p className="text-xs text-[#94a3b8] leading-relaxed">
          The Mogadishu Urban Growth Observatory is a web-based GIS platform designed to visualize,
          analyze, and predict urban expansion across Mogadishu, Somalia. The system integrates
          satellite imagery, building density analysis, land use classification, and spatial forecasting
          to provide actionable insights for urban planners, researchers, and policymakers. Built with
          modern open-source technologies and deployed on Vercel with Supabase as the backend infrastructure.
        </p>
      </section>

      <section className="rounded-xl border border-[#1e293b] bg-[#111827] p-5">
        <h2 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-[#9333EA]" /> Methodology
        </h2>
        <div className="space-y-3 text-xs text-[#94a3b8]">
          <p><strong className="text-white">1. Data Collection:</strong> Multi-temporal satellite imagery and OSM vector data for Mogadishu study area (WGS 84 / UTM Zone 37N).</p>
          <p><strong className="text-white">2. Built-up Extraction:</strong> Automated detection of urban built-up areas using spectral indices and morphological filtering across years 2014–2026.</p>
          <p><strong className="text-white">3. Density Analysis:</strong> Building footprint counting and density calculation per km² for each observation year.</p>
          <p><strong className="text-white">4. Land Use Classification:</strong> Supervised classification into built-up, vegetation, bare land, water, and others categories.</p>
          <p><strong className="text-white">5. Growth Prediction:</strong> Python-based spatial forecasting using historical trend analysis, probability scoring, and expansion polygon generation.</p>
        </div>
      </section>

      <section className="rounded-xl border border-[#1e293b] bg-[#111827] p-5">
        <h2 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <Database className="w-4 h-4 text-[#F97316]" /> Data Sources
        </h2>
        <ul className="space-y-2">
          {dataSources.map((source) => (
            <li key={source} className="flex items-center gap-2 text-xs text-[#94a3b8]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0" />
              {source}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-[#1e293b] bg-[#111827] p-5">
        <h2 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <Code className="w-4 h-4 text-[#22c55e]" /> Technologies Used
        </h2>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span key={tech} className="px-3 py-1 text-[10px] font-medium text-[#94a3b8] bg-[#1a2332] border border-[#1e293b] rounded-full">
              {tech}
            </span>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-[#1e293b] bg-[#111827] p-5">
        <h2 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#2563EB]" /> Authentication & Roles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { role: 'Super Admin', access: 'Full system access, user management, data administration' },
            { role: 'Analyst', access: 'Analysis tools, report generation, data export' },
            { role: 'Viewer', access: 'Read-only access to dashboards and maps' },
          ].map(({ role, access }) => (
            <div key={role} className="p-3 rounded-lg bg-[#1a2332] border border-[#1e293b]">
              <div className="text-xs font-semibold text-white mb-1">{role}</div>
              <div className="text-[10px] text-[#64748b]">{access}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
