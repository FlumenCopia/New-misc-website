import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import { apiRequest } from '../api/client';
import { Table } from '../components/common/Table';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Badge } from '../components/common/Badge';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export const BannersPage: React.FC = () => {
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    desktopImage: '',
    mobileImage: '',
    linkUrl: '',
    theme: 'light',
    buttonText: '',
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const res = await apiRequest('/banners');
      if (res.success) {
        setBanners(res.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (banner?: any) => {
    if (banner) {
      setEditingBanner(banner);
      setFormData({
        title: banner.title || '',
        subtitle: banner.subtitle || '',
        desktopImage: banner.desktopImage || '',
        mobileImage: banner.mobileImage || '',
        linkUrl: banner.linkUrl || '',
        theme: banner.theme || 'light',
        buttonText: banner.buttonText || '',
        order: banner.order || 0,
        isActive: banner.isActive ?? true,
      });
    } else {
      setEditingBanner(null);
      setFormData({
        title: '',
        subtitle: '',
        desktopImage: '',
        mobileImage: '',
        linkUrl: '',
        theme: 'light',
        buttonText: '',
        order: banners.length,
        isActive: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingBanner) {
        await apiRequest(`/banners/${editingBanner._id}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
        });
      } else {
        await apiRequest('/banners', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
      }
      setIsModalOpen(false);
      fetchBanners();
    } catch (err: any) {
      alert(err.message || 'Error saving banner slide');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this banner slide?')) return;
    try {
      await apiRequest(`/banners/${id}`, { method: 'DELETE' });
      fetchBanners();
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <LoadingSpinner size="lg" className="min-h-[50vh]" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Hero Banner Carousel</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage homepage slider banners with desktop & mobile graphics, themes, and CTAs.
          </p>
        </div>
        <Button onClick={() => handleOpenModal()} className="gap-2">
          <Plus className="w-4 h-4" /> Add Slide
        </Button>
      </div>

      <Table
        headers={['Preview', 'Desktop Asset', 'Link URL', 'Theme', 'Order', 'Status', 'Actions']}
        isEmpty={banners.length === 0}
        emptyMessage="No hero banners configured."
      >
        {banners.map((b) => (
          <tr key={b._id} className="hover:bg-slate-800/40 transition-colors">
            <td className="px-6 py-4">
              <div className="w-20 h-10 rounded-md bg-black border border-slate-700 overflow-hidden flex items-center justify-center">
                <img
                  src={b.desktopImage}
                  alt={b.title || 'Slide'}
                  onError={(e) => ((e.target as HTMLElement).style.display = 'none')}
                  className="w-full h-full object-cover"
                />
              </div>
            </td>
            <td className="px-6 py-4 text-xs font-mono text-slate-300 max-w-xs truncate">
              {b.desktopImage}
            </td>
            <td className="px-6 py-4 text-xs text-slate-400 font-mono truncate max-w-xs">
              {b.linkUrl || '—'}
            </td>
            <td className="px-6 py-4">
              <Badge variant={b.theme === 'dark' ? 'neutral' : 'warning'}>
                {b.theme}
              </Badge>
            </td>
            <td className="px-6 py-4 text-xs font-semibold text-white">{b.order}</td>
            <td className="px-6 py-4">
              <Badge variant={b.isActive ? 'success' : 'neutral'}>
                {b.isActive ? 'Active' : 'Hidden'}
              </Badge>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenModal(b)}
                  className="p-1 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(b._id)}
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
        title={editingBanner ? 'Edit Banner Slide' : 'Create Banner Slide'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Desktop Image Path *</label>
            <input
              type="text"
              required
              value={formData.desktopImage}
              onChange={(e) => setFormData({ ...formData, desktopImage: e.target.value })}
              placeholder="/assets/images/Bannermisc.jpg"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Mobile Image Path</label>
            <input
              type="text"
              value={formData.mobileImage}
              onChange={(e) => setFormData({ ...formData, mobileImage: e.target.value })}
              placeholder="/assets/images/MISC-PHONE-BANNER3.jpg"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Theme</label>
              <select
                value={formData.theme}
                onChange={(e) => setFormData({ ...formData, theme: e.target.value as any })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Display Order</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Link URL (Optional)</label>
            <input
              type="text"
              value={formData.linkUrl}
              onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
              placeholder="/Neyyattinkara or https://"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>
          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="rounded bg-slate-900 border-slate-700 text-amber-500 focus:ring-amber-500"
            />
            <label htmlFor="isActive" className="text-xs text-slate-300">
              Active / Visible on public carousel
            </label>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Slide
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
