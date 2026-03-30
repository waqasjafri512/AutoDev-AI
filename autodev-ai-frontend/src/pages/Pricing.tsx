import DashboardLayout from '../components/layout/DashboardLayout';
import { Check, Zap, Rocket, Star, ShieldCheck, Sparkles } from 'lucide-react';
import Button from '../components/ui/Button';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';

export default function PricingPage() {
  const { user } = useAuth();
  const isPro = user?.isPro;

  const handleUpgrade = async () => {
    try {
      const res = await api.post('/billing/checkout');
      window.location.href = res.data.url;
    } catch (err) {
      alert('Failed to start checkout. Please try again.');
    }
  };

  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for exploring and small experiments.',
      features: [
        '3 generations per day',
        'Standard README & API Docs',
        'Community Support',
        'Basic Folder Structure'
      ],
      button: isPro ? 'Downgrade (via Stripe)' : 'Current Plan',
      active: !isPro,
      pro: false
    },
    {
      name: 'Build Pro',
      price: '$15',
      period: '/month',
      description: 'Ideal for professional developers and startups.',
      features: [
        'Unlimited AI generations',
        'Premium Folder Structure',
        'Custom .env & Postman collections',
        'Advanced DB Schema Suggestion',
        'Priority AI Engine Access',
        'Export to Any Format'
      ],
      button: isPro ? 'Current Plan' : 'Upgrade to Pro',
      active: isPro,
      pro: true,
      highlight: true
    }
  ];

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/5 border border-brand-primary/10 text-brand-primary text-xs font-black uppercase tracking-widest mb-2">
            <Sparkles size={14} fill="currentColor" /> Simple, Transparent Pricing
          </div>
          <h1 className="text-5xl font-black text-gray-900 dark:text-zinc-100 tracking-tight">Scale Your Workflow</h1>
          <p className="text-gray-500 dark:text-zinc-400 text-xl max-w-2xl mx-auto">Choose a plan that fits your development needs. Upgrade or cancel anytime via your secure dashboard.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`bg-white dark:bg-zinc-900 rounded-[3rem] p-12 border-2 transition-all flex flex-col ${
                plan.highlight 
                  ? `${isPro ? 'border-amber-500 shadow-amber-500/10' : 'border-brand-primary shadow-2xl shadow-brand-primary/10'} relative overflow-hidden scale-105 z-10` 
                  : 'border-gray-50 dark:border-zinc-800 shadow-sm hover:border-gray-200 dark:hover:border-zinc-700'
              }`}
            >
              {(plan.highlight || (plan.active && isPro)) && (
                <div className={`absolute top-0 right-0 ${isPro && plan.pro ? 'bg-amber-500' : 'bg-brand-primary'} text-white px-6 py-2 rounded-bl-3xl font-black text-xs uppercase tracking-widest flex items-center gap-2`}>
                  {plan.active && isPro ? <><Star size={12} fill="currentColor" /> Active Tier</> : 'Best Value'}
                </div>
              )}

              <div className="space-y-6 flex-1">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    {plan.pro ? <Rocket className={isPro ? 'text-amber-500' : 'text-brand-primary'} /> : <Zap className="text-brand-secondary" />}
                    <h3 className="text-2xl font-black text-gray-900 dark:text-zinc-100">{plan.name}</h3>
                  </div>
                  <p className="text-gray-500 dark:text-zinc-400 font-medium">{plan.description}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-gray-900 dark:text-zinc-100">{plan.price}</span>
                  {plan.period && <span className="text-gray-400 dark:text-zinc-500 font-bold">{plan.period}</span>}
                </div>

                <ul className="space-y-4 pt-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 font-bold text-gray-600 dark:text-zinc-400 text-sm">
                      <div className={`p-1 rounded-full ${plan.pro && isPro ? 'bg-amber-500/10 text-amber-500' : 'bg-brand-primary/10 text-brand-primary'}`}>
                        <Check size={14} />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-12">
                <Button 
                  onClick={plan.pro && !plan.active ? handleUpgrade : undefined}
                  disabled={plan.active || (isPro && !plan.pro)}
                  className={`w-full py-5 rounded-2xl text-lg font-black transition-all ${
                    plan.active 
                      ? 'bg-gray-100 dark:bg-zinc-800 text-gray-400 dark:text-zinc-600 cursor-default'
                      : plan.pro 
                        ? 'bg-brand-primary text-white shadow-xl shadow-brand-primary/30 hover:shadow-2xl' 
                        : 'bg-gray-100 dark:bg-zinc-800 text-gray-400 dark:text-zinc-600 cursor-default'
                  }`}
                >
                  {plan.button}
                </Button>
                {isPro && plan.pro && (
                  <p className="text-center text-[10px] font-black text-amber-600 dark:text-amber-500 mt-4 uppercase tracking-[0.2em] animate-pulse">
                    Premium Subscription Active
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 dark:bg-zinc-900/50 p-10 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8 border border-gray-100 dark:border-zinc-800">
           <div className="space-y-2">
              <div className="flex items-center gap-3">
                 <Star className="text-amber-500 fill-amber-500" />
                 <h4 className="text-xl font-black text-gray-900 dark:text-zinc-100 uppercase tracking-tight">Enterprise Scaling?</h4>
              </div>
              <p className="text-gray-500 dark:text-zinc-400 font-medium">Need custom integrations or team-wide licenses? Let's build together.</p>
           </div>
           <Button variant="outline" className="px-10 py-4 rounded-2xl border-2 border-gray-200 dark:border-zinc-700 hover:border-brand-primary font-black dark:text-zinc-100">Contact Sales</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
