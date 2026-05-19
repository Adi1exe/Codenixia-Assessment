import { useState } from 'react';
import Chatbot from './components/Chatbot';
import LeadForm from './components/LeadForm';
import Dashboard from './components/Dashboard';
import { LayoutDashboard, Zap } from 'lucide-react';

function App() {
  const [view, setView] = useState('client'); // 'client' | 'admin'

  return (
    <div className="min-h-screen bg-app-black text-white font-sans selection:bg-app-accent selection:text-app-black">
      {/* Header */}
      <header className="border-b border-app-border bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-app-accent p-1.5 rounded-md">
              <Zap size={20} className="text-black" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Codenixia Nexus<span className="text-app-accent">.</span></h1>
          </div>
          
          <div className="flex bg-[#111] border border-app-border rounded-lg p-1">
            <button 
              onClick={() => setView('client')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${view === 'client' ? 'bg-app-accent text-black shadow-sm' : 'text-gray-400 hover:text-white'}`}
            >
              Client Workspace
            </button>
            <button 
              onClick={() => setView('admin')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${view === 'admin' ? 'bg-[#222] text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
            >
              <LayoutDashboard size={14} /> Control Center
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'client' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="order-2 lg:order-1">
              <LeadForm />
            </div>
            <div className="order-1 lg:order-2">
              <Chatbot />
            </div>
          </div>
        ) : (
          <Dashboard />
        )}
      </main>
    </div>
  );
}

export default App;