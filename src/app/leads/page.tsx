'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  Search, 
  Upload, 
  Sparkles, 
  Filter, 
  Loader2,
  X,
  FileSpreadsheet,
  MessageSquare,
  Zap,
  ExternalLink
} from 'lucide-react';
import { Lead, NicheType } from '@/lib/types';
import Papa from 'papaparse';

export default function LeadHub() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [showScraperModal, setShowScraperModal] = useState(false);
  const [showCsvModal, setShowCsvModal] = useState(false);
  const [selectedNiche, setSelectedNiche] = useState<string>('ALL');
  const [outreachLoadingId, setOutreachLoadingId] = useState<string | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      if (data.success) setLeads(data.data);
    } catch (e) {
      console.error('Failed to fetch leads', e);
    } finally {
      setLoading(false);
    }
  }

  async function handleAutomatedOutreach(lead: Lead) {
    setOutreachLoadingId(lead.id || lead.companyName);
    try {
      const aiRes = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: lead.companyName,
          contactName: lead.name,
          niche: lead.niche,
        }),
      });
      const aiData = await aiRes.json();
      if (aiData.success && aiData.data?.whatsapp) {
        const targetPhone = lead.phone.replace(/[^0-9]/g, '');
        const redirectUrl = `/whatsapp?phone=${encodeURIComponent(targetPhone)}&msg=${encodeURIComponent(aiData.data.whatsapp)}`;
        router.push(redirectUrl);
      }
    } catch (e) {
      console.error('Outreach generation error:', e);
    } finally {
      setOutreachLoadingId(null);
    }
  }

  const filteredLeads = leads.filter(l => {
    const matchesNiche = selectedNiche === 'ALL' || l.niche === selectedNiche;
    return matchesNiche;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#E6E6E6] rounded-2xl p-6 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">Business Partners</h1>
          <p className="text-xs text-[#4B5163] mt-1">
            Manage delivery partners and business contacts
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setShowCsvModal(true)} className="px-3.5 py-2 rounded-xl bg-[#F5F7F3] hover:bg-[#EEF6F0] text-[#1A1A1A] border border-[#E6E6E6] text-xs font-semibold flex items-center gap-2 transition">
            <Upload className="w-3.5 h-3.5 text-[#00A651]" />
            <span>Upload CSV</span>
          </button>
          <button onClick={() => setShowScraperModal(true)} className="px-4 py-2 rounded-xl bg-[#00A651] hover:bg-[#16A34A] text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-[#00A651]/20 transition">
            <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Add Partner</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6E6E6] pb-3">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <span className="text-xs font-bold text-[#4B5163] mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3 text-[#00A651]" /> Filter:
          </span>
          {['ALL', 'ECOMMERCE', 'RETAIL', 'PHARMA', 'GROCERIES', 'GIFTS', 'BAKERY'].map((n) => (
            <button key={n} onClick={() => setSelectedNiche(n)} className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              selectedNiche === n ? 'bg-[#00A651]/10 text-[#00A651] border border-[#00A651]/30'
              : 'bg-[#F5F7F3] text-[#4B5163] hover:text-[#1A1A1A]'
            }`}>
              {n === 'ALL' ? 'All' : n.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E6E6E6] rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#4B5163]">
            <thead className="bg-[#F5F7F3] text-[#1A1A1A] border-b border-[#E6E6E6] font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Business Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6E6E6]">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-[#4B5163]">No partners found.</td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-[#F5F7F3] transition">
                    <td className="p-4">
                      <div className="font-bold text-[#1A1A1A] text-sm">{lead.companyName}</div>
                      <div className="text-[#666666] text-[11px] font-medium">{lead.name}</div>
                      {lead.website && (
                        <a href={lead.website} target="_blank" rel="noreferrer" className="text-[11px] text-[#00A651] underline font-mono flex items-center gap-1 mt-0.5">
                          <span>{lead.website}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#EEF6F0] text-[#00A651] border border-[#00A651]/20">
                        {lead.niche.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="text-[#1A1A1A] font-bold">{lead.phone || 'N/A'}</div>
                      <div className="text-[#666666] text-[11px]">{lead.email}</div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#00A651]/10 text-[#00A651] border border-[#00A651]/20">
                        {lead.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleAutomatedOutreach(lead)}
                        disabled={outreachLoadingId === lead.id || outreachLoadingId === lead.companyName}
                        className="px-4 py-2 rounded-xl bg-[#00A651] hover:bg-[#16A34A] text-white font-black text-xs shadow-md shadow-[#00A651]/20 flex items-center gap-1.5 transition disabled:opacity-50"
                      >
                        {outreachLoadingId === lead.id || outreachLoadingId === lead.companyName ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                        ) : (
                          <Zap className="w-3.5 h-3.5 fill-white stroke-white" />
                        )}
                        <span>Contact</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {showScraperModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#E6E6E6] rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-xl relative">
            <button onClick={() => setShowScraperModal(false)} className="absolute top-4 right-4 text-[#666666] hover:text-[#1A1A1A]">
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-[#00A651] font-bold">
              <Sparkles className="w-5 h-5" />
              <h3 className="text-lg text-[#1A1A1A] font-bold">Add Business Partner</h3>
            </div>
            <p className="text-xs text-[#4B5163]">Demo mode - partner will be added to the list.</p>
            <button onClick={() => setShowScraperModal(false)} className="w-full py-3 rounded-xl bg-[#00A651] text-white font-black text-sm hover:bg-[#16A34A] transition">
              Add Partner
            </button>
          </div>
        </div>
      )}

      {showCsvModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#E6E6E6] rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl relative">
            <button onClick={() => setShowCsvModal(false)} className="absolute top-4 right-4 text-[#666666] hover:text-[#1A1A1A]">
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-[#00A651] font-bold">
              <FileSpreadsheet className="w-5 h-5" />
              <h3 className="text-lg text-[#1A1A1A] font-bold">Import CSV</h3>
            </div>
            <div className="border-2 border-dashed border-[#D1D5DB] rounded-xl p-6 text-center space-y-3 bg-[#F5F7F3]">
              <Upload className="w-8 h-8 text-[#00A651] mx-auto" />
              <p className="text-xs text-[#4B5163] font-bold">Click to select CSV file</p>
            </div>
            <button onClick={() => setShowCsvModal(false)} className="w-full py-2.5 rounded-xl bg-[#00A651] text-white font-black text-xs">
              Import Partners
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
