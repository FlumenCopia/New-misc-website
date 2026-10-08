import React from 'react';
import { Menu, ShieldCheck, ExternalLink } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { BrandLogo } from '../common/BrandLogo';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-[#1b2434] border-b border-[#26344b] text-white sticky top-0 z-30 flex items-center justify-between px-6 lg:px-8 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="lg:hidden">
          <BrandLogo size="sm" theme="on-dark" />
        </div>
        <div className="hidden lg:flex items-center gap-2 text-[13.5px] text-white font-medium bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
          <ShieldCheck className="w-4 h-4 text-[#1abc9c]" />
          <span>MiscArchive Headless CMS</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <a
          href="http://localhost:5000/api/health"
          target="_blank"
          rel="noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 text-[13px] text-slate-200 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 font-medium"
        >
          <span className="w-2 h-2 rounded-full bg-[#1abc9c] animate-pulse" />
          <span>API Connected (:5000)</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
        </a>

        <div className="h-4 w-px bg-slate-700 hidden sm:block" />

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#1abc9c] text-white font-bold flex items-center justify-center text-xs shadow-xs">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <span className="text-[14px] font-semibold text-white hidden md:block">
            {user?.name}
          </span>
        </div>
      </div>
    </header>
  );
};
