import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'Analysis', href: '#analytics' },
  { label: 'Predictions', href: '#how-it-works' },
  { label: 'Reports', href: '#dashboard-preview' },
  { label: 'About', href: '#overview' },
  { label: 'Contact', href: '#contact' },
];

export default function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0B1120]/95 backdrop-blur-xl border-b border-[#1e293b] shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-[#2563EB] flex items-center justify-center shadow-lg shadow-[#2563EB]/25">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-bold text-white leading-tight tracking-wide">MOGADISHU</div>
              <div className="text-[10px] text-[#94a3b8] leading-tight tracking-wider">URBAN GROWTH OBSERVATORY</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => scrollTo(link.href)}
                className="px-3 py-2 text-xs font-medium text-[#94a3b8] hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 text-xs font-semibold text-[#94a3b8] hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#2563EB] rounded-lg hover:bg-[#1d4ed8] transition-all shadow-lg shadow-[#2563EB]/30 hover:shadow-[#2563EB]/50 hover:scale-105"
            >
              Get Started
            </Link>
          </div>

          <button
            type="button"
            className="lg:hidden w-9 h-9 flex items-center justify-center text-[#94a3b8] hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0B1120]/98 backdrop-blur-xl border-b border-[#1e293b]"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => scrollTo(link.href)}
                  className="block w-full text-left px-3 py-2.5 text-sm text-[#94a3b8] hover:text-white hover:bg-white/5 rounded-lg"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-3 flex gap-3">
                <Link to="/login" className="flex-1 text-center py-2.5 text-sm font-medium text-[#94a3b8] border border-[#1e293b] rounded-lg">
                  Sign In
                </Link>
                <Link to="/register" className="flex-1 text-center py-2.5 text-sm font-semibold text-white bg-[#2563EB] rounded-lg">
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
