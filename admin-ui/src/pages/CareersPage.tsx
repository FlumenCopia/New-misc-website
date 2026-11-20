import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Plus,
  Edit2,
  Trash2,
  MapPin,
  Briefcase,
  GraduationCap,
  Image as ImageIcon,
  ExternalLink,
  Mail,
  Phone,
  Clock,
  UserCheck,
  Eye,
  FileText,
} from 'lucide-react';
import { apiRequest } from '../api/client';
import { Table } from '../components/common/Table';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Badge } from '../components/common/Badge';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ImageUploadField } from '../components/common/ImageUploadField';

export const CareersPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') === 'applications' ? 'applications' : 'openings';
  const [activeTab, setActiveTab] = useState<'openings' | 'applications'>(currentTab);

  // Job Openings State
  const [careers, setCareers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCareer, setEditingCareer] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    flyerImage: '',
    department: 'Digital Marketing',
    location: 'Trivandrum, Kerala',
    employmentType: 'Full Time',
    experience: '1-3 Years',
    status: 'open',
    order: 0,
  });

  // Applications State
  const [applications, setApplications] = useState<any[]>([]);
  const [appsLoading, setAppsLoading] = useState(false);
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  const [appStatusUpdate, setAppStatusUpdate] = useState('');
  const [appNotesUpdate, setAppNotesUpdate] = useState('');
  const [updatingApp, setUpdatingApp] = useState(false);

  useEffect(() => {
    const tab = searchParams.get('tab') === 'applications' ? 'applications' : 'openings';
    setActiveTab(tab);
  }, [searchParams]);

  useEffect(() => {
    fetchCareers();
    fetchApplications();
  }, []);

  const fetchCareers = async () => {
    try {
      const res = await apiRequest('/careers');
      if (res.success) setCareers(res.data);
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    setAppsLoading(true);
    try {
      const res = await apiRequest('/enquiries?limit=100');
      if (res.success && Array.isArray(res.data)) {
        const careerApps = res.data.filter(
          (e: any) =>
            e.formSource === 'career_apply' ||
            e.formSource === 'career_application' ||
            (e.service && e.service.toLowerCase().startsWith('career application'))
        );
        setApplications(careerApps);
      }
    } catch (e) {
      console.warn('Could not load applications:', e);
    } finally {
      setAppsLoading(false);
    }
  };

  const handleTabChange = (tab: 'openings' | 'applications') => {
    setActiveTab(tab);
    setSearchParams(tab === 'applications' ? { tab: 'applications' } : {});
  };

  // Openings Actions
  const handleOpenModal = (career?: any) => {
    if (career) {
      setEditingCareer(career);
      setFormData({
        title: career.title || '',
        flyerImage: career.flyerImage || '',
        department: career.department || 'Digital Marketing',
        location: career.location || 'Trivandrum, Kerala',
        employmentType: career.employmentType || 'Full Time',
        experience: career.experience || '1-3 Years',
        status: career.status || 'open',
        order: career.order || 0,
      });
    } else {
      setEditingCareer(null);
      setFormData({
        title: '',
        flyerImage: '',
        department: 'Digital Marketing',
        location: 'Trivandrum, Kerala',
        employmentType: 'Full Time',
        experience: '1-3 Years',
        status: 'open',
        order: careers.length,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCareer) {
        await apiRequest(`/careers/${editingCareer._id}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
        });
      } else {
        await apiRequest('/careers', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
      }
      setIsModalOpen(false);
      fetchCareers();
    } catch (err: any) {
      alert(err.message || 'Error saving career opening');
    }
  };

  const handleToggleStatus = async (career: any) => {
    try {
      const newStatus = career.status === 'open' ? 'closed' : 'open';
      await apiRequest(`/careers/${career._id}`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus }),
      });
      fetchCareers();
    } catch (err: any) {
      alert(err.message || 'Error updating career status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this job opening?')) return;
    try {
      await apiRequest(`/careers/${id}`, { method: 'DELETE' });
      fetchCareers();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Applications Actions
  const handleOpenAppDetail = (app: any) => {
    setSelectedApp(app);
    setAppStatusUpdate(app.status || 'new');
    setAppNotesUpdate(app.notes || '');
  };

  const handleUpdateAppStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;
    setUpdatingApp(true);
    try {
      const res = await apiRequest(`/enquiries/${selectedApp._id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: appStatusUpdate, notes: appNotesUpdate }),
      });
      if (res.success) {
        setSelectedApp(null);
        fetchApplications();
      }
    } catch (err: any) {
      alert(err.message || 'Error updating application status');
    } finally {
      setUpdatingApp(false);
    }
  };

  const handleDeleteApp = async (id: string) => {
    if (!confirm('Are you sure you want to delete this applicant submission?')) return;
    try {
      await apiRequest(`/enquiries/${id}`, { method: 'DELETE' });
      fetchApplications();
      if (selectedApp?._id === id) setSelectedApp(null);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const parseMessageDetails = (msg?: string) => {
    if (!msg) return { cvLink: '', note: '' };
    let cvLink = '';
    let note = msg;

    const cvMatch = msg.match(/Portfolio \/ Resume:\s*(https?:\/\/[^\s\n]+)/i);
    if (cvMatch && cvMatch[1]) {
      cvLink = cvMatch[1];
    }

    const noteMatch = msg.match(/Note:\s*([\s\S]+)/i);
    if (noteMatch && noteMatch[1]) {
      note = noteMatch[1].trim();
    }

    return { cvLink, note };
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge variant="warning">New Applicant</Badge>;
      case 'in_progress':
        return <Badge variant="info">In Review</Badge>;
      case 'replied':
        return <Badge variant="success">Contacted / Interview</Badge>;
      case 'archived':
      default:
        return <Badge variant="neutral">Archived</Badge>;
    }
  };

  if (loading) return <LoadingSpinner size="lg" className="min-h-[50vh]" />;

  return (
    <div className="space-y-6">
      {/* Header with Title and Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Careers & Recruitment Portal</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage public job openings and review candidate resume submissions in real time.
          </p>
        </div>

        {activeTab === 'openings' && (
          <Button onClick={() => handleOpenModal()} className="gap-2 self-start sm:self-auto">
            <Plus className="w-4 h-4" /> Post Job Opening
          </Button>
        )}
      </div>

      {/* Tabs Switcher */}
      <div className="flex border-b border-[#23262f] gap-4">
        <button
          type="button"
          onClick={() => handleTabChange('openings')}
          className={`pb-3 px-1 text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'openings'
              ? 'border-brand-500 text-brand-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Job Openings ({careers.length})</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('applications')}
          className={`pb-3 px-1 text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'applications'
              ? 'border-brand-500 text-brand-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Candidate Applications ({applications.length})</span>
          {applications.filter((a) => a.status === 'new').length > 0 && (
            <span className="px-1.5 py-0.5 text-[10px] font-extrabold bg-amber-500 text-slate-950 rounded-full">
              {applications.filter((a) => a.status === 'new').length} New
            </span>
          )}
        </button>
      </div>

      {/* TAB 1: JOB OPENINGS */}
      {activeTab === 'openings' && (
        <Table
          headers={['Job Title', 'Department', 'Location & Exp', 'Flyer Graphic', 'Status', 'Actions']}
          isEmpty={careers.length === 0}
          emptyMessage="No career opportunities posted."
        >
          {careers.map((c) => (
            <tr key={c._id} className="hover:bg-slate-50/80 transition-colors">
              <td className="px-6 py-4">
                <p className="text-sm font-semibold text-slate-900">{c.title}</p>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                  {c.employmentType || 'Full Time'}
                </p>
              </td>

              <td className="px-6 py-4 text-xs text-slate-700 font-semibold">
                <span className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-md font-medium">
                  {c.department || 'General'}
                </span>
              </td>

              <td className="px-6 py-4 text-xs text-slate-600">
                <div className="flex flex-col gap-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {c.location || 'Trivandrum, Kerala'}
                  </span>
                  {c.experience && (
                    <span className="flex items-center gap-1 text-slate-500">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                      Exp: {c.experience}
                    </span>
                  )}
                </div>
              </td>

              <td className="px-6 py-4">
                {c.flyerImage ? (
                  <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center">
                    <img
                      src={c.flyerImage}
                      alt={c.title}
                      className="w-full h-full object-cover"
                      onError={(e: any) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                ) : (
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <ImageIcon className="w-3.5 h-3.5" /> No flyer
                  </span>
                )}
              </td>

              <td className="px-6 py-4">
                <button
                  type="button"
                  onClick={() => handleToggleStatus(c)}
                  className="cursor-pointer focus:outline-none transition-transform active:scale-95"
                  title={`Click to set ${c.status === 'open' ? 'Closed' : 'Open'}`}
                >
                  <Badge variant={c.status === 'open' ? 'success' : 'danger'}>
                    {c.status === 'open' ? 'Actively Hiring' : 'Closed'}
                  </Badge>
                </button>
              </td>

              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenModal(c)}
                    className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Edit Job"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete Job"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      )}

      {/* TAB 2: CANDIDATE APPLICATIONS */}
      {activeTab === 'applications' && (
        <>
          {appsLoading ? (
            <LoadingSpinner size="lg" className="min-h-[30vh]" />
          ) : (
            <Table
              headers={['Candidate', 'Role Applied', 'Portfolio / CV Link', 'Received Date', 'Status', 'Actions']}
              isEmpty={applications.length === 0}
              emptyMessage="No candidate applications received yet."
            >
              {applications.map((app) => {
                const { cvLink, note } = parseMessageDetails(app.message);
                const roleName = app.service
                  ? app.service.replace(/^Career Application:\s*/i, '')
                  : 'General Application';

                return (
                  <tr key={app._id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Candidate Name & Contact */}
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-slate-900">{app.name}</p>
                      <div className="flex flex-col gap-0.5 mt-1 text-xs text-slate-500">
                        <span className="flex items-center gap-1.5 text-slate-600">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <a href={`mailto:${app.email}`} className="hover:underline">
                            {app.email}
                          </a>
                        </span>
                        {app.phone && (
                          <span className="flex items-center gap-1.5 text-slate-600 font-mono">
                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                            <a href={`tel:${app.phone}`} className="hover:underline">
                              {app.phone}
                            </a>
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Role Applied */}
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-md inline-block">
                        {roleName}
                      </span>
                      {note && note !== app.message && (
                        <p className="text-xs text-slate-500 mt-1.5 line-clamp-1 italic max-w-xs">
                          "{note}"
                        </p>
                      )}
                    </td>

                    {/* Portfolio / CV Link */}
                    <td className="px-6 py-4">
                      {cvLink ? (
                        <a
                          href={cvLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold hover:bg-amber-100 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-amber-600" />
                          <span>View Portfolio / CV</span>
                        </a>
                      ) : (
                        <span className="text-xs text-slate-400 italic">No link attached</span>
                      )}
                    </td>

                    {/* Received Date */}
                    <td className="px-6 py-4 text-xs text-slate-600">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {new Date(app.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => handleOpenAppDetail(app)}
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                        title="Click to view full details or change status"
                      >
                        {getStatusBadge(app.status)}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenAppDetail(app)}
                          className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                          title="View Application Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteApp(app._id)}
                          className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete Application"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </Table>
          )}
        </>
      )}

      {/* MODAL 1: ADD / EDIT JOB OPENING */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCareer ? 'Edit Job Opening' : 'Post New Job Opening'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Job Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Digital Marketing Executive / Hiring"
              className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                placeholder="Digital Marketing"
                className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Employment Type</label>
              <select
                value={formData.employmentType}
                onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-brand-500"
              >
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Trivandrum, Kerala"
                className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Experience Required</label>
              <input
                type="text"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                placeholder="e.g. 1-3 Years, Fresher"
                className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div>
            <ImageUploadField
              label="Job Flyer / Announcement Graphic"
              value={formData.flyerImage}
              onChange={(url) => setFormData({ ...formData, flyerImage: url })}
              placeholder="/uploads/... or /assets/..."
              helperText="Upload recruitment poster or flyer image for this position."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Hiring Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-brand-500"
            >
              <option value="open">Open / Actively Hiring (Visible on Website)</option>
              <option value="closed">Closed / Filled (Hidden from Public)</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Job Opening
            </Button>
          </div>
        </form>
      </Modal>

      {/* MODAL 2: APPLICATION DETAILS VIEW & STATUS MANAGER */}
      {selectedApp && (
        <Modal
          isOpen={!!selectedApp}
          onClose={() => setSelectedApp(null)}
          title={`Applicant: ${selectedApp.name}`}
        >
          <div className="space-y-5">
            {/* Candidate Header Summary */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selectedApp.name}</h3>
                  <p className="text-xs font-semibold text-amber-600 mt-0.5">
                    {selectedApp.service || 'Career Application'}
                  </p>
                </div>
                {getStatusBadge(selectedApp.status)}
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-slate-200 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Email:</span>
                  <a href={`mailto:${selectedApp.email}`} className="text-slate-800 font-bold hover:underline">
                    {selectedApp.email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Phone:</span>
                  <a href={`tel:${selectedApp.phone}`} className="text-slate-800 font-bold hover:underline">
                    {selectedApp.phone || '—'}
                  </a>
                </div>
              </div>
            </div>

            {/* CV / Portfolio Link */}
            {(() => {
              const { cvLink } = parseMessageDetails(selectedApp.message);
              return (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                    Portfolio / CV Link
                  </label>
                  {cvLink ? (
                    <a
                      href={cvLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between p-3 rounded-lg bg-amber-50/80 border border-amber-200 text-amber-900 hover:bg-amber-100 transition-colors"
                    >
                      <span className="text-xs font-bold truncate max-w-sm">{cvLink}</span>
                      <ExternalLink className="w-4 h-4 text-amber-700 flex-shrink-0" />
                    </a>
                  ) : (
                    <p className="text-xs text-slate-400 italic">No link provided by applicant</p>
                  )}
                </div>
              );
            })()}

            {/* Full Message / Cover Note */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Applicant Note / Details
              </label>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 text-xs text-slate-800 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto font-sans">
                {selectedApp.message}
              </div>
            </div>

            {/* Status & Review Notes Form */}
            <form onSubmit={handleUpdateAppStatus} className="pt-3 border-t border-slate-200 space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Application Review Status
                </label>
                <select
                  value={appStatusUpdate}
                  onChange={(e) => setAppStatusUpdate(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-brand-500"
                >
                  <option value="new">New Applicant (Pending Review)</option>
                  <option value="in_progress">In Review / Shortlisted</option>
                  <option value="replied">Contacted / Interview Scheduled</option>
                  <option value="archived">Archived / Rejected</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Internal HR Notes
                </label>
                <textarea
                  rows={2}
                  value={appNotesUpdate}
                  onChange={(e) => setAppNotesUpdate(e.target.value)}
                  placeholder="e.g. Portfolio reviewed, suitable for Senior role; scheduled call for Monday..."
                  className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="ghost" onClick={() => setSelectedApp(null)}>
                  Close
                </Button>
                <Button type="submit" variant="primary" disabled={updatingApp}>
                  {updatingApp ? 'Saving...' : 'Update Application Status'}
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};
