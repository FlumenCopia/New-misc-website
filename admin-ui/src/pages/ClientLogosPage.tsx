import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { apiRequest } from '../api/client';
import { Table } from '../components/common/Table';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Badge } from '../components/common/Badge';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export const ClientLogosPage: React.FC = () => {
  const [logos, setLogos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLogo, setEditingLogo] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    clientName: '',
    logoImage: '',
    websiteUrl: '',
    altText: '',
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    fetchLogos();
  }, []);

  const fetchLogos = async () => {
    try {
      const res = await apiRequest('/client-logos');
      if (res.success) setLogos(res.data);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (logo?: any) => {
    if (logo) {
      setEditingLogo(logo);
      setFormData({
        clientName: logo.clientName || '',
        logoImage: logo.logoImage || '',
        websiteUrl: logo.websiteUrl || '',
        altText: logo.altText || '',
        order: logo.order || 0,
        isActive: logo.isActive ?? true,
      });
    } else {
      setEditingLogo(null);
      setFormData({
        clientName: '',
        logoImage: '',
        websiteUrl: '',
        altText: '',
        order: logos.length,
        isActive: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingLogo) {
        await apiRequest(`/client-logos/${editingLogo._id}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
        });
      } else {
        await apiRequest('/client-logos', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
      }
      setIsModalOpen(false);
      fetchLogos();
    } catch (err: any) {
      alert(err.message || 'Error saving client logo');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this logo?')) return;
    try {
      await apiRequest(`/client-logos/${id}`, { method: 'DELETE' });
      fetchLogos();
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <LoadingSpinner size="lg" className="min-h-[50vh]" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Client Logos Ticker</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage client and partner logos displayed on the homepage marquee and About page.
          </p>
        </div>
        <Button onClick={() => handleOpenModal()} className="gap-2">
          <Plus className="w-4 h-4" /> Add Client Logo
        </Button>
      </div>

      <Table
        headers={['Logo Preview', 'Client Name', 'Asset Path', 'Order', 'Status', 'Actions']}
        isEmpty={logos.length === 0}
        emptyMessage="No client logos found."
      >
        {logos.map((logo) => (
          <tr key={logo._id} className="hover:bg-slate-800/40 transition-colors">
            <td className="px-6 py-4">
              <div className="w-16 h-10 rounded bg-slate-900 border border-slate-700 flex items-center justify-center p-1 overflow-hidden">
                <img
                  src={logo.logoImage}
                  alt={logo.clientName}
                  onError={(e) => ((e.target as HTMLElement).style.display = 'none')}
                  className="max-h-full max-w-full object-contain filter invert opacity-90"
                />
              </div>
            </td>
            <td className="px-6 py-4 text-sm font-semibold text-white">{logo.clientName}</td>
            <td className="px-6 py-4 text-xs font-mono text-slate-400 max-w-xs truncate">
              {logo.logoImage}
            </td>
            <td className="px-6 py-4 text-xs font-semibold text-white">{logo.order}</td>
            <td className="px-6 py-4">
              <Badge variant={logo.isActive ? 'success' : 'neutral'}>
                {logo.isActive ? 'Visible' : 'Hidden'}
              </Badge>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenModal(logo)}
                  className="p-1 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(logo._id)}
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
        title={editingLogo ? 'Edit Client Logo' : 'Add Client Logo'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Client Name *</label>
            <input
              type="text"
              required
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              placeholder="e.g. InnoTech Solutions"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Logo Image Path *</label>
            <input
              type="text"
              required
              value={formData.logoImage}
              onChange={(e) => setFormData({ ...formData, logoImage: e.target.value })}
              placeholder="/assets/images/logo/client-1.png"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-amber-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Order</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Website URL (Optional)</label>
              <input
                type="text"
                value={formData.websiteUrl}
                onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                placeholder="https://"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Logo
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
