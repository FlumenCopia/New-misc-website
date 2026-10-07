import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { apiRequest } from '../api/client';
import { Table } from '../components/common/Table';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Badge } from '../components/common/Badge';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export const SubServicesPage: React.FC = () => {
  const [subServices, setSubServices] = useState<any[]>([]);
  const [parentServices, setParentServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubService, setEditingSubService] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    parentService: '',
    title: '',
    slug: '',
    shortDescription: '',
    route: '',
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [subRes, parentRes] = await Promise.all([
        apiRequest('/sub-services'),
        apiRequest('/services'),
      ]);
      if (subRes.success) setSubServices(subRes.data);
      if (parentRes.success) setParentServices(parentRes.data);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (sub?: any) => {
    if (sub) {
      setEditingSubService(sub);
      setFormData({
        parentService: sub.parentService?._id || sub.parentService || '',
        title: sub.title || '',
        slug: sub.slug || '',
        shortDescription: sub.shortDescription || '',
        route: sub.route || '',
        order: sub.order || 0,
        isActive: sub.isActive ?? true,
      });
    } else {
      setEditingSubService(null);
      setFormData({
        parentService: parentServices[0]?._id || '',
        title: '',
        slug: '',
        shortDescription: '',
        route: '',
        order: subServices.length,
        isActive: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingSubService) {
        await apiRequest(`/sub-services/${editingSubService._id}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
        });
      } else {
        await apiRequest('/sub-services', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err: any) {
      alert(err.message || 'Error saving sub-service');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this sub-service?')) return;
    try {
      await apiRequest(`/sub-services/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <LoadingSpinner size="lg" className="min-h-[50vh]" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Sub-Services Directory</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage granular specialized sub-categories (e.g. Email Marketing, SEM, SEO, SMM).
          </p>
        </div>
        <Button onClick={() => handleOpenModal()} className="gap-2">
          <Plus className="w-4 h-4" /> Add Sub-Service
        </Button>
      </div>

      <Table
        headers={['Sub-Service Title', 'Parent Category', 'URL Slug', 'Route', 'Status', 'Actions']}
        isEmpty={subServices.length === 0}
        emptyMessage="No sub-services configured."
      >
        {subServices.map((sub) => (
          <tr key={sub._id} className="hover:bg-slate-800/40 transition-colors">
            <td className="px-6 py-4">
              <div>
                <p className="text-sm font-semibold text-white">{sub.title}</p>
                <p className="text-xs text-slate-400 line-clamp-1 max-w-sm">{sub.shortDescription}</p>
              </div>
            </td>
            <td className="px-6 py-4 text-xs font-medium text-amber-400">
              {sub.parentService?.title || 'Unknown Parent'}
            </td>
            <td className="px-6 py-4 text-xs font-mono text-slate-300">{sub.slug}</td>
            <td className="px-6 py-4 text-xs font-mono text-slate-400">{sub.route || '—'}</td>
            <td className="px-6 py-4">
              <Badge variant={sub.isActive ? 'success' : 'neutral'}>
                {sub.isActive ? 'Active' : 'Draft'}
              </Badge>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenModal(sub)}
                  className="p-1 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(sub._id)}
                  className="p-1 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </Table>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingSubService ? 'Edit Sub-Service' : 'Add Sub-Service'}
        maxWidth="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Parent Service *</label>
            <select
              required
              value={formData.parentService}
              onChange={(e) => setFormData({ ...formData, parentService: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            >
              <option value="">Select Parent Service</option>
              {parentServices.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Email Marketing"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Slug *</label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="email"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Route</label>
            <input
              type="text"
              value={formData.route}
              onChange={(e) => setFormData({ ...formData, route: e.target.value })}
              placeholder="/services/digital-marketing/email"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Short Description</label>
            <textarea
              rows={2}
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Sub-Service
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
