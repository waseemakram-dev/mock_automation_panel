'use client';

import React, { useState } from 'react';
import { 
  Send, 
  Sparkles, 
  ShieldCheck, 
  Globe2, 
  Check, 
  Clock, 
  MessageSquare, 
  Mail,
  Loader2
} from 'lucide-react';
import { NicheType, CountryType } from '@/lib/types';
import { useRouter } from 'next/navigation';

export default function CampaignWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState('Lahore E-commerce Delivery Drive');
  const [niche, setNiche] = useState<NicheType>('ECOMMERCE');
  const [country, setCountry] = useState<CountryType>('LAHORE');
  const [channel, setChannel] = useState<'WHATSAPP' | 'EMAIL' | 'BOTH'>('BOTH');

  const [dailyLimit, setDailyLimit] = useState(50);
  const [minDelay, setMinDelay] = useState(45);
  const [maxDelay, setMaxDelay] = useState(120);

  const [customPitch, setCustomPitch] = useState('');

  async function handleLaunchCampaign() {
    setLoading(true);
    try {
      const res = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          targetNiche: niche,
          targetCountry: country,
          channel,
          dailyLimit,
          minDelaySeconds: minDelay,
          maxDelaySeconds: maxDelay,
          customPitch,
        }),
      });
      const data = await res.json();
      if (data.success) router.push('/');
    } catch (e) {
      console.error('Campaign creation error', e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 bg-white border border-[#E6E6E6] rounded-xl flex items-center justify-between shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-[#1A1A1A]">Campaign Builder</h1>
          <p className="text-xs text-[#4B5163] mt-1">Create delivery partner outreach campaigns</p>
        </div>
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              step === s ? 'bg-[#00A651] text-white shadow-md shadow-[#00A651]/20'
              : step > s ? 'bg-[#00A651]/10 text-[#00A651] border border-[#00A651]/30'
              : 'bg-[#F5F7F3] text-[#666666] border border-[#E6E6E6]'
            }`}>
              {step > s ? <Check className="w-4 h-4" /> : s}
            </div>
          ))}
        </div>
      </div>

      {step === 1 && (
        <div className="bg-white border border-[#E6E6E6] rounded-xl p-6 space-y-6 shadow-sm">
          <h3 className="text-sm font-bold text-[#00A651] uppercase tracking-wider">Step 1: Target & Channel</h3>
          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-[#4B5163] font-medium mb-1">Campaign Title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-[#F5F7F3] border border-[#E6E6E6] rounded-lg p-3 text-[#1A1A1A]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#4B5163] font-medium mb-1">Target Category</label>
                <select value={niche} onChange={(e) => setNiche(e.target.value as NicheType)} className="w-full bg-[#F5F7F3] border border-[#E6E6E6] rounded-lg p-3 text-[#1A1A1A]">
                  <option value="ECOMMERCE">E-commerce & Online Stores</option>
                  <option value="RETAIL">Retail & Physical Stores</option>
                  <option value="PHARMA">Pharmacy & Healthcare</option>
                  <option value="GROCERIES">Groceries & Essentials</option>
                  <option value="GIFTS">Gifts & Special Occasions</option>
                  <option value="BAKERY">Bakery & Food</option>
                </select>
              </div>
              <div>
                <label className="block text-[#4B5163] font-medium mb-1">Target Area</label>
                <select value={country} onChange={(e) => setCountry(e.target.value as CountryType)} className="w-full bg-[#F5F7F3] border border-[#E6E6E6] rounded-lg p-3 text-[#1A1A1A]">
                  <option value="LAHORE">Lahore</option>
                  <option value="PAKISTAN">All Pakistan</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[#4B5163] font-medium mb-2">Outreach Channel</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'BOTH', label: 'WhatsApp + Email', icon: Sparkles },
                  { id: 'WHATSAPP', label: 'WhatsApp', icon: MessageSquare },
                  { id: 'EMAIL', label: 'Email', icon: Mail },
                ].map((item) => (
                  <button key={item.id} type="button" onClick={() => setChannel(item.id as any)} className={`p-4 rounded-xl border text-center space-y-2 transition ${
                    channel === item.id ? 'bg-[#00A651]/10 border-[#00A651] text-[#00A651] font-bold'
                    : 'bg-[#F5F7F3] border-[#E6E6E6] text-[#666666] hover:border-[#D1D5DB]'
                  }`}>
                    <item.icon className="w-5 h-5 mx-auto" />
                    <p className="text-xs">{item.label}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <button onClick={() => setStep(2)} className="px-6 py-2.5 rounded-lg bg-[#00A651] text-white font-bold text-xs hover:bg-[#16A34A] transition">Continue →</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white border border-[#E6E6E6] rounded-xl p-6 space-y-6 shadow-sm">
          <div className="flex items-center gap-2 text-[#00A651] font-bold text-sm uppercase tracking-wider">
            <ShieldCheck className="w-5 h-5" />
            <span>Step 2: Rate Limiting</span>
          </div>
          <div className="space-y-5 text-xs">
            <div>
              <label className="block text-[#4B5163] font-medium mb-1">Daily Sending Limit</label>
              <input type="number" value={dailyLimit} onChange={(e) => setDailyLimit(Number(e.target.value))} min={10} max={200} className="w-full bg-[#F5F7F3] border border-[#E6E6E6] rounded-lg p-3 text-[#1A1A1A]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[#4B5163] font-medium mb-1">Min Delay (Seconds)</label>
                <input type="number" value={minDelay} onChange={(e) => setMinDelay(Number(e.target.value))} min={30} className="w-full bg-[#F5F7F3] border border-[#E6E6E6] rounded-lg p-3 text-[#1A1A1A]" />
              </div>
              <div>
                <label className="block text-[#4B5163] font-medium mb-1">Max Delay (Seconds)</label>
                <input type="number" value={maxDelay} onChange={(e) => setMaxDelay(Number(e.target.value))} min={60} className="w-full bg-[#F5F7F3] border border-[#E6E6E6] rounded-lg p-3 text-[#1A1A1A]" />
              </div>
            </div>
          </div>
          <div className="flex justify-between pt-4">
            <button onClick={() => setStep(1)} className="px-5 py-2 rounded-lg bg-[#F5F7F3] text-[#666666] text-xs hover:text-[#1A1A1A] border border-[#E6E6E6]">← Back</button>
            <button onClick={() => setStep(3)} className="px-6 py-2.5 rounded-lg bg-[#00A651] text-white font-bold text-xs hover:bg-[#16A34A] transition">Review →</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="bg-white border border-[#E6E6E6] rounded-xl p-6 space-y-6 shadow-sm">
          <h3 className="text-sm font-bold text-[#00A651] uppercase tracking-wider">Step 3: Launch</h3>
          <div className="p-4 rounded-lg bg-[#F5F7F3] border border-[#E6E6E6] space-y-3 text-xs">
            <div className="flex justify-between text-[#4B5163]">
              <span className="text-[#666666]">Title:</span>
              <strong className="text-[#1A1A1A]">{title}</strong>
            </div>
            <div className="flex justify-between text-[#4B5163]">
              <span className="text-[#666666]">Category & Area:</span>
              <strong className="text-[#00A651]">{niche.replace('_', ' ')} • {country}</strong>
            </div>
            <div className="flex justify-between text-[#4B5163]">
              <span className="text-[#666666]">Channel:</span>
              <strong className="text-[#00A651]">{channel}</strong>
            </div>
          </div>
          <div className="flex justify-between pt-4">
            <button onClick={() => setStep(2)} className="px-5 py-2 rounded-lg bg-[#F5F7F3] text-[#666666] text-xs hover:text-[#1A1A1A] border border-[#E6E6E6]">← Back</button>
            <button onClick={handleLaunchCampaign} disabled={loading} className="px-8 py-3 rounded-lg bg-[#00A651] text-white font-bold text-xs shadow-lg shadow-[#00A651]/20 hover:bg-[#16A34A] transition flex items-center gap-2">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              <span>Launch Campaign</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
