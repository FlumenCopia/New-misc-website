import React, { useEffect, useState, useRef } from 'react';
import { Plus, Edit2, Trash2, Upload, X, AlertCircle, User, Loader2 } from 'lucide-react';
import { apiRequest } from '../api/client';
import { Table } from '../components/common/Table';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Badge } from '../components/common/Badge';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

const API_ORIGIN = (import.meta as any).env?.VITE_API_URL
  ? (import.meta as any).env.VITE_API_URL.replace(/\/api\/?$/, '')
  : 'https://new-misc-api.onrender.com';

const WEBSITE_BASE_URL = (import.meta as any).env?.VITE_WEBSITE_URL || 'https://new-misc-website-pdfk.vercel.app';

export const resolveMediaUrl = (url?: string): string => {
  if (!url) return '';
  if (url.includes('/uploads/')) {
    const uploadPath = url.substring(url.indexOf('/uploads/'));
    return `${API_ORIGIN}${uploadPath}`;
  }
  if (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('//') ||
    url.startsWith('data:')
  ) {
    return url;
  }
  if (url.startsWith('/assets/')) {
    return `${WEBSITE_BASE_URL}${url}`;
  }
  return `${WEBSITE_BASE_URL}/${url.replace(/^\/+/, '')}`;
};

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

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [showManualUrl, setShowManualUrl] = useState(false);

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
    setUploadError(null);
    setShowManualUrl(false);
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (PNG, JPG, WebP).');
      return;
    }

    setUploadError(null);
    setIsUploading(true);

    try {
      const uploadData = new FormData();
      uploadData.append('files', file);

      const res = await apiRequest('/media/upload', {
        method: 'POST',
        body: uploadData,
      });

      if (res.success && res.data) {
        const uploaded = Array.isArray(res.data) ? res.data[0] : res.data;
        if (uploaded?.fileUrl) {
          setFormData((prev) => ({
            ...prev,
            photoImage: uploaded.fileUrl,
          }));
        } else {
          throw new Error('Image URL not returned by server.');
        }
      } else {
        throw new Error(res.message || 'Image upload failed.');
      }
    } catch (err: any) {
      setUploadError(err.message || 'Failed to upload photo. Please try again.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
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
          <h1 className="text-2xl font-bold text-slate-900">Team Profiles</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage company directors, executives, and department leaders.
          </p>
        </div>
        <Button onClick={() => handleOpenModal()} className="gap-2">
          <Plus className="w-4 h-4" /> Add Member
        </Button>
      </div>

      <Table
        headers={['Member', 'Designation', 'Order', 'Status', 'Actions']}
        isEmpty={team.length === 0}
        emptyMessage="No team members listed."
      >
        {team.map((m) => (
          <tr key={m._id} className="hover:bg-slate-50/80 transition-colors">
            <td className="px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-xs">
                  {m.photoImage ? (
                    <img
                      src={resolveMediaUrl(m.photoImage)}
                      alt={m.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLElement;
                        target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <span className="text-xs text-slate-500 font-bold">{m.name.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <span className="text-sm font-semibold text-slate-900 block">{m.name}</span>
                  {m.bio && <span className="text-xs text-slate-500 line-clamp-1">{m.bio}</span>}
                </div>
              </div>
            </td>
            <td className="px-6 py-4 text-xs font-semibold text-slate-700">{m.designation}</td>
            <td className="px-6 py-4 text-xs font-medium text-slate-600">{m.order}</td>
            <td className="px-6 py-4">
              <Badge variant={m.isActive ? 'success' : 'neutral'}>
                {m.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenModal(m)}
                  className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                  title="Edit Member"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(m._id)}
                  className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Delete Member"
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
              <label className="block text-xs font-semibold text-slate-700 mb-1">Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Anoop D Anil"
                className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Designation *</label>
              <input
                type="text"
                required
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                placeholder="Managing Director"
                className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          {/* Photo Upload Section */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Member Photo
            </label>

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />

            {uploadError && (
              <div className="flex items-center gap-2 p-3 mb-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-xs">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{uploadError}</span>
              </div>
            )}

            {formData.photoImage ? (
              /* Photo Preview Card */
              <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-white border-2 border-slate-200 overflow-hidden flex-shrink-0 shadow-sm flex items-center justify-center">
                    <img
                      src={resolveMediaUrl(formData.photoImage)}
                      alt={formData.name || 'Member preview'}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">
                      Photo uploaded
                    </p>
                    <p className="text-[11px] font-mono text-slate-500 max-w-xs truncate">
                      {formData.photoImage}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="gap-1.5 text-xs"
                  >
                    {isUploading ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Upload className="w-3.5 h-3.5" />
                    )}
                    Change
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setFormData((prev) => ({ ...prev, photoImage: '' }))}
                    className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 p-2"
                    title="Remove Photo"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              /* Upload Dropzone / Button */
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-lg p-5 text-center cursor-pointer transition-all ${
                  isUploading
                    ? 'border-brand-500 bg-brand-50/50 cursor-wait'
                    : 'border-slate-300 hover:border-brand-500 hover:bg-slate-50'
                }`}
              >
                {isUploading ? (
                  <div className="flex flex-col items-center justify-center gap-2 py-2">
                    <Loader2 className="w-6 h-6 text-brand-600 animate-spin" />
                    <span className="text-xs font-semibold text-slate-700">Uploading photo...</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-1.5">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 mb-1">
                      <Upload className="w-5 h-5 text-brand-600" />
                    </div>
                    <span className="text-xs font-semibold text-slate-800">
                      Click to upload member photo
                    </span>
                    <span className="text-[11.5px] text-slate-500">
                      Supports JPG, PNG, WebP (Square ratio recommended)
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Manual URL toggle if needed */}
            <div className="mt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowManualUrl(!showManualUrl)}
                className="text-[11.5px] text-slate-500 hover:text-brand-600 transition-colors underline"
              >
                {showManualUrl ? 'Hide manual image URL' : 'Or enter custom image URL / path'}
              </button>
            </div>

            {showManualUrl && (
              <div className="mt-2 animate-fade-in">
                <input
                  type="text"
                  value={formData.photoImage}
                  onChange={(e) => setFormData({ ...formData, photoImage: e.target.value })}
                  placeholder="/assets/images/team/member-1.jpg or https://..."
                  className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:border-brand-500"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
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
