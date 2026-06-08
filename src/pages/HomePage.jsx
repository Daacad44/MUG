import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Map, BarChart3, TrendingUp, Layers, FileText, Brain,
  ArrowRight, Check, Satellite, Database, Globe, Building, Sparkles,
  Shield, Landmark, LineChart as LineChartIcon, Target, ChevronRight, MapPin,
} from 'lucide-react';
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import LandingNavbar from '../components/landing/LandingNavbar';
import LandingFooter from '../components/landing/LandingFooter';
import SomaliaMap from '../components/map/SomaliaMap';
import ScrollReveal, { StaggerContainer, StaggerItem } from '../components/landing/ScrollReveal';
import AnimatedCounter from '../components/landing/AnimatedCounter';
import { MOCK_URBAN_GROWTH, MOCK_BUILDING_DENSITY } from '../utils/mockData';

const features = [
  { icon: Map, title: 'Interactive GIS Mapping', desc: 'Real-time spatial visualization with satellite basemaps and multi-layer overlays.', color: '#2563EB' },
  { icon: BarChart3, title: 'Urban Growth Analysis', desc: 'Historical growth tracking across 2016–2026 with trend analytics.', color: '#22c55e' },
  { icon: Layers, title: 'Building Density Analytics', desc: 'Detailed density calculations and building count estimations per km².', color: '#9333EA' },
  { icon: TrendingUp, title: 'Growth Forecasting', desc: 'Future urban expansion prediction with probability scoring.', color: '#F97316' },
  { icon: FileText, title: 'Smart Reporting', desc: 'Exportable PDF reports, CSV statistics, and map screenshots.', color: '#FACC15' },
  { icon: Brain, title: 'Geospatial Intelligence', desc: 'Advanced GIS analytics powered by Python and spatial databases.', color: '#2563EB' },
];

const dataSources = [
  { name: 'Sentinel-2', desc: 'Satellite Imagery', color: '#2563EB' },
  { name: 'OpenStreetMap', desc: 'Roads and Landmarks', color: '#22c55e' },
  { name: 'HOT Open Buildings', desc: 'Building Data', color: '#F97316' },
  { name: 'Microsoft Open Buildings', desc: 'Building Extraction', color: '#9333EA' },
  { name: 'Google Open Buildings', desc: 'Additional Building Data', color: '#FACC15' },
];

const steps = [
  { num: '01', title: 'Collect Satellite Data', desc: 'Multi-temporal imagery from Sentinel-2 and open building datasets.', icon: Satellite },
  { num: '02', title: 'Analyze Urban Growth', desc: 'Extract built-up areas and calculate expansion metrics year over year.', icon: BarChart3 },
  { num: '03', title: 'Generate GIS Insights', desc: 'Produce heatmaps, density layers, and interactive visualizations.', icon: Map },
  { num: '04', title: 'Predict Future Expansion', desc: 'Forecast growth zones with probability scores and spatial polygons.', icon: Target },
];

const trustCards = [
  { icon: Landmark, title: 'Urban Planning', desc: 'Support evidence-based city planning and infrastructure development.' },
  { icon: LineChartIcon, title: 'GIS Analysis', desc: 'Professional geospatial analysis for researchers and analysts.' },
  { icon: Sparkles, title: 'Smart City Research', desc: 'Enable smart city initiatives with real-time urban intelligence.' },
  { icon: Shield, title: 'Development Monitoring', desc: 'Track development progress and environmental impact over time.' },
];

const growthChart = MOCK_URBAN_GROWTH.map((g) => ({ year: g.year, area: g.built_up_area }));
const densityChart = MOCK_BUILDING_DENSITY.map((d) => ({ year: d.year, density: d.density }));
const predictionChart = [
  { year: 2026, predicted: 249.6 },
  { year: 2028, predicted: 275.2 },
  { year: 2030, predicted: 312.4 },
];

const tooltipStyle = {
  background: '#111827',
  border: '1px solid #1e293b',
  borderRadius: '8px',
  fontSize: '11px',
  color: '#f1f5f9',
};

