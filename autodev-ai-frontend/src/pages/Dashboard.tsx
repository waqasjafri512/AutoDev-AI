import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import Button from '../components/ui/Button';
import api from '../api/api';
import { Clock, CheckCircle2, AlertCircle, Loader2, Code, Zap, BarChart3, Star, PartyPopper, XCircle, Plus, ShieldCheck, Sparkles, Rocket } from 'lucide-react';
import { useSocket } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const { socket } = useSocket();
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [toast, setToast] = useState<{ type: 'success' | 'error', message: string, features?: string[] } | null>(null);

  const isPro = user?.isPro;

  useEffect(() => {
    fetchProjects();
    
    if (searchParams.get('success')) {
      // Local upgrade fix - bypasses webhook
      api.post('/billing/upgrade-local')
        .then(() => {
          refreshUser();
          setToast({ 
            type: 'success', 
            message: 'Welcome to AutoDev Pro!',
            features: [
              'Unlimited AI Generations Activated',
              'Premium Folder Structures Online',
              'Export to Any Format Enabled',
              'Priority AI Engine Access'
            ]
          });
        })
        .catch(() => {
          setToast({ type: 'error', message: 'Failed to apply upgrade. Please contact support.' });
        });
      
      setSearchParams({});
    } else if (searchParams.get('canceled')) {
      setToast({ type: 'error', message: 'Checkout canceled. Your plan was not changed.' });
      setSearchParams({});
    }
  }, []);

  useEffect(() => {
    if (!socket) return;
    
    socket.on('projectUpdate', (data: any) => {
      setProjects(prev => prev.map(p => 
        p.id === data.projectId ? { ...p, status: data.status } : p
      ));
    });

    return () => {
      socket.off('projectUpdate');
    };
  }, [socket]);

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects');
      setProjects(res.data);
    } catch (err) {
      console.error('Failed to fetch projects');
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {toast && (
          <div className={`relative overflow-hidden p-6 rounded-[2rem] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 animate-in slide-in-from-top-8 duration-500 border ${
            toast.type === 'success' 
              ? 'bg-gradient-to-br from-indigo-600 to-brand-primary text-white border-brand-primary/20' 
              : 'bg-red-50 text-red-700 border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/50'
          }`}>
             {toast.type === 'success' && (
               <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
                 <Star size={120} fill="currentColor" />
               </div>
             )}
             
             <div className="flex items-start gap-5">
                <div className={`p-4 rounded-2xl ${toast.type === 'success' ? 'bg-white/20 backdrop-blur-md' : 'bg-red-100 dark:bg-red-900/40 text-red-600'}`}>
                   {toast.type === 'success' ? <PartyPopper size={32} /> : <XCircle size={32} />}
                </div>
                <div className="space-y-1">
                   <h3 className={`text-2xl font-black ${toast.type === 'success' ? 'text-white' : 'text-red-900 dark:text-red-100'}`}>
                     {toast.message}
                   </h3>
                   {toast.features ? (
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
                        {toast.features.map(f => (
                          <div key={f} className="flex items-center gap-2 text-sm font-bold text-white/80">
                            <CheckCircle2 size={14} className="text-emerald-400" /> {f}
                          </div>
                        ))}
                     </div>
                   ) : (
                     <p className="font-bold opacity-80">{toast.message}</p>
                   )}
                </div>
             </div>
             
             <button 
               onClick={() => setToast(null)} 
               className={`px-6 py-2 rounded-xl font-black text-xs transition-all ${
                 toast.type === 'success' ? 'bg-white text-brand-primary hover:bg-gray-100' : 'bg-red-100 text-red-600 hover:bg-red-200'
               }`}
             >
               Dismiss
             </button>
          </div>
        )}

        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <h2 className="text-4xl font-black text-gray-900 dark:text-zinc-100 tracking-tight">
                {isPro ? 'Pro Dashboard' : 'Main Dashboard'}
              </h2>
              {isPro && (
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                  <span className="relative bg-amber-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.15em] flex items-center gap-2 shadow-xl border border-amber-400/50">
                    <Sparkles size={12} fill="currentColor" className="animate-pulse" /> Premium Member
                  </span>
                </div>
              )}
            </div>
            <p className="text-gray-500 dark:text-zinc-400 font-medium">
              {isPro ? 'Enjoy unlimited infrastructure generation with priority access.' : 'Manage and monitor your AI infrastructure deployments.'}
            </p>
          </div>
          
          <Button 
            onClick={() => navigate('/dashboard/create')}
            className={`group relative px-8 py-4 rounded-2xl font-black text-sm shadow-xl transition-all flex items-center gap-3 active:scale-95 ${
              isPro 
                ? 'bg-amber-500 text-white shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02]' 
                : 'bg-brand-primary text-white shadow-brand-primary/25 hover:shadow-brand-primary/40 hover:scale-[1.02]'
            }`}
          >
            <Plus className="group-hover:rotate-90 transition-transform duration-300" size={18} />
            Create Infrastructure
          </Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-sm space-y-4 group hover:border-brand-primary/30 transition-all">
             <div className="flex items-center justify-between">
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-2xl text-brand-primary group-hover:scale-110 transition-transform">
                   <Code size={24} />
                </div>
                <span className="text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest">Active Projects</span>
             </div>
             <div>
                <p className="text-4xl font-black text-gray-900 dark:text-zinc-100">{projects.length}</p>
                <p className="text-sm font-bold text-gray-400 dark:text-zinc-500">Live deployments</p>
             </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-sm space-y-4 group hover:border-amber-500/30 transition-all">
             <div className="flex items-center justify-between">
                <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-2xl text-amber-500 group-hover:scale-110 transition-transform">
                   {isPro ? <Rocket size={24} /> : <Zap size={24} />}
                </div>
                <span className="text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest">Priority Status</span>
             </div>
             <div>
                <p className="text-4xl font-black text-gray-900 dark:text-zinc-100">{isPro ? 'High' : 'Standard'}</p>
                <p className="text-sm font-bold text-gray-400 dark:text-zinc-500">AI Engine priority</p>
             </div>
          </div>

          <div className={`p-8 rounded-[2.5rem] border shadow-sm space-y-4 transition-all group ${
            isPro 
              ? 'bg-amber-50/20 dark:bg-amber-900/5 border-amber-100 dark:border-amber-900/20' 
              : 'bg-white dark:bg-zinc-900 border-gray-100 dark:border-zinc-800 hover:border-brand-primary/30'
          }`}>
             <div className="flex items-center justify-between">
                <div className={`p-3 rounded-2xl transition-transform group-hover:scale-110 ${isPro ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30' : 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500'}`}>
                   <BarChart3 size={24} />
                </div>
                <span className="text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest">Usage Limit</span>
             </div>
             <div>
                <p className={`text-4xl font-black ${isPro ? 'text-amber-600 dark:text-amber-500' : 'text-gray-900 dark:text-zinc-100'}`}>
                  {isPro ? 'Unlimited' : `${projects.filter(p => new Date(p.createdAt).toDateString() === new Date().toDateString()).length} / 3`}
                </p>
                <p className="text-sm font-bold text-gray-400 dark:text-zinc-500">Generations {isPro ? 'Unlocked' : 'remaining today'}</p>
             </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-[3rem] border border-gray-100 dark:border-zinc-800 shadow-sm overflow-hidden transition-all">
          <div className="p-8 border-b border-gray-50 dark:border-zinc-800 flex items-center justify-between bg-white dark:bg-zinc-900">
            <div className="flex items-center gap-3">
               <h3 className="text-xl font-black text-gray-900 dark:text-zinc-100 tracking-tight">Recent Infrastructure</h3>
               {isPro && <span className="bg-emerald-50 text-emerald-600 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest border border-emerald-100">AI Verified</span>}
            </div>
            <div className="flex gap-2">
               <div className={`w-2 h-2 rounded-full ${isPro ? 'bg-amber-500' : 'bg-brand-primary'}`}></div>
               <div className="w-2 h-2 rounded-full bg-gray-200 dark:bg-zinc-700"></div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left bg-gray-50/50 dark:bg-zinc-800/50">
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest">Project</th>
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest">Created</th>
                  <th className="px-8 py-5 text-[10px] font-black text-gray-500 dark:text-zinc-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-zinc-800">
                {projects.map((project) => (
                  <tr key={project.id} className="group hover:bg-gray-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                         <div className={`p-2.5 rounded-xl transition-all ${
                           isPro 
                             ? 'bg-amber-50 dark:bg-amber-900/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-white' 
                             : 'bg-gray-50 dark:bg-zinc-800 text-gray-400 dark:text-zinc-500 group-hover:text-brand-primary group-hover:bg-brand-primary/5'
                         }`}>
                             <Code size={18} />
                         </div>
                         <span className="font-bold text-gray-900 dark:text-zinc-100 tracking-tight">{project.title}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        {project.status === 'COMPLETED' ? (
                          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                            <CheckCircle2 size={12} /> Stable
                          </div>
                        ) : project.status === 'PROCESSING' ? (
                           <div className="flex items-center gap-2 text-brand-primary bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider animate-pulse">
                            <Loader2 size={12} className="animate-spin" /> Generating
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                            <AlertCircle size={12} /> Error
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-gray-500 dark:text-zinc-400 font-medium text-sm">
                        <Clock size={14} />
                        {new Date(project.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <Button 
                        variant="outline"
                        onClick={() => navigate(`/dashboard/project/${project.id}`)}
                        className={`opacity-0 group-hover:opacity-100 px-6 py-2 rounded-xl text-xs font-black border-2 transition-all active:scale-95 ${
                          isPro 
                            ? 'border-amber-100 dark:border-amber-900/30 hover:border-amber-500 hover:text-amber-500' 
                            : 'border-gray-100 dark:border-zinc-700 hover:border-brand-primary hover:text-brand-primary'
                        }`}
                      >
                        Open Pipeline
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {projects.length === 0 && (
              <div className="p-20 text-center space-y-4">
                 <div className="bg-gray-50 dark:bg-zinc-800 p-6 rounded-[2rem] w-fit mx-auto text-gray-300 dark:text-zinc-600">
                    <Code size={48} />
                 </div>
                 <div className="space-y-1">
                    <p className="text-gray-900 dark:text-zinc-100 font-black text-xl">No infrastructure yet</p>
                    <p className="text-gray-400 dark:text-zinc-500 font-medium">Start your first AI-driven project deployment.</p>
                 </div>
              </div>
            )}
          </div>
        </div>
        
        {isPro && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-bottom-8 duration-1000">
             <div className="bg-gradient-to-br from-zinc-900 to-black p-8 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-20 transition-transform group-hover:scale-110 group-hover:rotate-12">
                   <ShieldCheck size={100} className="text-amber-500" />
                </div>
                <div className="relative space-y-4">
                   <h4 className="text-xl font-black text-white">Priority Support Active</h4>
                   <p className="text-zinc-400 font-medium text-sm leading-relaxed max-w-[280px]">
                     As a Pro Member, your generations are processed on our highest priority nodes for maximum speed.
                   </p>
                   <div className="flex items-center gap-2 text-amber-500 font-black text-xs uppercase tracking-widest">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></div>
                      Exclusive Node Connected
                   </div>
                </div>
             </div>
             
             <div className="bg-white dark:bg-zinc-900 p-8 rounded-[3rem] border border-gray-100 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
                <div className="space-y-2">
                   <div className="flex items-center gap-2">
                      <Star size={16} className="text-amber-500" fill="currentColor" />
                      <h4 className="text-xl font-black text-gray-900 dark:text-zinc-100 tracking-tight">Pro Features Unlocked</h4>
                   </div>
                   <p className="text-gray-500 dark:text-zinc-400 text-sm font-medium">You have access to all premium infrastructure templates.</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-4">
                   {['DB Schema', 'Postman', 'ZIP Export', 'Custom .env'].map(f => (
                     <span key={f} className="bg-gray-50 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 text-[10px] font-black px-3 py-1.5 rounded-xl border border-gray-100 dark:border-zinc-800">
                       {f}
                     </span>
                   ))}
                </div>
             </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
