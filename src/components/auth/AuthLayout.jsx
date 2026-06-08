import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen bg-[#0B1120] flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#2563EB] flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
            </Link>
            <h1 className="text-xl font-bold text-white mb-1">{title}</h1>
            {subtitle && <p className="text-sm text-[#64748b]">{subtitle}</p>}
          </div>
          <div className="rounded-xl border border-[#1e293b] bg-[#111827] p-6">
            {children}
          </div>
        </div>
      </div>
      <div className="text-center py-4 text-[10px] text-[#64748b]">
        Mogadishu Urban Growth Observatory © 2024 All rights reserved.
      </div>
    </div>
  );
}
