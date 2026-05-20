import { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Activity, Database, ShieldCheck, ChevronRight, Terminal, X, Search, Copy, ExternalLink, Mail, Briefcase, User, Clock, Check } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export default function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);
  const [showAllReportsModal, setShowAllReportsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = async (id, text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await axios.get(`${API_BASE}/admin/leads`);
        setLeads(res.data);
      } catch (error) {
        console.error("Failed to fetch telemetry data");
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in relative z-10">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-display font-bold text-white mb-2 flex items-center gap-2">
            Command Center <ShieldCheck size={28} className="text-primary-light" />
          </h2>
          <p className="text-gray-400 text-sm">Real-time telemetry and active pipelines overview.</p>
        </div>
        <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          System Optimal
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-2xl relative overflow-hidden group hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-accent/20 rounded-full blur-2xl group-hover:bg-accent/30 transition-colors"></div>
          <div className="relative z-10 flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-[11px] font-bold uppercase tracking-widest mb-1">Captured Leads</p>
              <h3 className="text-4xl font-display font-bold text-white">{leads.length}</h3>
            </div>
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-accent-light shadow-inner">
              <Users size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-emerald-400 font-medium">
            <Activity size={14} className="mr-1" /> +12% from last cycle
          </div>
        </div>
        
        <div className="glass p-6 rounded-2xl relative overflow-hidden group hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-colors"></div>
          <div className="relative z-10 flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-[11px] font-bold uppercase tracking-widest mb-1">Active Pipelines</p>
              <h3 className="text-4xl font-display font-bold text-white">{leads.length * 3}</h3>
            </div>
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-primary-light shadow-inner">
              <Activity size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-gray-400 font-medium">
            Processing current queues
          </div>
        </div>

        <div className="glass p-6 rounded-2xl relative overflow-hidden group hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-colors"></div>
          <div className="relative z-10 flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-[11px] font-bold uppercase tracking-widest mb-1">Database Uplink</p>
              <h3 className="text-2xl font-display font-bold text-white mt-1">Synchronized</h3>
            </div>
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-emerald-400 shadow-inner">
              <Database size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-emerald-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2"></span> Connection Stable
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="glass rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-5 border-b border-white/10 bg-white/5 flex items-center justify-between backdrop-blur-md">
          <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
            <Terminal size={18} className="text-primary-light" /> Intel Matrix
          </h3>
          <button 
            onClick={() => setShowAllReportsModal(true)}
            className="text-xs font-medium text-primary-light hover:text-white transition-colors flex items-center gap-1"
          >
            View All Reports <ChevronRight size={14} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-black/20 text-[11px] uppercase tracking-widest font-bold text-gray-500 border-b border-white/10">
              <tr>
                <th className="px-6 py-4">Designation (ID)</th>
                <th className="px-6 py-4">Client Entity</th>
                <th className="px-6 py-4">Organization</th>
                <th className="px-6 py-4">Protocol Specifications</th>
                <th className="px-6 py-4 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-primary-light">
                      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mb-3"></div>
                      <span className="text-sm font-medium tracking-wide">Syncing Telemetry...</span>
                    </div>
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="text-gray-500 font-medium text-sm">No transmissions intercepted yet.</div>
                  </td>
                </tr>
              ) : (
                leads.map((lead, idx) => (
                  <tr 
                    key={lead.id} 
                    onClick={() => setSelectedLead(lead)}
                    className="hover:bg-white/5 transition-colors group cursor-pointer" 
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs text-primary-light bg-primary/10 px-2 py-1 rounded border border-primary/20">
                        NXS-{String(lead.id).padStart(4, '0')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-white group-hover:text-primary-light transition-colors">{lead.name}</div>
                      <a href={`mailto:${lead.email}`} className="text-xs text-accent hover:text-accent-light underline underline-offset-2 decoration-accent/30 hover:decoration-accent-light transition-all mt-0.5 block">{lead.email}</a>
                    </td>
                    <td className="px-6 py-4">
                      {lead.company ? (
                        <span className="inline-flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent/50"></span>
                          {lead.company}
                        </span>
                      ) : (
                        <span className="text-gray-600 italic">Classified</span>
                      )}
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <div className="truncate text-gray-400 group-hover:text-gray-300 transition-colors">
                        {lead.message}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-gray-500 text-right">
                      {new Date(lead.created_at).toLocaleDateString()} <span className="opacity-50 mx-1">|</span> {new Date(lead.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Details Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="glass w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative">
            {/* Header */}
            <div className="p-5 border-b border-white/10 bg-white/5 flex items-center justify-between">
              <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
                <Terminal size={18} className="text-primary-light" /> Nexus Signal Details
              </h3>
              <button 
                onClick={() => setSelectedLead(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            
            {/* Body */}
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-primary-light bg-primary/10 px-2 py-1 rounded border border-primary/20">
                  NXS-{String(selectedLead.id).padStart(4, '0')}
                </span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock size={12} />
                  {new Date(selectedLead.created_at).toLocaleString()}
                </span>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white/5 rounded-lg text-gray-400">
                    <User size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Lead Name</p>
                    <p className="text-white font-medium">{selectedLead.name}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white/5 rounded-lg text-gray-400">
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Email Address</p>
                    <a 
                      href={`mailto:${selectedLead.email}`} 
                      className="text-accent-light hover:underline font-medium flex items-center gap-1 font-sans"
                    >
                      {selectedLead.email} <ExternalLink size={12} />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white/5 rounded-lg text-gray-400">
                    <Briefcase size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Organization</p>
                    <p className="text-white font-medium">{selectedLead.company || 'Classified'}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Workflow Specifications</p>
                <div className="bg-black/30 border border-white/5 p-4 rounded-xl max-h-48 overflow-y-auto text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
                  {selectedLead.message}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 bg-white/5 flex justify-end gap-3">
              <button
                onClick={() => handleCopy(`det-${selectedLead.id}`, selectedLead.message)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border border-white/10"
              >
                {copiedId === `det-${selectedLead.id}` ? (
                  <>
                    <Check size={14} className="text-emerald-400" /> Copied Specs
                  </>
                ) : (
                  <>
                    <Copy size={14} /> Copy Specs
                  </>
                )}
              </button>
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 bg-primary/20 hover:bg-primary/30 text-white rounded-lg text-xs font-semibold transition-colors border border-primary/30"
              >
                Close Signal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* All Reports Modal */}
      {showAllReportsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="glass w-full max-w-4xl h-[85vh] rounded-2xl flex flex-col overflow-hidden shadow-2xl border border-white/10">
            {/* Header */}
            <div className="p-5 border-b border-white/10 bg-white/5 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
                  <Database size={18} className="text-primary-light" /> Intel Matrix - All Telemetry
                </h3>
                <p className="text-xs text-gray-400 mt-1 font-sans">Showing {leads.length} records captured in total</p>
              </div>
              <button 
                onClick={() => {
                  setShowAllReportsModal(false);
                  setSearchTerm('');
                }}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Filter Section */}
            <div className="p-4 bg-white/5 border-b border-white/5 flex items-center relative">
              <Search className="absolute left-7 text-gray-500 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by client, email, organization, or specification message..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-white text-xs focus:outline-none focus:border-primary focus:bg-white/10 transition-all placeholder:text-gray-500 font-sans"
              />
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {leads.filter(lead => 
                lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (lead.company && lead.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
                lead.message.toLowerCase().includes(searchTerm.toLowerCase())
              ).length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 py-12">
                  <Search size={36} className="opacity-30 mb-3" />
                  <p className="text-sm font-medium font-sans">No records matching search query.</p>
                </div>
              ) : (
                leads
                  .filter(lead => 
                    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (lead.company && lead.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    lead.message.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((lead) => (
                    <div 
                      key={lead.id} 
                      className="glass-panel p-5 rounded-xl border border-white/5 hover:border-white/10 transition-all space-y-3 relative group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-[10px] text-primary-light bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                            NXS-{String(lead.id).padStart(4, '0')}
                          </span>
                          <h4 className="text-white font-semibold text-sm">{lead.name}</h4>
                          {lead.company && (
                            <span className="text-[10px] text-gray-400 bg-white/5 px-2 py-0.5 rounded font-sans">
                              {lead.company}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] font-mono text-gray-500">
                          {new Date(lead.created_at).toLocaleString()}
                        </span>
                      </div>

                      <div className="text-xs text-gray-300 bg-black/25 border border-white/5 p-3.5 rounded-lg whitespace-pre-wrap leading-relaxed">
                        {lead.message}
                      </div>

                      <div className="flex items-center justify-between pt-1 text-xs">
                        <a 
                          href={`mailto:${lead.email}`}
                          className="text-accent hover:text-accent-light flex items-center gap-1 font-medium font-sans"
                        >
                          <Mail size={12} /> {lead.email}
                        </a>
                        
                        <div className="flex gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleCopy(`all-${lead.id}`, lead.message)}
                            className="p-1.5 hover:bg-white/10 text-gray-400 hover:text-white rounded transition-colors flex items-center gap-1"
                            title="Copy specifications"
                          >
                            {copiedId === `all-${lead.id}` ? (
                              <Check size={13} className="text-emerald-400" />
                            ) : (
                              <Copy size={13} />
                            )}
                          </button>
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="px-2.5 py-1 bg-primary/10 hover:bg-primary/20 text-primary-light border border-primary/20 rounded text-[11px] font-medium transition-colors font-sans"
                          >
                            View Signal Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 bg-white/5 flex justify-end">
              <button
                onClick={() => {
                  setShowAllReportsModal(false);
                  setSearchTerm('');
                }}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-lg text-xs font-semibold transition-colors border border-white/10"
              >
                Close Matrix
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}