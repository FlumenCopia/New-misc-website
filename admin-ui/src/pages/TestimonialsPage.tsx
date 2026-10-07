import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Star } from 'lucide-react';
import { apiRequest } from '../api/client';
import { Table } from '../components/common/Table';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Badge } from '../components/common/Badge';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export const TestimonialsPage: React.FC = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    clientName: '',
    designation: '',
    company: '',
    avatarImage: '',
    feedback: '',
    rating: 5,
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await apiRequest('/testimonials');
      if (res.success) setTestimonials(res.data);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item?: any) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        clientName: item.clientName || '',
        designation: item.designation || '',
        company: item.company || '',
        avatarImage: item.avatarImage || '',
        feedback: item.feedback || '',
        rating: item.rating || 5,
        order: item.order || 0,
        isActive: item.isActive ?? true,
      });
    } else {
      setEditingItem(null);
      setFormData({
        clientName: '',
        designation: '',
        company: '',
        avatarImage: '',
        feedback: '',
        rating: 5,
        order: testimonials.length,
        isActive: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await apiRequest(`/testimonials/${editingItem._id}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
        });
      } else {
        await apiRequest('/testimonials', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
      }
      setIsModalOpen(false);
      fetchTestimonials();
    } catch (err: any) {
      alert(err.message || 'Error saving testimonial');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      await apiRequest(`/testimonials/${id}`, { method: 'DELETE' });
      fetchTestimonials();
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <LoadingSpinner size="lg" className="min-h-[50vh]" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Client Testimonials</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage customer reviews, testimonials, and rating badges.
          </p>
        </div>
        <Button onClick={() => handleOpenModal()} className="gap-2">
          <Plus className="w-4 h-4" /> Add Testimonial
        </Button>
      </div>

      <Table
        headers={['Client', 'Designation / Company', 'Rating', 'Feedback', 'Status', 'Actions']}
        isEmpty={testimonials.length === 0}
        emptyMessage="No testimonials registered."
      >
        {testimonials.map((t) => (
          <tr key={t._id} className="hover:bg-slate-800/40 transition-colors">
            <td className="px-6 py-4 text-sm font-semibold text-white">{t.clientName}</td>
            <td className="px-6 py-4 text-xs text-slate-300">
              {t.designation} {t.company ? `• ${t.company}` : ''}
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center text-amber-400 gap-0.5 text-xs">
                {Array.from({ length: t.rating || 5 }).map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
            </td>
            <td className="px-6 py-4 text-xs text-slate-400 max-w-sm truncate">{t.feedback}</td>
            <td className="px-6 py-4">
              <Badge variant={t.isActive ? 'success' : 'neutral'}>
                {t.isActive ? 'Active' : 'Hidden'}
              </Badge>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenModal(t)}
                  className="p-1 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(t._id)}
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
        title={editingItem ? 'Edit Testimonial' : 'Add Testimonial'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Client Name *</label>
            <input
              type="text"
              required
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Designation</label>
              <input
                type="text"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Company</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Feedback Quote *</label>
            <textarea
              rows={3}
              required
              value={formData.feedback}
              onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Testimonial
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
