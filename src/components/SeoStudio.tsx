import React, { useState, useEffect } from 'react';
import { Sparkles, Copy, Check, RefreshCw, Layers, FileText, Hash, HelpCircle } from 'lucide-react';
import { SeoPackage } from '../types';

interface SeoStudioProps {
  prefilledProduct?: string;
  onClearPrefill?: () => void;
}

export const SeoStudio: React.FC<SeoStudioProps> = ({
  prefilledProduct,
  onClearPrefill,
}) => {
  const [productName, setProductName] = useState(prefilledProduct || 'Portable USB Smoothie Blender');
  const [category, setCategory] = useState('Kitchen Gadgets');
  const [targetCity, setTargetCity] = useState('Punjab & Nationwide Pakistan');
  const [targetAudience, setTargetAudience] = useState('Pakistani Online Shoppers (TikTok & Instagram)');
  const [highlights, setHighlights] = useState('Cash on Delivery (COD), 24-48h Delivery in Punjab, 7-Day Warranty');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SeoPackage | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    if (prefilledProduct) {
      setProductName(prefilledProduct);
      handleGenerate(prefilledProduct);
      if (onClearPrefill) onClearPrefill();
    }
  }, [prefilledProduct]);

  const handleGenerate = async (customName?: string) => {
    const name = customName || productName;
    if (!name.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/seo-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: name,
          category,
          targetCity,
          targetAudience,
          highlights
        })
      });

      if (!res.ok) throw new Error('Failed to generate SEO');
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyText = (key: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="pb-6 mb-8 border-b border-slate-800">
        <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">
          E-Commerce SEO Studio · Pakistan
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
          Bilingual SEO & High-Converting Ad Copy
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          Generate Google-optimized meta titles, Roman Urdu social media scripts, and COD-focused bullet points tailored to Pakistani buyer psychology.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Controls Column */}
        <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 h-fit">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>Product Parameters</span>
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Product Title / Item Name
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g. Cordless Car Vacuum Cleaner"
                className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Kitchen & Home">Kitchen & Home</option>
                <option value="Tech & Gadgets">Tech & Gadgets</option>
                <option value="Leather & Fashion">Leather & Fashion</option>
                <option value="Automotive & Car Care">Automotive & Car Care</option>
                <option value="Beauty, Skincare & Personal Care">Beauty, Skincare & Personal Care</option>
                <option value="Fitness & Sports">Fitness & Sports</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Target Region
              </label>
              <select
                value={targetCity}
                onChange={(e) => setTargetCity(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Punjab & Nationwide Pakistan">Punjab Priority & Nationwide Pakistan</option>
                <option value="Lahore, Faisalabad, Rawalpindi Hub">Lahore & Northern Punjab</option>
                <option value="Karachi & Southern Sindh">Karachi & Southern Sindh</option>
                <option value="Islamabad / Rawalpindi Twin Cities">Twin Cities (Islamabad/Rawalpindi)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Value Propositions (COD & Trust)
              </label>
              <input
                type="text"
                value={highlights}
                onChange={(e) => setHighlights(e.target.value)}
                placeholder="e.g. Cash on Delivery, Free Shipping, 7 Days Warranty"
                className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              onClick={() => handleGenerate()}
              disabled={isLoading || !productName.trim()}
              className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-semibold text-xs rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-emerald-500/20"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Optimizing SEO Copy...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Complete SEO Package</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-7 space-y-5">
          {!result && !isLoading && (
            <div className="h-full min-h-[380px] rounded-2xl border border-dashed border-slate-800 flex flex-col items-center justify-center p-8 text-center bg-slate-950/40">
              <Sparkles className="w-10 h-10 text-slate-600 mb-3" />
              <h4 className="text-base font-semibold text-slate-300 mb-1">No Package Generated Yet</h4>
              <p className="text-xs text-slate-500 max-w-sm mb-4">
                Select or type a product name and click generate to instantly get Google-ready titles, Roman Urdu scripts, and tags.
              </p>
              <button
                onClick={() => handleGenerate()}
                className="px-4 py-2 text-xs font-medium bg-slate-900 border border-slate-700 hover:border-emerald-500 text-slate-300 rounded-lg transition-colors cursor-pointer"
              >
                Generate for "{productName}"
              </button>
            </div>
          )}

          {isLoading && (
            <div className="h-full min-h-[380px] rounded-2xl border border-slate-800 bg-slate-950/60 flex flex-col items-center justify-center p-8 text-center">
              <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mb-3" />
              <p className="text-sm font-semibold text-white mb-1">Generating SEO Copy via Gemini AI</p>
              <p className="text-xs text-slate-400">Crafting high-converting Urdu-English keywords & descriptions...</p>
            </div>
          )}

          {result && !isLoading && (
            <div className="space-y-4">
              {/* SEO Title */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    Google SEO Title (Max 65 chars)
                  </span>
                  <button
                    onClick={() => copyText('title', result.seoTitle)}
                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-white cursor-pointer"
                  >
                    {copiedKey === 'title' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'title' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="text-sm font-medium text-white font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                  {result.seoTitle}
                </div>
              </div>

              {/* Meta Description */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    Google Meta Description (CTR Optimized)
                  </span>
                  <button
                    onClick={() => copyText('meta', result.metaDescription)}
                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-white cursor-pointer"
                  >
                    {copiedKey === 'meta' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'meta' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="text-xs text-slate-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 leading-relaxed">
                  {result.metaDescription}
                </div>
              </div>

              {/* Roman Urdu & English Ad Script */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-emerald-900/40">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Roman Urdu & English Ad Script (TikTok / FB Ads)
                  </span>
                  <button
                    onClick={() => copyText('pitch', result.urduEnglishPitch)}
                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-white cursor-pointer"
                  >
                    {copiedKey === 'pitch' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'pitch' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="text-xs sm:text-sm text-slate-200 bg-slate-950 p-3 rounded-lg border border-slate-800 leading-relaxed font-sans italic">
                  "{result.urduEnglishPitch}"
                </div>
              </div>

              {/* Bullet Points */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    5 Conversion Bullet Points
                  </span>
                  <button
                    onClick={() => copyText('bullets', result.bulletPoints.join('\n• '))}
                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-white cursor-pointer"
                  >
                    {copiedKey === 'bullets' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'bullets' ? 'Copied All' : 'Copy All'}</span>
                  </button>
                </div>
                <div className="space-y-1.5 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  {result.bulletPoints.map((bp, i) => (
                    <div key={i} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-emerald-400">•</span>
                      <span>{bp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Keywords Tag List */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5" />
                    High-Volume Search Keywords
                  </span>
                  <button
                    onClick={() => copyText('keywords', result.keywords.join(', '))}
                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-white cursor-pointer"
                  >
                    {copiedKey === 'keywords' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'keywords' ? 'Copied' : 'Copy CSV'}</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {result.keywords.map((kw, idx) => (
                    <span key={idx} className="text-xs font-mono text-slate-300 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pakistani Customer FAQs */}
              {result.faqList && result.faqList.length > 0 && (
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 mb-3">
                    <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
                    Frequent Customer Queries (Lahore / Punjab COD)
                  </div>
                  <div className="space-y-2.5">
                    {result.faqList.map((faq, fIdx) => (
                      <div key={fIdx} className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs">
                        <div className="font-semibold text-white mb-1">Q: {faq.question}</div>
                        <div className="text-slate-300">A: {faq.answer}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
