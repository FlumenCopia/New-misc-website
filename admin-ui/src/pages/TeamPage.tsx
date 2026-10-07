import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { apiRequest } from '../api/client';
import { Table } from '../components/common/Table';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Badge } from '../components/common/Badge';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export const TeamPage: React.FC = () => {
  const [team, setTeam] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    photoImage: '',
    bio: '',
    socialLinks: { linkedin: '', twitter: '', facebook: '', instagram: '' },
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const res = await apiRequest('/team-members');
      if (res.success) setTeam(res.data);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (member?: any) => {
    if (member) {
      setEditingMember(member);
      setFormData({
        name: member.name || '',
        designation: member.designation || '',
        photoImage: member.photoImage || '',
        bio: member.bio || '',
        socialLinks: member.socialLinks || { linkedin: '', twitter: '', facebook: '', instagram: '' },
        order: member.order || 0,
        isActive: member.isActive ?? true,
      });
    } else {
      setEditingMember(null);
      setFormData({
        name: '',
        designation: '',
        photoImage: '',
        bio: '',
        socialLinks: { linkedin: '', twitter: '', facebook: '', instagram: '' },
        order: team.length,
        isActive: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingMember) {
        await apiRequest(`/team-members/${editingMember._id}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
        });
      } else {
        await apiRequest('/team-members', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
      }
      setIsModalOpen(false);
      fetchTeam();
    } catch (err: any) {
      alert(err.message || 'Error saving team member');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this team member?')) return;
    try {
      await apiRequest(`/team-members/${id}`, { method: 'DELETE' });
      fetchTeam();
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <LoadingSpinner size="lg" className="min-h-[50vh]" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Team Profiles</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage company directors, executives, and department leaders.
          </p>
        </div>
        <Button onClick={() => handleOpenModal()} className="gap-2">
          <Plus className="w-4 h-4" /> Add Member
        </Button>
      </div>

      <Table
        headers={['Member', 'Designation', 'Photo Asset', 'Order', 'Status', 'Actions']}
        isEmpty={team.length === 0}
        emptyMessage="No team members listed."
      >
        {team.map((m) => (
          <tr key={m._id} className="hover:bg-slate-800/40 transition-colors">
            <td className="px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden">
                  {m.photoImage ? (
                    <img src={m.photoImage} alt={m.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs text-slate-400 font-bold">{m.name.charAt(0)}</span>
                  )}
                </div>
                <span className="text-sm font-semibold text-white">{m.name}</span>
              </div>
            </td>
            <td className="px-6 py-4 text-xs text-amber-400 font-medium">{m.designation}</td>
            <td className="px-6 py-4 text-xs font-mono text-slate-400 max-w-xs truncate">{m.photoImage || '—'}</td>
            <td className="px-6 py-4 text-xs font-semibold text-white">{m.order}</td>
            <td className="px-6 py-4">
              <Badge variant={m.isActive ? 'success' : 'neutral'}>
                {m.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenModal(m)}
                  className="p-1 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(m._id)}
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
        title={editingMember ? 'Edit Team Member' : 'Add Team Member'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Anoop D Anil"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Designation *</label>
              <input
                type="text"
                required
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                placeholder="Managing Director"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Photo Image Path</label>
            <input
              type="text"
              value={formData.photoImage}
              onChange={(e) => setFormData({ ...formData, photoImage: e.target.value })}
              placeholder="/assets/images/team/member-1.jpg"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-amber-500"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Member
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
