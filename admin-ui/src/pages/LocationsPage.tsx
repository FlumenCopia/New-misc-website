import React, { useEffect, useState } from 'react';
import {
  MapPin,
  ExternalLink,
  Layers,
  Edit,
  Save,
  Check,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Globe,
  Plus,
} from 'lucide-react';
import { apiRequest } from '../api/client';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

interface PageSection {
  _id?: string;
  sectionKey: string;
  name: string;
  title: string;
  subtitle?: string;
  isEnabled: boolean;
  sortOrder: number;
}

interface LocationPageItem {
  _id: string;
  title: string;
  slug: string;
  route: string;
  pageType: 'location';
  description: string;
  heroHeading?: string;
  heroSubheading?: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl?: string;
  ogImage?: string;
  isPublished: boolean;
  sections: PageSection[];
  updatedAt: string;
}

export const LocationsPage: React.FC = () => {
  const [locations, setLocations] = useState<LocationPageItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Section Modal
  const [activeLocationForSections, setActiveLocationForSections] = useState<LocationPageItem | null>(null);
  const [editingSections, setEditingSections] = useState<PageSection[]>([]);
  const [isSavingSections, setIsSavingSections] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Edit Location Modal
  const [editingLocation, setEditingLocation] = useState<LocationPageItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    route: '',
    description: '',
    heroHeading: '',
    heroSubheading: '',
    metaTitle: '',
    metaDescription: '',
    canonicalUrl: '',
    ogImage: '',
    isPublished: true,
  });
  const [isSaving, setIsSaving] = useState(false);

  const fetchLocations = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await apiRequest<LocationPageItem[]>('/pages?type=location');
      if (res.data) {
        setLocations(res.data);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load location hubs.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleOpenSections = (loc: LocationPageItem) => {
    setActiveLocationForSections(loc);
    const sorted = [...(loc.sections || [])].sort((a, b) => a.sortOrder - b.sortOrder);
    setEditingSections(sorted);
    setSuccessMsg(null);
  };

  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= editingSections.length) return;
    const list = [...editingSections];
    const [item] = list.splice(index, 1);
    list.splice(target, 0, item);
    setEditingSections(list.map((s, i) => ({ ...s, sortOrder: i + 1 })));
  };

  const handleToggleSection = (index: number) => {
    const list = [...editingSections];
    list[index].isEnabled = !list[index].isEnabled;
    setEditingSections(list);
  };

  const handleSaveSections = async () => {
    if (!activeLocationForSections) return;
    setIsSavingSections(true);
    setSuccessMsg(null);
    try {
      await apiRequest(`/pages/${activeLocationForSections._id}/sections`, {
        method: 'PUT',
        body: JSON.stringify({ sections: editingSections }),
      });
      setSuccessMsg('Location sections and order saved successfully!');
      fetchLocations();
      setTimeout(() => setActiveLocationForSections(null), 1200);
    } catch (err: any) {
      alert(err.message || 'Failed to update sections.');
    } finally {
      setIsSavingSections(false);
    }
  };

  const handleOpenEdit = (loc?: LocationPageItem) => {
    if (loc) {
      setEditingLocation(loc);
      setFormData({
        title: loc.title || '',
        slug: loc.slug || '',
        route: loc.route || '',
        description: loc.description || '',
        heroHeading: loc.heroHeading || '',
        heroSubheading: loc.heroSubheading || '',
        metaTitle: loc.metaTitle || '',
        metaDescription: loc.metaDescription || '',
        canonicalUrl: loc.canonicalUrl || '',
        ogImage: loc.ogImage || '',
        isPublished: loc.isPublished ?? true,
      });
    } else {
      setEditingLocation(null);
      setFormData({
        title: '',
        slug: '',
        route: '',
        description: '',
        heroHeading: '',
        heroSubheading: '',
        metaTitle: '',
        metaDescription: '',
        canonicalUrl: '',
        ogImage: '',
        isPublished: true,
      });
    }
  };

  const handleSaveLocation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const payload = { ...formData, pageType: 'location' };
      if (editingLocation) {
        await apiRequest(`/pages/${editingLocation._id}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
      } else {
        await apiRequest('/pages', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
      }
      setEditingLocation(null);
      fetchLocations();
    } catch (err: any) {
      alert(err.message || 'Failed to save location.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Regional Locations Hub</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage regional landing pages (Neyyattinkara, etc.), location hero copy, SEO, and local section configurations.
          </p>
        </div>
        <Button onClick={() => handleOpenEdit()} className="shrink-0">
          <Plus className="w-4 h-4" />
          <span>Add Location Page</span>
        </Button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 text-sm rounded-md border border-red-200">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="py-16 flex flex-col items-center justify-center gap-3">
          <LoadingSpinner size="lg" />
          <p className="text-sm text-slate-500">Loading location hubs...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5">
          {locations.map((loc) => (
            <Card key={loc._id} className="p-0 overflow-hidden hover:border-slate-300 transition-colors">
              <div className="p-6 bg-white space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <div className="w-7 h-7 rounded bg-brand-500/15 text-brand-700 flex items-center justify-center">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <h2 className="text-xl font-bold text-slate-900">{loc.title}</h2>
                      <Badge variant={loc.isPublished ? 'success' : 'neutral'}>
                        {loc.isPublished ? 'Live on Website' : 'Draft'}
                      </Badge>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {loc.route}
                      </span>
                    </div>
                    {loc.heroHeading && (
                      <p className="text-sm font-semibold text-slate-800 mt-2">
                        "{loc.heroHeading}"
                      </p>
                    )}
                    {loc.heroSubheading && (
                      <p className="text-xs text-slate-500 mt-1 max-w-2xl line-clamp-2">
                        {loc.heroSubheading}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2.5 flex-wrap shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenSections(loc)}
                      className="border-slate-300 hover:border-brand-500"
                    >
                      <Layers className="w-4 h-4 text-brand-600" />
                      <span>Reorder Sections ({loc.sections?.length || 0})</span>
                    </Button>

                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleOpenEdit(loc)}
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit Content & SEO</span>
                    </Button>

                    <a
                      href={`http://localhost:3000${loc.route}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
                    >
                      <Globe className="w-3.5 h-3.5 text-slate-400" />
                      <span>Preview Page</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  </div>
                </div>

                {/* Section pills preview */}
                <div className="pt-3 border-t border-slate-100 flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
                    Live Sections:
                  </span>
                  {loc.sections?.map((sec, idx) => (
                    <span
                      key={idx}
                      className={`text-[11px] font-medium px-2 py-0.5 rounded border ${
                        sec.isEnabled
                          ? 'bg-slate-50 text-slate-700 border-slate-200'
                          : 'bg-slate-100 text-slate-400 border-slate-200 line-through'
                      }`}
                    >
                      {sec.name}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Reorder Sections Modal */}
      {activeLocationForSections && (
        <Modal
          isOpen={true}
          onClose={() => setActiveLocationForSections(null)}
          title={`Sections: ${activeLocationForSections.title} (${activeLocationForSections.route})`}
          maxWidth="2xl"
        >
          <div className="space-y-4">
            <p className="text-xs text-slate-500">
              Reorder or toggle sections for this location. Changes persist in the database and control the real frontend display.
            </p>

            {successMsg && (
              <div className="p-3 bg-emerald-50 text-emerald-800 text-sm rounded-md border border-emerald-200 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <div className="space-y-2 max-h-[55vh] overflow-y-auto pr-1">
              {editingSections.map((sec, idx) => (
                <div
                  key={sec.sectionKey || idx}
                  className={`p-3 rounded-md border flex items-center justify-between gap-3 ${
                    sec.isEnabled ? 'bg-white border-slate-200' : 'bg-slate-50 border-slate-200/60 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{sec.name}</p>
                      {sec.title && <p className="text-xs text-slate-500 mt-0.5 truncate max-w-sm">{sec.title}</p>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleToggleSection(idx)}
                      className={`px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 border ${
                        sec.isEnabled
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-slate-200 text-slate-600 border-slate-300'
                      }`}
                    >
                      {sec.isEnabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      <span>{sec.isEnabled ? 'Visible' : 'Hidden'}</span>
                    </button>

                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveSection(idx, 'up')}
                      className="p-1 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === editingSections.length - 1}
                      onClick={() => handleMoveSection(idx, 'down')}
                      className="p-1 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setActiveLocationForSections(null)}>
                Cancel
              </Button>
              <Button onClick={handleSaveSections} isLoading={isSavingSections}>
                <Save className="w-4 h-4" />
                <span>Save Sections</span>
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Edit Location Modal */}
      {editingLocation !== null && (
        <Modal
          isOpen={true}
          onClose={() => setEditingLocation(null)}
          title={editingLocation._id ? `Edit Location: ${editingLocation.title}` : 'Add New Location'}
          maxWidth="2xl"
        >
          <form onSubmit={handleSaveLocation} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Location Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Neyyattinkara Agency"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Slug / Route *
                </label>
                <input
                  type="text"
                  required
                  value={formData.route}
                  onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                  placeholder="e.g. /Neyyattinkara"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Hero Heading *
              </label>
              <input
                type="text"
                required
                value={formData.heroHeading}
                onChange={(e) => setFormData({ ...formData, heroHeading: e.target.value })}
                placeholder="e.g. Digital Marketing & Creative Agency in Neyyattinkara"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Hero Subheading / Tagline
              </label>
              <textarea
                rows={2}
                value={formData.heroSubheading}
                onChange={(e) => setFormData({ ...formData, heroSubheading: e.target.value })}
                placeholder="High-converting description for the hero..."
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Publication Status
                </label>
                <select
                  value={formData.isPublished ? 'published' : 'draft'}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.value === 'published' })}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Canonical URL (Optional)
                </label>
                <input
                  type="text"
                  value={formData.canonicalUrl}
                  onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
                  placeholder="https://miscarchive.com/Neyyattinkara"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                SEO Meta Title
              </label>
              <input
                type="text"
                value={formData.metaTitle}
                onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                placeholder="Digital Marketing & Creative Agency in Neyyattinkara | MiscArchive"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                SEO Meta Description
              </label>
              <textarea
                rows={2}
                value={formData.metaDescription}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                placeholder="Search engine meta description..."
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
              <Button type="button" variant="secondary" onClick={() => setEditingLocation(null)}>
                Cancel
              </Button>
              <Button type="submit" isLoading={isSaving}>
                <Save className="w-4 h-4" />
                <span>Save Location</span>
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
