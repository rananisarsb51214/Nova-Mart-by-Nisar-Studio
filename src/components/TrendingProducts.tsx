import React, { useState } from 'react';
import { Product } from '../types';
import { WINNING_PRODUCTS } from '../data/mockProducts';
import {
  ShoppingBag,
  Sparkles,
  MapPin,
  TrendingUp,
  ArrowUpRight,
  Blend,
  Car,
  Briefcase,
  Sun,
  BatteryCharging,
  Utensils,
  Compass,
  CheckCircle2
} from 'lucide-react';

interface TrendingProductsProps {
  onAddToCart: (product: Product) => void;
  onGenerateSeo: (productName: string) => void;
  onConsultAi: (productName: string) => void;
}

const CATEGORIES = [
  'All Niches',
  'Kitchen & Home',
  'Tech & Gadgets',
  'Leather & Fashion',
  'Automotive',
  'Beauty & Care'
];

export const TrendingProducts: React.FC<TrendingProductsProps> = ({
  onAddToCart,
  onGenerateSeo,
  onConsultAi,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All Niches');
  const [addedId, setAddedId] = useState<string | null>(null);

  const filteredProducts = selectedCategory === 'All Niches'
    ? WINNING_PRODUCTS
    : WINNING_PRODUCTS.filter(p => p.category === selectedCategory);

  const handleAddWithFeedback = (product: Product) => {
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  // Icon selector helper
  const renderProductIcon = (iconName: string) => {
    switch (iconName) {
      case 'Blend': return <Blend className="w-12 h-12 text-amber-400" />;
      case 'Car': return <Car className="w-12 h-12 text-blue-400" />;
      case 'Briefcase': return <Briefcase className="w-12 h-12 text-amber-500" />;
      case 'Sparkles': return <Sparkles className="w-12 h-12 text-rose-400" />;
      case 'Sun': return <Sun className="w-12 h-12 text-yellow-400" />;
      case 'BatteryCharging': return <BatteryCharging className="w-12 h-12 text-emerald-400" />;
      case 'Utensils': return <Utensils className="w-12 h-12 text-indigo-400" />;
      case 'Compass': return <Compass className="w-12 h-12 text-red-400" />;
      default: return <Sparkles className="w-12 h-12 text-emerald-400" />;
    }
  };

  return (
    <section id="trending-section" className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-900 gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">
            Curated Winning Products · Pakistan 2026
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            High-Margin Products Ready for COD Stores
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Sourced directly from wholesale epicenters in Lahore, Karachi, Faisalabad, Sialkot, and Gujranwala with proven viral demand and manageable volumetric weight.
          </p>
        </div>

        {/* Category Filter Tabs (Section 1.A interactive tabs allowed) */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-xl overflow-x-auto no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const marginPkr = product.retailPrice - product.wholesalePrice;
          const marginPercent = Math.round((marginPkr / product.retailPrice) * 100);

          return (
            <div
              key={product.id}
              className="group rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/90 transition-all flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md"
            >
              {/* Product Visual Container (Zero-broken-image compliant CSS/SVG container) */}
              <div className={`relative h-48 w-full bg-gradient-to-br ${product.accentColor} border-b border-slate-800/60 flex flex-col items-center justify-center p-6 text-center`}>
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 backdrop-blur-md shadow-inner group-hover:scale-105 transition-transform duration-200">
                  {renderProductIcon(product.icon)}
                </div>

                {/* Sourcing Hub badge (quiet unboxed metadata) */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[11px] font-medium text-slate-300 bg-slate-950/80 px-2.5 py-1 rounded-md border border-slate-800/80 backdrop-blur-sm">
                  <MapPin className="w-3 h-3 text-emerald-400" />
                  <span>{product.sourcingHub}</span>
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 rounded-md">
                  <TrendingUp className="w-3 h-3" />
                  <span className="font-mono tabular-nums">{product.demandScore}/100</span>
                </div>

                <div className="absolute bottom-2.5 right-3 text-[11px] text-slate-400 font-mono">
                  {product.stockStatus}
                </div>
              </div>

              {/* Product Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Category & Rating */}
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-medium text-emerald-400/90">{product.category}</span>
                    <span className="font-mono tabular-nums">★ {product.rating} ({product.reviewsCount} orders)</span>
                  </div>

                  <h3 className="text-base font-semibold text-white font-display mb-2 group-hover:text-emerald-300 transition-colors line-clamp-2">
                    {product.name}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Pricing Matrix */}
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/90 mb-4">
                    <div className="flex items-baseline justify-between mb-1.5">
                      <span className="text-xs text-slate-400">Wholesale Price:</span>
                      <span className="text-xs font-mono font-medium text-slate-300 tabular-nums">
                        Rs. {product.wholesalePrice.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between mb-1.5">
                      <span className="text-xs text-slate-400">Retail Target (COD):</span>
                      <span className="text-sm font-mono font-bold text-white tabular-nums">
                        Rs. {product.retailPrice.toLocaleString()}
                      </span>
                    </div>

                    <div className="pt-1.5 border-t border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-emerald-400 font-medium">Estimated Gross Margin:</span>
                      <span className="font-mono font-bold text-emerald-400 tabular-nums">
                        +Rs. {marginPkr.toLocaleString()} ({marginPercent}%)
                      </span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-1 mb-5">
                    {product.highlights.slice(0, 2).map((hl, i) => (
                      <div key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                        <span className="text-emerald-400 mt-0.5">•</span>
                        <span className="line-clamp-1">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Cluster */}
                <div className="pt-4 border-t border-slate-800/80 space-y-2">
                  <button
                    onClick={() => handleAddWithFeedback(product)}
                    className="w-full py-2 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    {addedId === product.id ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-slate-950" />
                        <span>Added to COD Bag</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Sample COD Bag</span>
                      </>
                    )}
                  </button>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={() => onGenerateSeo(product.name)}
                      className="py-1.5 px-2 rounded-lg bg-slate-850 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      title="Generate SEO Title, Roman Urdu Ad Copy & Tags"
                    >
                      <Sparkles className="w-3 h-3 text-emerald-400" />
                      <span>Generate SEO</span>
                    </button>

                    <button
                      onClick={() => onConsultAi(`How should I market the ${product.name} on TikTok and Facebook in Pakistan with Cash on Delivery?`)}
                      className="py-1.5 px-2 rounded-lg bg-slate-850 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      title="Ask Nova AI strategy for this product"
                    >
                      <span>Ask Strategy</span>
                      <ArrowUpRight className="w-3 h-3 text-slate-500" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
