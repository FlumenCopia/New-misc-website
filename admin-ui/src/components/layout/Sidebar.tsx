import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FileCode2,
  FileText,
  Layers,
  MapPin,
  Building2,
  Users,
  Image,
  FolderKanban,
  Inbox,
  Settings,
  LogOut,
  UserCheck,
  Briefcase,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { BrandLogo } from '../common/BrandLogo';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();

  const navSections = [
    {
      title: 'Overview',
      items: [{ name: 'Dashboard', path: '/', icon: LayoutDashboard }],
    },
    {
      title: 'Website Content',
      items: [
        { name: 'Website Pages', path: '/pages', icon: FileCode2 },
        { name: 'Locations Hub', path: '/locations', icon: MapPin },
        { name: 'Services', path: '/services', icon: Layers },
        { name: 'Blog Articles', path: '/blogs', icon: FileText },
      ],
    },
    {
      title: 'Social Proof & Media',
      items: [
        { name: 'Hero Banners', path: '/banners', icon: Image },
        { name: 'Team & Founders', path: '/team-members', icon: Users },
        { name: 'Clients & Sponsors', path: '/client-logos', icon: Building2 },
        { name: 'Media Library', path: '/media', icon: FolderKanban },
      ],
    },
    {
      title: 'System & Inbound',
      items: [
        { name: 'Job Applications', path: '/careers?tab=applications', icon: UserCheck },
        { name: 'Careers & Openings', path: '/careers', icon: Briefcase },
        { name: 'Contact Enquiries', path: '/enquiries', icon: Inbox },
        { name: 'Global Settings', path: '/settings', icon: Settings },
      ],
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#101114] border-r border-[#1e2025] flex flex-col transition-transform duration-200 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-[#1c1d22] bg-[#0c0d0f]">
          <BrandLogo size="md" showBadge theme="on-dark" />
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-5 scrollbar-thin scrollbar-thumb-zinc-800">
          {navSections.map((section, idx) => (
            <div key={idx}>
              <div className="px-3 mb-2 text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
                {section.title}
              </div>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.path}>
                      <NavLink
                        to={item.path}
                        end={item.path === '/'}
                        onClick={onClose}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3.5 py-2.5 rounded-[12px] text-[13.5px] font-medium transition-all ${
                            isActive
                              ? 'bg-gradient-to-r from-[#f5a623] to-[#e69818] text-slate-950 font-bold shadow-md shadow-amber-500/20'
                              : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                          }`
                        }
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{item.name}</span>
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer & Logout */}
        <div className="p-3.5 border-t border-[#1c1d22] bg-[#0c0d0f] relative overflow-hidden z-10">
          {/* Decorative subtle hexagon watermark behind footer */}
          <div className="absolute -bottom-6 -left-6 w-28 h-28 pointer-events-none opacity-15 z-0 select-none">
            <svg viewBox="0 0 100 100" className="w-full h-full text-amber-500 stroke-current fill-none stroke-[2.5]">
              <polygon points="50,5 90,27 90,73 50,95 10,73 10,27" />
              <polygon points="30,30 50,19 70,30 70,60 50,71 30,60" />
            </svg>
          </div>

          <div className="flex items-center justify-between mb-2.5 px-1 relative z-10">
            <div className="overflow-hidden">
              <p className="text-[12.5px] font-medium text-slate-300 truncate font-mono">{user?.email || 'admin@miscarchive.com'}</p>
            </div>
            <span className="text-[10px] font-bold uppercase bg-amber-500/20 text-[#f5a623] border border-amber-500/30 px-1.5 py-0.5 rounded">
              ONLINE
            </span>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg text-[13px] font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-colors border border-white/10 relative z-10"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
