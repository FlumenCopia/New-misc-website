import React, { useEffect, useState } from 'react';
import {
  FileCode2,
  ExternalLink,
  Edit,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Check,
  Save,
  Layers,
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

interface WebsitePageItem {
  _id: string;
  title: string;
  slug: string;
  route: string;
  pageType: 'core' | 'location' | 'custom';
  description: string;
  heroHeading?: string;
  heroSubheading?: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl?: string;
  ogImage?: string;
  isPublished: boolean;
  sortOrder: number;
  sections: PageSection[];
  updatedAt: string;
}

export const PagesPage: React.FC = () => {
  const [pages, setPages] = useState<WebsitePageItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Section Management Modal state
  const [selectedPageForSections, setSelectedPageForSections] = useState<WebsitePageItem | null>(null);
  const [editingSections, setEditingSections] = useState<PageSection[]>([]);
  const [isSavingSections, setIsSavingSections] = useState(false);
  const [sectionsSuccessMsg, setSectionsSuccessMsg] = useState<string | null>(null);

  // Page Metadata Modal state
  const [editingPage, setEditingPage] = useState<WebsitePageItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    route: '',
    pageType: 'core',
    description: '',
    heroHeading: '',
    heroSubheading: '',
    metaTitle: '',
    metaDescription: '',
    canonicalUrl: '',
    ogImage: '',
    isPublished: true,
  });
  const [isSavingMetadata, setIsSavingMetadata] = useState(false);

  const fetchPages = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await apiRequest<WebsitePageItem[]>('/pages');
      if (res.data) {
        setPages(res.data);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load website pages.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  // Manage Sections
  const handleOpenSectionsModal = (page: WebsitePageItem) => {
    setSelectedPageForSections(page);
    const sorted = [...(page.sections || [])].sort((a, b) => a.sortOrder - b.sortOrder);
    setEditingSections(sorted);
    setSectionsSuccessMsg(null);
  };

  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= editingSections.length) return;

    const updated = [...editingSections];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);

    // Reassign sortOrder
    const normalized = updated.map((sec, idx) => ({
      ...sec,
      sortOrder: idx + 1,
    }));

    setEditingSections(normalized);
  };

  const handleToggleSection = (index: number) => {
    const updated = [...editingSections];
    updated[index].isEnabled = !updated[index].isEnabled;
    setEditingSections(updated);
  };

  const handleSaveSections = async () => {
    if (!selectedPageForSections) return;
    setIsSavingSections(true);
    setSectionsSuccessMsg(null);
    try {
      await apiRequest(`/pages/${selectedPageForSections._id}/sections`, {
        method: 'PUT',
        body: JSON.stringify({ sections: editingSections }),
      });
      setSectionsSuccessMsg('Section order and visibility updated successfully!');
      fetchPages();
      setTimeout(() => {
        setSelectedPageForSections(null);
      }, 1200);
    } catch (err: any) {
      alert(err.message || 'Failed to save sections.');
    } finally {
      setIsSavingSections(false);
    }
  };

  // Manage Page Metadata
  const handleOpenEditPage = (page?: WebsitePageItem) => {
    if (page) {
      setEditingPage(page);
      setFormData({
        title: page.title || '',
        slug: page.slug || '',
        route: page.route || '',
        pageType: page.pageType || 'core',
        description: page.description || '',
        heroHeading: page.heroHeading || '',
        heroSubheading: page.heroSubheading || '',
        metaTitle: page.metaTitle || '',
        metaDescription: page.metaDescription || '',
        canonicalUrl: page.canonicalUrl || '',
        ogImage: page.ogImage || '',
        isPublished: page.isPublished ?? true,
      });
    } else {
      setEditingPage(null);
      setFormData({
        title: '',
        slug: '',
        route: '',
        pageType: 'core',
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

  const handleSavePageMetadata = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingMetadata(true);
    try {
      if (editingPage) {
        await apiRequest(`/pages/${editingPage._id}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
        });
      } else {
        await apiRequest('/pages', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
      }
      setEditingPage(null);
      fetchPages();
    } catch (err: any) {
      alert(err.message || 'Failed to save page.');
    } finally {
      setIsSavingMetadata(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Website Pages & Sections</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage page routes, SEO metadata, and reorder or toggle live sections on the public site.
          </p>
        </div>
        <Button onClick={() => handleOpenEditPage()} className="shrink-0">
          <Plus className="w-4 h-4" />
          <span>Add Custom Page</span>
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
          <p className="text-sm text-slate-500">Loading website pages...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {pages.map((page) => (
            <Card key={page._id} className="p-0 overflow-hidden hover:border-slate-300 transition-colors">
              <div className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h2 className="text-lg font-bold text-slate-900">{page.title}</h2>
                    <Badge variant={page.isPublished ? 'success' : 'neutral'}>
                      {page.isPublished ? 'Published' : 'Draft'}
                    </Badge>
                    <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {page.route}
                    </span>
                    {page.pageType === 'location' && (
                      <Badge variant="brand">Location Hub</Badge>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-1">{page.description || 'No description provided.'}</p>
                  
                  {/* SEO preview pill */}
                  <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                    <span><strong>SEO Title:</strong> {page.metaTitle || page.title}</span>
                    <span>•</span>
                    <span><strong>Sections:</strong> {page.sections?.length || 0} configured</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 flex-wrap">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenSectionsModal(page)}
                    className="border-slate-300 hover:border-brand-500"
                  >
                    <Layers className="w-4 h-4 text-brand-600" />
                    <span>Manage Sections ({page.sections?.filter(s => s.isEnabled).length || 0})</span>
                  </Button>

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleOpenEditPage(page)}
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit SEO & Info</span>
                  </Button>

                  <a
                    href={`http://localhost:3000${page.route}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5 text-slate-400" />
                    <span>Preview</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal: Manage Page Sections */}
      {selectedPageForSections && (
        <Modal
          isOpen={!!selectedPageForSections}
          onClose={() => setSelectedPageForSections(null)}
          title={`Manage Sections — ${selectedPageForSections.title} (${selectedPageForSections.route})`}
          maxWidth="2xl"
        >
          <div className="space-y-5">
            <p className="text-sm text-slate-500">
              Drag, reorder, or toggle section visibility. Changes are saved persistently and applied directly to the website.
            </p>

            {sectionsSuccessMsg && (
              <div className="p-3 bg-emerald-50 text-emerald-800 text-sm rounded-md border border-emerald-200 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{sectionsSuccessMsg}</span>
              </div>
            )}

            <div className="space-y-2 max-h-[55vh] overflow-y-auto pr-1">
              {editingSections.map((sec, idx) => (
                <div
                  key={sec.sectionKey || idx}
                  className={`p-3.5 rounded-md border transition-colors flex items-center justify-between gap-3 ${
                    sec.isEnabled
                      ? 'bg-white border-slate-200'
                      : 'bg-slate-50 border-slate-200/60 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-slate-900">{sec.name}</p>
                        <span className="text-[11px] font-mono text-slate-400">({sec.sectionKey})</span>
                      </div>
                      {sec.title && (
                        <p className="text-xs text-slate-500 mt-0.5 truncate max-w-md">{sec.title}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Toggle Visibility */}
                    <button
                      type="button"
                      onClick={() => handleToggleSection(idx)}
                      className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
                        sec.isEnabled
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                          : 'bg-slate-200 text-slate-600 border-slate-300 hover:bg-slate-300'
                      }`}
                    >
                      {sec.isEnabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      <span>{sec.isEnabled ? 'Visible' : 'Hidden'}</span>
                    </button>

                    {/* Move Up */}
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveSection(idx, 'up')}
                      className="p-1.5 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                      title="Move Up"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>

                    {/* Move Down */}
                    <button
                      type="button"
                      disabled={idx === editingSections.length - 1}
                      onClick={() => handleMoveSection(idx, 'down')}
                      className="p-1.5 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                      title="Move Down"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end gap-3">
              <Button
                variant="secondary"
                onClick={() => setSelectedPageForSections(null)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveSections}
                isLoading={isSavingSections}
              >
                <Save className="w-4 h-4" />
                <span>Save Section Order</span>
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal: Edit Page Info & SEO */}
      {editingPage !== null && (
        <Modal
          isOpen={true}
          onClose={() => setEditingPage(null)}
          title={editingPage._id ? `Edit Page: ${editingPage.title}` : 'Add New Website Page'}
          maxWidth="2xl"
        >
          <form onSubmit={handleSavePageMetadata} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Page Title *
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
                  Slug / URL Path *
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Page Type
                </label>
                <select
                  value={formData.pageType}
                  onChange={(e) => setFormData({ ...formData, pageType: e.target.value as any })}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="core">Core Website Page</option>
                  <option value="location">Regional / Location Landing Page</option>
                  <option value="custom">Custom Campaign Page</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Publication Status
                </label>
                <select
                  value={formData.isPublished ? 'published' : 'draft'}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.value === 'published' })}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="published">Published (Visible Publicly)</option>
                  <option value="draft">Draft (Restricted)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Short Description
              </label>
              <textarea
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Internal summary of the page's purpose"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            {formData.pageType === 'location' && (
              <div className="p-3 bg-amber-50/60 rounded-md border border-amber-200/80 space-y-3">
                <p className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                  Location Specific Content
                </p>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Hero Main Heading
                  </label>
                  <input
                    type="text"
                    value={formData.heroHeading}
                    onChange={(e) => setFormData({ ...formData, heroHeading: e.target.value })}
                    placeholder="e.g. Digital Marketing & Creative Agency in Neyyattinkara"
                    className="w-full px-3 py-2 border rounded-md bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Hero Subtitle / Description
                  </label>
                  <textarea
                    rows={2}
                    value={formData.heroSubheading}
                    onChange={(e) => setFormData({ ...formData, heroSubheading: e.target.value })}
                    placeholder="Sub-heading description under the hero title..."
                    className="w-full px-3 py-2 border rounded-md bg-white"
                  />
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-slate-200">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                SEO & OpenGraph Configuration
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    SEO Meta Title
                  </label>
                  <input
                    type="text"
                    value={formData.metaTitle}
                    onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                    placeholder="Title shown on search engines and browser tabs"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    SEO Meta Description
                  </label>
                  <textarea
                    rows={2}
                    value={formData.metaDescription}
                    onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                    placeholder="Concise 150-160 character description for search results"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Canonical URL (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.canonicalUrl}
                      onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
                      placeholder="https://miscarchive.com/..."
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Social Sharing Image (OG Image)
                    </label>
                    <input
                      type="text"
                      value={formData.ogImage}
                      onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                      placeholder="/assets/images/og-image.png"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setEditingPage(null)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={isSavingMetadata}
              >
                <Save className="w-4 h-4" />
                <span>Save Page Info</span>
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
