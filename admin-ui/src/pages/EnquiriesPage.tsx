import React, { useEffect, useState } from 'react';
import { Search, Filter, Eye, Trash2, Mail, Phone, Clock, MessageSquare } from 'lucide-react';
import { apiRequest } from '../api/client';
import { Table } from '../components/common/Table';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Badge } from '../components/common/Badge';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export const EnquiriesPage: React.FC = () => {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>({ page: 1, limit: 15, total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState<any | null>(null);
  const [statusToUpdate, setStatusToUpdate] = useState('');
  const [notesToUpdate, setNotesToUpdate] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchEnquiries(1);
  }, [statusFilter, search]);

  const fetchEnquiries = async (page = 1) => {
    setLoading(true);
    try {
      let query = `?page=${page}&limit=15`;
      if (statusFilter !== 'all') query += `&status=${statusFilter}`;
      if (search) query += `&search=${encodeURIComponent(search)}`;

      const res = await apiRequest(`/enquiries${query}`);
      if (res.success) {
        setEnquiries(res.data);
        if (res.pagination) setPagination(res.pagination);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDetail = (enq: any) => {
    setSelectedEnquiry(enq);
    setStatusToUpdate(enq.status);
    setNotesToUpdate(enq.notes || '');
  };

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry) return;
    setUpdating(true);
    try {
      const res = await apiRequest(`/enquiries/${selectedEnquiry._id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: statusToUpdate, notes: notesToUpdate }),
      });
      if (res.success) {
        setSelectedEnquiry(null);
        fetchEnquiries(pagination.page);
      }
    } catch (err: any) {
      alert(err.message || 'Error updating status');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this enquiry record?')) return;
    try {
      await apiRequest(`/enquiries/${id}`, { method: 'DELETE' });
      fetchEnquiries(pagination.page);
      if (selectedEnquiry?._id === id) setSelectedEnquiry(null);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const getStatusBadgeVariant = (st: string) => {
    switch (st) {
      case 'new':
        return 'warning';
      case 'in_progress':
        return 'info';
      case 'replied':
        return 'success';
      case 'archived':
      default:
        return 'neutral';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Lead Enquiries & Inquiries</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage incoming inquiries originating from the contact page, header modal, and expansion landing pages.
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-wrap items-center gap-3 bg-slate-900 p-3 rounded-xl border border-slate-800">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads by name, email, phone, or service..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-amber-500"
          >
            <option value="all">All Enquiries</option>
            <option value="new">New (Unread)</option>
            <option value="in_progress">In Progress</option>
            <option value="replied">Replied</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner size="lg" className="min-h-[40vh]" />
      ) : (
        <>
          <Table
            headers={['Contact Person', 'Service / Subject', 'Source', 'Received At', 'Status', 'Actions']}
            isEmpty={enquiries.length === 0}
            emptyMessage="No enquiries found matching your criteria."
          >
            {enquiries.map((enq) => (
              <tr key={enq._id} className="hover:bg-slate-800/40 transition-colors">
                <td className="px-6 py-4">
                  <p className="text-sm font-semibold text-white">{enq.name}</p>
                  <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3 text-slate-500" /> {enq.email}
                    </span>
                    {enq.phone && (
                      <span className="flex items-center gap-1 text-slate-400 font-mono">
                        <Phone className="w-3 h-3 text-slate-500" /> {enq.phone}
                      </span>
                    )}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-xs font-medium text-amber-400">{enq.service || 'General Consultation'}</p>
                  <p className="text-xs text-slate-400 line-clamp-1 max-w-xs">{enq.message}</p>
                </td>
                <td className="px-6 py-4 text-xs font-mono text-slate-400">{enq.formSource}</td>
                <td className="px-6 py-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    {new Date(enq.createdAt).toLocaleDateString()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Badge variant={getStatusBadgeVariant(enq.status)}>
                    {enq.status.replace('_', ' ')}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenDetail(enq)}
                      className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(enq._id)}
                      className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </Table>

          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
              <span>
                Showing Page {pagination.page} of {pagination.totalPages} ({pagination.total} total leads)
              </span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  disabled={pagination.page <= 1}
                  onClick={() => fetchEnquiries(pagination.page - 1)}
                >
                  Previous
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  disabled={pagination.page >= pagination.totalPages}
                  onClick={() => fetchEnquiries(pagination.page + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Enquiry Detail & Status Modal */}
      <Modal
        isOpen={!!selectedEnquiry}
        onClose={() => setSelectedEnquiry(null)}
        title="Enquiry Submission Details"
        maxWidth="xl"
      >
        {selectedEnquiry && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs">
              <div>
                <span className="text-slate-500 block uppercase font-semibold text-[10px]">Prospect Name</span>
                <span className="text-white font-medium text-sm">{selectedEnquiry.name}</span>
              </div>
              <div>
                <span className="text-slate-500 block uppercase font-semibold text-[10px]">Email Address</span>
                <span className="text-amber-400 font-medium">{selectedEnquiry.email}</span>
              </div>
              <div>
                <span className="text-slate-500 block uppercase font-semibold text-[10px]">Phone Number</span>
                <span className="text-slate-300 font-mono">{selectedEnquiry.phone || 'Not provided'}</span>
              </div>
              <div>
                <span className="text-slate-500 block uppercase font-semibold text-[10px]">Requested Service</span>
                <span className="text-slate-300">{selectedEnquiry.service || 'General'}</span>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-300 block mb-1">Message Content</span>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                {selectedEnquiry.message}
              </div>
            </div>

            <form onSubmit={handleUpdateStatus} className="border-t border-slate-800 pt-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Update Status</label>
                  <select
                    value={statusToUpdate}
                    onChange={(e) => setStatusToUpdate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="new">New (Unread)</option>
                    <option value="in_progress">In Progress</option>
                    <option value="replied">Replied / Contacted</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Internal Notes / Follow-up History
                </label>
                <textarea
                  rows={2}
                  value={notesToUpdate}
                  onChange={(e) => setNotesToUpdate(e.target.value)}
                  placeholder="Record client responses, consultation notes, or quotation status..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex justify-between items-center pt-2">
                <Button
                  type="button"
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(selectedEnquiry._id)}
                >
                  Delete Lead
                </Button>
                <div className="flex gap-2">
                  <Button type="button" variant="ghost" size="sm" onClick={() => setSelectedEnquiry(null)}>
                    Close
                  </Button>
                  <Button type="submit" variant="primary" size="sm" isLoading={updating}>
                    Save Status & Notes
                  </Button>
                </div>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
};
