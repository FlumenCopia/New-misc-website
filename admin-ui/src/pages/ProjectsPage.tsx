import React, { useEffect, useState } from 'react';
import {
  Briefcase,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  ArrowUp,
  ArrowDown,
  Save,
  Star,
} from 'lucide-react';
import { apiRequest } from '../api/client';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { Table } from '../components/common/Table';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

interface ProjectItem {
  _id: string;
  title: string;
  slug: string;
  client: string;
  category: string;
  thumbnailImage: string;
  galleryImages: string[];
  shortDescription: string;
  descriptionHtml: string;
  servicesDelivered: string[];
  projectUrl: string;
  isFeatured: boolean;
  order: number;
  isPublished: boolean;
  updatedAt: string;
}

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal State
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    client: '',
    category: 'Web Development',
    thumbnailImage: '',
    shortDescription: '',
    descriptionHtml: '',
    servicesDeliveredStr: '',
    projectUrl: '',
    isFeatured: false,
    isPublished: true,
  });

  const fetchProjects = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await apiRequest<ProjectItem[]>('/projects');
      if (res.data) {
        setProjects(res.data);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load projects.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenModal = (project?: ProjectItem) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        slug: project.slug,
        client: project.client || '',
        category: project.category || 'Web Development',
        thumbnailImage: project.thumbnailImage || '',
        shortDescription: project.shortDescription || '',
        descriptionHtml: project.descriptionHtml || '',
        servicesDeliveredStr: (project.servicesDelivered || []).join(', '),
        projectUrl: project.projectUrl || '',
        isFeatured: project.isFeatured ?? false,
        isPublished: project.isPublished ?? true,
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        slug: '',
        client: '',
        category: 'Web Development',
        thumbnailImage: '',
        shortDescription: '',
        descriptionHtml: '',
        servicesDeliveredStr: '',
        projectUrl: '',
        isFeatured: false,
        isPublished: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const payload = {
        ...formData,
        slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        servicesDelivered: formData.servicesDeliveredStr
          ? formData.servicesDeliveredStr.split(',').map((s) => s.trim()).filter(Boolean)
          : [],
      };

      if (editingProject) {
        await apiRequest(`/projects/${editingProject._id}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
      } else {
        await apiRequest('/projects', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
      }
      setIsModalOpen(false);
      fetchProjects();
    } catch (err: any) {
      alert(err.message || 'Failed to save project.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete project "${title}"?`)) return;
    try {
      await apiRequest(`/projects/${id}`, { method: 'DELETE' });
      fetchProjects();
    } catch (err: any) {
      alert(err.message || 'Failed to delete project.');
    }
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    const updated = [...projects];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);

    const reordered = updated.map((p, idx) => ({ ...p, order: idx + 1 }));
    setProjects(reordered);

    try {
      await apiRequest('/projects/reorder', {
        method: 'PATCH',
        body: JSON.stringify({
          items: reordered.map((p) => ({ id: p._id, order: p.order })),
        }),
      });
    } catch (err: any) {
      alert(err.message || 'Failed to persist order.');
      fetchProjects();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Portfolio & Projects</h1>
          <p className="text-sm text-slate-500 mt-1">
            Showcase client work, audio productions, web applications, and marketing campaigns.
          </p>
        </div>
        <Button onClick={() => handleOpenModal()} className="shrink-0">
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
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
          <p className="text-sm text-slate-500">Loading portfolio projects...</p>
        </div>
      ) : (
        <Table
          headers={['Order', 'Thumbnail', 'Project Title', 'Client', 'Category', 'Status', 'Actions']}
          isEmpty={projects.length === 0}
          emptyMessage="No portfolio projects found. Add your first project above."
        >
          {projects.map((proj, idx) => (
            <tr key={proj._id} className="hover:bg-slate-50/70 transition-colors">
              <td className="px-5 py-3.5">
                <div className="flex items-center gap-1">
                  <span className="w-5 text-center font-bold text-xs text-slate-400">
                    {idx + 1}
                  </span>
                  <div className="flex flex-col">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMove(idx, 'up')}
                      className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-20"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === projects.length - 1}
                      onClick={() => handleMove(idx, 'down')}
                      className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-20"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </td>

              <td className="px-5 py-3.5">
                <div className="w-12 h-10 rounded bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center">
                  {proj.thumbnailImage ? (
                    <img
                      src={proj.thumbnailImage}
                      alt={proj.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/brand/misc-logo-black@2x.png';
                      }}
                    />
                  ) : (
                    <Briefcase className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </td>

              <td className="px-5 py-3.5">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-slate-900">{proj.title}</p>
                    {proj.isFeatured && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                        <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                        Featured
                      </span>
                    )}
                  </div>
                  {proj.shortDescription && (
                    <p className="text-xs text-slate-500 truncate max-w-sm mt-0.5">
                      {proj.shortDescription}
                    </p>
                  )}
                </div>
              </td>

              <td className="px-5 py-3.5 text-sm text-slate-700 font-medium">
                {proj.client || '—'}
              </td>

              <td className="px-5 py-3.5">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  {proj.category}
                </span>
              </td>

              <td className="px-5 py-3.5">
                <Badge variant={proj.isPublished ? 'success' : 'neutral'}>
                  {proj.isPublished ? 'Published' : 'Draft'}
                </Badge>
              </td>

              <td className="px-5 py-3.5">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleOpenModal(proj)}
                    className="p-1.5 text-slate-600 hover:text-slate-900"
                    title="Edit Project"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>

                  {proj.projectUrl && (
                    <a
                      href={proj.projectUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 text-slate-400 hover:text-slate-700 rounded transition-colors"
                      title="Open Project Link"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(proj._id, proj.title)}
                    className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      )}

      {/* Modal: Create / Edit Project */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingProject ? `Edit Project: ${editingProject.title}` : 'Add Portfolio Project'}
          maxWidth="2xl"
        >
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Audibles Studio Platform"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Slug (Auto-generated if empty)
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="e.g. audibles-studio-platform"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Client / Brand Name
                </label>
                <input
                  type="text"
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  placeholder="e.g. MiscArchive Audibles"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="Web Development">Web Development</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Audio Production">Audio Production</option>
                  <option value="Branding & Design">Branding & Design</option>
                  <option value="Software & Web">Software & Web</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Thumbnail Image URL
                </label>
                <input
                  type="text"
                  value={formData.thumbnailImage}
                  onChange={(e) => setFormData({ ...formData, thumbnailImage: e.target.value })}
                  placeholder="/assets/images/project/1.png"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  External Project URL
                </label>
                <input
                  type="text"
                  value={formData.projectUrl}
                  onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Short Description
              </label>
              <textarea
                rows={2}
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                placeholder="Brief summary of what was accomplished..."
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Services Delivered (Comma Separated)
              </label>
              <input
                type="text"
                value={formData.servicesDeliveredStr}
                onChange={(e) => setFormData({ ...formData, servicesDeliveredStr: e.target.value })}
                placeholder="Next.js, UI/UX Design, SEO Optimization"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="w-4 h-4 text-brand-500 rounded border-slate-300"
                />
                <label htmlFor="isFeatured" className="text-sm font-semibold text-slate-800 cursor-pointer">
                  Feature in Homepage / Top Showcase
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isPublished"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="w-4 h-4 text-brand-500 rounded border-slate-300"
                />
                <label htmlFor="isPublished" className="text-sm font-semibold text-slate-800 cursor-pointer">
                  Publish (Visible to Visitors)
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
              <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" isLoading={isSaving}>
                <Save className="w-4 h-4" />
                <span>Save Project</span>
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
