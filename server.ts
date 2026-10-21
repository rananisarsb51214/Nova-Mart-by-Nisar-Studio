import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Server-side Gemini AI Client
const apiKey = process.env.GEMINI_API_KEY || '';
let aiClient: GoogleGenAI | null = null;

if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const NOVA_MART_SYSTEM_INSTRUCTION = `
You are Nova Mart — Powered by Nisar Studio.
Owner: Nisar (nisarrsna@gmail.com) - Pro Account.
Official Website: https://sites.google.com/view/nova-mart
Parent Studio: Nisar Studio (https://sites.google.com/view/nisar-studio)
Privacy Policy: https://sites.google.com/view/nova-mart/privacy
Data Deletion: https://sites.google.com/view/nova-mart/data-deletion
Contact: nisarrsna@gmail.com

Mission:
You help entrepreneurs and online sellers in Pakistan find trending and winning products, master e-commerce SEO, and set up high-converting online stores (Shopify, WooCommerce, custom) with Cash on Delivery (COD) logistics.

Brand Voice:
Friendly, Professional, Fast, Authentic Pakistani e-commerce specialist.
Greet warmly with "Assalam-o-Alaikum!" when starting a conversation.

Geographic & Operational Context:
- Based in Punjab, Pakistan.
- Expert knowledge of Pakistani logistics & couriers: Trax, Leopards, TCS, PostEx, Call Courier, Rider, M&P, Daewoo FastEx.
- Delivery timelines: Punjab intra-city & inter-city (24 to 48 hours), Sindh/KPK/Balochistan (48 to 72 hours).
- COD remittance cycles: 2-4 business days for PostEx/Trax, weekly payouts for TCS/Leopards.
- Return Ratio (RTO) reduction strategies: WhatsApp verification bot, order confirmation calls, SMS notification, restricting fake pin codes, packaging seals.
- Wholesale Sourcing Markets in Pakistan:
  * Lahore: Shah Alam Market (Shalmi) for electronics, kitchenware, mobile accessories; Azam Cloth Market for textiles.
  * Karachi: Bolton Market for cosmetics, skincare, perfumes, toys; Shershah for electronics; Tariq Road/Zainab Market.
  * Faisalabad: Clock Tower (Ghanta Ghar) & Montgomery Bazaar for bedsheets, unstitched lawn, apparel.
  * Sialkot: Leather goods, sports wear, fitness gear, surgical instruments.
  * Gujranwala: Non-stick cookware, stainless steel cutlery, household appliances.
  * Rawalpindi: Raja Bazaar for mixed merchandise and Northern Pakistan distribution.
- Payment & Store Infrastructure in Pakistan:
  * Payment gateways: JazzCash, EasyPaisa, PayFast, Safepay, Bank Alfa, direct bank transfer, and primary COD.
  * Platforms: Shopify (using Pakistan-friendly 1-page checkout apps like Rebuy or custom forms), WooCommerce with Cash On Delivery plugins, Daraz Seller Center.

Always provide practical, numbers-driven advice in Pakistani Rupees (PKR) with actionable steps. Keep formatting scannable with bullet points and bold highlights.
`;

