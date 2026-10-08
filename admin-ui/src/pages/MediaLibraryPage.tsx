import React, { useEffect, useState, useRef } from 'react';
import { UploadCloud, Trash2, Copy, Check, Image as ImageIcon, File, Search } from 'lucide-react';
import { apiRequest } from '../api/client';
import { Button } from '../components/common/Button';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export const MediaLibraryPage: React.FC = () => {
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchMedia();
  }, [search]);

  const fetchMedia = async () => {
    try {
      let query = '?limit=36';
      if (search) query += `&search=${encodeURIComponent(search)}`;
      const res = await apiRequest(`/media${query}`);
      if (res.success) {
        setAssets(res.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      const res = await apiRequest('/media/upload', {
        method: 'POST',
        body: formData,
      });
      if (res.success) {
        fetchMedia();
      }
    } catch (err: any) {
      alert(err.message || 'Error uploading file');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      await apiRequest(`/media/${id}`, { method: 'DELETE' });
      fetchMedia();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(2) + ' MB';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Media Asset Library</h1>
          <p className="text-xs text-slate-500 mt-1">
            Upload and organize images, logos, banners, and documents.
          </p>
        </div>
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            multiple
            accept="image/*,application/pdf"
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            isLoading={uploading}
            className="gap-2"
          >
            <UploadCloud className="w-4 h-4" /> Upload Assets
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter media assets by name..."
          className="w-full bg-white border border-slate-300 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-800 shadow-xs"
        />
      </div>

      {loading ? (
        <LoadingSpinner size="lg" className="min-h-[40vh]" />
      ) : assets.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-xs">
          <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-900">Media Library is Empty</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Upload images and banners here to use across articles, hero sliders, and service cards.
          </p>
          <Button
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="mt-4 gap-2"
          >
            <UploadCloud className="w-4 h-4" /> Upload First File
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {assets.map((asset) => {
            const isImage = asset.mimeType.startsWith('image/');
            return (
              <div
                key={asset._id}
                className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-slate-300 hover:shadow-md transition-all flex flex-col shadow-xs"
              >
                <div className="aspect-square bg-slate-50 relative flex items-center justify-center overflow-hidden">
                  {isImage ? (
                    <img
                      src={asset.fileUrl}
                      alt={asset.altText || asset.originalName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <File className="w-10 h-10 text-slate-400" />
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleCopyUrl(asset.fileUrl, asset._id)}
                      className="p-1.5 bg-white/90 hover:bg-white text-slate-900 rounded-lg transition-colors shadow-sm"
                      title="Copy URL"
                    >
                      {copiedId === asset._id ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(asset._id, asset.originalName)}
                      className="p-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg transition-colors shadow-sm"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-2.5 flex-1 flex flex-col justify-between bg-white border-t border-slate-100">
                  <p className="text-xs font-semibold text-slate-900 truncate" title={asset.originalName}>
                    {asset.originalName}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1">
                    {formatFileSize(asset.fileSize)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
