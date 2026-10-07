import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, MapPin, Briefcase } from 'lucide-react';
import { apiRequest } from '../api/client';
import { Table } from '../components/common/Table';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Badge } from '../components/common/Badge';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export const CareersPage: React.FC = () => {
  const [careers, setCareers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCareer, setEditingCareer] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    flyerImage: '',
    department: 'Digital Marketing',
    location: 'Trivandrum, Kerala',
    employmentType: 'Full Time',
    experience: '',
    descriptionHtml: '',
    status: 'open',
    order: 0,
  });

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      const res = await apiRequest('/careers');
      if (res.success) setCareers(res.data);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (career?: any) => {
    if (career) {
      setEditingCareer(career);
      setFormData({
        title: career.title || '',
        flyerImage: career.flyerImage || '',
        department: career.department || 'Digital Marketing',
        location: career.location || 'Trivandrum, Kerala',
        employmentType: career.employmentType || 'Full Time',
        experience: career.experience || '',
        descriptionHtml: career.descriptionHtml || '',
        status: career.status || 'open',
        order: career.order || 0,
      });
    } else {
      setEditingCareer(null);
      setFormData({
        title: '',
        flyerImage: '',
        department: 'Digital Marketing',
        location: 'Trivandrum, Kerala',
        employmentType: 'Full Time',
        experience: '',
        descriptionHtml: '',
        status: 'open',
        order: careers.length,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCareer) {
        await apiRequest(`/careers/${editingCareer._id}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
        });
      } else {
        await apiRequest('/careers', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
      }
      setIsModalOpen(false);
      fetchCareers();
    } catch (err: any) {
      alert(err.message || 'Error saving career opening');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this job opening?')) return;
    try {
      await apiRequest(`/careers/${id}`, { method: 'DELETE' });
      fetchCareers();
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <LoadingSpinner size="lg" className="min-h-[50vh]" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Careers & Job Openings</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage hiring announcements, job flyers, and open recruitment roles.
          </p>
        </div>
        <Button onClick={() => handleOpenModal()} className="gap-2">
          <Plus className="w-4 h-4" /> Post Job Opening
        </Button>
      </div>

      <Table
        headers={['Job Title', 'Department', 'Location', 'Flyer Asset', 'Status', 'Actions']}
        isEmpty={careers.length === 0}
        emptyMessage="No career opportunities posted."
      >
        {careers.map((c) => (
          <tr key={c._id} className="hover:bg-slate-800/40 transition-colors">
            <td className="px-6 py-4">
              <p className="text-sm font-semibold text-white">{c.title}</p>
              <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                <Briefcase className="w-3 h-3 text-amber-400" />
                {c.employmentType}
              </p>
            </td>
            <td className="px-6 py-4 text-xs text-amber-400 font-medium">{c.department}</td>
            <td className="px-6 py-4 text-xs text-slate-300">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-500" />
                {c.location}
              </span>
            </td>
            <td className="px-6 py-4 text-xs font-mono text-slate-400 max-w-xs truncate">
              {c.flyerImage || '—'}
            </td>
            <td className="px-6 py-4">
              <Badge variant={c.status === 'open' ? 'success' : 'danger'}>
                {c.status === 'open' ? 'Actively Hiring' : 'Closed'}
              </Badge>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenModal(c)}
                  className="p-1 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(c._id)}
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
        title={editingCareer ? 'Edit Job Posting' : 'Post New Job'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Job Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Digital Marketing Executive"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Department</label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Hiring Flyer Asset Path</label>
            <input
              type="text"
              value={formData.flyerImage}
              onChange={(e) => setFormData({ ...formData, flyerImage: e.target.value })}
              placeholder="/assets/images/career/dm-hiring.jpg"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            >
              <option value="open">Open / Actively Hiring</option>
              <option value="closed">Closed / Filled</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Job Opening
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
