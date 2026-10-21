export interface Product {
  id: string;
  name: string;
  category: 'Kitchen & Home' | 'Tech & Gadgets' | 'Leather & Fashion' | 'Automotive' | 'Beauty & Care';
  sourcingCity: string;
  sourcingHub: string;
  wholesalePrice: number; // in PKR
  retailPrice: number; // in PKR
  demandScore: number; // 1-100
  rating: number;
  reviewsCount: number;
  description: string;
  highlights: string[];
  tags: string[];
  icon: string;
  accentColor: string;
  stockStatus: 'In Stock' | 'Fast Moving' | 'High Demand';
  codAvailable: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'nova';
  text: string;
  timestamp: string;
  categoryTag?: string;
}

export interface CourierInfo {
  id: string;
  name: string;
  baseRatePunjab: number; // for 0.5kg
  baseRateRest: number;
  deliveryTimePunjab: string;
  deliveryTimeRest: string;
  codRemittance: string;
  bestFor: string;
  trackingQuality: 'High' | 'Very High' | 'Moderate';
  ndrSupport: boolean;
}

export interface SeoPackage {
  seoTitle: string;
  metaDescription: string;
  urduEnglishPitch: string;
  bulletPoints: string[];
  keywords: string[];
  faqList: { question: string; answer: string }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CodOrderResult {
  orderId: string;
  trackingNumber: string;
  status: string;
  paymentMethod: string;
  courier: string;
  customer: {
    name: string;
    phone: string;
    address: string;
    city: string;
    province: string;
  };
  estimatedDelivery: string;
  totalAmount: number;
  verificationStep: string;
  supportContact: string;
  parentStudio: string;
}
