import React from 'react';
import { Menu, ExternalLink, Globe } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { BrandLogo } from '../common/BrandLogo';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-slate-200 text-slate-800 sticky top-0 z-30 flex items-center justify-between px-6 lg:px-8 shadow-xs">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden text-slate-600 hover:text-slate-900 p-2 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="lg:hidden">
          <BrandLogo size="sm" theme="on-light" />
        </div>
        <div className="hidden lg:flex items-center gap-2 text-[13px] text-slate-600 font-medium">
          <span className="w-2 h-2 rounded-full bg-brand-500" />
          <span>MiscArchive Content Management System</span>
        </div>
      </div>

      <div className="flex items-center gap-3.5">
        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-[13px] text-slate-700 hover:text-slate-900 transition-colors bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-md border border-slate-200 font-medium"
        >
          <Globe className="w-3.5 h-3.5 text-brand-600" />
          <span>View Public Site</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </a>

        <div className="h-4 w-px bg-slate-200 hidden sm:block" />

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-brand-500 text-charcoal-950 font-bold flex items-center justify-center text-xs shadow-xs">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div className="hidden md:block text-left">
            <p className="text-[13px] font-semibold text-slate-900 leading-tight">
              {user?.name || 'Administrator'}
            </p>
            <p className="text-[11px] text-slate-500 leading-tight">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};
