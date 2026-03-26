import DashboardLayout from '../components/layout/DashboardLayout';
import { User, Bell, Shield, Wallet } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <header>
          <h1 className="text-4xl font-black text-gray-900 dark:text-zinc-100 tracking-tight">Account Settings</h1>
          <p className="text-gray-500 dark:text-zinc-400 mt-2 text-lg font-medium">Manage your personal information and preferences.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
           <div className="md:col-span-1 space-y-2">
              {[
                { label: 'Profile', icon: <User size={18} />, active: true },
                { label: 'Notifications', icon: <Bell size={18} />, active: false },
                { label: 'Security', icon: <Shield size={18} />, active: false },
                { label: 'Billing', icon: <Wallet size={18} />, active: false }
              ].map((item) => (
                <button
                  key={item.label}
                  className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl font-bold transition-all text-sm ${
                    item.active 
                      ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' 
                      : 'text-gray-500 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800/50 hover:text-gray-900 dark:hover:text-zinc-100'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
           </div>

           <div className="md:col-span-3 space-y-8">
              <div className="bg-white dark:bg-zinc-900 p-10 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-sm space-y-8 transition-colors duration-300">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-xs font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest px-1">Full Name</label>
                       <input 
                         type="text" 
                         className="w-full px-6 py-4 bg-gray-50 dark:bg-zinc-800 border-2 border-transparent focus:border-brand-primary focus:bg-white dark:focus:bg-zinc-700 rounded-2xl outline-none transition-all font-bold text-gray-900 dark:text-zinc-100"
                         defaultValue="Administrator"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest px-1">Email Address</label>
                       <input 
                         type="email" 
                         className="w-full px-6 py-4 bg-gray-50 dark:bg-zinc-800 border-2 border-transparent focus:border-brand-primary focus:bg-white dark:focus:bg-zinc-700 rounded-2xl outline-none transition-all font-bold text-gray-900 dark:text-zinc-100 opacity-60"
                         defaultValue={user?.email}
                         disabled
                       />
                    </div>
                 </div>
                 
                 <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest px-1">Bio</label>
                    <textarea 
                      className="w-full px-6 py-4 bg-gray-50 dark:bg-zinc-800 border-2 border-transparent focus:border-brand-primary focus:bg-white dark:focus:bg-zinc-700 rounded-2xl outline-none transition-all font-bold h-32 resize-none text-gray-900 dark:text-zinc-100"
                      placeholder="Tell us about yourself..."
                    />
                 </div>

                 <div className="flex justify-end border-t border-gray-50 dark:border-zinc-800 pt-8 mt-8">
                    <Button className="px-10 py-4 rounded-2xl shadow-xl shadow-brand-primary/10 font-black">Save Changes</Button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
