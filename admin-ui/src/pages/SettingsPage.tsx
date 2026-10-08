import React, { useEffect, useState } from 'react';
import { Save, CheckCircle2, AlertCircle } from 'lucide-react';
import { apiRequest } from '../api/client';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await apiRequest('/settings');
      if (res.success) {
        setSettings(res.data);
      }
    } catch (err: any) {
      setMessage({ text: err.message || 'Failed to load settings', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await apiRequest('/settings', {
        method: 'PUT',
        body: JSON.stringify(settings),
      });

      if (res.success) {
        setMessage({ text: 'Settings updated successfully!', type: 'success' });
      }
    } catch (err: any) {
      setMessage({ text: err.message || 'Failed to save settings', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner size="lg" className="min-h-[50vh]" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Global Website Settings</h1>
          <p className="text-sm text-slate-600 mt-1">
            Configure global website metadata, contact coordinates, physical addresses, and tracking IDs.
          </p>
        </div>
        <Button onClick={handleSave} isLoading={saving} className="gap-2">
          <Save className="w-4 h-4" /> Save Changes
        </Button>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl flex items-center gap-3 text-xs border ${
            message.type === 'success'
              ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-600'
              : 'bg-rose-500/15 border-rose-500/30 text-rose-600'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Branding & General */}
        <Card title="Branding & Title">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Site Name</label>
              <input
                type="text"
                value={settings?.siteName || ''}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#1abc9c]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tagline</label>
              <input
                type="text"
                value={settings?.tagline || ''}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#1abc9c]"
              />
            </div>
          </div>
        </Card>

        {/* Contact Coordinates */}
        <Card title="Contact Information & Dual Physical Addresses">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Primary Address (Maruthankuzhy)
                </label>
                <textarea
                  rows={2}
                  value={settings?.contact?.addressPrimary || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contact: { ...settings.contact, addressPrimary: e.target.value },
                    })
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Secondary Address (Gautham Villa)
                </label>
                <textarea
                  rows={2}
                  value={settings?.contact?.addressSecondary || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contact: { ...settings.contact, addressSecondary: e.target.value },
                    })
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Primary Phone(s) (comma separated)
                </label>
                <input
                  type="text"
                  value={(settings?.contact?.phones || []).join(', ')}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contact: {
                        ...settings.contact,
                        phones: e.target.value.split(',').map((p) => p.trim()),
                      },
                    })
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  WhatsApp Contact Number
                </label>
                <input
                  type="text"
                  value={settings?.contact?.whatsappNumber || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contact: { ...settings.contact, whatsappNumber: e.target.value },
                    })
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Contact Emails (comma separated)
                </label>
                <input
                  type="text"
                  value={(settings?.contact?.emails || []).join(', ')}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contact: {
                        ...settings.contact,
                        emails: e.target.value.split(',').map((em) => em.trim()),
                      },
                    })
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Social Links & Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="Social Media Channels">
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Twitter / X</label>
                <input
                  type="text"
                  value={settings?.socialLinks?.twitter || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, twitter: e.target.value },
                    })
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Facebook</label>
                <input
                  type="text"
                  value={settings?.socialLinks?.facebook || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, facebook: e.target.value },
                    })
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Instagram</label>
                <input
                  type="text"
                  value={settings?.socialLinks?.instagram || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, instagram: e.target.value },
                    })
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">LinkedIn</label>
                <input
                  type="text"
                  value={settings?.socialLinks?.linkedin || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, linkedin: e.target.value },
                    })
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </Card>

          <Card title="Tracking & Analytics">
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Google Analytics ID (GA4)</label>
                <input
                  type="text"
                  value={settings?.tracking?.googleAnalyticsId || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      tracking: { ...settings.tracking, googleAnalyticsId: e.target.value },
                    })
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Google Tag Manager ID (GTM)</label>
                <input
                  type="text"
                  value={settings?.tracking?.googleTagManagerId || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      tracking: { ...settings.tracking, googleTagManagerId: e.target.value },
                    })
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Copyright Statement</label>
                <input
                  type="text"
                  value={settings?.copyrightText || ''}
                  onChange={(e) => setSettings({ ...settings, copyrightText: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </Card>
        </div>
      </form>
    </div>
  );
};
