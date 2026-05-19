import { useState } from 'react';
import axios from 'axios';
import { Mail, Briefcase, User, MessageSquare, CheckCircle } from 'lucide-react';

const API_BASE = 'http://localhost:8000/api';

export default function LeadForm() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await axios.post(`${API_BASE}/leads`, formData);
      setStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="bg-app-card p-8 rounded-xl border border-app-border">
      <h2 className="text-2xl font-bold text-white mb-2">Build Your Automation</h2>
      <p className="text-gray-400 text-sm mb-6">Leave your details and a systems engineer will design your custom workflow.</p>

      {status === 'success' ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <CheckCircle className="text-app-accent w-16 h-16 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Transmission Received</h3>
          <p className="text-gray-400 text-sm">Our team will be in touch shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
              <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-app-black border border-app-border rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-app-accent transition-colors" placeholder="Jane Doe" />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Work Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
              <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-app-black border border-app-border rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-app-accent transition-colors" placeholder="jane@company.com" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Company (Optional)</label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
              <input type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full bg-app-black border border-app-border rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-app-accent transition-colors" placeholder="Acme Corp" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Project Details</label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
              <textarea required rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-app-black border border-app-border rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-app-accent transition-colors resize-none" placeholder="Describe the workflow you want to automate..." />
            </div>
          </div>

          <button type="submit" disabled={status === 'loading'} className="w-full bg-app-accent hover:bg-emerald-400 text-app-black font-bold py-3 rounded-lg transition-colors flex justify-center items-center gap-2">
            {status === 'loading' ? 'Transmitting...' : 'Initialize Engagement'}
          </button>
          
          {status === 'error' && <p className="text-red-500 text-xs text-center">System Error: Could not transmit data.</p>}
        </form>
      )}
    </div>
  );
}