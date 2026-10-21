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
      title: 'Published Blogs',
      value: stats.blogs?.published || 0,
      sub: `${stats.blogs?.draft || 0} drafts in progress`,
      icon: FileText,
      link: '/blogs',
    },
    {
      title: 'Website Pages',
      value: stats.pages || 5,
      sub: 'Home, About, Services, Neyyattinkara',
      icon: FileCode2,
      link: '/pages',
    },
    {
      title: 'Core Services',
      value: stats.services || 0,
      sub: 'Active marketing & web services',
      icon: Layers,
      link: '/services',
    },
    {
      title: 'Portfolio Projects',
      value: stats.projects || 3,
      sub: 'Featured client case studies',
      icon: Briefcase,
      link: '/projects',
    },
    {
      title: 'Client & Sponsor Logos',
      value: stats.clientLogos || 0,
      sub: 'Active in brand ticker',
      icon: Building2,
      link: '/client-logos',
    },
    {
      title: 'Customer Enquiries',
      value: stats.enquiries?.total || 0,
      sub: `${stats.enquiries?.new || 0} unhandled / new`,
      icon: Inbox,
      link: '/enquiries',
      highlight: (stats.enquiries?.new || 0) > 0,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Content Management Overview</h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time status of your public website pages, articles, services, and incoming client leads.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <Link to="/blogs/new">
            <Button size="sm">
              <Plus className="w-4 h-4" />
              <span>Compose Article</span>
            </Button>
          </Link>
          <Link to="/pages">
            <Button variant="secondary" size="sm">
              <FileCode2 className="w-4 h-4" />
              <span>Edit Pages</span>
            </Button>
          </Link>
          <Link to="/client-logos">
            <Button variant="secondary" size="sm">
              <Building2 className="w-4 h-4" />
              <span>Add Client Logo</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
        {coreMetrics.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Link
              key={idx}
              to={item.link}
              className={`p-4 rounded-lg border transition-all hover:border-slate-300 hover:shadow-xs group flex flex-col justify-between ${
                item.highlight
                  ? 'bg-amber-50/50 border-amber-200'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between text-slate-400 group-hover:text-slate-700 transition-colors">
                <span className="text-[11.5px] font-bold uppercase tracking-wider text-slate-600">
                  {item.title}
                </span>
                <Icon className="w-4 h-4" />
              </div>

              <div className="my-2">
                <span className="text-2xl font-black text-slate-900 tracking-tight">
                  {item.value}
                </span>
              </div>

              <p className="text-[12px] text-slate-500 truncate leading-tight">
                {item.sub}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Main Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <Card
          title="Recent Inquiries & Leads"
          subtitle="Form submissions received from the public website"
          action={
            <Link
              to="/enquiries"
              className="text-xs font-bold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1 transition-colors"
            >
              <span>View all leads</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          }
        >
          {recentEnquiries.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              No customer inquiries recorded yet.
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
        </Card>

        {/* Recently Updated Articles */}
        <Card
          title="Recent Articles & Content"
          subtitle="Latest blog posts and editorial content"
          action={
            <Link
              to="/blogs"
              className="text-xs font-bold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1 transition-colors"
            >
              <span>Manage all articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          }
        >
          {recentBlogs.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              No articles created yet. Compose your first article!
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentBlogs.map((b: any) => (
                <div key={b._id} className="py-3 flex items-center justify-between gap-3">
                  <div className="truncate flex-1 min-w-0 pr-3">
                    <p className="text-[14px] font-bold text-slate-900 truncate">{b.title}</p>
                    <p className="text-xs text-slate-500 font-mono truncate mt-0.5">/blog/{b.slug}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant={b.isPublished ? 'success' : 'neutral'}>
                      {b.isPublished ? 'Published' : 'Draft'}
                    </Badge>
                    <Link
                      to={`/blogs/edit/${b._id}`}
                      className="text-xs font-semibold text-slate-700 hover:text-slate-900 px-2.5 py-1 hover:bg-slate-100 rounded border border-slate-200 transition-colors"
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
