import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrendingProducts } from './components/TrendingProducts';
import { AiAssistant } from './components/AiAssistant';
import { SeoStudio } from './components/SeoStudio';
import { CodCalculator } from './components/CodCalculator';
import { ShopSetupGuide } from './components/ShopSetupGuide';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';
import { Product, CartItem } from './types';
import { WINNING_PRODUCTS } from './data/mockProducts';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('trending');
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: WINNING_PRODUCTS[0], // initial sample item (USB Blender)
      quantity: 1,
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [initialAdvisorPrompt, setInitialAdvisorPrompt] = useState<string>('');
  const [prefilledSeoProduct, setPrefilledSeoProduct] = useState<string>('');

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleOpenAdvisorWithPrompt = (prompt?: string) => {
    if (prompt) {
      setInitialAdvisorPrompt(prompt);
    }
    setActiveTab('assistant');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGenerateSeoForProduct = (productName: string) => {
    setPrefilledSeoProduct(productName);
    setActiveTab('seo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* 3-Zone Top Bar Contract */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        openCart={() => setIsCartOpen(true)}
      />

      <main className="flex-1">
        {activeTab === 'trending' && (
          <>
            <Hero
              onExplore={() => {
                const el = document.getElementById('trending-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenAdvisor={handleOpenAdvisorWithPrompt}
            />
            <TrendingProducts
              onAddToCart={handleAddToCart}
              onGenerateSeo={handleGenerateSeoForProduct}
              onConsultAi={handleOpenAdvisorWithPrompt}
            />
          </>
        )}

        {activeTab === 'assistant' && (
          <AiAssistant
            initialPrompt={initialAdvisorPrompt}
            onClearInitialPrompt={() => setInitialAdvisorPrompt('')}
            onSelectProductForSeo={handleGenerateSeoForProduct}
          />
        )}

        {activeTab === 'seo' && (
          <SeoStudio
            prefilledProduct={prefilledSeoProduct}
            onClearPrefill={() => setPrefilledSeoProduct('')}
          />
        )}

        {activeTab === 'calculator' && (
          <CodCalculator />
        )}

        {activeTab === 'setup' && (
          <ShopSetupGuide
            onConsultAi={handleOpenAdvisorWithPrompt}
          />
        )}
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Cash on Delivery Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={() => {
          setCartItems([]);
        }}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
