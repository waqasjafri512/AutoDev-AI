import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import Button from '../components/ui/Button';
import api from '../api/api';
import { Clock, Send, CheckCircle2, AlertCircle, Loader2, Code, Zap, BarChart3, Star, PartyPopper, XCircle, Plus } from 'lucide-react';
import { useSocket } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const { socket } = useSocket();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [toast, setToast] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const isPro = (user as any)?.isPro;

  useEffect(() => {
    fetchProjects();
    
    if (searchParams.get('success')) {
      setToast({ type: 'success', message: 'Welcome to Pro! Your subscription is active.' });
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
          <div className={`p-4 rounded-2xl flex items-center justify-between gap-4 animate-in slide-in-from-top-4 duration-500 ${
            toast.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900/50' : 'bg-red-50 text-red-700 border border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/50'
          }`}>
            <div className="flex items-center gap-3 font-bold">
              {toast.type === 'success' ? <PartyPopper size={20} /> : <XCircle size={20} />}
              {toast.message}
            </div>
            <button onClick={() => setToast(null)} className="opacity-50 hover:opacity-100">
              <XCircle size={18} />
            </button>
          </div>
        )}

        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h2 className="text-4xl font-black text-gray-900 dark:text-zinc-100 tracking-tight">Main Dashboard</h2>
              {isPro && (
                <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-500 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 border border-amber-200 dark:border-amber-900/50">
                   <Star size={10} fill="currentColor" /> Pro Member
                </span>
              )}
            </div>
            <p className="text-gray-500 dark:text-zinc-400 font-medium">Manage and monitor your AI infrastructure deployments.</p>
          </div>
          
          <Button 
            onClick={() => navigate('/dashboard/create')}
            className="group relative px-8 py-4 bg-brand-primary text-white rounded-2xl font-black text-sm shadow-xl shadow-brand-primary/25 hover:shadow-2xl hover:scale-[1.02] transition-all flex items-center gap-3 active:scale-95"
          >
            <Plus className="group-hover:rotate-90 transition-transform duration-300" size={18} />
            Create Infrastructure
          </Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-sm space-y-4">
             <div className="flex items-center justify-between">
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-2xl text-brand-primary">
                   <Code size={24} />
                </div>
                <span className="text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest">Active Projects</span>
             </div>
             <div>
                <p className="text-4xl font-black text-gray-900 dark:text-zinc-100">{projects.length}</p>
                <p className="text-sm font-bold text-gray-400 dark:text-zinc-500">Live deployments</p>
             </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-sm space-y-4">
             <div className="flex items-center justify-between">
                <div className="bg-teal-50 dark:bg-teal-900/20 p-3 rounded-2xl text-brand-secondary">
                   <Zap size={24} />
                </div>
                <span className="text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest">Efficiency</span>
             </div>
             <div>
                <p className="text-4xl font-black text-gray-900 dark:text-zinc-100">99.9%</p>
                <p className="text-sm font-bold text-gray-400 dark:text-zinc-500">Uptime average</p>
             </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-sm space-y-4">
             <div className="flex items-center justify-between">
                <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-2xl text-amber-500">
                   <BarChart3 size={24} />
                </div>
                <span className="text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest">Daily Usage</span>
             </div>
             <div>
                <p className="text-4xl font-black text-gray-900 dark:text-zinc-100">
                  {isPro ? 'Unlimited' : `${projects.filter(p => new Date(p.createdAt).toDateString() === new Date().toDateString()).length} / 3`}
                </p>
                <p className="text-sm font-bold text-gray-400 dark:text-zinc-500">Generations remaining</p>
             </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-[3rem] border border-gray-100 dark:border-zinc-800 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-50 dark:border-zinc-800 flex items-center justify-between">
            <h3 className="text-xl font-black text-gray-900 dark:text-zinc-100 tracking-tight">Recent Infrastructure</h3>
            <div className="flex gap-2">
               <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
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
                         <div className="p-2.5 bg-gray-50 dark:bg-zinc-800 rounded-xl text-gray-400 dark:text-zinc-500 group-hover:text-brand-primary group-hover:bg-brand-primary/5 transition-all">
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
                        className="opacity-0 group-hover:opacity-100 px-6 py-2 rounded-xl text-xs font-black border-2 border-gray-100 dark:border-zinc-700 hover:border-brand-primary hover:text-brand-primary transition-all active:scale-95"
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
      </div>
    </DashboardLayout>
  );
}