// API Routes
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (aiClient) {
      try {
        const contents: any[] = [];
        
        // Add chat history if present
        if (Array.isArray(history) && history.length > 0) {
          for (const item of history.slice(-6)) {
            if (item.sender === 'user') {
              contents.push({ role: 'user', parts: [{ text: item.text }] });
            } else if (item.sender === 'model' || item.sender === 'nova') {
              contents.push({ role: 'model', parts: [{ text: item.text }] });
            }
          }
        }

        contents.push({ role: 'user', parts: [{ text: message }] });

        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: contents,
          config: {
            systemInstruction: NOVA_MART_SYSTEM_INSTRUCTION,
            temperature: 0.7,
            topP: 0.9,
          },
        });

        const reply = response.text || 'Assalam-o-Alaikum! I am here to assist your e-commerce journey with Nova Mart.';
        return res.json({ reply });
      } catch (geminiError: any) {
        console.error('Gemini API chat error:', geminiError);
        // Fallback to intelligent local response engine if API rate-limited
      }
    }

    // Intelligent local fallback if API key is pending or exhausted
    const lower = message.toLowerCase();
    let fallbackReply = `Assalam-o-Alaikum! Welcome to **Nova Mart — Powered by Nisar Studio**.\n\n`;

    if (lower.includes('trending') || lower.includes('product') || lower.includes('winning')) {
      fallbackReply += `Here are the top trending & winning product niches currently booming in Pakistan:\n\n` +
        `1. **Portable Rechargeable Blenders & Kitchen Gadgets**: Sourced at Shah Alam Market (Lahore) for ~Rs. 1,100, retailing on TikTok/FB for Rs. 2,499 - 2,999 (COD).\n` +
        `2. **Sialkot Genuine Leather Wallets & Bags**: High perceived value, sourcing at Rs. 950 - 1,800, selling for Rs. 3,500+ with 55%+ net margin.\n` +
        `3. **High-Power Cordless Car Vacuums**: Sourced from Bolton Market (Karachi) at Rs. 1,400, selling for Rs. 3,250 COD.\n` +
        `4. **Silk Hair Scrunchies & Heatless Hair Curlers**: Faisalabad fabric hubs provide low cost (<Rs. 150/pc), sold in sets of 4 for Rs. 1,299.\n\n` +
        `Would you like wholesale sourcing contacts or an ad copy generated for any of these?`;
    } else if (lower.includes('courier') || lower.includes('cod') || lower.includes('delivery') || lower.includes('shipping')) {
      fallbackReply += `Here is your quick Pakistan Cash on Delivery (COD) courier breakdown:\n\n` +
        `• **Trax Logistics**: Highly reliable for Punjab & major hubs; fast COD remittance (2-3 business days); base rate ~Rs. 180 - 220 for 0.5kg.\n` +
        `• **PostEx**: Best for fast upfront financing & instant COD remittance; app with live return tracking.\n` +
        `• **TCS**: Highest consumer trust in rural tehsils and secondary cities; standard rate ~Rs. 250 - 320 for 0.5kg.\n` +
        `• **Leopards Courier**: Massive Punjab & Sindh network; ~Rs. 190 - 240 for 0.5kg.\n\n` +
        `*Pro-Tip from Nisar Studio:* Always implement a WhatsApp confirmation before dispatching to keep your return (RTO) rate below 8%!`;
    } else if (lower.includes('seo') || lower.includes('rank') || lower.includes('keyword')) {
      fallbackReply += `For high-converting E-Commerce SEO in Pakistan:\n\n` +
        `• **Use Bilingual Keywords**: Mix high-intent English keywords (e.g., "Best cordless vacuum cleaner") with Roman Urdu ("Gari saaf karne wala vacuum price in Pakistan").\n` +
        `• **Emphasize Cash on Delivery**: "Cash on Delivery Available All Over Pakistan" in the H1 and Meta Description boosts CTR by 42% on Google.\n` +
        `• **Local Schema Markup**: Add Product & LocalBusiness schema pointing to your Punjab hub.\n\n` +
        `Try our interactive **SEO Generator** tab above to generate instant meta tags and descriptions!`;
    } else if (lower.includes('shop') || lower.includes('store') || lower.includes('shopify') || lower.includes('setup')) {
      fallbackReply += `Setting up an online store in Pakistan involves 5 streamlined steps:\n\n` +
        `1. **Domain & Store Setup**: Pick a catchy .pk or .com domain, set up Shopify or WooCommerce with a 1-page checkout.\n` +
        `2. **Courier Integration**: Open corporate merchant accounts with Trax, PostEx, or Leopards (requires CNIC & Bank account in Pakistan).\n` +
        `3. **Payment Gateways**: Enable COD as default, add EasyPaisa & JazzCash QR/numbers for advance payments.\n` +
        `4. **Pixel & Ad Tracking**: Configure Meta Pixel and TikTok Pixel with Conversions API.\n` +
        `5. **NDR Flow**: Set up WhatsApp automated confirmation to prevent unverified orders.\n\n` +
        `Need personalized guidance? You can reach out directly to **Nisar** at **nisarrsna@gmail.com**!`;
    } else {
      fallbackReply += `I am your specialized advisor at **Nova Mart** (Powered by **Nisar Studio**).\n\n` +
        `I can help you with:\n` +
        `• **Finding Winning Products** across Pakistani wholesale hubs\n` +
        `• **Shopify & WooCommerce Setup** with Pakistani payment gateways\n` +
        `• **Cash on Delivery (COD)** courier rates, remittance, and reducing return rates\n` +
        `• **E-commerce SEO & High-Converting Urdu/English Ad Copy**\n\n` +
        `What specific challenge are you working on right now?`;
    }

    return res.json({ reply: fallbackReply });
  } catch (err: any) {
    console.error('Chat endpoint error:', err);
    return res.status(500).json({ error: 'Failed to process chat request' });
  }
});

