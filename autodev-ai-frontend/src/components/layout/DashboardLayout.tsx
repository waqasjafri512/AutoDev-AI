import type { ReactNode } from 'react';
import { LayoutDashboard, FilePlus, Settings, LogOut, User, Wallet, Star } from 'lucide-react';
import autoDevLogo from '../../assets/AutoDev AI logo.png';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, NavLink } from 'react-router-dom';
import ThemeToggle from '../ui/ThemeToggle';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const isPro = user?.isPro;

  const navItems = [
    { icon: <LayoutDashboard size={22} />, label: 'Dashboard', to: '/dashboard' },
    { icon: <FilePlus size={22} />, label: 'New Project', to: '/dashboard/create' },
    ...(!isPro ? [{ icon: <Wallet size={22} />, label: 'Pricing', to: '/dashboard/pricing' }] : []),
    { icon: <Settings size={22} />, label: 'Settings', to: '/dashboard/settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={`flex h-screen overflow-hidden font-sans transition-colors duration-300 ${isPro ? 'bg-zinc-50 dark:bg-zinc-950' : 'bg-white dark:bg-zinc-950'}`}>
      {/* Sidebar */}
      <aside className={`w-72 border-r flex flex-col relative z-20 transition-all duration-500 ${
        isPro 
          ? 'bg-zinc-100/80 dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800 backdrop-blur-xl' 
          : 'bg-gray-50/50 dark:bg-zinc-900/50 border-gray-100 dark:border-zinc-800'
      }`}>
        <div className="pt-10 pb-6 flex flex-col items-center justify-center gap-3 relative border-b border-gray-100/50 dark:border-zinc-800/30">
          <div className="absolute top-6 right-6">
            <ThemeToggle />
          </div>
          
          <div className="relative group cursor-pointer" style={{ perspective: '1000px' }}>
            <div className="absolute -inset-3 bg-gradient-to-tr from-brand-primary to-cyan-400 blur-2xl rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
            
            <div 
              className="relative z-10 w-20 h-20 rounded-full bg-white flex items-center justify-center overflow-hidden border border-gray-100 dark:border-zinc-800 shadow-[0_8px_16px_rgba(0,0,0,0.1),_0_2px_4px_rgba(99,102,241,0.1)] transition-transform duration-700 ease-out transform group-hover:scale-105"
            >
              <img 
                src={autoDevLogo} 
                alt="AutoDev Logo" 
                className="w-16 h-16 object-contain dark:mix-blend-multiply" 
              />
            </div>
          </div>
          
          {isPro && (
            <span className="relative mt-2 overflow-hidden text-[9px] font-black text-amber-600 dark:text-amber-500 uppercase tracking-widest px-3 py-1 bg-amber-50 dark:bg-amber-900/30 rounded-full border border-amber-200/60 dark:border-amber-700/40 flex items-center gap-1.5 shadow-sm">
              <Star size={10} fill="currentColor" /> Premium
              <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/80 dark:via-amber-400/30 to-transparent skew-x-12 animate-[shimmer_2.5s_infinite]"></div>
            </span>
          )}
        </div>

        <nav className="flex-1 px-6 py-4 space-y-2">
          <p className="text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-[0.2em] mb-4 px-4">Menu</p>
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 font-bold group ${
                  isActive
                    ? `${isPro ? 'bg-gradient-to-r from-amber-50 to-transparent dark:from-amber-900/10 text-amber-600 dark:text-amber-500' : 'bg-gradient-to-r from-brand-primary/5 to-transparent dark:from-brand-primary/10 text-brand-primary'}`
                    : 'text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-100 hover:bg-gray-50/50 dark:hover:bg-zinc-800/50'
                }`
              }
            >
              <div className={`transition-colors ${isPro ? 'group-[.active]:text-amber-500' : 'group-[.active]:text-brand-primary'}`}>
                {item.icon}
              </div>
              <span className="text-sm">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 mt-auto mb-4 mx-4">
          <div className={`p-4 rounded-3xl border transition-all duration-500 flex items-center justify-between group ${
            isPro 
              ? 'bg-gradient-to-br from-amber-50 to-white dark:from-amber-900/10 dark:to-zinc-900 border-amber-100 dark:border-amber-900/20' 
              : 'bg-white dark:bg-zinc-900 border-gray-100 dark:border-zinc-800'
          }`}>
             <div className="flex items-center gap-3">
               <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                 isPro 
                   ? 'bg-amber-100 dark:bg-amber-950 text-amber-600 ring-4 ring-amber-50 dark:ring-amber-900/10' 
                   : 'bg-indigo-50 dark:bg-indigo-900/20 text-brand-primary ring-4 ring-indigo-50/50 dark:ring-indigo-900/10'
               }`}>
                 <User size={18} />
               </div>
               <div className="flex-1 min-w-0">
                 <div className="flex items-center gap-1.5">
                    <p className="text-[9px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest">
                      {isPro ? 'Premium User' : 'Standard'}
                    </p>
                    {isPro && <Star size={8} className="text-amber-500" fill="currentColor" />}
                 </div>
                 <p className="text-xs font-bold text-gray-900 dark:text-zinc-100 truncate">{user?.email?.split('@')[0]}</p>
               </div>
             </div>
             
             <button
               onClick={handleLogout}
               title="Sign Out"
               className="p-2 text-gray-400 dark:text-zinc-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
             >
               <LogOut size={16} />
             </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative transition-colors duration-300 bg-white dark:bg-zinc-950">
        {isPro && (
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-brand-primary to-amber-500 z-50 animate-pulse" />
        )}
        <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] -mr-48 -mt-48 -z-10 ${isPro ? 'bg-amber-500/10' : 'bg-brand-primary/5'}`} />
        <div className="p-10 lg:p-16">
          {children}
        </div>
      </main>
    </div>
  );
}
