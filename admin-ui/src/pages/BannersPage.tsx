import React, { useEffect, useState, useRef } from 'react';
import { Plus, Edit2, Trash2, UploadCloud, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { apiRequest } from '../api/client';
import { Table } from '../components/common/Table';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Badge } from '../components/common/Badge';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

const resolveBannerUrl = (url: string) => {
  if (!url) return '';
  if (url.includes('/uploads/')) {
    const uploadPath = url.substring(url.indexOf('/uploads/'));
    const apiOrigin = import.meta.env.VITE_API_URL
      ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '')
      : 'https://new-misc-api.onrender.com';
    return `${apiOrigin}${uploadPath}`;
  }
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  const websiteUrl = import.meta.env.VITE_WEBSITE_URL || 'https://new-misc-website-pdfk.vercel.app';
  if (url.startsWith('/assets/')) {
    return `${websiteUrl}${url}`;
  }
  return `${websiteUrl}/${url.replace(/^\/+/, '')}`;
};

export const BannersPage: React.FC = () => {
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<any | null>(null);

  // Form State - only 3 fields: image, link, description
  const [formData, setFormData] = useState({
    desktopImage: '',
    linkUrl: '',
    description: '',
  });

  // Image Upload State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

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
    setUploadError(null);
    if (banner) {
      setEditingBanner(banner);
      setFormData({
        desktopImage: banner.desktopImage || '',
        linkUrl: banner.linkUrl || '',
        description: banner.description || '',
      });
    } else {
      setEditingBanner(null);
      setFormData({
        desktopImage: '',
        linkUrl: '',
        description: '',
      });
    }
    setIsModalOpen(true);
  };

  // Upload Banner Image Handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (PNG, JPG, WebP, SVG).');
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
            desktopImage: uploaded.fileUrl,
          }));
        } else {
          throw new Error('Image URL not returned by server.');
        }
      } else {
        throw new Error(res.message || 'Image upload failed.');
      }
    } catch (err: any) {
      setUploadError(err.message || 'Failed to upload banner image. Please try again.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.desktopImage) {
      setUploadError('Please upload a banner image before saving.');
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        desktopImage: formData.desktopImage,
        linkUrl: formData.linkUrl || '',
        description: formData.description || '',
        order: editingBanner ? editingBanner.order : banners.length,
        isActive: editingBanner ? (editingBanner.isActive ?? true) : true,
        title: editingBanner?.title || '',
        theme: editingBanner?.theme || 'light',
      };

      if (editingBanner) {
        await apiRequest(`/banners/${editingBanner._id}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
      } else {
        await apiRequest('/banners', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
      }
      setIsModalOpen(false);
      fetchBanners();
    } catch (err: any) {
      alert(err.message || 'Error saving banner slide');
    } finally {
      setIsSaving(false);
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
            Manage homepage slider banners with image uploads, descriptions, and links.
          </p>
        </div>
        <Button onClick={() => handleOpenModal()} className="gap-2">
          <Plus className="w-4 h-4" /> Add Slide
        </Button>
      </div>

      <Table
        headers={['Banner Preview', 'Description', 'Link URL', 'Status', 'Actions']}
        isEmpty={banners.length === 0}
        emptyMessage="No hero banners configured."
      >
        {banners.map((b) => (
          <tr key={b._id} className="hover:bg-slate-800/40 transition-colors">
            {/* 1. Preview */}
            <td className="px-6 py-4">
              <div className="w-24 h-12 rounded-lg bg-black border border-slate-700 overflow-hidden flex items-center justify-center">
                <img
                  src={resolveBannerUrl(b.desktopImage)}
                  alt={b.title || b.description || 'Slide'}
                  onError={(e) => ((e.target as HTMLElement).style.display = 'none')}
                  className="w-full h-full object-cover"
                />
              </div>
            </td>

            {/* 2. Description */}
            <td className="px-6 py-4 max-w-sm">
              {b.description ? (
                <p className="text-xs text-slate-200 line-clamp-2">{b.description}</p>
              ) : b.title ? (
                <p className="text-xs text-slate-300 font-medium">{b.title}</p>
              ) : (
                <span className="text-xs text-slate-500 italic">No description</span>
              )}
            </td>

            {/* 3. Link URL */}
            <td className="px-6 py-4 text-xs text-slate-400 font-mono truncate max-w-xs">
              {b.linkUrl || '—'}
            </td>

            {/* 4. Status */}
            <td className="px-6 py-4">
              <Badge variant={b.isActive ? 'success' : 'neutral'}>
                {b.isActive ? 'Active' : 'Hidden'}
              </Badge>
            </td>

            {/* 6. Actions */}
            <td className="px-6 py-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenModal(b)}
                  className="p-1 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                  title="Edit banner"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(b._id)}
                  className="p-1 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded transition-colors"
                  title="Delete banner"
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
        title={editingBanner ? 'Edit Banner Slide' : 'Add Banner Slide'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 1. Upload Option (Banner Image) */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Banner Image <span className="text-amber-400">*</span>
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
              <div className="flex items-center gap-2 p-3 mb-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-lg text-xs">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{uploadError}</span>
              </div>
            )}

            {formData.desktopImage ? (
              /* Image Preview Box */
              <div className="rounded-xl border border-slate-700 bg-slate-900 overflow-hidden shadow-xs">
                <div className="h-36 w-full bg-slate-950 flex items-center justify-center p-2 relative">
                  <img
                    src={resolveBannerUrl(formData.desktopImage)}
                    alt="Banner Preview"
                    className="max-h-full max-w-full object-contain rounded"
                    onError={(e) => ((e.target as HTMLElement).style.display = 'none')}
                    onLoad={(e) => ((e.target as HTMLElement).style.display = 'block')}
                  />
                </div>
                <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <ImageIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span className="text-xs text-slate-300 truncate font-mono">
                      {formData.desktopImage.split('/').pop()}
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
                      onClick={() => setFormData((prev) => ({ ...prev, desktopImage: '' }))}
                      className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors text-xs flex items-center gap-1"
                      title="Remove image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Upload Dropzone */
              <div
                onClick={() => !isUploading && fileInputRef.current?.click()}
                className={`border-2 border-dashed border-slate-700 hover:border-amber-500/60 rounded-xl p-6 text-center cursor-pointer transition-all bg-slate-900/50 hover:bg-slate-900 ${
                  isUploading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isUploading ? (
                  <div className="flex flex-col items-center justify-center py-2">
                    <LoadingSpinner size="md" />
                    <p className="text-xs text-slate-400 mt-2 font-medium">Uploading banner image...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-slate-800 text-amber-400 border border-slate-700 flex items-center justify-center mb-2">
                      <UploadCloud className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-semibold text-white">Click to Upload Banner Image</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Supports JPG, PNG, WebP, SVG high-resolution banners
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 2. Link URL */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Link <span className="text-slate-500 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              value={formData.linkUrl}
              onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
              placeholder="e.g. /Neyyattinkara or https://example.com"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* 3. Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Description <span className="text-slate-500 font-normal">(Optional)</span>
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter banner description or notes..."
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 resize-none"
            />
          </div>

          {/* Modal Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
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
              {editingBanner ? 'Save Changes' : 'Add Slide'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
