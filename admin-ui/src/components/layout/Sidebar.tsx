import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Settings,
  Image,
  Layers,
  ListTree,
  Building2,
  Users,
  MessageSquareQuote,
  HelpCircle,
  FileText,
  FolderTree,
  Briefcase,
  FolderKanban,
  Inbox,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { logout, user } = useAuth();

  const navSections = [
    {
      title: 'OVERVIEW',
      items: [
        { name: 'Dashboard', path: '/', icon: LayoutDashboard },
      ],
    },
    {
      title: 'WEBSITE CONFIG',
      items: [
        { name: 'Settings', path: '/settings', icon: Settings },
        { name: 'Hero Banners', path: '/banners', icon: Image },
        { name: 'Services', path: '/services', icon: Layers },
        { name: 'Sub Services', path: '/sub-services', icon: ListTree },
        { name: 'Client Logos', path: '/client-logos', icon: Building2 },
        { name: 'Team Members', path: '/team-members', icon: Users },
        { name: 'Testimonials', path: '/testimonials', icon: MessageSquareQuote },
        { name: 'FAQs', path: '/faqs', icon: HelpCircle },
      ],
    },
    {
      title: 'CONTENT',
      items: [
        { name: 'Blog Articles', path: '/blogs', icon: FileText },
        { name: 'Blog Categories', path: '/blog-categories', icon: FolderTree },
        { name: 'Careers / Jobs', path: '/careers', icon: Briefcase },
      ],
    },
    {
      title: 'MEDIA & LEADS',
      items: [
        { name: 'Media Library', path: '/media', icon: FolderKanban },
        { name: 'Enquiries Inbox', path: '/enquiries', icon: Inbox },
      ],
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-200 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center px-6 border-b border-slate-800 gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-base tracking-wide text-white flex items-center gap-1.5">
              MiscArchive
            </h1>
            <p className="text-[10px] uppercase tracking-wider text-amber-400 font-semibold">
              Admin CMS Console
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          {navSections.map((section, idx) => (
            <div key={idx}>
              <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
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
                          `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            isActive
                              ? 'bg-amber-500/15 text-amber-400 font-semibold border-l-2 border-amber-500 rounded-l-none'
                              : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
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

        {/* User Footer & Logout */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40">
          <div className="flex items-center justify-between mb-3 px-2">
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">{user?.name}</p>
              <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
            </div>
            <span className="text-[10px] font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded">
              {user?.role}
            </span>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors border border-rose-500/20"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
