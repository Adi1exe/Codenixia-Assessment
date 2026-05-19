import { useState } from 'react';
import axios from 'axios';
import { Mail, Briefcase, User, MessageSquare, CheckCircle2, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const API_BASE = 'http://localhost:8000/api';

export default function LeadForm() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [activeField, setActiveField] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await axios.post(`${API_BASE}/leads`, formData);
      setStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });
      toast.success('Lead captured successfully!');
      setTimeout(() => setStatus('idle'), 4000);
    } catch (error) {
      setStatus('error');
      toast.error('Failed to capture lead. Please try again.');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="glass p-8 md:p-10 rounded-2xl relative overflow-hidden shadow-2xl">
      {/* Decorative gradient orb */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="relative z-10">
        <h2 className="text-3xl font-display font-bold text-white mb-3">Architect Your Future</h2>
        <p className="text-gray-400 text-sm mb-8 leading-relaxed">
          Provide your project specifications. Our systems engineers will analyze your requirements and design a custom automation workflow.
        </p>

        {status === 'success' ? (
          <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="text-emerald-400 w-10 h-10" />
            </div>
            <h3 className="text-2xl font-display font-bold text-white mb-3">Data Synthesized</h3>
            <p className="text-gray-400 text-sm max-w-xs mx-auto">
              Your requirements have been securely transmitted to our engineering team. Expect contact shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in">
            <div className="group">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 transition-colors group-focus-within:text-primary-light">
                Lead Engineer (Name)
              </label>
              <div className="relative">
                <User className={`absolute left-4 top-3.5 w-5 h-5 transition-colors ${activeField === 'name' ? 'text-primary-light' : 'text-gray-500'}`} />
                <input 
                  required 
                  type="text" 
                  value={formData.name} 
                  onFocus={() => setActiveField('name')}
                  onBlur={() => setActiveField(null)}
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-primary focus:bg-white/10 focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600" 
                  placeholder="Jane Doe" 
                />
              </div>
            </div>
            
            <div className="group">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 transition-colors group-focus-within:text-accent-light">
                Email Address
              </label>
              <div className="relative">
                <Mail className={`absolute left-4 top-3.5 w-5 h-5 transition-colors ${activeField === 'email' ? 'text-accent-light' : 'text-gray-500'}`} />
                <input 
                  required 
                  type="email" 
                  value={formData.email} 
                  onFocus={() => setActiveField('email')}
                  onBlur={() => setActiveField(null)}
                  onChange={e => setFormData({...formData, email: e.target.value})} 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-accent focus:bg-accent/5 focus:ring-1 focus:ring-accent transition-all placeholder:text-gray-600" 
                  placeholder="jane@enterprise.com" 
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 transition-colors group-focus-within:text-primary-light">
                Organization (Optional)
              </label>
              <div className="relative">
                <Briefcase className={`absolute left-4 top-3.5 w-5 h-5 transition-colors ${activeField === 'company' ? 'text-primary-light' : 'text-gray-500'}`} />
                <input 
                  type="text" 
                  value={formData.company} 
                  onFocus={() => setActiveField('company')}
                  onBlur={() => setActiveField(null)}
                  onChange={e => setFormData({...formData, company: e.target.value})} 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-primary focus:bg-white/10 focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600" 
                  placeholder="Acme Corp" 
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 transition-colors group-focus-within:text-primary-light">
                Workflow Specifications
              </label>
              <div className="relative">
                <MessageSquare className={`absolute left-4 top-4 w-5 h-5 transition-colors ${activeField === 'message' ? 'text-primary-light' : 'text-gray-500'}`} />
                <textarea 
                  required 
                  rows={4} 
                  value={formData.message} 
                  onFocus={() => setActiveField('message')}
                  onBlur={() => setActiveField(null)}
                  onChange={e => setFormData({...formData, message: e.target.value})} 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-primary focus:bg-white/10 focus:ring-1 focus:ring-primary transition-all resize-none placeholder:text-gray-600" 
                  placeholder="Describe the processes you need automated..." 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={status === 'loading'} 
              className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary-light hover:to-accent-light text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 flex justify-center items-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {status === 'loading' ? 'Establishing Connection...' : 'Initialize Engagement'}
              {!status === 'loading' && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
            </button>
            
            {status === 'error' && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg animate-fade-in mt-4">
                <p className="text-red-400 text-sm text-center font-medium">Critical Failure: Unable to establish uplink. Please retry.</p>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}