import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit2, Trash2, ExternalLink, Filter } from 'lucide-react';
import { apiRequest } from '../api/client';
import { Table } from '../components/common/Table';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export const BlogsPage: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>({ page: 1, limit: 15, total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchBlogs(1);
  }, [search, status, category]);

  const fetchCategories = async () => {
    try {
      const res = await apiRequest('/blog-categories');
      if (res.success) setCategories(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchBlogs = async (page = 1) => {
    setLoading(true);
    try {
      let query = `?page=${page}&limit=15`;
      if (search) query += `&search=${encodeURIComponent(search)}`;
      if (status !== 'all') query += `&status=${status}`;
      if (category) query += `&category=${encodeURIComponent(category)}`;

      const res = await apiRequest(`/blogs${query}`);
      if (res.success) {
        setBlogs(res.data);
        if (res.pagination) setPagination(res.pagination);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete article: "${title}"?`)) return;
    try {
      await apiRequest(`/blogs/${id}`, { method: 'DELETE' });
      fetchBlogs(pagination.page);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog Articles Management</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage long-form articles, preserved rich HTML body, slugs, and SEO metadata.
          </p>
        </div>
        <Link to="/blogs/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" /> Compose New Article
          </Button>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center gap-3 bg-slate-900 p-3 rounded-xl border border-slate-800">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by article title or slug..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-amber-500"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-amber-500"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c._id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Articles Table */}
      {loading ? (
        <LoadingSpinner size="lg" className="min-h-[40vh]" />
      ) : (
        <>
          <Table
            headers={['Thumbnail', 'Article Title & Slug', 'Category', 'Publish Date', 'Status', 'Actions']}
            isEmpty={blogs.length === 0}
            emptyMessage="No blog articles match the current filter."
          >
            {blogs.map((b) => (
              <tr key={b._id} className="hover:bg-slate-800/40 transition-colors">
                <td className="px-6 py-4">
                  <div className="w-14 h-10 rounded bg-slate-900 border border-slate-700 overflow-hidden flex items-center justify-center">
                    {b.featuredImage ? (
                      <img
                        src={b.featuredImage}
                        alt=""
                        onError={(e) => ((e.target as HTMLElement).style.display = 'none')}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-[10px] text-slate-500 font-bold">BLOG</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="max-w-md">
                    <p className="text-sm font-semibold text-white line-clamp-1">{b.title}</p>
                    <p className="text-xs font-mono text-amber-400 mt-0.5 truncate">
                      /blog/{b.slug}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4 text-xs text-slate-300">{b.category}</td>
                <td className="px-6 py-4 text-xs text-slate-400">
                  {new Date(b.publishDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <Badge variant={b.isPublished ? 'success' : 'warning'}>
                    {b.isPublished ? 'Published' : 'Draft'}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/blogs/edit/${b._id}`}
                      className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                      title="Edit Article"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(b._id, b.title)}
                      className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded transition-colors"
                      title="Delete Article"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </Table>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
              <span>
                Showing Page {pagination.page} of {pagination.totalPages} ({pagination.total} articles total)
              </span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  disabled={pagination.page <= 1}
                  onClick={() => fetchBlogs(pagination.page - 1)}
                >
                  Previous
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  disabled={pagination.page >= pagination.totalPages}
                  onClick={() => fetchBlogs(pagination.page + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
