import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { apiRequest } from '../api/client';
import { Table } from '../components/common/Table';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Badge } from '../components/common/Badge';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    shortDescription: '',
    fullDescriptionHtml: '',
    route: '',
    iconImage: '',
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await apiRequest('/services');
      if (res.success) {
        setServices(res.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (service?: any) => {
    if (service) {
      setEditingService(service);
      setFormData({
        title: service.title || '',
        slug: service.slug || '',
        shortDescription: service.shortDescription || '',
        fullDescriptionHtml: service.fullDescriptionHtml || '',
        route: service.route || '',
        iconImage: service.iconImage || '',
        order: service.order || 0,
        isActive: service.isActive ?? true,
      });
    } else {
      setEditingService(null);
      setFormData({
        title: '',
        slug: '',
        shortDescription: '',
        fullDescriptionHtml: '',
        route: '',
        iconImage: '',
        order: services.length,
        isActive: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingService) {
        await apiRequest(`/services/${editingService._id}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
        });
      } else {
        await apiRequest('/services', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
      }
      setIsModalOpen(false);
      fetchServices();
    } catch (err: any) {
      alert(err.message || 'Error saving service');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service? Associated sub-services will also be removed.')) return;
    try {
      await apiRequest(`/services/${id}`, { method: 'DELETE' });
      fetchServices();
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <LoadingSpinner size="lg" className="min-h-[50vh]" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Services Directory</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage main agency service categories and dedicated service hubs.
          </p>
        </div>
        <Button onClick={() => handleOpenModal()} className="gap-2">
          <Plus className="w-4 h-4" /> Add Service
        </Button>
      </div>

      <Table
        headers={['Service Title', 'URL Slug', 'Route', 'Order', 'Status', 'Actions']}
        isEmpty={services.length === 0}
        emptyMessage="No core services defined."
      >
        {services.map((s) => (
          <tr key={s._id} className="hover:bg-slate-800/40 transition-colors">
            <td className="px-6 py-4">
              <div>
                <p className="text-sm font-semibold text-white">{s.title}</p>
                <p className="text-xs text-slate-400 line-clamp-1 max-w-sm">{s.shortDescription}</p>
              </div>
            </td>
            <td className="px-6 py-4 text-xs font-mono text-amber-400">{s.slug}</td>
            <td className="px-6 py-4 text-xs font-mono text-slate-400">{s.route || `/services/${s.slug}`}</td>
            <td className="px-6 py-4 text-xs font-semibold text-white">{s.order}</td>
            <td className="px-6 py-4">
              <Badge variant={s.isActive ? 'success' : 'neutral'}>
                {s.isActive ? 'Active' : 'Draft'}
              </Badge>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenModal(s)}
                  className="p-1 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(s._id)}
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
        title={editingService ? 'Edit Service' : 'Add New Service'}
        maxWidth="xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Digital Marketing"
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
                placeholder="digital-marketing"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Target Route</label>
            <input
              type="text"
              value={formData.route}
              onChange={(e) => setFormData({ ...formData, route: e.target.value })}
              placeholder="/services/digital-marketing"
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Display Order</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="flex items-center pt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="rounded bg-slate-900 border-slate-700 text-amber-500"
                />
                <span className="text-xs text-slate-300">Active</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Service
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