function GisIllustration() {
  return (
    <div className="relative w-full aspect-square max-w-lg mx-auto">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#2563EB]/20 via-[#9333EA]/10 to-[#F97316]/10 border border-[#1e293b]" />
      <svg viewBox="0 0 400 400" className="relative w-full h-full p-8">
        <defs>
          <linearGradient id="gridGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#9333EA" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {[...Array(10)].map((_, i) => (
          <line key={`h${i}`} x1="40" y1={40 + i * 32} x2="360" y2={40 + i * 32} stroke="#1e293b" strokeWidth="0.5" />
        ))}
        {[...Array(10)].map((_, i) => (
          <line key={`v${i}`} x1={40 + i * 32} y1="40" x2={40 + i * 32} y2="360" stroke="#1e293b" strokeWidth="0.5" />
        ))}
        <path
          d="M200 80 C240 90, 280 120, 300 160 C320 200, 310 260, 280 300 C250 330, 200 340, 160 320 C120 300, 100 260, 110 200 C120 140, 150 90, 200 80Z"
          fill="url(#gridGrad)"
          stroke="#2563EB"
          strokeWidth="2"
          opacity="0.8"
        />
        <circle cx="220" cy="260" r="30" fill="#9333EA" opacity="0.3" />
        <circle cx="220" cy="260" r="15" fill="#2563EB" opacity="0.5" />
        <circle cx="220" cy="260" r="6" fill="#FACC15" />
        <circle cx="180" cy="180" r="20" fill="#F97316" opacity="0.25" />
        <circle cx="260" cy="200" r="25" fill="#2563EB" opacity="0.2" />
        <path d="M120 200 Q200 160 280 200" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="6" opacity="0.6" />
      </svg>
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-6 right-6 px-3 py-1.5 rounded-lg bg-[#111827]/90 border border-[#2563EB]/30 text-[10px] text-[#2563EB] font-medium backdrop-blur-sm"
      >
        Live GIS Feed
      </motion.div>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-8 left-6 px-3 py-1.5 rounded-lg bg-[#111827]/90 border border-[#9333EA]/30 text-[10px] text-[#9333EA] font-medium backdrop-blur-sm"
      >
        249.6 km² Built-up
      </motion.div>
    </div>
  );
}

export default function HomePage() {
  const scrollToPreview = () => {
    document.querySelector('#dashboard-preview')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-[#f1f5f9] overflow-x-hidden">
      <LandingNavbar />

      {/* SECTION 1 — HERO */}
      <section id="home" className="relative min-h-screen flex items-center pt-16">
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: 'url(https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/10/512/512)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120]/40 via-[#0B1120]/85 to-[#0B1120]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#2563EB15_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#9333EA10_0%,_transparent_50%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/25 text-[#2563EB] text-xs font-semibold mb-6"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Urban Growth Intelligence Platform
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6"
            >
              Monitor, Analyze and Predict{' '}
              <span className="bg-gradient-to-r from-[#2563EB] via-[#9333EA] to-[#F97316] bg-clip-text text-transparent">
                Mogadishu&apos;s Urban Growth
              </span>{' '}
              Using Advanced GIS Technology
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg text-[#94a3b8] max-w-2xl leading-relaxed mb-8"
            >
              Interactive geospatial intelligence platform designed to monitor urban expansion,
              analyze building density changes, and forecast future development trends across Mogadishu.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-16"
            >
              <Link
                to="/register"
                className="group flex items-center gap-2 px-7 py-3.5 bg-[#2563EB] text-white text-sm font-semibold rounded-xl hover:bg-[#1d4ed8] transition-all shadow-xl shadow-[#2563EB]/25 hover:shadow-[#2563EB]/40 hover:scale-[1.02]"
              >
                Explore Platform
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                type="button"
                onClick={scrollToPreview}
                className="flex items-center gap-2 px-7 py-3.5 border border-[#1e293b] text-[#94a3b8] text-sm font-semibold rounded-xl hover:bg-[#111827] hover:text-white hover:border-[#334155] transition-all"
              >
                View Dashboard Preview
              </button>
            </motion.div>
          </div>

          {/* Hero Stats */}
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl" stagger={0.12}>
            {[
              { label: 'Built-up Area', value: 249.6, suffix: ' km²', decimals: 1, color: '#2563EB' },
              { label: 'Annual Growth', value: 4.21, suffix: '%', decimals: 2, color: '#22c55e' },
              { label: 'Buildings', value: 187540, suffix: '', decimals: 0, color: '#9333EA' },
              { label: 'Density', value: 752, suffix: '/km²', decimals: 0, color: '#F97316' },
            ].map((stat) => (
              <StaggerItem key={stat.label}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="relative p-5 rounded-2xl bg-[#111827]/80 backdrop-blur-sm border border-[#1e293b] overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(135deg, ${stat.color}08, transparent)` }} />
                  <div className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: stat.color }}>
                    <AnimatedCounter end={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-[#64748b] font-medium">{stat.label}</div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* SECTION 2 — PROJECT OVERVIEW */}
      <section id="overview" className="py-24 lg:py-32 border-t border-[#1e293b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal direction="left">
              <GisIllustration />
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.15}>
              <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-widest mb-3 block">Project Overview</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
                Understanding Mogadishu&apos;s Urban Transformation
              </h2>
              <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed mb-4">
                Mogadishu is experiencing rapid urban expansion driven by population growth,
                economic development, and infrastructure investment. The Urban Growth Observatory
                provides government agencies, urban planners, and researchers with the tools to
                understand these changes through advanced geospatial analysis.
              </p>
              <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed mb-8">
                Our platform supports evidence-based planning, infrastructure development,
                environmental protection, and sustainable city management by delivering
                accurate, timely, and actionable urban intelligence.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {['Urban Planning', 'Infrastructure', 'Environment', 'Sustainability'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-[#94a3b8]">
                    <Check className="w-4 h-4 text-[#22c55e] shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 3 — CORE FEATURES */}
      <section id="features" className="py-24 lg:py-32 bg-[#0B1120] relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#2563EB08_0%,_transparent_70%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <span className="text-xs font-semibold text-[#9333EA] uppercase tracking-widest mb-3 block">Core Capabilities</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Enterprise GIS Features</h2>
          </ScrollReveal>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.08}>
            {features.map(({ icon: Icon, title, desc, color }) => (
              <StaggerItem key={title}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="group relative p-6 rounded-2xl bg-[#111827] border border-[#1e293b] h-full overflow-hidden transition-all duration-300 hover:border-transparent"
                >
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[1px]"
                    style={{ background: `linear-gradient(135deg, ${color}60, transparent, ${color}30)` }}
                  />
                  <div className="relative">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${color}15` }}
                    >
                      <Icon className="w-6 h-6" style={{ color }} />
                    </div>
                    <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
                    <p className="text-xs text-[#64748b] leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* SECTION 4 — DASHBOARD PREVIEW */}
      <section id="dashboard-preview" className="py-24 lg:py-32 border-t border-[#1e293b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-widest mb-3 block">Platform Preview</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Powerful GIS Dashboard</h2>
              <p className="text-sm text-[#94a3b8] leading-relaxed mb-8">
                Monitor urban growth with advanced mapping tools and interactive analytics.
                The dashboard provides real-time statistics, layer controls, and predictive insights.
              </p>
              <ul className="space-y-3 mb-8">
                {['Interactive Maps', 'Heatmaps', 'Density Analysis', 'Predictions', 'Reports', 'Real-Time Statistics'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-[#94a3b8]">
                    <div className="w-5 h-5 rounded-full bg-[#2563EB]/15 flex items-center justify-center">
                      <Check className="w-3 h-3 text-[#2563EB]" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#2563EB] text-white text-sm font-semibold rounded-xl hover:bg-[#1d4ed8] transition-all shadow-lg shadow-[#2563EB]/25"
              >
                Explore Platform
                <ChevronRight className="w-4 h-4" />
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.2} direction="right">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="relative rounded-2xl overflow-hidden border border-[#1e293b] shadow-2xl shadow-black/40"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent z-10 pointer-events-none" />
                <img
                  src="/images/dashboard-preview.png"
                  alt="Mogadishu Urban Growth Observatory Dashboard Preview"
                  className="w-full h-auto"
                />
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-[#22c55e]/20 border border-[#22c55e]/30 text-[10px] text-[#22c55e] font-semibold"
                >
                  Live Preview
                </motion.div>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 5 — DATA SOURCES */}
      <section className="py-24 lg:py-32 bg-[#111827]/30 border-t border-[#1e293b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <span className="text-xs font-semibold text-[#F97316] uppercase tracking-widest mb-3 block">Trusted Data</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Professional Data Sources</h2>
            <p className="text-sm text-[#64748b] mt-3 max-w-xl mx-auto">Built on open, verified geospatial datasets from leading providers</p>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4" stagger={0.08}>
            {dataSources.map(({ name, desc, color }) => (
              <StaggerItem key={name}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="p-5 rounded-2xl bg-[#111827] border border-[#1e293b] text-center h-full hover:border-[#334155] transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
                    <Database className="w-5 h-5" style={{ color }} />
                  </div>
                  <h3 className="text-xs font-bold text-white mb-1">{name}</h3>
                  <p className="text-[10px] text-[#64748b]">{desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* SECTION 6 — ANALYTICS SHOWCASE */}
      <section id="analytics" className="py-24 lg:py-32 border-t border-[#1e293b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <span className="text-xs font-semibold text-[#9333EA] uppercase tracking-widest mb-3 block">Analytics</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Data-Driven Urban Intelligence</h2>
          </ScrollReveal>

          <div className="grid lg:grid-cols-3 gap-6">
            {[
              { title: 'Urban Growth Trend', data: growthChart, dataKey: 'area', color: '#2563EB', type: 'area' },
              { title: 'Density Trend', data: densityChart, dataKey: 'density', color: '#9333EA', type: 'line' },
              { title: 'Growth Prediction', data: predictionChart, dataKey: 'predicted', color: '#F97316', type: 'bar' },
            ].map((chart, i) => (
              <ScrollReveal key={chart.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="p-5 rounded-2xl bg-[#111827] border border-[#1e293b] h-full"
                >
                  <h3 className="text-sm font-semibold text-white mb-4">{chart.title}</h3>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      {chart.type === 'area' ? (
                        <AreaChart data={chart.data}>
                          <defs>
                            <linearGradient id={`grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={chart.color} stopOpacity={0.4} />
                              <stop offset="100%" stopColor={chart.color} stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                          <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} width={35} />
                          <Tooltip contentStyle={tooltipStyle} />
                          <Area type="monotone" dataKey={chart.dataKey} stroke={chart.color} fill={`url(#grad-${i})`} strokeWidth={2} />
                        </AreaChart>
                      ) : chart.type === 'line' ? (
                        <LineChart data={chart.data}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                          <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} width={35} />
                          <Tooltip contentStyle={tooltipStyle} />
                          <Line type="monotone" dataKey={chart.dataKey} stroke={chart.color} strokeWidth={2} dot={{ r: 4, fill: chart.color }} />
                        </LineChart>
                      ) : (
                        <BarChart data={chart.data}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                          <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} width={35} />
                          <Tooltip contentStyle={tooltipStyle} />
                          <Bar dataKey={chart.dataKey} fill={chart.color} radius={[4, 4, 0, 0]} />
                        </BarChart>
                      )}
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — STUDY AREA */}
      <section id="study-area" className="py-24 lg:py-32 bg-[#111827]/30 border-t border-[#1e293b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <ScrollReveal direction="left">
              <div className="rounded-2xl border border-[#1e293b] bg-[#111827] p-4 sm:p-6">
                <SomaliaMap variant="large" />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.15}>
              <span className="text-xs font-semibold text-[#FACC15] uppercase tracking-widest mb-3 block">Geographic Scope</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Study Area</h2>
              <div className="space-y-4 mb-6">
                {[
                  { label: 'Study Area', value: 'Mogadishu, Somalia', icon: MapPin },
                  { label: 'Observation Period', value: '2016 – 2026', icon: Building },
                  { label: 'Coordinate System', value: 'WGS84 / UTM Zone 37N', icon: Globe },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="flex items-start gap-4 p-4 rounded-xl bg-[#111827] border border-[#1e293b]">
                    <div className="w-10 h-10 rounded-lg bg-[#2563EB]/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-[#2563EB]" />
                    </div>
                    <div>
                      <div className="text-xs text-[#64748b] mb-0.5">{label}</div>
                      <div className="text-sm font-semibold text-white">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-[#94a3b8] leading-relaxed">
                The platform monitors urban growth patterns, building density changes, and future
                expansion trends throughout Mogadishu using advanced GIS technologies and
                geospatial analytics.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 8 — HOW IT WORKS */}
      <section id="how-it-works" className="py-24 lg:py-32 border-t border-[#1e293b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-widest mb-3 block">Process</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">How It Works</h2>
          </ScrollReveal>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#2563EB] via-[#9333EA] to-[#F97316] opacity-20 -translate-y-1/2" />
            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.15}>
              {steps.map((step, i) => (
                <StaggerItem key={step.num}>
                  <motion.div whileHover={{ y: -4 }} className="relative text-center p-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#111827] border border-[#1e293b] flex items-center justify-center mx-auto mb-4 relative z-10">
                      <step.icon className="w-6 h-6 text-[#2563EB]" />
                    </div>
                    <div className="text-[10px] font-bold text-[#2563EB] mb-2">STEP {step.num}</div>
                    <h3 className="text-sm font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-xs text-[#64748b] leading-relaxed">{step.desc}</p>
                    {i < steps.length - 1 && (
                      <ChevronRight className="hidden lg:block absolute top-7 -right-3 w-6 h-6 text-[#334155] z-0" />
                    )}
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* SECTION 9 — TRUST */}
      <section className="py-24 lg:py-32 bg-[#111827]/30 border-t border-[#1e293b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <span className="text-xs font-semibold text-[#22c55e] uppercase tracking-widest mb-3 block">Trusted By</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Government-Grade Intelligence</h2>
          </ScrollReveal>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.1}>
            {trustCards.map(({ icon: Icon, title, desc }) => (
              <StaggerItem key={title}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="p-6 rounded-2xl bg-[#111827] border border-[#1e293b] h-full text-center hover:border-[#2563EB]/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#2563EB]/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-[#2563EB]" />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-2">{title}</h3>
                  <p className="text-xs text-[#64748b] leading-relaxed">{desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* SECTION 10 — CTA */}
      <section className="py-24 lg:py-32 border-t border-[#1e293b] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB]/10 via-[#9333EA]/10 to-[#F97316]/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#2563EB15_0%,_transparent_70%)]" />
        <ScrollReveal className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Explore Mogadishu&apos;s Urban Growth?
          </h2>
          <p className="text-sm sm:text-base text-[#94a3b8] mb-8 leading-relaxed">
            Create an account and access advanced GIS analytics, prediction tools,
            and urban growth intelligence.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-3.5 bg-[#2563EB] text-white text-sm font-semibold rounded-xl hover:bg-[#1d4ed8] transition-all shadow-xl shadow-[#2563EB]/30 hover:scale-105"
            >
              Create Account
            </Link>
            <Link
              to="/login"
              className="px-8 py-3.5 border border-[#1e293b] text-[#94a3b8] text-sm font-semibold rounded-xl hover:bg-[#111827] hover:text-white transition-all"
            >
              Login
            </Link>
          </div>
        </ScrollReveal>
      </section>

      <LandingFooter />
    </div>
  );
}