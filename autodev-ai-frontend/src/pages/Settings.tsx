import { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { User, Bell, Shield, Wallet, Loader2, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import api from '../api/api';

export default function SettingsPage() {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('Profile');
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await api.patch('/auth/profile', { name, bio });
      updateUser(res.data);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to update profile' });
    } finally {
      setLoading(false);
    }
  };

  const handleManageBilling = async () => {
    setLoading(true);
    try {
      const res = await api.post('/billing/portal');
      window.location.href = res.data.url;
    } catch (err: any) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Stripe portal not available yet. Please complete a checkout first.' });
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'Profile', label: 'Profile', icon: <User size={18} /> },
    { id: 'Notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'Security', label: 'Security', icon: <Shield size={18} /> },
    { id: 'Billing', label: 'Billing', icon: <Wallet size={18} /> }
  ];

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <header>
          <h1 className="text-4xl font-black text-gray-900 dark:text-zinc-100 tracking-tight">Account Settings</h1>
          <p className="text-gray-500 dark:text-zinc-400 mt-2 text-lg font-medium">Manage your personal information and preferences.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
           <div className="md:col-span-1 space-y-2">
              {tabs.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl font-bold transition-all text-sm ${
                    activeTab === item.id 
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
              {message && (
                <div className={`p-4 rounded-2xl flex items-center gap-3 animate-in fade-in zoom-in-95 duration-300 ${
                  message.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100 dark:bg-emerald-500/10 dark:border-emerald-500/20' : 'bg-red-50 text-red-600 border border-red-100 dark:bg-red-500/10 dark:border-red-500/20'
                }`}>
                  {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                  <span className="font-bold text-sm">{message.text}</span>
                </div>
              )}

              {activeTab === 'Profile' && (
                <form onSubmit={handleSave} className="bg-white dark:bg-zinc-900 p-10 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-sm space-y-8 transition-colors duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest px-1">Full Name</label>
                      <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-6 py-4 bg-gray-50 dark:bg-zinc-800 border-2 border-transparent focus:border-brand-primary focus:bg-white dark:focus:bg-zinc-700 rounded-2xl outline-none transition-all font-bold text-gray-900 dark:text-zinc-100"
                        placeholder="Your Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest px-1">Email Address</label>
                      <input 
                        type="email" 
                        value={user?.email || ''}
                        className="w-full px-6 py-4 bg-gray-50 dark:bg-zinc-800 border-2 border-transparent rounded-2xl outline-none transition-all font-bold text-gray-900 dark:text-zinc-100 opacity-60"
                        disabled
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest px-1">Bio</label>
                    <textarea 
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full px-6 py-4 bg-gray-50 dark:bg-zinc-800 border-2 border-transparent focus:border-brand-primary focus:bg-white dark:focus:bg-zinc-700 rounded-2xl outline-none transition-all font-bold h-32 resize-none text-gray-900 dark:text-zinc-100"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <div className="flex justify-end border-t border-gray-50 dark:border-zinc-800 pt-8 mt-8">
                    <Button 
                      type="submit" 
                      disabled={loading}
                      className="px-10 py-4 rounded-2xl shadow-xl shadow-brand-primary/10 font-black flex items-center gap-2"
                    >
                      {loading && <Loader2 size={18} className="animate-spin" />}
                      Save Changes
                    </Button>
                  </div>
                </form>
              )}

              {activeTab === 'Billing' && (
                <div className="bg-white dark:bg-zinc-900 p-10 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-sm space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-black text-gray-900 dark:text-zinc-100">Current Plan</h3>
                      <p className="text-gray-500 dark:text-zinc-400 font-medium">Manage your subscription and billing details.</p>
                    </div>
                    <div className={`px-5 py-2.5 rounded-2xl font-black text-sm ${
                      user?.isPro 
                        ? 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20' 
                        : 'bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400'
                    }`}>
                      {user?.isPro ? 'PRO PLAN' : 'FREE PLAN'}
                    </div>
                  </div>

                  <div className="p-8 rounded-[2rem] bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-800 space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-zinc-800">
                        <Wallet className="text-brand-primary" size={24} />
                      </div>
                      <div className="space-y-1">
                        <p className="font-black text-gray-900 dark:text-zinc-100">Manage with Stripe</p>
                        <p className="text-sm text-gray-500 dark:text-zinc-400 font-medium leading-relaxed">
                          Update your payment methods, download invoices, or change your subscription plan directly through our secure Stripe portal.
                        </p>
                      </div>
                    </div>

                    <Button 
                      onClick={handleManageBilling}
                      disabled={loading}
                      variant="outline"
                      className="w-full py-4 rounded-2xl border-2 flex items-center justify-center gap-2 font-black"
                    >
                      {loading ? <Loader2 size={18} className="animate-spin" /> : <ExternalLink size={18} />}
                      Open Customer Portal
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === 'Security' && (
                <div className="bg-white dark:bg-zinc-900 p-10 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-sm space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                   <div>
                      <h3 className="text-2xl font-black text-gray-900 dark:text-zinc-100">Security Settings</h3>
                      <p className="text-gray-500 dark:text-zinc-400 font-medium">Manage your password and security preferences.</p>
                    </div>
                    <div className="p-10 border-2 border-dashed border-gray-100 dark:border-zinc-800 rounded-[2rem] flex flex-col items-center text-center space-y-4">
                       <Shield size={48} className="text-gray-200 dark:text-zinc-800" />
                       <p className="font-bold text-gray-400 dark:text-zinc-500 max-w-sm">Password change and two-factor authentication features are coming soon.</p>
                       <Button variant="outline" disabled className="px-8 py-3 rounded-xl border-2 font-black opacity-50">Change Password</Button>
                    </div>
                </div>
              )}

              {activeTab === 'Notifications' && (
                <div className="bg-white dark:bg-zinc-900 p-10 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-sm space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                   <div>
                      <h3 className="text-2xl font-black text-gray-900 dark:text-zinc-100">Notifications</h3>
                      <p className="text-gray-500 dark:text-zinc-400 font-medium">Control how and when you receive updates.</p>
                    </div>
                    <div className="p-10 border-2 border-dashed border-gray-100 dark:border-zinc-800 rounded-[2rem] flex flex-col items-center text-center space-y-4">
                       <Bell size={48} className="text-gray-200 dark:text-zinc-800" />
                       <p className="font-bold text-gray-400 dark:text-zinc-500 max-w-sm">Notification preferences (email and browser push) will be available in the next release.</p>
                    </div>
                </div>
              )}
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
