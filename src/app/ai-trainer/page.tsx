'use client';

import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  Sparkles, 
  Save, 
  Sliders, 
  BrainCircuit, 
  CheckCircle2, 
  Loader2, 
  ShieldCheck,
  FileCode,
  Package
} from 'lucide-react';

export default function AiTrainerPage() {
  const [model] = useState('gpt-4o');
  const [name, setName] = useState('QWQER Pakistan');
  const [role, setRole] = useState('Delivery & Logistics Solutions Specialist');
  const [experience, setExperience] = useState('3+ years helping businesses in Lahore with instant, same-day, and bulk delivery services');
  const [offers, setOffers] = useState('Instant Delivery, Same-Day Delivery, Next-Day Delivery, Bulk Order Processing, Live Tracking, Rider Coordination');
  const [tone, setTone] = useState('Professional, Reliable, Customer-Focused, Efficient');
  const [caseStudies, setCaseStudies] = useState('Partnered with Sapphire for 200+ daily deliveries with 99.2% on-time rate. Scaled Cozmetica beauty deliveries to 80+ orders daily.');
  const [objections, setObjections] = useState('For "Too expensive": We offer competitive rates starting from PKR 99 with bulk discounts. For "Already have a courier": Free trial period to compare our service quality and speed.');
  const [customKnowledge, setCustomKnowledge] = useState('QWQER Pakistan serves ecommerce, retail, pharma, grocery, and gift businesses in Lahore. Key features: instant delivery, live tracking, bulk uploads, dedicated rider coordination.');

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [testCompany, setTestCompany] = useState('Sapphire Textiles');
  const [testNiche, setTestNiche] = useState('ECOMMERCE');
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);

  useEffect(() => {
    fetchPersona();
  }, []);

  async function fetchPersona() {
    try {
      const res = await fetch('/api/ai/persona');
      const data = await res.json();
      if (data.success && data.data) {
        const p = data.data;
        if (p.name) setName(p.name);
        if (p.role) setRole(p.role);
        if (p.experience) setExperience(p.experience);
        if (p.offers) setOffers(p.offers);
        if (p.tone) setTone(p.tone);
        if (p.caseStudies) setCaseStudies(p.caseStudies);
        if (p.objections) setObjections(p.objections);
        if (p.customKnowledge) setCustomKnowledge(p.customKnowledge);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function handleSavePersona(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/ai/persona', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, role, experience, offers, tone, caseStudies, objections, customKnowledge, selectedModel: model }),
      });
      const data = await res.json();
      if (data.success) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  }

  async function handleTestGpt4o() {
    setTesting(true);
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyName: testCompany, contactName: 'Business Owner', niche: testNiche }),
      });
      const data = await res.json();
      if (data.success) setTestResult(data.data);
    } catch (e) {
      console.error(e);
    } finally {
      setTesting(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#00A651] font-bold text-xs uppercase tracking-wider mb-1">
            <BrainCircuit className="w-4 h-4" />
            <span>Delivery AI Training Studio</span>
          </div>
          <h1 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">AI Persona & Response Training</h1>
          <p className="text-xs text-[#4B5163] mt-1">Configure your AI delivery assistant persona and response guidelines</p>
        </div>

        {savedSuccess && (
          <div className="px-4 py-2 rounded-lg bg-[#00A651]/10 border border-[#00A651]/30 text-[#00A651] text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Persona Saved Successfully</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <form onSubmit={handleSavePersona} className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-[#E6E6E6] rounded-xl p-5 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#00A651]/10 text-[#00A651] border border-[#00A651]/20">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-[#1A1A1A] text-xs">AI Model Active</h4>
                <p className="text-[11px] text-[#666666]">GPT-4o for delivery assistant intelligence</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#00A651]/10 text-[#00A651] text-xs font-bold border border-[#00A651]/30">GPT-4o Active</span>
          </div>

          <div className="bg-white border border-[#E6E6E6] rounded-xl p-6 space-y-4 text-xs shadow-sm">
            <h3 className="text-sm font-bold text-[#1A1A1A] flex items-center gap-2">
              <FileCode className="w-4 h-4 text-[#00A651]" />
              <span>Master System Prompt</span>
            </h3>
            <div>
              <label className="block text-[#4B5163] font-medium mb-1">Detailed Instructions:</label>
              <textarea value={customKnowledge} onChange={(e) => setCustomKnowledge(e.target.value)} rows={5} className="w-full bg-[#F5F7F3] border border-[#E6E6E6] rounded-lg p-3 text-[#1A1A1A] leading-relaxed font-sans" />
            </div>
          </div>

          <div className="bg-white border border-[#E6E6E6] rounded-xl p-6 space-y-4 text-xs shadow-sm">
            <h3 className="text-sm font-bold text-[#1A1A1A] flex items-center gap-2">
              <Bot className="w-4 h-4 text-[#00A651]" />
              <span>Persona Profile</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#4B5163] font-medium mb-1">Company Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-[#F5F7F3] border border-[#E6E6E6] rounded-lg p-3 text-[#1A1A1A]" />
              </div>
              <div>
                <label className="block text-[#4B5163] font-medium mb-1">Role / Title</label>
                <input type="text" value={role} onChange={(e) => setRole(e.target.value)} className="w-full bg-[#F5F7F3] border border-[#E6E6E6] rounded-lg p-3 text-[#1A1A1A]" />
              </div>
            </div>
            <div>
              <label className="block text-[#4B5163] font-medium mb-1">Experience</label>
              <textarea value={experience} onChange={(e) => setExperience(e.target.value)} rows={2} className="w-full bg-[#F5F7F3] border border-[#E6E6E6] rounded-lg p-3 text-[#1A1A1A]" />
            </div>
          </div>

          <div className="bg-white border border-[#E6E6E6] rounded-xl p-6 space-y-4 text-xs shadow-sm">
            <h3 className="text-sm font-bold text-[#1A1A1A] flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#00A651]" />
              <span>Services & Tone</span>
            </h3>
            <div>
              <label className="block text-[#4B5163] font-medium mb-1">Core Services</label>
              <textarea value={offers} onChange={(e) => setOffers(e.target.value)} rows={2} className="w-full bg-[#F5F7F3] border border-[#E6E6E6] rounded-lg p-3 text-[#1A1A1A]" />
            </div>
            <div>
              <label className="block text-[#4B5163] font-medium mb-1">Tone of Voice</label>
              <input type="text" value={tone} onChange={(e) => setTone(e.target.value)} className="w-full bg-[#F5F7F3] border border-[#E6E6E6] rounded-lg p-3 text-[#1A1A1A]" />
            </div>
          </div>

          <div className="bg-white border border-[#E6E6E6] rounded-xl p-6 space-y-4 text-xs shadow-sm">
            <h3 className="text-sm font-bold text-[#1A1A1A] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#00A651]" />
              <span>Social Proof & Objections</span>
            </h3>
            <div>
              <label className="block text-[#4B5163] font-medium mb-1">Case Studies</label>
              <textarea value={caseStudies} onChange={(e) => setCaseStudies(e.target.value)} rows={2} className="w-full bg-[#F5F7F3] border border-[#E6E6E6] rounded-lg p-3 text-[#1A1A1A]" />
            </div>
            <div>
              <label className="block text-[#4B5163] font-medium mb-1">Objection Handling</label>
              <textarea value={objections} onChange={(e) => setObjections(e.target.value)} rows={3} className="w-full bg-[#F5F7F3] border border-[#E6E6E6] rounded-lg p-3 text-[#1A1A1A]" />
            </div>
          </div>

          <button type="submit" disabled={saving} className="w-full py-3.5 rounded-lg bg-[#00A651] text-white font-bold text-xs shadow-lg shadow-[#00A651]/20 hover:bg-[#16A34A] transition flex items-center justify-center gap-2">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save AI Persona</span>
          </button>
        </form>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-[#E6E6E6] rounded-xl p-5 space-y-4 text-xs shadow-sm">
            <div className="flex items-center gap-2 text-[#00A651] font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Test AI Response</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[#4B5163] font-medium mb-1">Test Business Name</label>
                <input type="text" value={testCompany} onChange={(e) => setTestCompany(e.target.value)} className="w-full bg-[#F5F7F3] border border-[#E6E6E6] rounded-lg p-2.5 text-[#1A1A1A]" />
              </div>
              <div>
                <label className="block text-[#4B5163] font-medium mb-1">Test Category</label>
                <select value={testNiche} onChange={(e) => setTestNiche(e.target.value)} className="w-full bg-[#F5F7F3] border border-[#E6E6E6] rounded-lg p-2.5 text-[#1A1A1A]">
                  <option value="ECOMMERCE">E-commerce</option>
                  <option value="RETAIL">Retail</option>
                  <option value="PHARMA">Pharmacy</option>
                  <option value="GROCERIES">Groceries</option>
                  <option value="GIFTS">Gifts</option>
                </select>
              </div>
              <button type="button" onClick={handleTestGpt4o} disabled={testing} className="w-full py-2.5 rounded-lg bg-[#EEF6F0] hover:bg-[#E1F5EE] text-[#1A1A1A] font-bold border border-[#E6E6E6] flex items-center justify-center gap-2 transition">
                {testing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Bot className="w-4 h-4 text-[#00A651]" />}
                <span>Test AI Output</span>
              </button>
            </div>

            {testResult && (
              <div className="space-y-3 pt-3 border-t border-[#E6E6E6]">
                <div className="p-3 bg-[#F5F7F3] rounded-lg border border-[#E6E6E6] space-y-1">
                  <span className="text-[#00A651] font-bold text-[10px]">WhatsApp Response:</span>
                  <p className="text-[#1A1A1A] leading-relaxed text-[11px] font-sans">{testResult.whatsapp}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
