import React, { useEffect, useState } from 'react';
import {
  Navigation,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  ArrowUp,
  ArrowDown,
  Save,
  Check,
} from 'lucide-react';
import { apiRequest } from '../api/client';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { Table } from '../components/common/Table';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

interface NavItem {
  _id: string;
  label: string;
  url: string;
  placement: 'header' | 'footer';
  order: number;
  isOpenNewTab: boolean;
  isActive: boolean;
}

export const NavigationPage: React.FC = () => {
  const [activePlacement, setActivePlacement] = useState<'header' | 'footer'>('header');
  const [items, setItems] = useState<NavItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NavItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    label: '',
    url: '',
    placement: 'header' as 'header' | 'footer',
    isOpenNewTab: false,
    isActive: true,
  });

  const fetchNavItems = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await apiRequest<NavItem[]>(`/navigation?placement=${activePlacement}`);
      if (res.data) {
        setItems(res.data);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load navigation items.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNavItems();
  }, [activePlacement]);

  const handleOpenModal = (item?: NavItem) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        label: item.label,
        url: item.url,
        placement: item.placement,
        isOpenNewTab: item.isOpenNewTab ?? false,
        isActive: item.isActive ?? true,
      });
    } else {
      setEditingItem(null);
      setFormData({
        label: '',
        url: '',
        placement: activePlacement,
        isOpenNewTab: false,
        isActive: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (editingItem) {
        await apiRequest(`/navigation/${editingItem._id}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
        });
      } else {
        await apiRequest('/navigation', {
          method: 'POST',
          body: JSON.stringify({ ...formData, order: items.length + 1 }),
        });
      }
      setIsModalOpen(false);
      fetchNavItems();
    } catch (err: any) {
      alert(err.message || 'Failed to save menu item.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, label: string) => {
    if (!window.confirm(`Delete menu item "${label}"?`)) return;
    try {
      await apiRequest(`/navigation/${id}`, { method: 'DELETE' });
      fetchNavItems();
    } catch (err: any) {
      alert(err.message || 'Failed to delete menu item.');
    }
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const list = [...items];
    const [moved] = list.splice(index, 1);
    list.splice(targetIndex, 0, moved);

    const reordered = list.map((item, idx) => ({ ...item, order: idx + 1 }));
    setItems(reordered);

    try {
      await apiRequest('/navigation/reorder', {
        method: 'PATCH',
        body: JSON.stringify({
          items: reordered.map((item) => ({ id: item._id, order: item.order })),
        }),
      });
    } catch (err: any) {
      alert(err.message || 'Failed to persist order.');
      fetchNavItems();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Navigation Menus</h1>
          <p className="text-sm text-slate-500 mt-1">
            Control links, destination URLs, order, and visibility for public website header and footer menus.
          </p>
        </div>
        <Button onClick={() => handleOpenModal()} className="shrink-0">
          <Plus className="w-4 h-4" />
          <span>Add Menu Item</span>
        </Button>
      </div>

      {/* Tabs for Header vs Footer */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-px">
        <button
          type="button"
          onClick={() => setActivePlacement('header')}
          className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors ${
            activePlacement === 'header'
              ? 'border-brand-500 text-charcoal-950'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Top Header Navigation
        </button>
        <button
          type="button"
          onClick={() => setActivePlacement('footer')}
          className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors ${
            activePlacement === 'footer'
              ? 'border-brand-500 text-charcoal-950'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Footer Navigation Links
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 text-sm rounded-md border border-red-200">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="py-16 flex flex-col items-center justify-center gap-3">
          <LoadingSpinner size="lg" />
          <p className="text-sm text-slate-500">Loading navigation menu items...</p>
        </div>
      ) : (
        <Table
          headers={['Order', 'Label', 'Target URL', 'Window Behavior', 'Status', 'Actions']}
          isEmpty={items.length === 0}
          emptyMessage={`No menu items configured for ${activePlacement}. Add one above.`}
        >
          {items.map((item, idx) => (
            <tr key={item._id} className="hover:bg-slate-50/70 transition-colors">
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
                      disabled={idx === items.length - 1}
                      onClick={() => handleMove(idx, 'down')}
                      className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-20"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </td>

              <td className="px-5 py-3.5 font-bold text-slate-900">
                {item.label}
              </td>

              <td className="px-5 py-3.5 font-mono text-xs text-slate-600">
                {item.url}
              </td>

              <td className="px-5 py-3.5 text-xs text-slate-600">
                {item.isOpenNewTab ? 'Opens in New Tab' : 'Same Window'}
              </td>

              <td className="px-5 py-3.5">
                <Badge variant={item.isActive ? 'success' : 'neutral'}>
                  {item.isActive ? 'Active' : 'Hidden'}
                </Badge>
              </td>

              <td className="px-5 py-3.5">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleOpenModal(item)}
                    className="p-1.5 text-slate-600 hover:text-slate-900"
                    title="Edit Item"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(item._id, item.label)}
                    className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50"
                    title="Delete Item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      )}

      {/* Modal: Create/Edit Nav Item */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingItem ? `Edit Menu Item: ${editingItem.label}` : 'Add Menu Item'}
          maxWidth="md"
        >
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Menu Label *
              </label>
              <input
                type="text"
                required
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                placeholder="e.g. Services"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Destination URL *
              </label>
              <input
                type="text"
                required
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                placeholder="e.g. /services or https://..."
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Menu Placement
              </label>
              <select
                value={formData.placement}
                onChange={(e) => setFormData({ ...formData, placement: e.target.value as any })}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="header">Top Header Menu</option>
                <option value="footer">Footer Navigation</option>
              </select>
            </div>

            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isOpenNewTab"
                  checked={formData.isOpenNewTab}
                  onChange={(e) => setFormData({ ...formData, isOpenNewTab: e.target.checked })}
                  className="w-4 h-4 text-brand-500 rounded border-slate-300"
                />
                <label htmlFor="isOpenNewTab" className="text-xs font-semibold text-slate-800 cursor-pointer">
                  Open link in new browser tab (_blank)
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 text-brand-500 rounded border-slate-300"
                />
                <label htmlFor="isActive" className="text-xs font-semibold text-slate-800 cursor-pointer">
                  Active (Visible on Website)
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
              <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" isLoading={isSaving}>
                <Save className="w-4 h-4" />
                <span>Save Menu Item</span>
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
