import { Link } from 'react-router-dom';
import { Code, Zap, FileText, Database, Globe, ArrowRight, GitBranch } from 'lucide-react';
import Button from '../components/ui/Button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-brand-primary p-2 rounded-xl text-white">
              <Code size={24} />
            </div>
            <span className="text-xl font-black text-gray-900 tracking-tight">AutoDev AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-600">
            <a href="#features" className="hover:text-brand-primary transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-brand-primary transition-colors">How it Works</a>
            <Link to="/login" className="px-5 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all">Log in</Link>
            <Link to="/register">
              <Button className="rounded-xl px-6">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl aspect-square bg-gradient-to-b from-indigo-50/50 to-transparent -z-10 rounded-full blur-3xl opacity-50" />
        
        <div className="max-w-5xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full text-brand-primary text-sm font-bold border border-indigo-100">
            <Zap size={16} /> Now with Grok-2 Support
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-gray-900 tracking-tight leading-[1.1]">
            Turn your ideas into <br />
            <span className="text-brand-primary">production-ready</span> code.
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            The AI-powered workspace that generates READMEs, API docs, database schemas, and landing pages from a single prompt or GitHub URL.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/register">
              <Button className="px-10 py-5 text-lg rounded-2xl shadow-2xl shadow-brand-primary/20 hover:-translate-y-1 transition-all">
                Start Building for Free <ArrowRight className="inline ml-2" />
              </Button>
            </Link>
            <Link to="/login" className="flex items-center gap-3 px-10 py-5 text-lg font-bold text-gray-600 hover:text-gray-900 transition-colors">
              <p>View Demo</p>
            </Link>
          </div>
          
          <div className="pt-20 relative">
             <div className="glass p-4 rounded-[2.5rem] shadow-2xl shadow-brand-primary/10 border border-white/40">
                <div className="bg-gray-900 rounded-[2rem] p-4 text-left overflow-hidden shadow-inner flex flex-col h-[400px]">
                   <div className="flex items-center gap-2 mb-4 px-2">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-amber-400" />
                      <div className="w-3 h-3 rounded-full bg-emerald-400" />
                   </div>
                   <div className="font-mono text-sm text-gray-400 space-y-1 overflow-auto p-4 custom-scrollbar">
                      <p className="text-green-400">$ autodev generate --idea "SaaS platform for AI agents"</p>
                      <p className="text-blue-400"># Fetching Grok-2 engine...</p>
                      <p className="text-gray-500">Processing input... ✓</p>
                      <p className="text-gray-500">Generating README.md... ✓</p>
                      <p className="text-gray-500">Designing Database Schema... ✓</p>
                      <p className="text-gray-500">Architecting API Endpoints... ✓</p>
                      <p className="text-emerald-400 mt-4">✓ Project "AutoDev SaaS" generated successfully.</p>
                      <p className="text-gray-400">Preview at: http://localhost:3000/preview</p>
                   </div>
                </div>
             </div>
             {/* Floating Elements */}
             <div className="absolute -top-10 -right-10 hidden lg:block animate-bounce-slow">
               <div className="bg-white p-4 rounded-2xl shadow-2xl border border-gray-100 flex items-center gap-4 max-w-[200px]">
                 <div className="p-3 bg-green-50 rounded-xl text-green-600">
                    <Database size={24} />
                 </div>
                 <div>
                   <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Schema</p>
                   <p className="text-sm font-bold text-gray-900">PostgreSQL Ready</p>
                 </div>
               </div>
             </div>
             <div className="absolute top-1/2 -left-20 hidden lg:block animate-pulse-slow">
               <div className="bg-white p-4 rounded-2xl shadow-2xl border border-gray-100 flex items-center gap-4 max-w-[200px]">
                 <div className="p-3 bg-brand-primary/10 rounded-xl text-brand-primary">
                    <FileText size={24} />
                 </div>
                 <div>
                   <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Documentation</p>
                   <p className="text-sm font-bold text-gray-900">SDK Generated</p>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight italic">Built for the Modern Developer</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">Everything you need to ship your next big idea, from documentation to deployment guides.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <FileText className="text-blue-500" />, title: "Smart READMEs", desc: "Comprehensive documentation that developers actually want to read." },
              { icon: <Database className="text-brand-secondary" />, title: "DB Architecting", desc: "Optimized database schemas tailored to your business logic." },
              { icon: <Globe className="text-purple-500" />, title: "Market-Ready Landing Pages", desc: "Clean HTML/Tailwind structures to get your product online fast." },
              { icon: <GitBranch className="text-gray-900" />, title: "Repo Analysis", desc: "Point to any GitHub URL and get a full breakdown of the codebase." },
              { icon: <Code className="text-brand-primary" />, title: "API blue-printing", desc: "Detailed API documentation with endpoint maps and structures." },
              { icon: <Zap className="text-amber-500" />, title: "Instant Export", desc: "Download all generated assets as a clean ZIP file instantly." }
            ].map((f, i) => (
              <div key={i} className="p-10 rounded-3xl border border-gray-100 hover:border-brand-primary/20 hover:shadow-2xl hover:shadow-brand-primary/5 transition-all group bg-white">
                <div className="p-4 bg-gray-50 rounded-2xl w-fit mb-6 group-hover:bg-brand-primary/10 transition-colors">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-gray-100 bg-gray-50/30">
        <div className="max-w-7xl mx-auto px-6 text-center">
           <div className="flex items-center gap-3 justify-center mb-8">
            <div className="bg-brand-primary p-2 rounded-xl text-white">
              <Code size={24} />
            </div>
            <span className="text-xl font-black text-gray-900">AutoDev AI</span>
          </div>
          <p className="text-gray-400 text-sm">© 2026 AutoDev - Made for Developers, by AI.</p>
        </div>
      </footer>
    </div>
  );
}
