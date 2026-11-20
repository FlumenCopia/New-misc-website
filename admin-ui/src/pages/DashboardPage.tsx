import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Inbox,
  Layers,
  Building2,
  FileCode2,
  MapPin,
  Clock,
  Plus,
  ArrowRight,
  ExternalLink,
  Briefcase,
  Headphones,
  Edit,
  Users,
  Image,
} from 'lucide-react';
import { apiRequest } from '../api/client';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export const DashboardPage: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await apiRequest('/dashboard/stats');
        if (res.success) {
          setData(res);
        }
      } catch (err) {
        console.error('Failed to load dashboard statistics', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <LoadingSpinner size="lg" className="min-h-[50vh]" />;
  }

  const stats = data?.stats || {};
  const recentEnquiries = data?.recentEnquiries || [];
  const recentBlogs = data?.recentBlogs || [];

  const coreMetrics = [
    {
      title: 'PUBLISHED BLOGS',
      value: stats.blogs?.published || 80,
      sub: `${stats.blogs?.draft || 0} drafts in progress`,
      icon: FileText,
      link: '/blogs',
    },
    {
      title: 'WEBSITE PAGES',
      value: stats.pages || 7,
      sub: 'Home, About, Services, ...',
      icon: FileCode2,
      link: '/pages',
    },
    {
      title: 'CORE SERVICES',
      value: stats.services || 11,
      sub: 'Active marketing & web...',
      icon: Layers,
      link: '/services',
    },
    {
      title: 'HERO BANNERS',
      value: stats.banners || 3,
      sub: 'Active hero carousel slides',
      icon: Image,
      link: '/banners',
    },
    {
      title: 'CLIENT & SPONSOR LOGOS',
      value: stats.clientLogos || 35,
      sub: 'Active in brand ticker',
      icon: Building2,
      link: '/client-logos',
    },
    {
      title: 'CUSTOMER ENQUIRIES',
      value: stats.enquiries?.total || 0,
      sub: `${stats.enquiries?.new || 0} unhandled / new`,
      icon: Headphones,
      link: '/enquiries',
      highlight: (stats.enquiries?.new || 0) > 0,
    },
  ];

  return (
    <div className="space-y-7">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
        <div>
          <div className="relative inline-block">
            <h1 className="text-2xl lg:text-[28px] font-black text-slate-900 tracking-tight">
              Content Management Overview
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-amber-400 to-amber-200 rounded-full mt-1" />
          </div>
          <p className="text-[13.5px] text-slate-500 mt-1.5">
            Real-time status of your public website pages, articles, services, and incoming client leads.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <Link to="/blogs/new">
            <Button size="sm" className="rounded-xl px-4 py-2 font-bold shadow-xs">
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Compose Article</span>
            </Button>
          </Link>
          <Link to="/pages">
            <Button variant="secondary" size="sm" className="rounded-xl px-4 py-2 font-semibold">
              <FileCode2 className="w-4 h-4 text-slate-500" />
              <span>Edit Pages</span>
            </Button>
          </Link>
          <Link to="/client-logos">
            <Button variant="secondary" size="sm" className="rounded-xl px-4 py-2 font-semibold">
              <Building2 className="w-4 h-4 text-slate-500" />
              <span>Add Client Logo</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* 6 Metrics Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5">
        {coreMetrics.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Link
              key={idx}
              to={item.link}
              className={`p-4 rounded-[20px] border bg-white transition-all hover:-translate-y-0.5 hover:shadow-md group flex flex-col justify-between ${
                item.highlight
                  ? 'border-amber-300 ring-2 ring-amber-400/20 shadow-xs'
                  : 'border-amber-100/70 shadow-[0_2px_10px_rgba(0,0,0,0.02)]'
              }`}
            >
              <div>
                <div className="w-9 h-9 rounded-xl bg-amber-50/80 border border-amber-200/60 flex items-center justify-center text-amber-600 mb-3 group-hover:bg-amber-100/60 transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 block leading-tight">
                  {item.title}
                </span>
              </div>

              <div className="my-2.5">
                <span className="text-3xl font-black text-slate-900 tracking-tight">
                  {item.value}
                </span>
              </div>

              <p className="text-[11.5px] text-slate-500 truncate leading-tight">
                {item.sub}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Main Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Recent Inquiries */}
        <div className="bg-white border border-amber-100/70 rounded-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col">
          {/* Card Header */}
          <div className="px-6 py-4.5 border-b border-amber-50/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50/80 border border-amber-200/60 flex items-center justify-center text-amber-600 shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-[15.5px] font-bold text-slate-900 tracking-tight">Recent Inquiries & Leads</h3>
                <p className="text-[12px] text-slate-400">Form submissions received from the public website</p>
              </div>
            </div>
            <Link
              to="/enquiries"
              className="text-xs font-bold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1 transition-colors"
            >
              <span>View all leads</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card Body */}
          <div className="p-6 flex-1 flex flex-col justify-center">
            {recentEnquiries.length === 0 ? (
              <div className="py-10 flex flex-col items-center justify-center text-center">
                {/* Glowing circular container */}
                <div className="w-28 h-28 rounded-full bg-gradient-to-b from-amber-100/70 via-amber-50/40 to-amber-100/20 border border-amber-200/50 flex items-center justify-center shadow-inner relative mb-4">
                  <div className="w-20 h-20 rounded-full bg-amber-100/40 blur-md absolute inset-0 m-auto pointer-events-none" />
                  {/* Amber Tray Illustration with 3 Radiant Rays */}
                  <svg className="w-12 h-12 text-[#f5a623] relative z-10" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    {/* Top rays */}
                    <line x1="24" y1="6" x2="24" y2="10" />
                    <line x1="16" y1="8" x2="18.5" y2="12" />
                    <line x1="32" y1="8" x2="29.5" y2="12" />
                    {/* Inbox tray */}
                    <path d="M12 21 L36 21 L33 36 L15 36 Z" />
                    <path d="M12 21 L18 29 L30 29 L36 21" />
                  </svg>
                </div>
                <p className="text-[13.5px] font-medium text-slate-600">
                  No customer inquiries recorded yet.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentEnquiries.map((enq: any) => (
                  <div key={enq._id} className="py-3 flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-[14px] font-bold text-slate-900 truncate">{enq.name}</p>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {enq.email} {enq.service ? `• ${enq.service}` : ''}
                      </p>
                    </div>
                    <div className="flex items-center gap-2.5 shrink-0">
                      <Badge
                        variant={
                          enq.status === 'new'
                            ? 'warning'
                            : enq.status === 'replied'
                            ? 'success'
                            : 'neutral'
                        }
                      >
                        {enq.status}
                      </Badge>
                      <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(enq.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Recent Articles & Content */}
        <div className="bg-white border border-amber-100/70 rounded-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col">
          {/* Card Header */}
          <div className="px-6 py-4.5 border-b border-amber-50/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50/80 border border-amber-200/60 flex items-center justify-center text-amber-600 shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-[15.5px] font-bold text-slate-900 tracking-tight">Recent Articles & Content</h3>
                <p className="text-[12px] text-slate-400">Latest blog posts and editorial content</p>
              </div>
            </div>
            <Link
              to="/blogs"
              className="text-xs font-bold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1 transition-colors"
            >
              <span>Manage all articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card Body */}
          <div className="p-6 flex-1 flex flex-col justify-center">
            {recentBlogs.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-sm">
                No articles created yet. Compose your first article!
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentBlogs.slice(0, 4).map((b: any) => (
                  <div key={b._id} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
                    <div className="truncate flex-1 min-w-0 pr-3">
                      <p className="text-[13.5px] font-bold text-slate-900 truncate leading-snug">{b.title}</p>
                      <p className="text-[11.5px] text-slate-400 font-mono truncate mt-0.5">/blog/{b.slug}</p>
                    </div>
                    <div className="flex items-center gap-2.5 shrink-0">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60 uppercase">
                        {b.isPublished ? 'Published' : 'Draft'}
                      </span>
                      <Link
                        to={`/blogs/edit/${b._id}`}
                        className="inline-flex items-center gap-1 text-[12px] font-semibold text-slate-700 hover:text-slate-950 px-2.5 py-1 hover:bg-slate-50 rounded-lg border border-slate-200 transition-colors"
                      >
                        <Edit className="w-3 h-3 text-slate-400" />
                        <span>Edit</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
