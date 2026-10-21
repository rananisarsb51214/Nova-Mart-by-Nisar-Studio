import { CourierInfo } from '../types';

export const PAKISTAN_COURIERS: CourierInfo[] = [
  {
    id: 'trax',
    name: 'Trax Logistics',
    baseRatePunjab: 195,
    baseRateRest: 240,
    deliveryTimePunjab: '24 - 48 Hours',
    deliveryTimeRest: '48 - 72 Hours',
    codRemittance: '2 - 3 Business Days (Direct Bank Transfer)',
    bestFor: 'E-commerce scaling, active API integration, Shopify app & bulk merchant rates',
    trackingQuality: 'Very High',
    ndrSupport: true,
  },
  {
    id: 'postex',
    name: 'PostEx (Fintech + Logistics)',
    baseRatePunjab: 210,
    baseRateRest: 250,
    deliveryTimePunjab: '24 - 48 Hours',
    deliveryTimeRest: '48 - 72 Hours',
    codRemittance: 'Instant / Next-Day Upfront Financing',
    bestFor: 'Fast cashflow turnaround, instant upfront COD cash on dispatch, modern merchant dashboard',
    trackingQuality: 'Very High',
    ndrSupport: true,
  },
  {
    id: 'leopards',
    name: 'Leopards Courier Service',
    baseRatePunjab: 215,
    baseRateRest: 260,
    deliveryTimePunjab: '24 - 48 Hours',
    deliveryTimeRest: '48 - 72 Hours',
    codRemittance: 'Bi-Weekly (Tuesday & Friday)',
    bestFor: 'Deep penetration in suburban Punjab, Sindh rural tehsils & large warehouse network',
    trackingQuality: 'High',
    ndrSupport: true,
  },
  {
    id: 'tcs',
    name: 'TCS Express (Courier & Logistics)',
    baseRatePunjab: 285,
    baseRateRest: 340,
    deliveryTimePunjab: '24 Hours Priority',
    deliveryTimeRest: '48 Hours',
    codRemittance: 'Weekly Remittance Cycle',
    bestFor: 'Highest consumer trust and brand recognition in Pakistan, luxury parcels, high-value COD',
    trackingQuality: 'Very High',
    ndrSupport: true,
  },
  {
    id: 'callcourier',
    name: 'Call Courier',
    baseRatePunjab: 180,
    baseRateRest: 220,
    deliveryTimePunjab: '24 - 48 Hours',
    deliveryTimeRest: '48 - 72 Hours',
    codRemittance: 'Weekly Remittance Cycle',
    bestFor: 'Budget-friendly rates, high volume Punjab delivery, affordable entry point for beginners',
    trackingQuality: 'High',
    ndrSupport: false,
  },
  {
    id: 'rider',
    name: 'Rider Logistics',
    baseRatePunjab: 190,
    baseRateRest: 235,
    deliveryTimePunjab: '24 - 48 Hours',
    deliveryTimeRest: '48 - 72 Hours',
    codRemittance: '2 - 3 Days',
    bestFor: 'Modern tech-enabled delivery with live courier location link sent to customer via SMS',
    trackingQuality: 'Very High',
    ndrSupport: true,
  }
];

export const COD_RULES_AND_ADVICE = [
  {
    title: 'Pre-Dispatch WhatsApp Verification',
    description: 'Always send an automated or manual WhatsApp message asking the customer to confirm their delivery address and intention to receive before generating the courier manifest. This simple step slashes the return rate from 18% down to 6-8%.',
    impact: '-60% Return Orders (RTO)'
  },
  {
    title: 'Punjab Intra-City 24h Advantage',
    description: 'If you are based in Punjab (Lahore, Faisalabad, Gujranwala, Rawalpindi), negotiate overnight intra-province rates. Customers in Lahore and Islamabad expect 24-hour delivery; fast delivery prevents buyer remorse.',
    impact: '92%+ Delivery Success'
  },
  {
    title: 'Accurate Volumetric Weight Packaging',
    description: 'Couriers charge whichever is higher: Dead weight (kg) or Volumetric weight ((L x W x H in cm) / 5000). Use snug corrugated boxes or poly-mailers. Never ship small items in oversize cardboard boxes.',
    impact: 'Saves Rs. 60 - 150 per parcel'
  },
  {
    title: 'NDR (Non-Delivery Report) Protocol',
    description: 'When a rider marks "Customer Phone Switched Off" or "Address Incomplete", call the customer immediately within 2 hours and coordinate with the courier portal for a re-attempt the next morning.',
    impact: 'Recovers 35% of failed attempts'
  }
];
