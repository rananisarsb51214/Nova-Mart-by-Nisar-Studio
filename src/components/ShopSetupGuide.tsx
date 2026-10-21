import React, { useState } from 'react';
import { Store, Globe, CheckSquare, CreditCard, MessageSquare, ExternalLink, Sparkles, ShieldCheck } from 'lucide-react';

interface ShopSetupGuideProps {
  onConsultAi: (topic: string) => void;
}

export const ShopSetupGuide: React.FC<ShopSetupGuideProps> = ({ onConsultAi }) => {
  const [activeStep, setActiveStep] = useState(0);

  const STEPS = [
    {
      title: 'Step 1: Domain & Brand Identity',
      icon: Globe,
      summary: 'Securing .pk or .com domains and brand registration in Pakistan.',
      details: [
        'PKNIC Domain (.com.pk or .pk): Costs ~Rs. 2,400 for 2 years. Gives high local search credibility in Pakistan.',
        'International .com: Best if you plan to target overseas Pakistanis in GCC/UK or want universal brand recognition.',
        'Branding: Keep store names short (1-2 syllables like "Nova Mart") that are easy for couriers and buyers on phone calls.',
        'Pro-Tip: Ensure matching handles on TikTok, Instagram, and Facebook before purchasing the domain.'
      ]
    },
    {
      title: 'Step 2: Platform Architecture (Shopify vs WooCommerce)',
      icon: Store,
      summary: 'Setting up high-speed checkout tailored for Pakistani shoppers.',
      details: [
        'Shopify Setup: Best for reliability. Must install a Pakistan 1-Page Checkout app (or custom liquid template) so users don’t have to fill zip codes or multiple screens.',
        'WooCommerce Setup: Zero monthly platform fee, host on Hostinger or local servers. Use WooCommerce Pakistan Cities and Cash on Delivery plugins.',
        'Mobile First: 92% of Pakistani e-commerce traffic is on mobile (Android smartphones). Ensure your store loads under 2.5 seconds on 4G networks.',
        'Language: Keep checkout fields in English with Roman Urdu labels (e.g. "Ghar ka Pata / House Address").'
      ]
    },
    {
      title: 'Step 3: Corporate Courier Merchant Account',
      icon: CheckSquare,
      summary: 'Registering with Trax, PostEx, or Leopards for COD portal access.',
      details: [
        'Required Documents: Valid CNIC (front & back), Business NTN (Sole Proprietor or Individual), and a Cross Cheque from your Pakistani bank account.',
        'Pickup Address: Provide your primary Punjab warehouse/home address for daily courier rider pickups.',
        'Negotiate Rates: If starting with >150 orders/month, request custom bracket rates (e.g., Rs. 180 base for 0.5kg intra-Punjab).',
        'API Integration: Connect your store via Trax or PostEx Shopify App for auto-booking manifests and tracking SMS.'
      ]
    },
    {
      title: 'Step 4: Payment Gateways (JazzCash & EasyPaisa)',
      icon: CreditCard,
      summary: 'Enabling local payment channels alongside default COD.',
      details: [
        'Cash on Delivery (COD): Standard in Pakistan (accounts for 85%+ of initial orders). Enable it as default with "Pay Cash to Courier Rider".',
        'JazzCash Merchant Portal: Enable QR code or Direct API for card and mobile wallet checkout.',
        'EasyPaisa Integration: Connect EasyPaisa direct gateway for instant wallet transfers.',
        'Advance Partial COD: For fragile or high-ticket items (>Rs. 5,000), request Rs. 500 advance via EasyPaisa to guarantee delivery acceptance.'
      ]
    },
    {
      title: 'Step 5: WhatsApp Confirmation & NDR Recovery',
      icon: MessageSquare,
      summary: 'The secret weapon to drop your returns from 18% to under 8%.',
      details: [
        'Immediate Automated WhatsApp: Send order confirmation within 2 minutes of placement asking the customer to reply "1" to confirm.',
        'Verification Checklist: Confirm city, complete street address, and active mobile number.',
        'Non-Delivery Report (NDR): When a rider flags "Customer not responding", call the customer within 90 minutes to reschedule.',
        'Packaging Seal: Use tamper-evident tape so couriers and customers know the parcel is factory sealed.'
      ]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="pb-6 mb-8 border-b border-slate-800">
        <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">
          Complete Blueprint · Powered by Nisar Studio
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
          Online Shop Setup Blueprint in Pakistan
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          Everything you need to launch a legitimate, high-converting Pakistani e-commerce store with Cash on Delivery courier integration and local payment methods.
        </p>
      </div>

      {/* Step Navigator */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5 mb-8">
        {STEPS.map((s, idx) => {
          const Icon = s.icon;
          return (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                activeStep === idx
                  ? 'bg-emerald-950/60 border-emerald-500/80 text-white shadow-sm'
                  : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Icon className={`w-4 h-4 ${activeStep === idx ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span className="text-xs font-semibold">Step {idx + 1}</span>
              </div>
              <div className="text-xs font-medium line-clamp-1">{s.title.split(': ')[1]}</div>
            </button>
          );
        })}
      </div>

      {/* Active Step Content */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-3">
          <div>
            <h3 className="text-xl font-bold text-white font-display">
              {STEPS[activeStep].title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              {STEPS[activeStep].summary}
            </p>
          </div>

          <button
            onClick={() => onConsultAi(`Provide deep actionable advice on ${STEPS[activeStep].title} for an online shop in Pakistan.`)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-400 text-xs font-medium transition-colors cursor-pointer shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Consult Nova on this Step</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {STEPS[activeStep].details.map((detail, dIdx) => (
            <div key={dIdx} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                {dIdx + 1}
              </span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Official Studio Links & Verification Box */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-emerald-950/30 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h4 className="text-base font-bold text-white font-display">
              Official Nova Mart & Nisar Studio Hub
            </h4>
          </div>
          <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
            Operating from Punjab, Pakistan. Supervised directly by Nisar (Pro Account). Need direct bespoke store engineering or enterprise sourcing assistance?
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            href="https://sites.google.com/view/nova-mart"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-750 text-white text-xs font-medium border border-slate-700 transition-colors"
          >
            <span>Official Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>

          <a
            href="https://sites.google.com/view/nisar-studio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-semibold transition-all shadow-sm"
          >
            <span>Parent Studio (Nisar Studio)</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-950" />
          </a>
        </div>
      </div>
    </div>
  );
};
