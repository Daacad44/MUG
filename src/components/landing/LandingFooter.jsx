import { Link } from 'react-router-dom';
import { Building2, Mail, Phone, MapPin, Share2, Globe, ExternalLink } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function LandingFooter() {
  return (
    <footer id="contact" className="bg-[#0B1120] border-t border-[#1e293b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#2563EB] flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Mogadishu Urban</div>
                <div className="text-xs text-[#64748b]">Growth Observatory</div>
              </div>
            </div>
            <p className="text-xs text-[#64748b] leading-relaxed mb-4">
              Enterprise GIS platform for monitoring urban expansion, analyzing building density,
              and forecasting future development across Mogadishu (2016–2026).
            </p>
            <div className="flex gap-3">
              {[Share2, Globe, ExternalLink].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-[#111827] border border-[#1e293b] flex items-center justify-center text-[#64748b] hover:text-[#2563EB] hover:border-[#2563EB]/30 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h4 className="text-sm font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', href: '#home' },
                { label: 'Features', href: '#features' },
                { label: 'Dashboard', href: '#dashboard-preview' },
                { label: 'Reports', href: '#dashboard-preview' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-xs text-[#64748b] hover:text-[#2563EB] transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <h4 className="text-sm font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2.5">
              {['Documentation', 'GIS Data', 'Support', 'API Reference'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-xs text-[#64748b] hover:text-[#2563EB] transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <h4 className="text-sm font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-xs text-[#64748b]">
                <Mail className="w-3.5 h-3.5 text-[#2563EB]" />
                contact@mugo.so
              </li>
              <li className="flex items-center gap-2 text-xs text-[#64748b]">
                <Phone className="w-3.5 h-3.5 text-[#2563EB]" />
                +252 61 000 0000
              </li>
              <li className="flex items-start gap-2 text-xs text-[#64748b]">
                <MapPin className="w-3.5 h-3.5 text-[#2563EB] mt-0.5 shrink-0" />
                Mogadishu, Banadir Region, Somalia
              </li>
            </ul>
          </ScrollReveal>
        </div>
      </div>

      <div className="border-t border-[#1e293b] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-[#64748b]">
            © 2026 Mogadishu Urban Growth Observatory. All Rights Reserved.
          </p>
          <div className="flex gap-4 text-[11px] text-[#64748b]">
            <Link to="/about" className="hover:text-[#94a3b8] transition-colors">About</Link>
            <a href="#" className="hover:text-[#94a3b8] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#94a3b8] transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
