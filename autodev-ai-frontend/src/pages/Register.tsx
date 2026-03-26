import RegisterForm from '../components/auth/RegisterForm';
import { Code, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row-reverse">
      <div className="hidden md:flex md:w-1/2 bg-brand-primary p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent opacity-50" />
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-indigo-100 hover:text-white transition-colors mb-20 font-bold tracking-tight">
            <ArrowLeft size={20} /> Back to Home
          </Link>
          <div className="space-y-6">
             <div className="inline-flex items-center justify-center bg-white p-3 rounded-2xl text-brand-primary shadow-xl">
               <Code size={32} />
             </div>
             <h2 className="text-5xl font-black text-white leading-tight italic">Ship faster with <br /> automated docs.</h2>
             <p className="text-xl text-indigo-100 max-w-md">Start your 14-day free trial today. No credit card required. Cancel anytime.</p>
          </div>
        </div>
        <div className="relative z-10">
           <div className="p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20">
              <p className="text-white font-bold leading-relaxed">"AutoDev shifted our release cycle by 3 days. We don't write boilerplate docs anymore."</p>
              <div className="flex items-center gap-3 mt-4">
                 <div className="w-10 h-10 rounded-full bg-indigo-200" />
                 <div>
                    <p className="text-sm font-bold text-white tracking-tight">Sarah Chen</p>
                    <p className="text-xs text-indigo-200 font-medium">CTO at TechFlow</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-8 md:p-12 lg:p-24 bg-gray-50/50">
        <div className="max-w-md w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="md:hidden text-center mb-8">
             <div className="inline-flex items-center justify-center bg-brand-primary p-3 rounded-2xl text-white mb-4 shadow-xl">
               <Code size={32} />
             </div>
             <h1 className="text-3xl font-black text-gray-900">Create account</h1>
          </div>
          
          <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100">
            <div className="hidden md:block mb-10">
               <h1 className="text-3xl font-black text-gray-900 tracking-tight">Create account</h1>
               <p className="text-gray-500 mt-2">Get started with AutoDev today</p>
            </div>
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
