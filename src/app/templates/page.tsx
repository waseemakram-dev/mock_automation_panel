'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  Copy, 
  Check, 
  MessageSquare, 
  Mail,
  Loader2,
  Paperclip,
  Image as ImageIcon,
  FileCheck,
  ExternalLink
} from 'lucide-react';
import { NicheType } from '@/lib/types';

export default function TemplatesPage() {
  const [selectedNiche, setSelectedNiche] = useState<NicheType>('ECOMMERCE');
  const [companyName, setCompanyName] = useState('Sapphire E-Store');
  const [contactName, setContactName] = useState('Ahmed Khan');
  const [attachmentUrl, setAttachmentUrl] = useState('https://qwqer.pk/wp-content/uploads/qwqer_assets/images/qwqer-logo.png');
  const [attachmentName, setAttachmentName] = useState('QWQER_Delivery_Partner_Kit.pdf');
  const [loading, setLoading] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<any>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  async function handleGeneratePitch() {
    setLoading(true);
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName,
          contactName,
          niche: selectedNiche,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setGeneratedResult(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  function copyToClipboard(text: string, field: string) {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">Delivery Outreach Templates</h1>
          <p className="text-xs text-[#4B5163] mt-1">
            Generate customized delivery partnership pitches with QWQER branding materials
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Generator & Attachment Controls */}
        <div className="bg-white border border-[#E6E6E6] rounded-xl p-6 space-y-5 shadow-sm">
          <div className="flex items-center gap-2 text-[#00A651] font-bold text-sm">
            <Sparkles className="w-5 h-5" />
            <span>QWQER Outreach Copywriter & Attachments</span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-[#4B5163] font-medium mb-1">Target Niche</label>
              <select
                value={selectedNiche}
                onChange={(e) => setSelectedNiche(e.target.value as NicheType)}
                className="w-full bg-[#F5F7F3] border border-[#E6E6E6] rounded-lg p-3 text-[#1A1A1A]"
              >
                <option value="ECOMMERCE">E-commerce & Online Stores</option>
                <option value="RETAIL">Retail & Physical Stores</option>
                <option value="PHARMA">Pharmacy & Healthcare</option>
                <option value="GROCERIES">Groceries & Essentials</option>
                <option value="GIFTS">Gifts & Special Occasions</option>
                <option value="BAKERY">Bakery & Food</option>
              </select>
            </div>

            <div>
              <label className="block text-[#4B5163] font-medium mb-1">Target Business / Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-[#F5F7F3] border border-[#E6E6E6] rounded-lg p-3 text-[#1A1A1A]"
              />
            </div>

            <div>
              <label className="block text-[#4B5163] font-medium mb-1">Contact Person Name</label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full bg-[#F5F7F3] border border-[#E6E6E6] rounded-lg p-3 text-[#1A1A1A]"
              />
            </div>

            {/* Attachment Input Section */}
            <div className="p-4 rounded-xl bg-[#EEF6F0] border border-[#00A651]/20 space-y-3">
              <div className="flex items-center gap-2 text-[#00A651] font-bold">
                <Paperclip className="w-4 h-4" />
                <span>QWQER Materials / Document / Image Attachment</span>
              </div>
              <div>
                <label className="block text-[#666666] mb-1 text-[11px]">Attachment Direct URL (Image/PDF/Doc)</label>
                <input
                  type="text"
                  value={attachmentUrl}
                  onChange={(e) => setAttachmentUrl(e.target.value)}
                  placeholder="https://qwqer.pk/delivery-kit.pdf"
                  className="w-full bg-white border border-[#E6E6E6] rounded-lg p-2.5 text-[#1A1A1A] font-mono text-[11px]"
                />
              </div>
              <div>
                <label className="block text-[#666666] mb-1 text-[11px]">Attachment Display Name</label>
                <input
                  type="text"
                  value={attachmentName}
                  onChange={(e) => setAttachmentName(e.target.value)}
                  placeholder="QWQER_Delivery_Partner_Kit.pdf"
                  className="w-full bg-white border border-[#E6E6E6] rounded-lg p-2.5 text-[#1A1A1A] text-[11px]"
                />
              </div>
            </div>

            <button
              onClick={handleGeneratePitch}
              disabled={loading}
              className="w-full py-3 rounded-lg bg-[#00A651] text-white font-bold text-xs shadow-lg shadow-[#00A651]/10 hover:bg-[#16A34A] transition flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>Generate AI Delivery Outreach Copy</span>
            </button>
          </div>
        </div>

        {/* Live Preview Cards */}
        <div className="space-y-6">
          {/* WhatsApp Preview with Attachment Badge */}
          <div className="bg-white border border-[#E6E6E6] rounded-xl p-5 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#00A651] font-semibold text-xs">
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Delivery Outreach Copy</span>
              </div>
              {generatedResult?.whatsapp && (
                <button
                  onClick={() => copyToClipboard(generatedResult.whatsapp, 'wa')}
                  className="text-xs text-[#00A651] hover:underline flex items-center gap-1 font-medium"
                >
                  {copiedField === 'wa' ? <Check className="w-3.5 h-3.5 text-[#00A651]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedField === 'wa' ? 'Copied' : 'Copy Text'}</span>
                </button>
              )}
            </div>

            <div className="p-4 rounded-lg bg-[#F5F7F3] border border-[#E6E6E6] text-xs text-[#1A1A1A] leading-relaxed font-sans min-h-[100px] space-y-3">
              <p>{generatedResult?.whatsapp || <span className="text-[#666666] italic">Click "Generate AI Delivery Outreach Copy" to preview WhatsApp pitch.</span>}</p>
              
              {attachmentUrl && (
                <div className="p-2.5 rounded bg-[#00A651]/10 border border-[#00A651]/20 flex items-center justify-between text-[11px] text-[#00A651]">
                  <div className="flex items-center gap-2 font-mono">
                    <FileCheck className="w-4 h-4" />
                    <span className="font-semibold">{attachmentName || 'Attachment'}</span>
                  </div>
                  <a href={attachmentUrl} target="_blank" rel="noreferrer" className="underline flex items-center gap-1">
                    <span>Preview File</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Email Preview with Attachment */}
          <div className="bg-white border border-[#E6E6E6] rounded-xl p-5 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#16A34A] font-semibold text-xs">
                <Mail className="w-4 h-4" />
                <span>Cold Email Subject & Delivery Pitch</span>
              </div>
              {generatedResult?.emailBody && (
                <button
                  onClick={() => copyToClipboard(`${generatedResult.emailSubject}\n\n${generatedResult.emailBody}`, 'email')}
                  className="text-xs text-[#00A651] hover:underline flex items-center gap-1 font-medium"
                >
                  {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-[#00A651]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedField === 'email' ? 'Copied' : 'Copy Email'}</span>
                </button>
              )}
            </div>

            <div className="p-4 rounded-lg bg-[#F5F7F3] border border-[#E6E6E6] text-xs space-y-3 min-h-[140px]">
              {generatedResult?.emailSubject ? (
                <>
                  <div className="border-b border-[#E6E6E6] pb-2 text-[#00A651] font-bold">
                    Subject: {generatedResult.emailSubject}
                  </div>
                  <div className="text-[#1A1A1A] whitespace-pre-wrap leading-relaxed">
                    {generatedResult.emailBody}
                  </div>
                  {attachmentUrl && (
                    <div className="pt-2 border-t border-[#E6E6E6] text-[11px] text-[#16A34A] flex items-center gap-1 font-mono">
                      <Paperclip className="w-3.5 h-3.5" />
                      <span>Attached: {attachmentName}</span>
                    </div>
                  )}
                </>
              ) : (
                <span className="text-[#666666] italic">Click "Generate AI Delivery Outreach Copy" to preview email subject & template.</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
