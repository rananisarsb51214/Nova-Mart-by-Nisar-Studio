import React from 'react';
import { ShoppingBag, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  openCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  openCart,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Brand wordmark (one text element) */}
        <button
          onClick={() => setActiveTab('trending')}
          className="text-left group flex items-center gap-2.5 focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-sm shadow-emerald-500/20 text-slate-950 font-bold text-lg font-display">
            N
          </div>
          <span className="text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 font-display">
            Nova Mart
          </span>
        </button>

        {/* Zone 2: 4-5 single-line clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <button
            onClick={() => setActiveTab('trending')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'trending'
                ? 'text-emerald-400 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Trending Products
          </button>
          <button
            onClick={() => setActiveTab('assistant')}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'assistant'
                ? 'text-emerald-400 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            AI Advisor
          </button>
          <button
            onClick={() => setActiveTab('seo')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'seo'
                ? 'text-emerald-400 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            SEO Studio
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'calculator'
                ? 'text-emerald-400 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            COD Calculator
          </button>
          <button
            onClick={() => setActiveTab('setup')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'setup'
                ? 'text-emerald-400 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Shop Setup
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={openCart}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 hover:border-emerald-500/50 hover:bg-slate-850 text-white text-xs font-semibold transition-all shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-emerald-400" />
            <span>COD Bag</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-bold flex items-center justify-center text-[11px] tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-2 border-t border-slate-900 overflow-x-auto gap-3 text-xs font-medium no-scrollbar">
        <button
          onClick={() => setActiveTab('trending')}
          className={`whitespace-nowrap px-2.5 py-1 rounded ${
            activeTab === 'trending' ? 'bg-emerald-500/10 text-emerald-400 font-semibold' : 'text-slate-400'
          }`}
        >
          Trending
        </button>
        <button
          onClick={() => setActiveTab('assistant')}
          className={`whitespace-nowrap px-2.5 py-1 rounded ${
            activeTab === 'assistant' ? 'bg-emerald-500/10 text-emerald-400 font-semibold' : 'text-slate-400'
          }`}
        >
          AI Advisor
        </button>
        <button
          onClick={() => setActiveTab('seo')}
          className={`whitespace-nowrap px-2.5 py-1 rounded ${
            activeTab === 'seo' ? 'bg-emerald-500/10 text-emerald-400 font-semibold' : 'text-slate-400'
          }`}
        >
          SEO Studio
        </button>
        <button
          onClick={() => setActiveTab('calculator')}
          className={`whitespace-nowrap px-2.5 py-1 rounded ${
            activeTab === 'calculator' ? 'bg-emerald-500/10 text-emerald-400 font-semibold' : 'text-slate-400'
          }`}
        >
          COD Calculator
        </button>
        <button
          onClick={() => setActiveTab('setup')}
          className={`whitespace-nowrap px-2.5 py-1 rounded ${
            activeTab === 'setup' ? 'bg-emerald-500/10 text-emerald-400 font-semibold' : 'text-slate-400'
          }`}
        >
          Shop Setup
        </button>
      </div>
    </header>
  );
};
