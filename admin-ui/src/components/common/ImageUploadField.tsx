import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon, Trash2, AlertCircle, Link as LinkIcon } from 'lucide-react';
import { apiRequest } from '../../api/client';
import { Button } from './Button';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  required?: boolean;
  placeholder?: string;
  helperText?: string;
  accept?: string;
}

export const resolveMediaUrl = (url: string): string => {
  if (!url) return '';
  const isProd = typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
  if (url.includes('/uploads/')) {
    const uploadPath = url.substring(url.indexOf('/uploads/'));
    const apiOrigin = isProd ? window.location.origin : (import.meta.env.VITE_API_URL?.replace(/\/api\/?$/, '') || 'http://localhost:5000');
    return `${apiOrigin}${uploadPath}`;
  }
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  const websiteUrl = isProd ? window.location.origin : (import.meta.env.VITE_WEBSITE_URL || 'http://localhost:3000');
  if (url.startsWith('/')) {
    return `${websiteUrl.replace(/\/$/, '')}${url}`;
  }
  return url;
};

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  required = false,
  placeholder = '/uploads/... or /assets/...',
  helperText,
  accept = 'image/*',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [showManualInput, setShowManualInput] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (PNG, JPG, WebP, SVG, etc.).');
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
        const uploadedUrl = uploaded?.fileUrl || (typeof uploaded === 'string' ? uploaded : '');
        if (uploadedUrl) {
          onChange(uploadedUrl);
        } else {
          throw new Error('Image uploaded but no file URL returned.');
        }
      } else {
        throw new Error(res.message || 'Image upload failed.');
      }
    } catch (err: any) {
      setUploadError(err.message || 'Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
      // Reset input value so re-selecting the same file triggers change
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
          {label} {required && <span className="text-brand-600">*</span>}
        </label>
        <button
          type="button"
          onClick={() => setShowManualInput(!showManualInput)}
          className="text-[11px] text-slate-500 hover:text-brand-600 inline-flex items-center gap-1 transition-colors"
        >
          <LinkIcon className="w-3 h-3" />
          <span>{showManualInput ? 'Hide URL input' : 'Enter URL manually'}</span>
        </button>
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        className="hidden"
      />

      {uploadError && (
        <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-md flex items-center gap-2 text-xs text-rose-700">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      {value ? (
        /* Preview Card */
        <div className="rounded-lg border border-slate-200 bg-white overflow-hidden shadow-xs">
          <div className="h-32 w-full bg-slate-50 flex items-center justify-center p-3 relative group">
            <img
              src={resolveMediaUrl(value)}
              alt="Uploaded Preview"
              className="max-h-full max-w-full object-contain rounded"
              onError={(e) => {
                const target = e.target as HTMLElement;
                target.style.opacity = '0.3';
              }}
              onLoad={(e) => {
                const target = e.target as HTMLElement;
                target.style.opacity = '1';
              }}
            />
          </div>
          <div className="p-2.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <ImageIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="text-xs text-slate-700 truncate font-mono" title={value}>
                {value.split('/').pop() || value}
              </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
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
                onClick={() => onChange('')}
                className="p-1.5 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded transition-colors text-xs flex items-center gap-1"
                title="Remove image"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Upload Action Box */
        <div
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 hover:border-brand-500 rounded-lg p-4 bg-slate-50/50 hover:bg-brand-50/20 transition-all cursor-pointer flex flex-col items-center justify-center text-center gap-2 group"
        >
          <div className="w-10 h-10 rounded-full bg-white border border-slate-200 group-hover:border-brand-300 flex items-center justify-center shadow-xs transition-colors">
            <Upload className="w-4 h-4 text-slate-500 group-hover:text-brand-600 transition-colors" />
          </div>
          <div>
            <Button
              type="button"
              size="sm"
              variant="secondary"
              isLoading={isUploading}
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Choose Image to Upload</span>
            </Button>
            <p className="text-[11px] text-slate-400 mt-1.5">
              Supports PNG, JPG, WebP, SVG (Max 10 MB)
            </p>
          </div>
        </div>
      )}

      {/* Optional Manual URL Input */}
      {showManualInput && (
        <div className="pt-1.5">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-white border border-slate-300 rounded-md px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-brand-500 font-mono shadow-xs"
          />
        </div>
      )}

      {helperText && (
        <p className="text-[11px] text-slate-500">{helperText}</p>
      )}
    </div>
  );
};
