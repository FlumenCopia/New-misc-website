import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { apiRequest } from '../api/client';
import { Table } from '../components/common/Table';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Badge } from '../components/common/Badge';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export const FaqsPage: React.FC = () => {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    question: '',
    answerHtml: '',
    category: 'general',
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const res = await apiRequest('/faqs');
      if (res.success) setFaqs(res.data);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (faq?: any) => {
    if (faq) {
      setEditingFaq(faq);
      setFormData({
        question: faq.question || '',
        answerHtml: faq.answerHtml || '',
        category: faq.category || 'general',
        order: faq.order || 0,
        isActive: faq.isActive ?? true,
      });
    } else {
      setEditingFaq(null);
      setFormData({
        question: '',
        answerHtml: '',
        category: 'general',
        order: faqs.length,
        isActive: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingFaq) {
        await apiRequest(`/faqs/${editingFaq._id}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
        });
      } else {
        await apiRequest('/faqs', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
      }
      setIsModalOpen(false);
      fetchFaqs();
    } catch (err: any) {
      alert(err.message || 'Error saving FAQ');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;
    try {
      await apiRequest(`/faqs/${id}`, { method: 'DELETE' });
      fetchFaqs();
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <LoadingSpinner size="lg" className="min-h-[50vh]" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Frequently Asked Questions (FAQs)</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage accordion FAQs and answers displayed on the homepage and service hubs.
          </p>
        </div>
        <Button onClick={() => handleOpenModal()} className="gap-2">
          <Plus className="w-4 h-4" /> Add FAQ
        </Button>
      </div>

      <Table
        headers={['Question', 'Answer Preview', 'Category', 'Order', 'Status', 'Actions']}
        isEmpty={faqs.length === 0}
        emptyMessage="No FAQs registered."
      >
        {faqs.map((faq) => (
          <tr key={faq._id} className="hover:bg-slate-800/40 transition-colors">
            <td className="px-6 py-4 text-sm font-semibold text-white max-w-xs truncate">
              {faq.question}
            </td>
            <td className="px-6 py-4 text-xs text-slate-400 max-w-sm truncate">
              {faq.answerHtml.replace(/<[^>]*>?/gm, '')}
            </td>
            <td className="px-6 py-4 text-xs font-mono text-slate-300">{faq.category}</td>
            <td className="px-6 py-4 text-xs font-semibold text-white">{faq.order}</td>
            <td className="px-6 py-4">
              <Badge variant={faq.isActive ? 'success' : 'neutral'}>
                {faq.isActive ? 'Active' : 'Hidden'}
              </Badge>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenModal(faq)}
                  className="p-1 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(faq._id)}
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
        title={editingFaq ? 'Edit FAQ' : 'Add FAQ'}
        maxWidth="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Question *</label>
            <input
              type="text"
              required
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              placeholder="Why choose MiscArchive for digital marketing?"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Answer (HTML / Text) *</label>
            <textarea
              rows={4}
              required
              value={formData.answerHtml}
              onChange={(e) => setFormData({ ...formData, answerHtml: e.target.value })}
              placeholder="We provide end-to-end digital marketing solutions..."
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="general"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
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
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save FAQ
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
