import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Copy, Check, RotateCcw, Bot, User, ArrowUpRight } from 'lucide-react';
import { ChatMessage } from '../types';

interface AiAssistantProps {
  initialPrompt?: string;
  onClearInitialPrompt?: () => void;
  onSelectProductForSeo?: (productName: string) => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'nova',
    text: `Assalam-o-Alaikum! Welcome to **Nova Mart** — Powered by **Nisar Studio**.\n\nI am your dedicated Pakistani e-commerce specialist. I can assist you with:\n\n• **Trending & Winning Products**: Sourcing directly from Shah Alam Market (Lahore), Bolton Market (Karachi), Clock Tower (Faisalabad), and Sialkot leather hubs.\n• **Online Shop Setup**: High-converting Shopify 1-page checkout, WooCommerce, and local payment gateways (JazzCash, EasyPaisa, Nayapay, COD).\n• **E-Commerce SEO & Ad Copy**: Generating Roman Urdu & English ad copy that converts Pakistani shoppers on TikTok and Facebook.\n• **Cash on Delivery (COD) Logistics**: Choosing the best couriers (Trax, PostEx, Leopards, TCS) and cutting your return rate (RTO) below 8%.\n\nWhat can we scale in your business today?`,
    timestamp: 'Just now',
    categoryTag: 'Welcome'
  }
];

const SUGGESTIONS = [
  'What are the top 3 products for TikTok ads in Pakistan right now?',
  'Compare Trax vs PostEx vs TCS for COD in Punjab',
  'How do I reduce my COD return rate (RTO) below 8%?',
  'Step-by-step guide to open corporate courier accounts with NTN/CNIC',
  'Generate Roman Urdu ad script for portable smoothie blender'
];

export const AiAssistant: React.FC<AiAssistantProps> = ({
  initialPrompt,
  onClearInitialPrompt,
  onSelectProductForSeo,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      handleSendMessage(initialPrompt);
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const userText = textToSend || input;
    if (!userText.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          history: messages.slice(-6)
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const botMessage: ChatMessage = {
        id: `nova-${Date.now()}`,
        sender: 'nova',
        text: data.reply || 'Assalam-o-Alaikum! How can I assist you with your Pakistan e-commerce store?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const fallbackMessage: ChatMessage = {
        id: `nova-${Date.now()}`,
        sender: 'nova',
        text: `Assalam-o-Alaikum! I am actively optimizing your request. For high-converting e-commerce in Pakistan, we recommend pairing high-margin winning products (from Shah Alam Market Lahore or Bolton Market Karachi) with Trax or PostEx for fast 24-48h COD turnaround across Punjab.\n\nNeed immediate direct assistance? Reach out to Nisar at nisarrsna@gmail.com!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleReset = () => {
    setMessages(INITIAL_MESSAGES);
  };

  // Helper to format text with bold and bullet points cleanly
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split('\n');
    return lines.map((line, idx) => {
      // Check for bullet lines
      const isBullet = line.trim().startsWith('•') || line.trim().startsWith('*') || line.trim().startsWith('-');
      const cleanLine = isBullet ? line.trim().replace(/^[-*•]\s*/, '') : line;

      // Simple bold parsing
      const parts = cleanLine.split(/(\*\*.*?\*\*)/g);
      const renderedParts = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={pIdx} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      if (isBullet) {
        return (
          <li key={idx} className="ml-4 list-disc text-slate-200 my-1 leading-relaxed">
            {renderedParts}
          </li>
        );
      }

      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }

      return (
        <p key={idx} className="text-slate-200 leading-relaxed my-1">
          {renderedParts}
        </p>
      );
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
              Nova Mart AI Advisor
            </h2>
            <span className="text-xs text-slate-500">·</span>
            <span className="text-xs text-emerald-400 font-medium">Powered by Nisar Studio</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Real-time advisory for trending products, e-commerce SEO, and Cash on Delivery logistics in Pakistan.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 transition-colors cursor-pointer"
            title="Start fresh conversation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Chat</span>
          </button>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 sm:p-6 mb-4 min-h-[440px] max-h-[560px] overflow-y-auto flex flex-col gap-5">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-[90%] sm:max-w-[85%] ${
              msg.sender === 'user' ? 'self-end flex-row-reverse' : 'self-start'
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                msg.sender === 'user'
                  ? 'bg-slate-800 text-slate-200'
                  : 'bg-gradient-to-tr from-emerald-600 to-teal-500 text-slate-950 shadow-sm shadow-emerald-500/20'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Message Bubble */}
            <div
              className={`relative group rounded-xl p-4 text-sm ${
                msg.sender === 'user'
                  ? 'bg-emerald-600/90 text-white rounded-tr-none'
                  : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none'
              }`}
            >
              {/* Message metadata */}
              <div className="flex items-center justify-between gap-4 mb-1.5 pb-1 border-b border-white/10 text-[11px] opacity-75">
                <span className="font-semibold">
                  {msg.sender === 'user' ? 'You' : 'Nova Mart Advisor'}
                </span>
                <span>{msg.timestamp}</span>
              </div>

              {/* Content */}
              <div className="text-sm">
                {renderFormattedText(msg.text)}
              </div>

              {/* Copy button for model responses */}
              {msg.sender === 'nova' && (
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500">Based in Punjab, Pakistan</span>
                  <button
                    onClick={() => copyToClipboard(msg.id, msg.text)}
                    className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
                  >
                    {copiedId === msg.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Advice</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 self-start items-center">
            <div className="w-8 h-8 rounded-lg bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-400 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Nova Mart is analyzing Pakistani e-commerce data...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Quick Prompts Carousel */}
      <div className="mb-4">
        <div className="text-xs text-slate-500 mb-2 font-medium">Quick suggestions:</div>
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((sug, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(sug)}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-white transition-all text-left flex items-center gap-1 cursor-pointer"
            >
              <span>{sug}</span>
              <ArrowUpRight className="w-3 h-3 text-slate-500" />
            </button>
          ))}
        </div>
      </div>

      {/* Input Field */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="relative"
      >
        <div className="flex items-center gap-2 p-2 bg-slate-900 border border-slate-800 rounded-xl focus-within:border-emerald-500/60 transition-colors">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about trending products, couriers in Punjab, or SEO in Pakistan..."
            className="flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none"
            disabled={isLoading}
          />

          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-semibold text-xs rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>Ask Nova</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="flex items-center justify-between px-2 pt-2 text-[11px] text-slate-500">
          <span>Nova Mart · Official Support: nisarrsna@gmail.com</span>
          <span>Pro Account Verified</span>
        </div>
      </form>
    </div>
  );
};
