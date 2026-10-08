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
  Home,
  Star,
  Trophy,
  Plus,
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

  const statCards = [
    {
      title: 'Blog Articles',
      value: stats.blogs?.total || 0,
      sub: `${stats.blogs?.published || 0} Published • ${stats.blogs?.draft || 0} Draft`,
      icon: FileText,
      link: '/blogs',
      iconColor: 'text-[#1abc9c] bg-[#1abc9c]/10',
    },
    {
      title: 'Customer Enquiries',
      value: stats.enquiries?.total || 0,
      sub: `${stats.enquiries?.new || 0} New / Unhandled`,
      icon: Inbox,
      link: '/enquiries',
      iconColor: 'text-[#ff5252] bg-[#ff5252]/10',
    },
    {
      title: 'Core Services',
      value: stats.services || 0,
      sub: 'Digital Marketing, Web, Branding',
      icon: Layers,
      link: '/services',
      iconColor: 'text-[#00bcd4] bg-[#00bcd4]/10',
    },
    {
      title: 'Hero Banners',
      value: stats.banners || 0,
      sub: 'Homepage Slider Banners',
      icon: Image,
      link: '/banners',
      iconColor: 'text-[#f59e0b] bg-[#f59e0b]/10',
    },
    {
      title: 'Career Openings',
      value: stats.careers || 0,
      sub: 'Active Job Postings',
      icon: Briefcase,
      link: '/careers',
      iconColor: 'text-[#8b5cf6] bg-[#8b5cf6]/10',
    },
    {
      title: 'Team Profiles',
      value: stats.teamMembers || 0,
      sub: 'Leadership & Executives',
      icon: Users,
      link: '/team-members',
      iconColor: 'text-[#3b82f6] bg-[#3b82f6]/10',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Flat Able Page Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div>
          <h1 className="text-[26px] font-bold text-slate-900 tracking-tight">Dashboard Analytics</h1>
          <div className="flex items-center gap-2 text-sm text-slate-600 mt-1">
            <Home className="w-4 h-4 text-slate-500" />
            <span>/</span>
            <span className="text-slate-800 font-semibold">Dashboard Analytics</span>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <Link to="/blogs/new">
            <Button variant="primary" size="md" className="gap-2 shadow-xs">
              <Plus className="w-4 h-4" /> Compose Article
            </Button>
          </Link>
          <Link to="/enquiries">
            <Button variant="secondary" size="md" className="gap-2 shadow-xs">
              <Inbox className="w-4 h-4" /> View Leads
            </Button>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid (Flat Able Style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              to={card.link}
              className="p-5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all shadow-xs group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold uppercase tracking-wider text-slate-600">
                  {card.title}
                </span>
                <div className={`p-2.5 rounded-lg ${card.iconColor}`}>
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-slate-900">
                  {card.value}
                </span>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#1abc9c] transition-colors" />
              </div>
              <p className="mt-1.5 text-[13px] text-slate-600 font-medium">{card.sub}</p>
            </Link>
          );
        })}
      </div>

      {/* Signature Flat Able Highlight Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Teal Achievement Card */}
        <div className="p-6 rounded-xl bg-gradient-to-r from-[#1abc9c] to-[#16a085] text-white shadow-sm flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-wider opacity-95">
              <Sparkles className="w-4 h-4" /> Editorial Library
            </div>
            <div className="text-3xl font-extrabold mt-1">
              {stats.blogs?.total || 79}+ Articles
            </div>
            <p className="text-[13.5px] opacity-90 mt-1 font-medium">
              Published and preserved rich HTML articles online
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0">
            <Star className="w-7 h-7 text-white fill-white" />
          </div>
        </div>

        {/* Emerald Success Card */}
        <div className="p-6 rounded-xl bg-gradient-to-r from-[#2ecc71] to-[#27ae60] text-white shadow-sm flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-wider opacity-95">
              <Trophy className="w-4 h-4" /> Verified Branding
            </div>
            <div className="text-3xl font-extrabold mt-1">
              35 Client Logos
            </div>
            <p className="text-[13.5px] opacity-90 mt-1 font-medium">
              Active in homepage client carousel ticker
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0">
            <Trophy className="w-7 h-7 text-white" />
          </div>
        </div>
      </div>

      {/* Recent Activity Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Enquiries */}
        <Card
          title="Recent Lead Enquiries"
          subtitle="Form submissions from contact and modal forms"
          action={
            <Link to="/enquiries" className="text-[13.5px] text-[#1abc9c] hover:text-[#16a085] font-bold hover:underline">
              View all &rarr;
            </Link>
          }
        >
          {recentEnquiries.length === 0 ? (
            <div className="py-8 text-center text-slate-500 text-sm">
              No customer enquiries recorded yet.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentEnquiries.map((enq: any) => (
                <div key={enq._id} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="text-[14.5px] font-bold text-slate-900">{enq.name}</p>
                    <p className="text-[13px] text-slate-600 truncate max-w-xs">{enq.email} • {enq.service || 'General'}</p>
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
                    <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
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
            <Link to="/blogs" className="text-[13.5px] text-[#1abc9c] hover:text-[#16a085] font-bold hover:underline">
              Manage articles &rarr;
            </Link>
          }
        >
          {recentBlogs.length === 0 ? (
            <div className="py-8 text-center text-slate-500 text-sm">
              No articles created yet. Compose your first article!
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentBlogs.map((b: any) => (
                <div key={b._id} className="py-3 flex items-center justify-between">
                  <div className="truncate pr-4">
                    <p className="text-[14.5px] font-bold text-slate-900 truncate">{b.title}</p>
                    <p className="text-[13px] text-slate-600 font-mono truncate">/blog/{b.slug}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <Badge variant={b.isPublished ? 'success' : 'warning'}>
                      {b.isPublished ? 'Published' : 'Draft'}
                    </Badge>
                    <Link
                      to={`/blogs/edit/${b._id}`}
                      className="text-[13px] font-medium text-slate-700 hover:text-slate-900 px-3 py-1 hover:bg-slate-100 rounded-md border border-slate-200 transition-colors"
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
