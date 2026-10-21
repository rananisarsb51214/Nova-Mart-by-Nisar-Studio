import React from 'react';
import { Mail, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-slate-950 font-bold text-xs font-display">
                N
              </div>
              <span className="text-base font-bold text-white tracking-tight font-display">
                Nova Mart
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Powered by <strong className="text-slate-300 font-semibold">Nisar Studio</strong>. Dedicated to helping Pakistani entrepreneurs scale through trending products, high-converting SEO, and cash on delivery logistics.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Based in Punjab, Pakistan</span>
            </div>
          </div>

          {/* Sourcing Hubs */}
          <div>
            <div className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Wholesale Sourcing Hubs
            </div>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>Shah Alam Market, Lahore</li>
              <li>Bolton Market, Karachi</li>
              <li>Clock Tower, Faisalabad</li>
              <li>Small Industrial Estate, Sialkot</li>
              <li>Cookware Cluster, Gujranwala</li>
              <li>Raja Bazaar, Rawalpindi</li>
            </ul>
          </div>

          {/* Logistics & Couriers */}
          <div>
            <div className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Courier & COD Partners
            </div>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>Trax Logistics (24-48h Punjab)</li>
              <li>PostEx (Instant COD Remittance)</li>
              <li>Leopards Courier Service</li>
              <li>TCS Express Priority</li>
              <li>Call Courier & Rider</li>
              <li>NDR Verification Automation</li>
            </ul>
          </div>

          {/* Official Verification & Legal Links */}
          <div>
            <div className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Account & Legal
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Owner: Nisar (Pro Account)</span>
              </div>

              <div className="flex items-center gap-1.5 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <a href="mailto:nisarrsna@gmail.com" className="hover:text-emerald-400 transition-colors">
                  nisarrsna@gmail.com
                </a>
              </div>

              <div className="pt-2 flex flex-col gap-1.5 text-[11px]">
                <a
                  href="https://sites.google.com/view/nova-mart"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Official Website</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
                <a
                  href="https://sites.google.com/view/nisar-studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Parent Studio: Nisar Studio</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
                <a
                  href="https://sites.google.com/view/nova-mart/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Privacy Policy</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
                <a
                  href="https://sites.google.com/view/nova-mart/data-deletion"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Data Deletion Instructions</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <div>
            © {new Date().getFullYear()} Nova Mart. Powered by Nisar Studio. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Friendly · Professional · Fast</span>
            <span aria-hidden="true">·</span>
            <span>Punjab, Pakistan</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
