import React from 'react';
import { Menu, ExternalLink, Globe, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { BrandLogo } from '../common/BrandLogo';
import { getPublicSiteUrl } from '../../api/client';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-[#faf7f2]/80 backdrop-blur-md border-b border-amber-100/70 text-slate-800 sticky top-0 z-30 flex items-center justify-between px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden text-slate-600 hover:text-slate-900 p-2 rounded-lg hover:bg-amber-100/50 transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="lg:hidden">
          <BrandLogo size="sm" theme="on-light" />
        </div>
        <div className="hidden lg:flex items-center gap-2 text-[13px] text-slate-600 font-medium">
          <span className="w-2 h-2 rounded-full bg-[#f5a623] inline-block shadow-xs shadow-amber-500/50" />
          <span>MiscArchive Content Management System</span>
        </div>
      </div>

      <div className="flex items-center gap-3.5">
        <a
          href={getPublicSiteUrl()}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-[12.5px] text-slate-700 hover:text-slate-950 transition-all bg-white hover:bg-amber-50/50 px-3.5 py-1.5 rounded-full border border-amber-200/80 font-semibold shadow-xs"
        >
          <Globe className="w-3.5 h-3.5 text-amber-500" />
          <span>View Public Site</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </a>

        <div className="h-4 w-px bg-amber-200/60 hidden sm:block" />

        <div className="flex items-center gap-2.5 pl-1 cursor-pointer select-none">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#f5a623] to-[#e69818] text-slate-950 font-bold flex items-center justify-center text-xs shadow-xs">
            {user?.name?.charAt(0) || 'M'}
          </div>
          <div className="hidden md:block text-left">
            <p className="text-[13px] font-bold text-slate-900 leading-tight">
              {user?.name || 'MiscArchive Administrator'}
            </p>
            <p className="text-[11px] text-slate-500 leading-tight">Super Admin</p>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden md:block" />
        </div>
      </div>
    </header>
  );
};
