import React, { useState } from 'react';
import { X, CheckCircle2, Truck, ShieldCheck, MapPin, Phone, User, Home, ArrowRight, Printer } from 'lucide-react';
import { CartItem, CodOrderResult } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: () => void;
}

const PAKISTAN_CITIES = [
  'Lahore, Punjab',
  'Faisalabad, Punjab',
  'Rawalpindi, Punjab',
  'Islamabad, Capital',
  'Multan, Punjab',
  'Gujranwala, Punjab',
  'Sialkot, Punjab',
  'Karachi, Sindh',
  'Hyderabad, Sindh',
  'Peshawar, KPK',
  'Quetta, Balochistan',
  'Sargodha, Punjab',
  'Bahawalpur, Punjab',
  'Sheikhupura, Punjab',
  'Sahiwal, Punjab',
  'Other City / Tehsil'
];

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Lahore, Punjab');
  const [address, setAddress] = useState('');
  const [courier, setCourier] = useState('Trax Express (24-48h Priority)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderResult, setOrderResult] = useState<CodOrderResult | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, it) => sum + it.product.retailPrice * it.quantity, 0);
  const shippingFee = subtotal >= 2999 || subtotal === 0 ? 0 : 200;
  const grandTotal = subtotal + shippingFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !address.trim()) return;

    setIsSubmitting(true);
    try {
      const isPunjab = city.toLowerCase().includes('punjab');
      const res = await fetch('/api/cod-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          phone,
          address,
          city,
          province: isPunjab ? 'Punjab' : 'Pakistan',
          courier,
          items: items.map(it => ({
            name: it.product.name,
            price: it.product.retailPrice,
            quantity: it.quantity
          }))
        })
      });

      if (res.ok) {
        const data = await res.json();
        setOrderResult(data);
        onOrderSuccess();
      }
    } catch (err) {
      console.error('Order creation error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {orderResult ? (
          /* Confirmation Receipt Screen */
          <div className="text-center py-4">
            <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="text-xs uppercase tracking-wider font-semibold text-emerald-400 mb-1">
              Order Confirmed · Cash on Delivery
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display mb-2">
              Receipt Dispatched to Courier
            </h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto mb-6">
              Thank you! Your parcel manifest has been queued for {orderResult.courier}. You will pay in cash upon receiving the parcel.
            </p>

            {/* Receipt Summary Card */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-left text-xs space-y-2 mb-6">
              <div className="flex justify-between pb-2 border-b border-slate-800 font-mono">
                <span className="text-slate-400">Tracking Number:</span>
                <span className="font-bold text-emerald-400">{orderResult.trackingNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Customer Name:</span>
                <span className="text-white font-medium">{orderResult.customer.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Mobile / WhatsApp:</span>
                <span className="text-white font-mono">{orderResult.customer.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Destination:</span>
                <span className="text-white">{orderResult.customer.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Estimated Delivery:</span>
                <span className="text-emerald-400 font-semibold">{orderResult.estimatedDelivery}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-800 font-bold text-sm">
                <span className="text-white">Amount Due on Delivery:</span>
                <span className="text-emerald-400 font-mono">Rs. {grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs rounded-lg transition-all cursor-pointer"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <div>
            <div className="mb-6">
              <div className="text-xs uppercase tracking-wider font-semibold text-emerald-400 mb-1">
                Nova Mart · Cash on Delivery Checkout
              </div>
              <h3 className="text-xl font-bold text-white font-display">
                Fast Courier Booking (Pakistan)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                No credit card required. Pay cash to the courier rider at your doorstep.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Muhammad Usman"
                  className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  Mobile / WhatsApp Number (For Courier Verification)
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0300-1234567"
                  className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    City & Province
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  >
                    {PAKISTAN_CITIES.map((c, i) => (
                      <option key={i} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-slate-400" />
                    Courier Partner
                  </label>
                  <select
                    value={courier}
                    onChange={(e) => setCourier(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Trax Express (24-48h Priority)">Trax Express (24-48h Punjab)</option>
                    <option value="PostEx Express">PostEx Fast COD</option>
                    <option value="TCS Priority Service">TCS Express Priority</option>
                    <option value="Leopards Courier Service">Leopards Courier</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                  <Home className="w-3.5 h-3.5 text-slate-400" />
                  Complete Delivery Address (House/Shop #, Street, Area)
                </label>
                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. House 42, Street 7, Block B, Model Town, Lahore"
                  className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Order Amount Review */}
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1.5">
                <div className="flex justify-between text-slate-400">
                  <span>Items Subtotal ({items.length} items):</span>
                  <span className="font-mono text-white">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Courier Delivery (All Pakistan):</span>
                  <span className="font-mono text-emerald-400">
                    {shippingFee === 0 ? 'FREE (Above Rs. 2,999)' : `Rs. ${shippingFee}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-sm">
                  <span className="text-white">Total Cash on Delivery:</span>
                  <span className="font-mono text-emerald-400">Rs. {grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || items.length === 0}
                className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Generating Manifest...</span>
                ) : (
                  <>
                    <span>Confirm Cash on Delivery Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Protected by Nova Mart 7-Day Checking Warranty</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
