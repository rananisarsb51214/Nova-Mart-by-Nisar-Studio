import React, { useState, useEffect } from 'react';
import { Calculator, Truck, AlertTriangle, ShieldCheck, DollarSign, TrendingUp, Info } from 'lucide-react';
import { PAKISTAN_COURIERS, COD_RULES_AND_ADVICE } from '../data/courierData';

export const CodCalculator: React.FC = () => {
  const [sellingPrice, setSellingPrice] = useState(2599);
  const [sourcingCost, setSourcingCost] = useState(1150);
  const [selectedCourierId, setSelectedCourierId] = useState('trax');
  const [courierFee, setCourierFee] = useState(195);
  const [adSpendPerOrder, setAdSpendPerOrder] = useState(450);
  const [packagingCost, setPackagingCost] = useState(60);
  const [returnRate, setReturnRate] = useState(10); // 10% RTO
  const [calculation, setCalculation] = useState<any>(null);

  // Update courier fee when courier changes
  const handleCourierChange = (id: string) => {
    setSelectedCourierId(id);
    const cr = PAKISTAN_COURIERS.find(c => c.id === id);
    if (cr) {
      setCourierFee(cr.baseRatePunjab);
    }
  };

  useEffect(() => {
    calculateProfit();
  }, [sellingPrice, sourcingCost, courierFee, adSpendPerOrder, packagingCost, returnRate]);

  const calculateProfit = async () => {
    try {
      const res = await fetch('/api/calculate-profit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sellingPrice,
          sourcingCost,
          courierFee,
          adSpendPerOrder,
          packagingCost,
          expectedReturnRate: returnRate,
        })
      });
      if (res.ok) {
        const data = await res.json();
        setCalculation(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="pb-6 mb-8 border-b border-slate-800">
        <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">
          Pakistan COD Unit Economics · Nisar Studio Formula
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
          Cash on Delivery (COD) Profit & Courier Simulator
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          Simulate realistic unit margins factoring in return rates (RTO), courier return penalties, Meta/TikTok ad CAC, and wholesale costs in Pakistani Rupees.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Input Parameters */}
        <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-emerald-400" />
            <span>Order Parameters (in PKR)</span>
          </h3>

          <div className="space-y-4">
            <div>
              <label className="flex items-center justify-between text-xs font-medium text-slate-300 mb-1.5">
                <span>Retail Selling Price (COD)</span>
                <span className="text-emerald-400 font-mono">Rs. {sellingPrice.toLocaleString()}</span>
              </label>
              <input
                type="number"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
              />
            </div>

            <div>
              <label className="flex items-center justify-between text-xs font-medium text-slate-300 mb-1.5">
                <span>Wholesale Product Sourcing Cost</span>
                <span className="text-slate-400 font-mono">Rs. {sourcingCost.toLocaleString()}</span>
              </label>
              <input
                type="number"
                value={sourcingCost}
                onChange={(e) => setSourcingCost(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Select Courier Partner
              </label>
              <select
                value={selectedCourierId}
                onChange={(e) => handleCourierChange(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white"
              >
                {PAKISTAN_COURIERS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} — Base Rs. {c.baseRatePunjab} (Punjab) / Rs. {c.baseRateRest}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center justify-between text-xs font-medium text-slate-300 mb-1.5">
                <span>Courier Shipping Fee (1 Parcel)</span>
                <span className="text-slate-400 font-mono">Rs. {courierFee}</span>
              </label>
              <input
                type="number"
                value={courierFee}
                onChange={(e) => setCourierFee(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
              />
            </div>

            <div>
              <label className="flex items-center justify-between text-xs font-medium text-slate-300 mb-1.5">
                <span>Ad Spend per Purchase (Meta/TikTok CAC)</span>
                <span className="text-slate-400 font-mono">Rs. {adSpendPerOrder}</span>
              </label>
              <input
                type="number"
                value={adSpendPerOrder}
                onChange={(e) => setAdSpendPerOrder(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
              />
            </div>

            <div>
              <label className="flex items-center justify-between text-xs font-medium text-slate-300 mb-1.5">
                <span>Packaging, Box & Fly-mailers</span>
                <span className="text-slate-400 font-mono">Rs. {packagingCost}</span>
              </label>
              <input
                type="number"
                value={packagingCost}
                onChange={(e) => setPackagingCost(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-medium text-slate-300 mb-1.5">
                <span>Expected Return Rate (RTO %):</span>
                <span className={`font-mono font-bold ${returnRate <= 10 ? 'text-emerald-400' : returnRate <= 15 ? 'text-amber-400' : 'text-rose-400'}`}>
                  {returnRate}% ({returnRate <= 8 ? 'Excellent' : returnRate <= 14 ? 'Average Pakistan' : 'High Risk'})
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="30"
                value={returnRate}
                onChange={(e) => setReturnRate(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>2% (VIP WhatsApp)</span>
                <span>12% (Normal)</span>
                <span>30% (Unverified)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profit Projection Card */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          {calculation && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Simulated Unit Economics
                </span>
                <span className={`text-xs px-2.5 py-1 rounded-md font-semibold ${
                  calculation.netProfitPerDispatch >= 500
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    : calculation.netProfitPerDispatch >= 200
                    ? 'bg-amber-950 text-amber-400 border border-amber-800'
                    : 'bg-rose-950 text-rose-400 border border-rose-800'
                }`}>
                  {calculation.status}
                </span>
              </div>

              {/* Big Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400 mb-1">Net Profit / Dispatch</div>
                  <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
                    Rs. {calculation.netProfitPerDispatch.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">After return losses</div>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400 mb-1">Delivered Gross Margin</div>
                  <div className="text-2xl font-bold font-mono text-white tabular-nums">
                    Rs. {calculation.grossDeliveredProfit.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">On successful delivery</div>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
                  <div className="text-xs text-slate-400 mb-1">Net Margin %</div>
                  <div className="text-2xl font-bold font-mono text-teal-400 tabular-nums">
                    {calculation.profitMargin}%
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Of total revenue</div>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="space-y-2 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6">
                <div className="flex justify-between text-slate-400">
                  <span>Gross Product Margin (SP - Wholesale):</span>
                  <span className="font-mono text-white">Rs. {(sellingPrice - sourcingCost).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Paid Marketing Acquisition (Ad Spend):</span>
                  <span className="font-mono text-rose-400">-Rs. {adSpendPerOrder}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Courier + Packaging:</span>
                  <span className="font-mono text-rose-400">-Rs. {courierFee + packagingCost}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Return (RTO) Risk Impact Buffer ({returnRate}%):</span>
                  <span className="font-mono text-amber-400">
                    -Rs. {Math.round(calculation.grossDeliveredProfit - calculation.netProfitPerDispatch)}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between font-semibold">
                  <span className="text-emerald-400">Max Break-Even Ad Spend (CPA):</span>
                  <span className="font-mono text-white">Rs. {calculation.breakEvenAdSpend.toLocaleString()}</span>
                </div>
              </div>

              {/* Strategic Advice */}
              <div className="p-3.5 bg-emerald-950/30 border border-emerald-900/50 rounded-xl text-xs flex items-start gap-2.5">
                <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-slate-300 leading-relaxed">
                  <strong className="text-emerald-400 font-semibold">Nisar Studio Recommendation: </strong>
                  {calculation.recommendations}
                </div>
              </div>
            </div>
          )}

          {/* Sourcing Hubs Quick Reference */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-blue-400" />
              Pakistani Wholesale Hubs Benchmark
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/80">
                <div className="font-semibold text-white">Shah Alam (Lahore)</div>
                <div className="text-[11px] text-slate-400">Electronics, Kitchenware, Appliances</div>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/80">
                <div className="font-semibold text-white">Bolton Market (Karachi)</div>
                <div className="text-[11px] text-slate-400">Cosmetics, Perfumes, Imports</div>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/80">
                <div className="font-semibold text-white">Clock Tower (Faisalabad)</div>
                <div className="text-[11px] text-slate-400">Bedsheets, Lawn, Fabrics</div>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/80">
                <div className="font-semibold text-white">Sialkot Industrial Zone</div>
                <div className="text-[11px] text-slate-400">Leather bags, Wallets, Sportswear</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Courier Comparison Matrix */}
      <div className="mb-12">
        <h3 className="text-lg font-bold text-white font-display mb-4 flex items-center gap-2">
          <Truck className="w-5 h-5 text-emerald-400" />
          <span>Pakistan E-Commerce Courier Comparison Matrix</span>
        </h3>

        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3.5">Courier Name</th>
                <th className="p-3.5">Punjab Base (0.5kg)</th>
                <th className="p-3.5">Nationwide Base</th>
                <th className="p-3.5">Delivery Speed (Punjab)</th>
                <th className="p-3.5">COD Remittance Cycle</th>
                <th className="p-3.5">NDR Support</th>
                <th className="p-3.5">Best For</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {PAKISTAN_COURIERS.map((c) => (
                <tr key={c.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3.5 font-semibold text-white">{c.name}</td>
                  <td className="p-3.5 font-mono text-emerald-400 tabular-nums">Rs. {c.baseRatePunjab}</td>
                  <td className="p-3.5 font-mono text-slate-300 tabular-nums">Rs. {c.baseRateRest}</td>
                  <td className="p-3.5">{c.deliveryTimePunjab}</td>
                  <td className="p-3.5 text-slate-200">{c.codRemittance}</td>
                  <td className="p-3.5">
                    {c.ndrSupport ? (
                      <span className="text-emerald-400 font-semibold">Active Portal</span>
                    ) : (
                      <span className="text-slate-500">Manual</span>
                    )}
                  </td>
                  <td className="p-3.5 text-slate-400 max-w-xs">{c.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* COD Pro-Tips from Nisar Studio */}
      <div>
        <h3 className="text-lg font-bold text-white font-display mb-4 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>Nova Mart COD Playbook · Cutting Return Rates (RTO)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {COD_RULES_AND_ADVICE.map((rule, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-white">{rule.title}</h4>
                <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-900 px-2 py-0.5 rounded">
                  {rule.impact}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {rule.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
