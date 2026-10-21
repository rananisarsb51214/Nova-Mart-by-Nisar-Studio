import React from 'react';
import { ArrowRight, Sparkles, TrendingUp, ShieldCheck, MapPin } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
  onOpenAdvisor: (initialPrompt?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onOpenAdvisor }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 border-b border-slate-900 bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[360px] bg-emerald-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl">
          {/* Metadata line (Zero-pill discipline) */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-400 mb-4 tracking-wide">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <MapPin className="w-3.5 h-3.5" />
              Punjab, Pakistan
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Powered by Nisar Studio</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Cash on Delivery (COD) Specialist</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display leading-[1.15] mb-5 text-balance">
            Launch & Scale Winning E-Commerce Brands in Pakistan
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-7 max-w-2xl">
            Assalam-o-Alaikum! Welcome to <strong className="text-white font-semibold">Nova Mart</strong>. We help Pakistani entrepreneurs discover high-margin trending products from local wholesale hubs, dominate Google & TikTok SEO, and build automated Cash on Delivery stores with reliable courier logistics.
          </p>

          {/* Action triggers */}
          <div className="flex flex-wrap items-center gap-3.5 mb-10">
            <button
              onClick={onExplore}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Explore Winning Products</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </button>

            <button
              onClick={() => onOpenAdvisor('What are the top 3 trending products in Lahore & Karachi wholesale markets right now?')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-700 hover:border-slate-600 font-medium text-sm transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Consult Nova AI</span>
            </button>
          </div>

          {/* Quick-Prompt Interactive Shortcuts */}
          <div className="pt-4 border-t border-slate-800/80">
            <div className="text-xs text-slate-400 mb-2.5 font-medium">Popular inquiries from Pakistani store owners:</div>
            <div className="flex flex-wrap gap-2">
              {[
                'Best courier for Cash on Delivery in Lahore?',
                'How to reduce return rate (RTO) below 8% in Pakistan?',
                'Wholesale sourcing in Shah Alam vs Bolton Market',
                'Setting up 1-page checkout with JazzCash & COD'
              ].map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => onOpenAdvisor(prompt)}
                  className="px-3 py-1.5 text-xs text-slate-300 bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 hover:text-white rounded-md transition-colors text-left cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-800/70">
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
            <div className="text-2xl font-bold text-white font-mono tabular-nums mb-1">1,200+</div>
            <div className="text-xs text-slate-400">Pakistani Sellers Guided</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
            <div className="text-2xl font-bold text-emerald-400 font-mono tabular-nums mb-1">24 - 48h</div>
            <div className="text-xs text-slate-400">Punjab Priority COD Delivery</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
            <div className="text-2xl font-bold text-teal-400 font-mono tabular-nums mb-1">94.2%</div>
            <div className="text-xs text-slate-400">Successful Delivery Ratio</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
            <div className="text-2xl font-bold text-white font-mono tabular-nums mb-1">Rs. 45M+</div>
            <div className="text-xs text-slate-400">Tracked Monthly Shipments</div>
          </div>
        </div>
      </div>
    </section>
  );
};
