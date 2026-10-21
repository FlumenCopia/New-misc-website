import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FileCode2,
  FileText,
  FolderTree,
  Layers,
  ListTree,
  MapPin,
  Briefcase,
  Building2,
  MessageSquareQuote,
  Users,
  HelpCircle,
  Image,
  Navigation,
  FolderKanban,
  Inbox,
  Settings,
  LogOut,
  UserCheck,
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
        { name: 'Service Categories', path: '/sub-services', icon: ListTree },
        { name: 'Portfolio Projects', path: '/projects', icon: Briefcase },
        { name: 'Blog Articles', path: '/blogs', icon: FileText },
        { name: 'Blog Categories', path: '/blog-categories', icon: FolderTree },
      ],
    },
    {
      title: 'Social Proof & Media',
      items: [
        { name: 'Clients & Sponsors', path: '/client-logos', icon: Building2 },
        { name: 'Testimonials', path: '/testimonials', icon: MessageSquareQuote },
        { name: 'Team & Authors', path: '/team-members', icon: Users },
        { name: 'FAQs', path: '/faqs', icon: HelpCircle },
        { name: 'Hero Banners', path: '/banners', icon: Image },
        { name: 'Media Library', path: '/media', icon: FolderKanban },
      ],
    },
    {
      title: 'System & Inbound',
      items: [
        { name: 'Navigation Menus', path: '/navigation', icon: Navigation },
        { name: 'Contact Enquiries', path: '/enquiries', icon: Inbox },
        { name: 'Careers', path: '/careers', icon: UserCheck },
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
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-charcoal-900 border-r border-charcoal-800 flex flex-col transition-transform duration-200 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-charcoal-800 bg-charcoal-950">
          <BrandLogo size="md" showBadge theme="on-dark" />
        </div>

        {/* User Card */}
        <div className="px-5 py-3 border-b border-charcoal-800 bg-charcoal-850 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-brand-500 text-charcoal-950 font-bold flex items-center justify-center text-sm shadow-xs shrink-0">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div className="overflow-hidden flex-1">
            <p className="text-[13.5px] font-bold text-white truncate">{user?.name || 'Admin User'}</p>
            <p className="text-[11.5px] text-brand-400 font-semibold truncate flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 inline-block" /> Super Administrator
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-3.5 space-y-5">
          {navSections.map((section, idx) => (
            <div key={idx}>
              <div className="px-3 mb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {section.title}
              </div>
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.path}>
                      <NavLink
                        to={item.path}
                        end={item.path === '/'}
                        onClick={onClose}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3 py-2 rounded-md text-[13.5px] font-medium transition-colors ${
                            isActive
                              ? 'bg-brand-500 text-charcoal-950 font-bold shadow-xs'
                              : 'text-slate-300 hover:text-white hover:bg-charcoal-800'
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
        <div className="p-3.5 border-t border-charcoal-800 bg-charcoal-950">
          <div className="flex items-center justify-between mb-2.5 px-1.5">
            <div className="overflow-hidden">
              <p className="text-[13px] font-medium text-slate-200 truncate">{user?.email}</p>
            </div>
            <span className="text-[10px] font-bold uppercase bg-brand-500/20 text-brand-400 border border-brand-500/30 px-1.5 py-0.5 rounded">
              ONLINE
            </span>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-md text-[13px] font-semibold text-slate-300 hover:text-white hover:bg-charcoal-800 transition-colors border border-charcoal-700"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
