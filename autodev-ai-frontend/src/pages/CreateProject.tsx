import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import api from '../api/api';
import { Code, Send, ArrowLeft, Zap, Sparkles } from 'lucide-react';

export default function CreateProjectPage() {
  const [input, setInput] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/projects', { title, input });
      navigate('/dashboard');
    } catch (err) {
      alert('Generation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors mb-4 group font-bold text-sm"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </button>

        <div className="space-y-2">
          <h1 className="text-4xl font-black text-gray-900 dark:text-zinc-100 tracking-tight flex items-center gap-4">
             Launch New Project <Sparkles className="text-brand-primary" size={32} />
          </h1>
          <p className="text-gray-500 dark:text-zinc-400 text-lg">Define your vision and let AutoDev AI handle the architecture.</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-10 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-2xl shadow-gray-200/40 dark:shadow-none relative overflow-hidden transition-colors duration-300">
          <div className="absolute top-0 right-0 p-10 opacity-5 dark:opacity-10 text-zinc-100">
             <Code size={120} />
          </div>
          
          <form onSubmit={handleGenerate} className="space-y-8 relative z-10">
            <div className="space-y-6">
              <Input
                label="Project Name"
                placeholder="e.g., Nexus E-commerce Platform"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="text-lg py-4 px-6 rounded-2xl dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
              />
              
              <div className="space-y-3">
                <label className="block text-sm font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest px-1">Project Blueprint (Idea or GitHub)</label>
                <textarea
                  className="w-full px-6 py-5 border-2 border-gray-100 dark:border-zinc-800 rounded-[2rem] focus:ring-8 focus:ring-brand-primary/5 focus:border-brand-primary outline-none transition-all h-48 resize-none shadow-sm bg-gray-50/30 dark:bg-zinc-800/50 text-gray-700 dark:text-zinc-300 text-lg leading-relaxed"
                  placeholder="Paste a GitHub URL, enter a detailed idea, or provide a code snippet..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  required
                />
                <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-zinc-500 font-bold px-4">
                   <Zap size={14} className="text-amber-500" />
                   Tip: Detailed descriptions yield better architectural results.
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full flex items-center justify-center gap-4 py-5 rounded-2xl shadow-2xl shadow-brand-primary/20 text-xl font-black hover:-translate-y-1 transition-all" 
                disabled={loading}
              >
                {loading ? (
                  <>Initializing AI Engine...</>
                ) : (
                  <><Send size={24} /> Create Infrastructure</>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
