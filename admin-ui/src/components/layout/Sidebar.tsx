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
      title: 'Website Config',
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
      title: 'Content',
      items: [
        { name: 'Blog Articles', path: '/blogs', icon: FileText },
        { name: 'Blog Categories', path: '/blog-categories', icon: FolderTree },
        { name: 'Careers / Jobs', path: '/careers', icon: Briefcase },
      ],
    },
    {
      title: 'Media & Leads',
      items: [
        { name: 'Media Library', path: '/media', icon: FolderKanban },
        { name: 'Contact Leads', path: '/enquiries', icon: Inbox },
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
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#1b2434] border-r border-[#26344b] flex flex-col transition-transform duration-200 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-[#26344b] bg-[#1b2434]">
          <BrandLogo size="md" showBadge theme="on-dark" />
        </div>

        {/* User Profile Widget (Flat Able Style) */}
        <div className="px-5 py-3.5 border-b border-[#26344b]/80 bg-[#161f2d] flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#1abc9c] text-white font-bold flex items-center justify-center text-sm shadow-xs shrink-0">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div className="overflow-hidden flex-1">
            <p className="text-[14px] font-bold text-white truncate">{user?.name || 'Admin User'}</p>
            <p className="text-[12px] text-[#1abc9c] font-semibold truncate flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-[#1abc9c] inline-block" /> CMS Administrator
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-6">
          {navSections.map((section, idx) => (
            <div key={idx}>
              <div className="px-3 mb-2 text-[12px] font-bold uppercase tracking-wider text-slate-300">
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
                          `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-[14px] font-medium transition-all ${
                            isActive
                              ? 'bg-[#1abc9c] text-white font-semibold shadow-sm'
                              : 'text-slate-200 hover:text-white hover:bg-white/10'
                          }`
                        }
                      >
                        <Icon className="w-[18px] h-[18px] shrink-0" />
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
        <div className="p-4 border-t border-[#26344b] bg-[#161f2d]">
          <div className="flex items-center justify-between mb-3 px-2">
            <div className="overflow-hidden">
              <p className="text-[13.5px] font-semibold text-white truncate">{user?.name}</p>
              <p className="text-[12px] text-slate-300 truncate">{user?.email}</p>
            </div>
            <span className="text-[11px] font-bold uppercase bg-[#1abc9c]/25 text-[#1abc9c] border border-[#1abc9c]/40 px-2 py-0.5 rounded-md">
              ACTIVE
            </span>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-[13px] font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition-colors border border-[#26344b]"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
