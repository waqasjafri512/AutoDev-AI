import { Link } from 'react-router-dom';
import { 
  Code, Zap, FileText, Database, Globe, ArrowRight,
  Terminal, Star, CheckCircle2, LayoutTemplate, Rocket 
} from 'lucide-react';
import autoDevLogo from '../assets/AutoDev AI logo.png';
import ThemeToggle from '../components/ui/ThemeToggle'; // Added ThemeToggle

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 selection:bg-brand-primary/20 selection:text-brand-primary text-slate-900 dark:text-zinc-50 overflow-hidden font-sans transition-colors duration-500">
      
      {/* Decorative Glows (Adjusted for Light/Dark) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-brand-primary/10 dark:from-brand-primary/20 via-cyan-500/5 dark:via-cyan-500/10 to-transparent -z-10 rounded-full blur-[100px] dark:blur-[120px] opacity-70" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-amber-500/5 dark:bg-amber-500/10 -z-10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/5 dark:bg-purple-500/10 -z-10 rounded-full blur-[100px] dark:blur-[120px]" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 dark:bg-zinc-950/60 backdrop-blur-2xl border-b border-slate-200/50 dark:border-white/5 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-brand-primary/30 dark:from-brand-primary/50 to-cyan-400/30 dark:to-cyan-400/50 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center p-1 relative z-10 shadow-sm border border-slate-100 dark:border-none">
              <img src={autoDevLogo} alt="AutoDev Logo" className="w-full h-full object-contain dark:mix-blend-multiply" />
            </div>
            <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight relative z-10">AutoDev</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold text-slate-600 dark:text-zinc-400">
            <a href="#features" className="hover:text-brand-primary dark:hover:text-white transition-colors">Features</a>
            <a href="#pro" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors flex items-center gap-1.5"><Star size={14} /> Premium</a>
            <div className="w-px h-4 bg-slate-300 dark:bg-white/10"></div>
            <ThemeToggle /> {/* THEME TOGGLE ADDED HERE */}
            <Link to="/login" className="hover:text-slate-900 dark:hover:text-white transition-colors">Sign in</Link>
            <Link to="/register">
              <button className="px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-bold hover:bg-slate-800 dark:hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 shadow-md shadow-slate-900/10 dark:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-10 animate-in fade-in slide-in-from-bottom-12 duration-1000 fill-mode-both">
          
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-white dark:bg-white/5 rounded-full text-slate-600 dark:text-zinc-300 text-sm font-bold border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-2xl hover:bg-slate-50 dark:hover:bg-white/10 transition-colors cursor-pointer">
            <span className="flex h-2 w-2 rounded-full bg-brand-primary animate-pulse"></span>
            AutoDev Pro is now Live ✨
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter leading-[1.05]">
            Generate your next <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-cyan-500 to-emerald-500 animate-gradient-x">
              startup's codebase.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-500 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed font-medium">
            The AI-powered architect that instantly builds <span className="text-slate-900 dark:text-white font-bold">API Docs, DB Schemas,</span> and <span className="text-slate-900 dark:text-white font-bold">Landing Pages</span> from a single prompt.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-8">
            <Link to="/register">
              <button className="group relative px-8 py-4 bg-brand-primary text-white text-lg font-bold rounded-full overflow-hidden shadow-xl shadow-brand-primary/30 dark:shadow-[0_0_40px_rgba(99,102,241,0.4)] hover:shadow-[0_0_60px_rgba(99,102,241,0.6)] transition-all hover:-translate-y-1">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                <span className="relative flex items-center justify-center gap-2">
                  Start Building Free <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </Link>
            <Link to="/login">
              <button className="px-8 py-4 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white text-lg font-bold rounded-full border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-zinc-800 shadow-sm transition-all">
                View Demo
              </button>
            </Link>
          </div>
          
          {/* 3D Floating Terminal Mockup */}
          <div className="pt-24 relative perspective-[2000px] w-full max-w-4xl mx-auto">
             <div className="relative transform rotateX-[15deg] hover:rotateX-0 transition-transform duration-1000 ease-out shadow-2xl dark:shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] rounded-3xl md:rounded-[2rem] border border-slate-200 dark:border-white/10 bg-slate-900 dark:bg-zinc-950 overflow-hidden">
                {/* Mac OS Header */}
                <div className="flex items-center gap-2 bg-slate-800 dark:bg-zinc-900 border-b border-slate-700 dark:border-white/5 py-4 px-6">
                   <div className="w-3.5 h-3.5 rounded-full bg-red-400 dark:bg-red-500/80 shadow-inner" />
                   <div className="w-3.5 h-3.5 rounded-full bg-amber-400 dark:bg-amber-500/80 shadow-inner" />
                   <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 dark:bg-emerald-500/80 shadow-inner" />
                   <p className="flex-1 text-center text-xs font-semibold text-slate-400 dark:text-zinc-500">autodev-ai — node execute</p>
                </div>
                {/* Terminal Content */}
                <div className="p-6 md:p-8 font-mono text-sm md:text-base text-slate-300 dark:text-zinc-400 space-y-3 text-left bg-slate-900 dark:bg-zinc-950/50 min-h-[300px] flex flex-col justify-center">
                   <div className="flex items-center gap-3">
                     <span className="text-brand-primary font-bold">~</span>
                     <span className="text-white">$ autodev generate --idea "SaaS platform for AI agents"</span>
                   </div>
                   <p className="text-cyan-400 animate-pulse">Analyzing requirement scope & deploying architecture...</p>
                   <div className="space-y-2 pl-4 border-l-2 border-slate-700 dark:border-zinc-800 mt-2">
                     <p className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-400 dark:text-emerald-500" /> Generating README.md</p>
                     <p className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-400 dark:text-emerald-500" /> Designing PostgreSQL Database Schema</p>
                     <p className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-400 dark:text-emerald-500" /> Architecting RESTful API Endpoints</p>
                   </div>
                   <p className="text-emerald-400 pt-4 font-bold flex items-center gap-2">
                     <Rocket size={18} /> Project "AutoDev SaaS" generated successfully in 4.2s.
                   </p>
                </div>
             </div>
             
             {/* Floating Elements (Responsive) */}
             <div className="absolute top-10 right-[-5%] hidden lg:block animate-bounce-slow" style={{ animationDuration: '6s' }}>
               <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl p-5 rounded-3xl shadow-xl dark:shadow-2xl border border-slate-100 dark:border-white/10 flex items-center gap-5">
                 <div className="p-4 bg-emerald-100 dark:bg-emerald-500/20 rounded-2xl text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                    <Database size={28} />
                 </div>
                 <div className="text-left">
                   <p className="text-xs font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest">Architected</p>
                   <p className="text-base font-bold text-slate-900 dark:text-white">PostgreSQL Schema</p>
                 </div>
               </div>
             </div>
             
             <div className="absolute top-1/2 left-[-10%] hidden lg:block animate-bounce-slow" style={{ animationDuration: '7s', animationDelay: '1s' }}>
               <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl p-5 rounded-3xl shadow-xl dark:shadow-2xl border border-slate-100 dark:border-white/10 flex items-center gap-5">
                 <div className="p-4 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-2xl text-brand-primary border border-brand-primary/20">
                    <Code size={28} />
                 </div>
                 <div className="text-left">
                   <p className="text-xs font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest">Documented</p>
                   <p className="text-base font-bold text-slate-900 dark:text-white">REST API Ready</p>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 border-y border-slate-200/50 dark:border-white/5 bg-slate-100/30 dark:bg-zinc-900/20 transition-colors">
        <p className="text-center text-sm font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest mb-8">Powering modern technology stacks</p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
           <div className="text-2xl font-black tracking-tighter flex items-center gap-2 text-slate-900 dark:text-white"><Globe/> React</div>
           <div className="text-2xl font-black tracking-tighter flex items-center gap-2 text-slate-900 dark:text-white"><Database/> Prisma</div>
           <div className="text-2xl font-black tracking-tighter flex items-center gap-2 text-slate-900 dark:text-white"><LayoutTemplate/> Next.js</div>
           <div className="text-2xl font-black tracking-tighter flex items-center gap-2 text-slate-900 dark:text-white"><Zap/> Stripe</div>
        </div>
      </section>

      {/* Bento Box Features Section */}
      <section id="features" className="py-24 md:py-40 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 mb-16 md:mb-24">
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-tight text-slate-900 dark:text-white">
              An ecosystem designed for <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-brand-primary">Ship Velocity.</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-500 dark:text-zinc-400 max-w-2xl mx-auto">
              AutoDev isn't just a code generator. It builds your entire product documentation, architectural foundation, and logic structures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[auto] md:auto-rows-[250px]">
            {/* Box 1 (Large) */}
            <div className="col-span-1 md:col-span-8 bg-white dark:bg-gradient-to-br dark:from-zinc-900 dark:to-zinc-950 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 border border-slate-200 dark:border-white/10 relative overflow-hidden group hover:border-brand-primary/50 dark:hover:border-brand-primary/50 transition-colors shadow-sm dark:shadow-none">
              <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-full blur-[60px] md:blur-[80px] -mr-20 -mt-20 group-hover:bg-brand-primary/20 dark:group-hover:bg-brand-primary/30 transition-colors"></div>
              <div className="relative z-10 flex flex-col h-full justify-between gap-6 md:gap-0">
                <div className="p-4 bg-slate-50 dark:bg-white/5 backdrop-blur-md rounded-2xl w-fit border border-slate-100 dark:border-white/10 text-brand-primary dark:text-white shadow-sm">
                  <FileText size={32} />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">Smart Documentation</h3>
                  <p className="text-base md:text-lg text-slate-500 dark:text-zinc-400 max-w-lg">Instantly generate rich `README.md` files that parse your code logic and explain it perfectly to other developers.</p>
                </div>
              </div>
            </div>

            {/* Box 2 (Tall) */}
            <div className="col-span-1 md:col-span-4 md:row-span-2 bg-white dark:bg-gradient-to-bl dark:from-zinc-900 dark:to-zinc-950 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 border border-slate-200 dark:border-white/10 relative overflow-hidden group hover:border-emerald-500/50 transition-colors shadow-sm dark:shadow-none">
               <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-emerald-500/10 dark:from-emerald-500/20 to-transparent"></div>
               <div className="relative z-10 flex flex-col h-full gap-6 md:gap-0">
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl w-fit border border-emerald-100 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 mb-2 md:mb-8 shadow-sm">
                    <Database size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">Database Architecture</h3>
                    <p className="text-base md:text-lg text-slate-500 dark:text-zinc-400">Receive fully structured PostgreSQL schemas customized to your specific business logic, ready to migrate.</p>
                  </div>
                  
                  <div className="mt-auto bg-slate-900 dark:bg-zinc-950 rounded-2xl p-6 border border-slate-800 dark:border-white/5 font-mono text-xs text-emerald-300 shadow-inner mt-6 md:mt-0">
