import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import api from '../api/api';
import { FileText, Database, Globe, Terminal, Download, Copy, ChevronLeft, Check, FolderTree, FileCode, ListTodo, Loader2, Share2, GlobeLock } from 'lucide-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { useSocket } from '../context/SocketContext';
import Button from '../components/ui/Button';

export default function ProjectView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { socket } = useSocket();
  const [project, setProject] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('readme');
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [sharing, setSharing] = useState(false);

  useEffect(() => {
    fetchProject();
  }, [id]);

  useEffect(() => {
    if (socket && id) {
      socket.on('projectUpdate', (data: any) => {
        if (data.projectId === id) {
          setProject((prev: any) => ({ ...prev, status: data.status }));
          if (data.status === 'COMPLETED') fetchProject();
        }
      });
      return () => {
        socket.off('projectUpdate');
      };
    }
  }, [socket, id]);

  const fetchProject = async () => {
    try {
      const res = await api.get(`/projects/${id}`);
      setProject(res.data);
    } catch (err) {
      console.error('Failed to fetch project');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublic = async () => {
    setSharing(true);
    try {
      const res = await api.patch(`/projects/${id}/public`, { isPublic: !project.isPublic });
      setProject(res.data);
      if (!project.isPublic) {
        const publicUrl = `${window.location.origin}/public/project/${id}`;
        navigator.clipboard.writeText(publicUrl);
        alert('Project is now public! Link copied to clipboard.');
      }
    } catch (err) {
      alert('Failed to update visibility');
    } finally {
      setSharing(false);
    }
  };

  const handleCopy = () => {
    const content = tabs.find(t => t.id === activeTab)?.content;
    if (content) {
      navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleExport = async () => {
    const zip = new JSZip();
    if (project.readme) zip.file('README.md', project.readme);
    if (project.apiDocs) zip.file('api-docs.md', project.apiDocs);
    if (project.dbSchema) zip.file('schema.sql', project.dbSchema);
    if (project.deploymentGuide) zip.file('deployment.md', project.deploymentGuide);
    if (project.landingPage) zip.file('index.html', project.landingPage);
    if (project.folderStructure) zip.file('folder-structure.txt', project.folderStructure);
    if (project.envTemplate) zip.file('.env.example', project.envTemplate);
    if (project.postmanCollection) zip.file('postman-collection.json', project.postmanCollection);
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, `${project.title.replace(/\s+/g, '-').toLowerCase()}-autodev.zip`);
  };

  if (loading) return <DashboardLayout><div className="flex items-center justify-center h-full dark:text-zinc-100">Loading pipeline...</div></DashboardLayout>;
  if (!project) return <DashboardLayout>Project not found</DashboardLayout>;

  const tabs = [
    { id: 'readme', label: 'README.md', icon: <FileText size={18} />, content: project.readme },
    { id: 'api', label: 'API Docs', icon: <Terminal size={18} />, content: project.apiDocs },
    { id: 'structure', label: 'Folder Structure', icon: <FolderTree size={18} />, content: project.folderStructure },
    { id: 'env', label: '.env Template', icon: <FileCode size={18} />, content: project.envTemplate },
    { id: 'postman', label: 'Postman', icon: <ListTodo size={18} />, content: project.postmanCollection },
    { id: 'db', label: 'DB Schema', icon: <Database size={18} />, content: project.dbSchema },
    { id: 'deployment', label: 'Deployment', icon: <Globe size={18} />, content: project.deploymentGuide },
    { id: 'landing', label: 'Landing Page', icon: <Globe size={18} />, content: project.landingPage },
  ];

  const currentTab = tabs.find(t => t.id === activeTab);
  const currentContent = currentTab?.content || 'Generation in progress...';

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-700">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors mb-4 group font-bold"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </button>

        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-sm transition-colors duration-300">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
                project.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' : 
                project.status === 'FAILED' ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' : 'bg-indigo-50 text-brand-primary dark:bg-indigo-900/20 dark:text-brand-primary animate-pulse'
              }`}>
                {project.status === 'COMPLETED' ? '✓ Infrastructure Ready' : 
                 project.status === 'PROCESSING' ? '⚙ Processing Build' : 
                 project.status === 'FAILED' ? '⚠ Build Error' : '◈ Queued'}
              </span>
              {project.isPublic && (
                <span className="flex items-center gap-1 text-[10px] font-black text-brand-secondary bg-emerald-50 dark:bg-emerald-900/10 px-3 py-1 rounded-full uppercase tracking-widest">
                  <Share2 size={10} /> Public
                </span>
              )}
            </div>
            <h1 className="text-4xl font-black text-gray-900 dark:text-zinc-100 tracking-tight mt-3">{project.title}</h1>
            <p className="text-gray-500 dark:text-zinc-400 mt-2 font-medium line-clamp-1 max-w-2xl">{project.input}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button 
              variant="outline"
              onClick={handleTogglePublic}
              disabled={sharing || project.status !== 'COMPLETED'}
              className="flex items-center gap-2 px-5 py-3.5 rounded-2xl font-bold text-sm dark:text-zinc-100 dark:border-zinc-800"
            >
              {project.isPublic ? <GlobeLock size={18} /> : <Share2 size={18} />}
              {project.isPublic ? 'Make Private' : 'Share Project'}
            </Button>
            <Button 
              variant="secondary"
              onClick={handleCopy}
              disabled={!currentTab?.content}
              className="flex items-center gap-2 px-5 py-3.5 rounded-2xl font-bold text-sm dark:bg-zinc-800 dark:text-zinc-100"
            >
              {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
              {copied ? 'Copied!' : 'Copy Asset'}
            </Button>
            <Button 
              onClick={handleExport}
              disabled={project.status !== 'COMPLETED'}
              className="flex items-center gap-2 px-7 py-3.5 bg-brand-primary text-white rounded-2xl hover:bg-slate-800 transition-all font-bold text-sm shadow-xl shadow-brand-primary/20 disabled:opacity-50"
            >
              <Download size={18} /> Download All
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-2">
            <p className="text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest mb-4 px-4">Output Assets</p>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl transition-all font-bold text-sm ${
                  activeTab === tab.id
                    ? 'bg-brand-primary text-white shadow-xl shadow-brand-primary/10'
                    : 'text-gray-500 dark:text-zinc-400 hover:bg-white dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-zinc-100 border border-transparent'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="lg:col-span-3 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-sm overflow-hidden min-h-[600px] flex flex-col relative group transition-colors duration-300">
            <div className="bg-gray-50/50 dark:bg-zinc-800/50 px-8 py-4 border-b border-gray-100/50 dark:border-zinc-800/50 flex justify-between items-center text-zinc-100">
              <span className="text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest font-mono">{currentTab?.label}</span>
              {project.status === 'PROCESSING' && (
                <span className="flex items-center gap-2 text-[10px] font-black text-brand-primary uppercase animate-pulse">
                  <Loader2 size={12} className="animate-spin" /> Syncing in real-time
                </span>
              )}
            </div>
            <div className="flex-1 p-8 font-mono text-sm overflow-auto custom-scrollbar">
              {currentContent ? (
                <pre className="text-gray-800 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap animate-in fade-in duration-500">
                  {currentContent}
                </pre>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                   <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-zinc-800 flex items-center justify-center">
                      <Loader2 className="animate-spin text-gray-300 dark:text-zinc-600" size={32} />
                   </div>
                   <p className="font-bold text-gray-400 dark:text-zinc-500">Content is being generated...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
