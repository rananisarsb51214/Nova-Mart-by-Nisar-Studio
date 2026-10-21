import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.retailPrice * item.quantity, 0);
  const freeShippingThreshold = 2999;
  const freeShippingDifference = Math.max(0, freeShippingThreshold - subtotal);
  const isFreeShipping = subtotal >= freeShippingThreshold && items.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md h-full bg-slate-900 border-l border-slate-800 flex flex-col justify-between shadow-2xl">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white font-display">
              COD Sample Bag ({items.reduce((s, it) => s + it.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="px-5 py-3 bg-slate-950/80 border-b border-slate-800/80 text-xs">
          <div className="flex items-center gap-2 mb-1.5">
            <Truck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="text-slate-300">
              {isFreeShipping ? (
                <strong className="text-emerald-400 font-semibold">Free Delivery Unlocked across Pakistan!</strong>
              ) : (
                <>Add <strong className="text-white font-mono">Rs. {freeShippingDifference.toLocaleString()}</strong> more for Free Delivery</>
              )}
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
            />
          </div>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
              <ShoppingBag className="w-12 h-12 stroke-1 mb-3 text-slate-700" />
              <p className="text-sm font-medium text-slate-300">Your COD bag is empty</p>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">
                Explore winning products from Shah Alam and Bolton market to simulate your store order.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between gap-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] text-emerald-400 font-mono mb-0.5">
                    {item.product.sourcingHub}
                  </div>
                  <h4 className="text-xs font-semibold text-white truncate mb-1">
                    {item.product.name}
                  </h4>
                  <div className="text-xs font-mono font-bold text-slate-200">
                    Rs. {item.product.retailPrice.toLocaleString()}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg p-1">
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-mono font-semibold text-white px-1">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <button
                  onClick={() => onRemoveItem(item.product.id)}
                  className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Subtotal and Checkout Action */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 space-y-3">
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal:</span>
              <span className="font-mono text-white">Rs. {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Cash on Delivery Courier:</span>
              <span className="font-mono text-emerald-400">
                {isFreeShipping ? 'FREE' : items.length > 0 ? 'Rs. 200' : 'Rs. 0'}
              </span>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-sm">
              <span className="text-white">Total Amount Due:</span>
              <span className="font-mono text-emerald-400">
                Rs. {(subtotal + (isFreeShipping || items.length === 0 ? 0 : 200)).toLocaleString()}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              onClose();
              onProceedToCheckout();
            }}
            disabled={items.length === 0}
            className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Proceed to Cash on Delivery</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