<pre className="overflow-x-auto"><code>{`model User {
  id    String @id
  email String @unique
  isPro Boolean
}`}</code></pre>
                  </div>
               </div>
            </div>

            {/* Box 3 (Square) */}
            <div className="col-span-1 md:col-span-4 bg-white dark:bg-gradient-to-tr dark:from-zinc-900 dark:to-zinc-950 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 border border-slate-200 dark:border-white/10 relative overflow-hidden group hover:border-purple-500/50 transition-colors shadow-sm dark:shadow-none">
              <div className="relative z-10 flex flex-col h-full justify-between gap-6 md:gap-0">
                <div className="p-4 bg-purple-50 dark:bg-purple-500/10 rounded-2xl w-fit border border-purple-100 dark:border-purple-500/20 text-purple-600 dark:text-purple-400 shadow-sm">
                  <Terminal size={32} />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">CLI Integrated</h3>
                  <p className="text-slate-500 dark:text-zinc-400">Run local servers seamlessly.</p>
                </div>
              </div>
            </div>

            {/* Box 4 (Wide) */}
            <div className="col-span-1 md:col-span-4 bg-white dark:bg-gradient-to-br dark:from-zinc-900 dark:to-zinc-950 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 border border-slate-200 dark:border-white/10 relative overflow-hidden group hover:border-cyan-500/50 transition-colors shadow-sm dark:shadow-none">
              <div className="relative z-10 flex flex-col h-full justify-between gap-6 md:gap-0">
                <div className="p-4 bg-cyan-50 dark:bg-cyan-500/10 rounded-2xl w-fit border border-cyan-100 dark:border-cyan-500/20 text-cyan-600 dark:text-cyan-400 shadow-sm">
                  <Code size={32} />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">API Blueprints</h3>
                  <p className="text-slate-500 dark:text-zinc-400">Generate Postman Collections.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tier Teaser Section */}
      <section id="pro" className="py-20 md:py-24 px-6 relative overflow-hidden border-t border-slate-200 dark:border-zinc-800">
         <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.05),transparent_60%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.1),transparent_50%)] -z-10" />
         
         <div className="max-w-4xl mx-auto rounded-[2rem] md:rounded-[3rem] bg-white dark:bg-gradient-to-br dark:from-zinc-900 dark:via-zinc-900 dark:to-amber-950/30 border border-amber-100 dark:border-white/10 p-10 md:p-20 text-center relative shadow-2xl overflow-hidden transition-colors">
            <div className="absolute top-0 left-0 w-full h-1.5 md:h-2 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50"></div>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 dark:bg-amber-500/10 rounded-full text-amber-600 dark:text-amber-500 text-xs md:text-sm font-black tracking-widest uppercase border border-amber-200 dark:border-amber-500/20 mb-8 mx-auto shadow-sm">
              <Star fill="currentColor" size={14} /> AutoDev Premium
            </div>
            
            <h2 className="text-3xl md:text-6xl font-black tracking-tighter mb-4 md:mb-6 text-slate-900 dark:text-white leading-tight">
              Unlock the full <br /> engineering suite.
            </h2>
            
            <p className="text-base md:text-lg text-slate-500 dark:text-zinc-400 mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed">
              While the free tier generates READMEs and Landing Pages, <strong className="text-slate-900 dark:text-white">AutoDev Pro</strong> unlocks API Docs, Database Schemas, Folders, and full Postman collections.
            </p>
            
            <Link to="/dashboard/pricing">
              <button className="px-8 py-4 md:px-10 md:py-5 bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-500 dark:to-orange-500 text-white font-black text-base md:text-lg rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(245,158,11,0.3)] dark:shadow-[0_0_40px_rgba(245,158,11,0.4)]">
                Upgrade to Pro Today
              </button>
            </Link>
         </div>
      </section>

      {/* Footer */}
      <footer className="py-12 md:py-16 border-t border-slate-200 dark:border-white/5 bg-white dark:bg-zinc-950 transition-colors">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1 border border-slate-100 dark:border-white/10 shadow-sm">
               <img src={autoDevLogo} alt="AutoDev Logo" className="w-full h-full object-contain dark:mix-blend-multiply" />
             </div>
             <span className="text-xl font-black text-slate-900 dark:text-white">AutoDev AI</span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm font-semibold text-slate-500 dark:text-zinc-500">
             <Link to="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy Policy</Link>
             <Link to="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms of Service</Link>
             <Link to="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Twitter</Link>
          </div>
        </div>
      </footer>
      
    </div>
  );
}
