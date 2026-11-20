import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, MapPin, Briefcase, GraduationCap, Image as ImageIcon } from 'lucide-react';
import { apiRequest } from '../api/client';
import { Table } from '../components/common/Table';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Badge } from '../components/common/Badge';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ImageUploadField } from '../components/common/ImageUploadField';

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
    experience: '1-3 Years',
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
        experience: career.experience || '1-3 Years',
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
        experience: '1-3 Years',
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

  const handleToggleStatus = async (career: any) => {
    try {
      const newStatus = career.status === 'open' ? 'closed' : 'open';
      await apiRequest(`/careers/${career._id}`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus }),
      });
      fetchCareers();
    } catch (err: any) {
      alert(err.message || 'Error updating career status');
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
            Manage hiring vacancies, recruitment flyers, and job statuses shown on the public site.
          </p>
        </div>
        <Button onClick={() => handleOpenModal()} className="gap-2">
          <Plus className="w-4 h-4" /> Post Job Opening
        </Button>
      </div>

      <Table
        headers={['Job Title', 'Department', 'Location & Exp', 'Flyer Graphic', 'Status', 'Actions']}
        isEmpty={careers.length === 0}
        emptyMessage="No career opportunities posted."
      >
        {careers.map((c) => (
          <tr key={c._id} className="hover:bg-slate-50/80 transition-colors">
            {/* Job Title & Type */}
            <td className="px-6 py-4">
              <p className="text-sm font-semibold text-slate-900">{c.title}</p>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                {c.employmentType || 'Full Time'}
              </p>
            </td>

            {/* Department */}
            <td className="px-6 py-4 text-xs text-slate-700 font-semibold">
              <span className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-md font-medium">
                {c.department || 'General'}
              </span>
            </td>

            {/* Location & Experience */}
            <td className="px-6 py-4 text-xs text-slate-600">
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {c.location || 'Trivandrum, Kerala'}
                </span>
                {c.experience && (
                  <span className="flex items-center gap-1 text-slate-500">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                    Exp: {c.experience}
                  </span>
                )}
              </div>
            </td>

            {/* Flyer Graphic Thumbnail */}
            <td className="px-6 py-4">
              {c.flyerImage ? (
                <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center">
                  <img
                    src={c.flyerImage}
                    alt={c.title}
                    className="w-full h-full object-cover"
                    onError={(e: any) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              ) : (
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <ImageIcon className="w-3.5 h-3.5" /> No flyer
                </span>
              )}
            </td>

            {/* Status (1-click toggle) */}
            <td className="px-6 py-4">
              <button
                type="button"
                onClick={() => handleToggleStatus(c)}
                className="cursor-pointer focus:outline-none transition-transform active:scale-95"
                title={`Click to set ${c.status === 'open' ? 'Closed' : 'Open'}`}
              >
                <Badge variant={c.status === 'open' ? 'success' : 'danger'}>
                  {c.status === 'open' ? 'Actively Hiring' : 'Closed'}
                </Badge>
              </button>
            </td>

            {/* Actions */}
            <td className="px-6 py-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenModal(c)}
                  className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                  title="Edit Job"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(c._id)}
                  className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Delete Job"
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
        title={editingCareer ? 'Edit Job Opening' : 'Post New Job Opening'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Job Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Digital Marketing Executive / Hiring"
              className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                placeholder="Digital Marketing"
                className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Employment Type</label>
              <select
                value={formData.employmentType}
                onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-brand-500"
              >
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Trivandrum, Kerala"
                className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Experience Required</label>
              <input
                type="text"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                placeholder="e.g. 1-3 Years, Fresher"
                className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div>
            <ImageUploadField
              label="Job Flyer / Announcement Graphic"
              value={formData.flyerImage}
              onChange={(url) => setFormData({ ...formData, flyerImage: url })}
              placeholder="/uploads/... or /assets/..."
              helperText="Upload recruitment poster or flyer image for this position."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Hiring Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-brand-500"
            >
              <option value="open">Open / Actively Hiring (Visible on Website)</option>
              <option value="closed">Closed / Filled (Hidden from Public)</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
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
