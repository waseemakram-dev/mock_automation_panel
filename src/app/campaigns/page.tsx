'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Send, 
  Plus, 
  Play, 
  Pause, 
  CheckCircle, 
  Clock, 
  Globe2, 
  ArrowUpRight,
  ShieldCheck,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { Campaign } from '@/lib/types';

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  async function fetchCampaigns() {
    try {
      const res = await fetch('/api/campaigns');
      const data = await res.json();
      if (data.success) setCampaigns(data.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleCampaignStatus(camp: Campaign) {
    const newStatus = camp.status === 'RUNNING' ? 'PAUSED' : 'RUNNING';
    try {
      await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...camp, status: newStatus }),
      });
      fetchCampaigns();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">Delivery Campaigns</h1>
          <p className="text-xs text-[#4B5163] mt-1">Manage delivery outreach and partner onboarding campaigns</p>
        </div>

        <Link href="/campaigns/new" className="px-5 py-2.5 rounded-lg bg-[#00A651] hover:bg-[#16A34A] text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-[#00A651]/10 transition">
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>New Campaign</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {campaigns.map((camp) => {
          const progressPercent = Math.round((camp.stats.sentCount / (camp.stats.totalLeads || 1)) * 100);
          const replyRate = camp.stats.sentCount > 0 ? Math.round((camp.stats.replyCount / camp.stats.sentCount) * 100) : 0;
          const isRunning = camp.status === 'RUNNING';

          return (
            <div key={camp.id} className="bg-white border border-[#E6E6E6] rounded-xl p-6 space-y-6 shadow-sm hover:border-[#00A651]/30 transition">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#00A651]/10 text-[#00A651] border border-[#00A651]/20">
                      {camp.targetCountry === 'LAHORE' ? 'Lahore' : 'Pakistan'}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#F5F7F3] text-[#4B5163] border border-[#E6E6E6]">
                      {camp.targetNiche.replace('_', ' ')}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#1A1A1A]">{camp.title}</h3>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                    isRunning 
                      ? 'bg-[#00A651]/10 text-[#00A651] border-[#00A651]/30 animate-pulse'
                      : camp.status === 'COMPLETED'
                      ? 'bg-[#16A34A]/10 text-[#16A34A] border-[#16A34A]/30'
                      : 'bg-[#CC3366]/10 text-[#CC3366] border-[#CC3366]/30'
                  }`}>
                    {camp.status}
                  </span>

                  <button onClick={() => handleToggleCampaignStatus(camp)} className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                    isRunning
                      ? 'bg-[#CC3366]/10 text-[#CC3366] border border-[#CC3366]/30 hover:bg-[#CC3366]/20'
                      : 'bg-[#00A651]/10 text-[#00A651] border border-[#00A651]/30 hover:bg-[#00A651]/20'
                  }`}>
                    {isRunning ? (
                      <>
                        <Pause className="w-3.5 h-3.5 fill-[#CC3366]" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-[#00A651]" />
                        <span>Start</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-[#4B5163] font-mono">
                  <span>Progress: {camp.stats.sentCount} / {camp.stats.totalLeads} Orders</span>
                  <span className="text-[#00A651] font-bold">{progressPercent}%</span>
                </div>
                <div className="h-2.5 w-full bg-[#E6E6E6] rounded-full overflow-hidden p-0.5">
                  <div className="h-full bg-gradient-to-r from-[#00A651] to-[#16A34A] rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-b border-[#E6E6E6] py-4 text-xs">
                <div>
                  <span className="text-[#666666] block text-[11px]">Channel</span>
                  <strong className="text-[#1A1A1A] font-semibold">{camp.channel}</strong>
                </div>
                <div>
                  <span className="text-[#666666] block text-[11px]">Delay Range</span>
                  <strong className="text-[#00A651] font-semibold">{camp.minDelaySeconds}s - {camp.maxDelaySeconds}s</strong>
                </div>
                <div>
                  <span className="text-[#666666] block text-[11px]">Daily Limit</span>
                  <strong className="text-[#1A1A1A] font-semibold">{camp.dailyLimit} msgs/day</strong>
                </div>
                <div>
                  <span className="text-[#666666] block text-[11px]">Response Rate</span>
                  <strong className="text-[#00A651] font-bold">{replyRate}% ({camp.stats.replyCount} replies)</strong>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
