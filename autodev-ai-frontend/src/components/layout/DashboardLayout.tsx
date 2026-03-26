import type { ReactNode } from 'react';
import { LayoutDashboard, FilePlus, Settings, LogOut, Code, User, Wallet } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, NavLink } from 'react-router-dom';
import ThemeToggle from '../ui/ThemeToggle';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { icon: <LayoutDashboard size={22} />, label: 'Dashboard', to: '/dashboard' },
    { icon: <FilePlus size={22} />, label: 'New Project', to: '/dashboard/create' },
    { icon: <Wallet size={22} />, label: 'Pricing', to: '/dashboard/pricing' },
    { icon: <Settings size={22} />, label: 'Settings', to: '/dashboard/settings' },
  ];

  return (
    <div className="flex h-screen bg-white dark:bg-zinc-950 overflow-hidden font-sans transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-72 bg-gray-50/50 dark:bg-zinc-900/50 border-r border-gray-100 dark:border-zinc-800 flex flex-col relative z-20 transition-colors duration-300">
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-brand-primary p-2.5 rounded-2xl text-white shadow-lg shadow-brand-primary/20">
              <Code size={26} />
            </div>
            <span className="text-2xl font-black text-gray-900 dark:text-zinc-100 tracking-tighter">AutoDev</span>
          </div>
          <ThemeToggle />
        </div>

        <nav className="flex-1 px-6 py-4 space-y-2">
          <p className="text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-[0.2em] mb-4 px-4">Menu</p>
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 font-bold group ${
                  isActive
                    ? 'bg-white dark:bg-zinc-800 text-brand-primary shadow-sm border border-gray-100 dark:border-zinc-700'
                    : 'text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-100 hover:bg-white/50 dark:hover:bg-zinc-800/50'
                }`
              }
            >
              <div className="text-gray-400 dark:text-zinc-500 group-[.active]:text-brand-primary transition-colors">
                {item.icon}
              </div>
              <span className="text-sm">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-6 mt-auto">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-[2rem] border border-gray-100 dark:border-zinc-800 shadow-sm space-y-4 transition-colors duration-300">
             <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-brand-primary ring-4 ring-indigo-50/50 dark:ring-indigo-900/10">
                 <User size={24} />
               </div>
               <div className="flex-1 min-w-0">
                 <p className="text-xs font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest">Administrator</p>
                 <p className="text-sm font-bold text-gray-900 dark:text-zinc-100 truncate">{user?.email?.split('@')[0]}</p>
               </div>
             </div>
             <button
               onClick={handleLogout}
               className="w-full flex items-center justify-center gap-3 py-3 text-gray-500 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all font-bold text-sm"
             >
               <LogOut size={18} />
               Sign Out
             </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-white dark:bg-zinc-950 relative transition-colors duration-300">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-[100px] -mr-48 -mt-48 -z-10" />
        <div className="p-10 lg:p-16">
          {children}
        </div>
      </main>
    </div>
  );
}
