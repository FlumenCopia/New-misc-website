import React, { useEffect, useState, useRef } from 'react';
import { Plus, Edit2, Trash2, UploadCloud, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { apiRequest } from '../api/client';
import { Table } from '../components/common/Table';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Badge } from '../components/common/Badge';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

const WEBSITE_BASE_URL = import.meta.env.VITE_WEBSITE_URL || 'https://new-misc-website-pdfk.vercel.app';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://new-misc-api.onrender.com/api';
const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, '');

/**
 * Resolves logo URLs for consistent rendering:
 * - Absolute URLs (http://, https://, //, data:) remain unchanged.
 * - Admin API uploaded paths (/uploads/...) resolve to the Admin API origin.
 * - Seeded website paths (/assets/...) resolve to the public website origin.
 */
export const resolveLogoUrl = (url?: string): string => {
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

export const ClientLogosPage: React.FC = () => {
  const [logos, setLogos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLogo, setEditingLogo] = useState<any | null>(null);

  // Simplified form state: Only Logo Name/Description + Logo Image
  const [formData, setFormData] = useState({
    clientName: '',
    logoImage: '',
    websiteUrl: '',
    altText: '',
    order: 0,
    isActive: true,
  });

  // Image Upload State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

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
    setUploadError(null);
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

  // Upload Logo Image Handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (PNG, SVG, JPG, WebP).');
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
            logoImage: uploaded.fileUrl,
            altText: prev.altText || file.name.replace(/\.[^/.]+$/, ''),
          }));
        } else {
          throw new Error('Image URL not returned by server.');
        }
      } else {
        throw new Error(res.message || 'Image upload failed.');
      }
    } catch (err: any) {
      setUploadError(err.message || 'Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName.trim()) {
      alert('Please enter a Logo Name / Description.');
      return;
    }
    if (!formData.logoImage.trim()) {
      alert('Please upload a Logo Image.');
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        ...formData,
        clientName: formData.clientName.trim(),
        altText: formData.altText || `${formData.clientName.trim()} Logo`,
      };

      if (editingLogo) {
        await apiRequest(`/client-logos/${editingLogo._id}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
      } else {
        await apiRequest('/client-logos', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
      }
      setIsModalOpen(false);
      fetchLogos();
    } catch (err: any) {
      alert(err.message || 'Error saving client logo');
    } finally {
      setIsSaving(false);
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
          <h1 className="text-2xl font-bold text-slate-900">Client Logos Ticker</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage client and partner logos displayed in the website logo carousel.
          </p>
        </div>
        <Button onClick={() => handleOpenModal()} className="gap-2">
          <Plus className="w-4 h-4" /> Add Client Logo
        </Button>
      </div>

      <Table
        headers={['Logo Preview', 'Logo Name / Description', 'Status', 'Actions']}
        isEmpty={logos.length === 0}
        emptyMessage="No client logos found."
      >
        {logos.map((logo) => (
          <tr key={logo._id} className="hover:bg-slate-50/80 transition-colors">
            <td className="px-6 py-4">
              <div className="w-20 h-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center p-2 overflow-hidden shadow-xs">
                <img
                  src={resolveLogoUrl(logo.logoImage)}
                  alt={logo.clientName}
                  onError={(e) => ((e.target as HTMLElement).style.display = 'none')}
                  onLoad={(e) => ((e.target as HTMLElement).style.display = 'block')}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </td>
            <td className="px-6 py-4 text-[15px] font-bold text-slate-900">
              {logo.clientName}
            </td>
            <td className="px-6 py-4">
              <Badge variant={logo.isActive ? 'success' : 'neutral'}>
                {logo.isActive ? 'Visible' : 'Hidden'}
              </Badge>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenModal(logo)}
                  className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                  title="Edit logo"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(logo._id)}
                  className="p-1.5 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Delete logo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </Table>

      {/* Minimal Add / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingLogo ? 'Edit Client Logo' : 'Add Client Logo'}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 1. Logo Name / Description */}
          <div>
            <label className="block text-[13px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Logo Name / Description <span className="text-brand-600">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              placeholder="e.g. Brand or Client Name"
              className="w-full bg-white border border-slate-300 rounded-md px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-500 transition-colors shadow-xs"
            />
            <p className="text-[12.5px] text-slate-600 mt-1">
              Used to identify and describe the client logo.
            </p>
          </div>

          {/* 2. Logo Image (Upload + Preview + Change + Remove) */}
          <div>
            <label className="block text-[13px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Logo Image <span className="text-brand-600">*</span>
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

            {formData.logoImage ? (
              /* Logo Preview Card */
              <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs">
                <div className="h-32 w-full bg-slate-50 flex items-center justify-center p-4 relative group">
                  <img
                    src={resolveLogoUrl(formData.logoImage)}
                    alt={formData.clientName || 'Logo Preview'}
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLElement;
                      target.style.display = 'none';
                    }}
                    onLoad={(e) => {
                      const target = e.target as HTMLElement;
                      target.style.display = 'block';
                    }}
                  />
                </div>
                <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <ImageIcon className="w-4 h-4 text-slate-500 flex-shrink-0" />
                    <span className="text-xs text-slate-700 truncate font-mono">
                      {formData.logoImage.split('/').pop()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      onClick={() => fileInputRef.current?.click()}
                      isLoading={isUploading}
                    >
                      Change Image
                    </Button>
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, logoImage: '' }))}
                      className="p-1.5 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors text-xs flex items-center gap-1"
                      title="Remove image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Upload Zone */
              <div
                onClick={() => !isUploading && fileInputRef.current?.click()}
                className={`border-2 border-dashed border-slate-300 hover:border-slate-400 rounded-xl p-6 text-center cursor-pointer transition-all bg-slate-50/50 hover:bg-slate-50 ${
                  isUploading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isUploading ? (
                  <div className="flex flex-col items-center justify-center py-2">
                    <LoadingSpinner size="md" />
                    <p className="text-xs text-slate-600 mt-2 font-medium">Uploading logo image...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white text-slate-700 border border-slate-200 shadow-xs flex items-center justify-center mb-2">
                      <UploadCloud className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-semibold text-slate-800">Click to Upload Logo Image</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Supports PNG, SVG, JPG, WebP transparent logos
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsModalOpen(false)}
              disabled={isSaving || isUploading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isSaving}
              disabled={isUploading}
            >
              {editingLogo ? 'Save Changes' : 'Add Logo'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
