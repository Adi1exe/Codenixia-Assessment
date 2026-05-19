import { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Activity, Database } from 'lucide-react';

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
        console.error("Failed to fetch leads");
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-app-card border border-app-border p-6 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-app-black border border-app-border rounded-lg text-app-accent">
            <Users size={24} />
          </div>
          <div>
            <p className="text-gray-400 text-sm font-medium">Total Captured Leads</p>
            <h3 className="text-2xl font-bold text-white">{leads.length}</h3>
          </div>
        </div>
        
        <div className="bg-app-card border border-app-border p-6 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-app-black border border-app-border rounded-lg text-blue-400">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-gray-400 text-sm font-medium">Active Pipelines</p>
            <h3 className="text-2xl font-bold text-white">{leads.length > 0 ? 1 : 0}</h3>
          </div>
        </div>

        <div className="bg-app-card border border-app-border p-6 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-app-black border border-app-border rounded-lg text-purple-400">
            <Database size={24} />
          </div>
          <div>
            <p className="text-gray-400 text-sm font-medium">Database Status</p>
            <h3 className="text-xl font-bold text-white">Online</h3>
          </div>
        </div>
      </div>

      <div className="bg-app-card border border-app-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-app-border bg-[#111]">
          <h3 className="text-lg font-bold text-white">Lead Data Matrix</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-[#1a1a1a] text-xs uppercase font-semibold text-gray-500 border-b border-app-border">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Client Info</th>
                <th className="px-6 py-4">Company</th>
                <th className="px-6 py-4">Message</th>
                <th className="px-6 py-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-app-border">
              {loading ? (
                <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500">Fetching telemetry...</td></tr>
              ) : leads.length === 0 ? (
                <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500">No leads captured yet.</td></tr>
              ) : (
                leads.map(lead => (
                  <tr key={lead.id} className="hover:bg-[#111] transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-app-accent">#{lead.id}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{lead.name}</div>
                      <div className="text-xs text-gray-500">{lead.email}</div>
                    </td>
                    <td className="px-6 py-4">{lead.company || '-'}</td>
                    <td className="px-6 py-4 max-w-xs truncate">{lead.message}</td>
                    <td className="px-6 py-4 text-xs font-mono">{new Date(lead.created_at).toLocaleString()}</td>
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