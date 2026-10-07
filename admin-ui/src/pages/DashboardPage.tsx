import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Inbox,
  Layers,
  Image,
  Users,
  Briefcase,
  ArrowUpRight,
  Clock,
  Sparkles,
} from 'lucide-react';
import { apiRequest } from '../api/client';
import { Card } from '../components/common/Card';
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

  const statCards = [
    {
      title: 'Blog Articles',
      value: stats.blogs?.total || 0,
      sub: `${stats.blogs?.published || 0} Published • ${stats.blogs?.draft || 0} Draft`,
      icon: FileText,
      link: '/blogs',
      color: 'from-amber-500/20 to-amber-600/5 text-amber-400 border-amber-500/20',
    },
    {
      title: 'Customer Enquiries',
      value: stats.enquiries?.total || 0,
      sub: `${stats.enquiries?.new || 0} New / Unhandled`,
      icon: Inbox,
      link: '/enquiries',
      color: 'from-blue-500/20 to-blue-600/5 text-blue-400 border-blue-500/20',
    },
    {
      title: 'Core Services',
      value: stats.services || 0,
      sub: 'Digital Marketing, Web, Branding',
      icon: Layers,
      link: '/services',
      color: 'from-emerald-500/20 to-emerald-600/5 text-emerald-400 border-emerald-500/20',
    },
    {
      title: 'Hero Banners',
      value: stats.banners || 0,
      sub: 'Homepage Slider Banners',
      icon: Image,
      link: '/banners',
      color: 'from-purple-500/20 to-purple-600/5 text-purple-400 border-purple-500/20',
    },
    {
      title: 'Career Openings',
      value: stats.careers || 0,
      sub: 'Active Job Postings',
      icon: Briefcase,
      link: '/careers',
      color: 'from-rose-500/20 to-rose-600/5 text-rose-400 border-rose-500/20',
    },
    {
      title: 'Team Profiles',
      value: stats.teamMembers || 0,
      sub: 'Leadership & Executives',
      icon: Users,
      link: '/team-members',
      color: 'from-cyan-500/20 to-cyan-600/5 text-cyan-400 border-cyan-500/20',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 p-8 shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" /> CMS Console Ready
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Welcome to MiscArchive Admin
          </h1>
          <p className="text-sm text-slate-400 mt-2 leading-relaxed">
            Manage all website dynamic content, blog publications, client logos, lead
            enquiries, and branding settings independently from this console.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              to="/blogs/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold text-xs rounded-lg transition-colors"
            >
              <FileText className="w-3.5 h-3.5" /> Compose Article
            </Link>
            <Link
              to="/enquiries"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition-colors"
            >
              <Inbox className="w-3.5 h-3.5" /> View Enquiries
            </Link>
            <Link
              to="/settings"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition-colors"
            >
              Configure Site Settings
            </Link>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              to={card.link}
              className={`p-6 rounded-2xl bg-gradient-to-br ${card.color} bg-slate-900/60 border hover:border-slate-600 transition-all shadow-sm group`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {card.title}
                </span>
                <Icon className="w-5 h-5 opacity-80 group-hover:scale-110 transition-transform" />
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-white">
                  {card.value}
                </span>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
              </div>
              <p className="mt-1 text-xs text-slate-400">{card.sub}</p>
            </Link>
          );
        })}
      </div>

      {/* Recent Activity Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Enquiries */}
        <Card
          title="Recent Lead Enquiries"
          subtitle="Form submissions from contact and modal forms"
          action={
            <Link to="/enquiries" className="text-xs text-amber-400 hover:underline">
              View all &rarr;
            </Link>
          }
        >
          {recentEnquiries.length === 0 ? (
            <div className="py-8 text-center text-slate-500 text-xs">
              No customer enquiries recorded yet.
            </div>
          ) : (
            <div className="divide-y divide-slate-800">
              {recentEnquiries.map((enq: any) => (
                <div key={enq._id} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">{enq.name}</p>
                    <p className="text-xs text-slate-400 truncate max-w-xs">{enq.email} • {enq.service || 'General'}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={
                        enq.status === 'new'
                          ? 'warning'
                          : enq.status === 'replied'
                          ? 'success'
                          : 'info'
                      }
                    >
                      {enq.status}
                    </Badge>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Recent Articles */}
        <Card
          title="Recent Blog Articles"
          subtitle="Published and draft blog content"
          action={
            <Link to="/blogs" className="text-xs text-amber-400 hover:underline">
              Manage articles &rarr;
            </Link>
          }
        >
          {recentBlogs.length === 0 ? (
            <div className="py-8 text-center text-slate-500 text-xs">
              No articles created yet. Compose your first article!
            </div>
          ) : (
            <div className="divide-y divide-slate-800">
              {recentBlogs.map((b: any) => (
                <div key={b._id} className="py-3 flex items-center justify-between">
                  <div className="truncate pr-4">
                    <p className="text-sm font-semibold text-white truncate">{b.title}</p>
                    <p className="text-xs text-slate-400 font-mono truncate">/blog/{b.slug}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <Badge variant={b.isPublished ? 'success' : 'warning'}>
                      {b.isPublished ? 'Published' : 'Draft'}
                    </Badge>
                    <Link
                      to={`/blogs/edit/${b._id}`}
                      className="text-xs text-slate-400 hover:text-white p-1 hover:bg-slate-800 rounded"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