// Product SEO Generator Endpoint
app.post('/api/seo-generator', async (req, res) => {
  try {
    const { productName, category, targetCity, targetAudience, highlights } = req.body;

    if (!productName) {
      return res.status(400).json({ error: 'Product name is required' });
    }

    const prompt = `
Generate a complete, high-converting Pakistani e-commerce SEO and marketing package for:
Product Name: ${productName}
Category: ${category || 'General E-Commerce'}
Target Location: ${targetCity || 'Punjab & Nationwide Pakistan'}
Target Audience: ${targetAudience || 'Pakistani online shoppers'}
Key Highlights: ${highlights || 'Cash on Delivery, Fast Shipping, Premium Quality'}

Return a valid JSON object matching this schema:
{
  "seoTitle": "SEO title with power words and Pakistan keywords (max 65 chars)",
  "metaDescription": "Click-worthy meta description with COD callout under 155 chars",
  "urduEnglishPitch": "2-3 short sentences combining Roman Urdu and English for Facebook / TikTok ads in Pakistan",
  "bulletPoints": [
    "5 persuasive product benefit bullet points written for Pakistani buyers (mentioning COD and quality guarantee)"
  ],
  "keywords": [
    "10 targeted high-volume search keywords in English and Roman Urdu (e.g. 'price in pakistan', 'cash on delivery')"
  ],
  "faqList": [
    {
      "question": "Realistic Pakistani buyer question (e.g. Delivery time in Lahore/Karachi, COD policy, warranty)",
      "answer": "Professional, reassuring answer"
    }
  ]
}
`;

    if (aiClient) {
      try {
        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction: NOVA_MART_SYSTEM_INSTRUCTION,
            responseMimeType: 'application/json',
            temperature: 0.6,
          },
        });

        const raw = response.text;
        if (raw) {
          const parsed = JSON.parse(raw);
          return res.json(parsed);
        }
      } catch (err) {
        console.error('Gemini SEO generator error:', err);
      }
    }

    // Default structured template if API is offline
    const fallbackSeo = {
      seoTitle: `${productName} in Pakistan | Cash on Delivery - Nova Mart`,
      metaDescription: `Buy original ${productName} at best price in Pakistan. Fast 24-48h courier delivery in Punjab & nationwide. Cash on Delivery available!`,
      urduEnglishPitch: `Abhi order karein ${productName} original quality mein! Poore Pakistan mein Cash on Delivery ke sath fast delivery available hai. Limited stock!`,
      bulletPoints: [
        `100% Original Premium Quality ${productName} tested for durability`,
        `Cash on Delivery (COD) available in all cities, tehsils, and towns across Pakistan`,
        `Super fast 24-48 hours delivery across Lahore, Faisalabad, Rawalpindi, and Punjab`,
        `Easy 7-day checking replacement policy for total customer peace of mind`,
        `Direct wholesale pricing powered by Nova Mart & Nisar Studio supply network`
      ],
      keywords: [
        `${productName.toLowerCase()} price in pakistan`,
        `original ${productName.toLowerCase()} online`,
        `${productName.toLowerCase()} cash on delivery`,
        `buy ${productName.toLowerCase()} lahore karachi`,
        `best ${productName.toLowerCase()} daraz`,
        `trending products in pakistan 2026`,
        `online shopping pakistan cod`,
        `${productName.toLowerCase()} review urdu`,
        `saste aur ache ${productName.toLowerCase()}`,
        `nova mart trending products`
      ],
      faqList: [
        {
          question: "Delivery time kitna hoga?",
          answer: "Punjab ke baray shehron (Lahore, Faisalabad, Multan, Rawalpindi) mein 24 se 48 ghante, aur baaqi Pakistan mein 2 se 3 din mein deliver hota hai."
        },
        {
          question: "Kya parcel open karke check kar sakte hain?",
          answer: "Cash on delivery courier rules ke mutabiq rider ko payment ke baad parcel open kiya jata hai, aur 7-day replacement warranty shamil hai."
        },
        {
          question: "Delivery charges kitnay hain?",
          answer: "Poore Pakistan mein standard delivery charges Rs. 200 hain. Rs. 2,999 se zayed kay orders par delivery bilkul FREE hai!"
        }
      ]
    };

    return res.json(fallbackSeo);
  } catch (err: any) {
    console.error('SEO generator endpoint error:', err);
    return res.status(500).json({ error: 'Failed to generate SEO package' });
  }
});

