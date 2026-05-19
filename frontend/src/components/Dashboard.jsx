import { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Activity, Database, ShieldCheck, ChevronRight, Terminal } from 'lucide-react';

const API_BASE = 'http://localhost:8000/api';

export default function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

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
              <h3 className="text-4xl font-display font-bold text-white">{leads.length > 0 ? 3 : 0}</h3>
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
          <button className="text-xs font-medium text-primary-light hover:text-white transition-colors flex items-center">
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
                  <tr key={lead.id} className="hover:bg-white/5 transition-colors group cursor-default" style={{ animationDelay: `${idx * 0.05}s` }}>
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
    </div>
  );
}