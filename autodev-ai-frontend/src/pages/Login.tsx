import LoginForm from '../components/auth/LoginForm';
import { Code, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      <div className="hidden md:flex md:w-1/2 bg-gray-900 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-primary/20 via-transparent to-transparent opacity-50" />
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-20 font-bold tracking-tight">
            <ArrowLeft size={20} /> Back to Home
          </Link>
          <div className="space-y-6">
             <div className="inline-flex items-center justify-center bg-brand-primary p-3 rounded-2xl text-white shadow-xl">
               <Code size={32} />
             </div>
             <h2 className="text-5xl font-black text-white leading-tight">Empowering developers <br /> with AI precision.</h2>
             <p className="text-xl text-gray-400 max-w-md">Join thousands of developers automating the boring parts of software architecture.</p>
          </div>
        </div>
        <div className="relative z-10">
           <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-4">Trusted by creators at</p>
           <div className="flex gap-8 opacity-40 grayscale contrast-200">
              <span className="text-2xl font-black text-white">LOGO</span>
              <span className="text-2xl font-black text-white">LOGO</span>
              <span className="text-2xl font-black text-white">LOGO</span>
           </div>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-8 md:p-12 lg:p-24 bg-gray-50/50">
        <div className="max-w-md w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="md:hidden text-center mb-8">
             <div className="inline-flex items-center justify-center bg-brand-primary p-3 rounded-2xl text-white mb-4 shadow-xl">
               <Code size={32} />
             </div>
             <h1 className="text-3xl font-black text-gray-900">Welcome back</h1>
          </div>
          
          <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100">
            <div className="hidden md:block mb-10">
               <h1 className="text-3xl font-black text-gray-900 tracking-tight">Welcome back</h1>
               <p className="text-gray-500 mt-2">Sign in to your AutoDev account</p>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