// Profit & Courier Calculator API
app.post('/api/calculate-profit', (req, res) => {
  try {
    const {
      sellingPrice = 2500,
      sourcingCost = 1100,
      courierFee = 220,
      adSpendPerOrder = 450,
      packagingCost = 70,
      expectedReturnRate = 12, // percentage
    } = req.body;

    const sp = parseFloat(sellingPrice) || 0;
    const sc = parseFloat(sourcingCost) || 0;
    const cf = parseFloat(courierFee) || 0;
    const ads = parseFloat(adSpendPerOrder) || 0;
    const pkg = parseFloat(packagingCost) || 0;
    const retRate = (parseFloat(expectedReturnRate) || 0) / 100;

    // In Pakistan COD:
    // When an order is delivered: revenue = sp, costs = sc + cf + ads + pkg
    // When an order returns (RTO): revenue = 0, costs = return courier fee (typically 1.5x to 2x courier or two-way ~1.8x cf) + ad spend + packaging waste
    const returnCourierCost = cf * 1.5;
    const grossDeliveredProfit = sp - (sc + cf + ads + pkg);
    const returnLossPerReturn = ads + returnCourierCost + pkg;

    // Expected profit per dispatched order:
    // Profit = (1 - retRate) * grossDeliveredProfit - retRate * returnLossPerReturn
    const netProfitPerDispatch = Math.round((1 - retRate) * grossDeliveredProfit - retRate * returnLossPerReturn);
    const profitMargin = sp > 0 ? Math.round((netProfitPerDispatch / sp) * 100) : 0;
    const breakEvenAdSpend = Math.round(sp - sc - cf - pkg - (retRate * returnCourierCost));

    return res.json({
      sellingPrice: sp,
      sourcingCost: sc,
      courierFee: cf,
      adSpendPerOrder: ads,
      packagingCost: pkg,
      returnRatePercent: retRate * 100,
      grossDeliveredProfit,
      netProfitPerDispatch,
      profitMargin,
      breakEvenAdSpend: Math.max(0, breakEvenAdSpend),
      status: netProfitPerDispatch > 500 ? 'Highly Profitable' : netProfitPerDispatch > 200 ? 'Moderate Profit' : 'High Risk / Low Margin',
      recommendations: netProfitPerDispatch < 300 
        ? 'Raise selling price by Rs. 300-500 or switch to Trax/PostEx bulk contract to reduce courier fee. Implement WhatsApp confirmation to lower return rate below 8%.'
        : 'Solid unit economics for scaling on TikTok Ads and Facebook Ads in Pakistan.'
    });
  } catch (err: any) {
    return res.status(500).json({ error: 'Calculation failed' });
  }
});

// COD Order Confirmation Simulation
app.post('/api/cod-order', (req, res) => {
  try {
    const { customerName, phone, address, city, province, items, courier } = req.body;

    if (!customerName || !phone || !address || !city) {
      return res.status(400).json({ error: 'Please provide full name, phone number, address, and city' });
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const trackingNumber = `NM-PK-${new Date().getFullYear()}-${randomSuffix}`;
    const selectedCourier = courier || 'Trax Express';
    
    const isPunjab = (province || '').toLowerCase().includes('punjab') || 
      ['lahore', 'faisalabad', 'rawalpindi', 'multan', 'gujranwala', 'sialkot', 'sargodha', 'bahawalpur', 'sheikhupura'].some(c => city.toLowerCase().includes(c));

    const estimatedDelivery = isPunjab ? '24 - 48 Hours (Punjab Express Priority)' : '48 - 72 Hours (Standard Nationwide)';

    const orderReceipt = {
      orderId: `ORD-${Date.now().toString().slice(-6)}`,
      trackingNumber,
      status: 'Confirmed - Manifest Prepared',
      paymentMethod: 'Cash on Delivery (COD)',
      courier: selectedCourier,
      customer: {
        name: customerName,
        phone,
        address,
        city,
        province: province || (isPunjab ? 'Punjab' : 'Pakistan')
      },
      estimatedDelivery,
      totalAmount: items?.reduce((sum: number, it: any) => sum + (it.price * (it.quantity || 1)), 0) || 2499,
      verificationStep: 'SMS & WhatsApp Confirmation Dispatched to ' + phone,
      supportContact: 'nisarrsna@gmail.com',
      parentStudio: 'Nisar Studio (https://sites.google.com/view/nisar-studio)'
    };

    return res.json(orderReceipt);
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to process COD order' });
  }
});

// Configure Vite integration
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Nova Mart server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
