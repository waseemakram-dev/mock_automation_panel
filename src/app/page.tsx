'use client';

export const dynamic = 'force-dynamic';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Package, 
  Truck, 
  MessageSquare, 
  CheckCircle, 
  ArrowUpRight, 
  Plus, 
  Search,
  Database,
  BarChart3,
  Zap,
  Clock,
  BrainCircuit,
  TrendingUp,
  Star
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { Lead, Campaign } from '@/lib/types';

export default function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [leadsRes, campRes] = await Promise.all([
          fetch('/api/leads'),
          fetch('/api/campaigns'),
        ]);
        const leadsData = await leadsRes.json();
        const campData = await campRes.json();

        if (leadsData.success) setLeads(leadsData.data);
        if (campData.success) setCampaigns(campData.data);
      } catch (err) {
        console.error('Failed to load dashboard data', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const totalOrders = leads.length;
  const dispatchedOrders = leads.filter(l => l.status === 'DISPATCHED' || l.status === 'IN_TRANSIT' || l.status === 'DELIVERED').length;
  const deliveredOrders = leads.filter(l => l.status === 'DELIVERED').length;
  const pendingOrders = leads.filter(l => l.status === 'PENDING').length;
  const deliveryRate = dispatchedOrders > 0 ? Math.round((deliveredOrders / dispatchedOrders) * 100) : 0;

  const nicheMap: Record<string, { sent: number; replies: number; booked: number }> = {};
  leads.forEach(lead => {
    const key = lead.niche ? lead.niche.replace('_', ' ') : 'General';
    if (!nicheMap[key]) nicheMap[key] = { sent: 0, replies: 0, booked: 0 };
    if (lead.status === 'DISPATCHED' || lead.status === 'IN_TRANSIT' || lead.status === 'DELIVERED') nicheMap[key].sent += 1;
    if (lead.status === 'IN_TRANSIT' || lead.status === 'DELIVERED') nicheMap[key].replies += 1;
    if (lead.status === 'DELIVERED') nicheMap[key].booked += 1;
  });

  const performanceData = Object.keys(nicheMap).map(niche => ({
    name: niche,
    sent: nicheMap[niche].sent || 1,
    replies: nicheMap[niche].replies,
    booked: nicheMap[niche].booked,
  }));

  const channelData = [
    { name: 'Same-Day Delivery', value: 45, color: '#00A651' },
    { name: 'Next-Day Delivery', value: 35, color: '#16A34A' },
    { name: 'Instant Delivery', value: 20, color: '#0E4B2E' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-[#E6E6E6] rounded-2xl p-6 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A] tracking-tight font-sans">
            QWQER Delivery Dashboard
          </h1>
          <p className="text-xs text-[#4B5163] font-medium mt-1">
            Fast & Reliable Delivery Solutions for Lahore Businesses
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/leads"
            className="px-4 py-2.5 rounded-xl bg-[#F5F7F3] hover:bg-[#EEF6F0] text-[#1A1A1A] border border-[#E6E6E6] text-xs font-bold transition flex items-center gap-2 shadow-sm"
          >
            <Search className="w-4 h-4 text-[#00A651]" />
            <span>Add Business Partner</span>
          </Link>
          
          <button
            onClick={() => alert('Bulk orders initiated!')}
            className="px-5 py-2.5 rounded-xl bg-[#00A651] hover:bg-[#16A34A] text-white text-xs font-extrabold shadow-lg shadow-[#00A651]/20 transition flex items-center gap-2"
          >
            <Zap className="w-4 h-4 fill-white stroke-white" />
            <span>Start Bulk Delivery</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Orders" value={totalOrders} change="All Partners" icon={Package} color="#00A651" />
        <MetricCard title="Dispatched" value={dispatchedOrders} change="In Progress" icon={Truck} color="#4B5163" />
        <MetricCard title="Delivered" value={deliveredOrders} change={`${deliveryRate}% Success Rate`} icon={CheckCircle} color="#16A34A" highlight />
        <MetricCard title="Pending" value={pendingOrders} change="Awaiting Pickup" icon={Clock} color="#00A651" />
      </div>

      {/* Analytics Section */}
      <div className="bg-white border border-[#E6E6E6] rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#1A1A1A] flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-[#00A651]" />
            <span>Delivery Performance by Category</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bar Chart */}
          <div className="lg:col-span-2 bg-[#F5F7F3] p-4 rounded-xl border border-[#E6E6E6]">
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData.length > 0 ? performanceData : [{ name: 'Ecommerce', sent: 12, replies: 4, booked: 2 }]}>
                  <XAxis dataKey="name" stroke="#1A1A1A" fontSize={11} tickLine={false} fontWeight={600} />
                  <YAxis stroke="#1A1A1A" fontSize={11} tickLine={false} fontWeight={600} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(0, 166, 81, 0.08)' }} 
                    contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#00A651', borderRadius: '12px', color: '#1A1A1A', fontWeight: 'bold' }} 
                  />
                  <Bar dataKey="sent" fill="#D1D5DB" radius={[4, 4, 0, 0]} name="Total Orders" />
                  <Bar dataKey="replies" fill="#00A651" radius={[4, 4, 0, 0]} name="In Transit" />
                  <Bar dataKey="booked" fill="#16A34A" radius={[4, 4, 0, 0]} name="Delivered" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-[#F5F7F3] p-4 rounded-xl border border-[#E6E6E6] space-y-2">
            <h4 className="text-xs font-bold text-[#1A1A1A]">Service Distribution</h4>
            <div className="h-40 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={channelData} cx="50%" cy="50%" innerRadius={40} outerRadius={55} paddingAngle={5} dataKey="value">
                    {channelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E6E6E6', borderRadius: '12px', color: '#1A1A1A' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1.5 text-xs pt-2 border-t border-[#E6E6E6]">
              {channelData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-[#1A1A1A] font-medium">{item.name}</span>
                  </div>
                  <span className="font-mono text-[#1A1A1A] font-bold">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Campaigns */}
        <div className="lg:col-span-2 bg-white border border-[#E6E6E6] rounded-2xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#1A1A1A]">Active Delivery Campaigns</h2>
            <Link href="/campaigns" className="text-xs text-[#00A651] hover:underline flex items-center gap-1 font-bold">
              View All <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {campaigns.length === 0 ? (
            <div className="p-8 text-center bg-[#F5F7F3] rounded-xl border border-[#E6E6E6] space-y-3">
              <Database className="w-8 h-8 text-[#00A651] mx-auto" />
              <p className="text-xs text-[#4B5163] font-semibold">No active campaigns yet.</p>
              <Link
                href="/campaigns/new"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#00A651] text-white font-bold text-xs shadow-md"
              >
                <Plus className="w-4 h-4 stroke-[3]" /> Create Campaign
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {campaigns.map((camp) => (
                <div key={camp.id} className="p-4 rounded-xl bg-[#F5F7F3] border border-[#E6E6E6] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#00A651]/10 text-[#00A651] border border-[#00A651]/30">
                        {camp.targetCountry === 'LAHORE' ? 'Lahore' : 'Pakistan'}
                      </span>
                      <h3 className="font-bold text-[#1A1A1A] text-xs">{camp.title}</h3>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#00A651]/10 text-[#00A651] border border-[#00A651]/30">
                      {camp.status}
                    </span>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-[#1A1A1A] mb-1.5 font-mono font-bold">
                      <span>Orders: {camp.stats.sentCount} / {camp.stats.totalLeads || 0}</span>
                      <span>{Math.round((camp.stats.sentCount / (camp.stats.totalLeads || 1)) * 100)}%</span>
                    </div>
                    <div className="h-2 w-full bg-[#E6E6E6] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#00A651] to-[#16A34A] rounded-full"
                        style={{ width: `${(camp.stats.sentCount / (camp.stats.totalLeads || 1)) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Lead Intelligence Panel */}
        <div className="bg-white border border-[#E6E6E6] rounded-2xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-4 h-4 text-[#00A651]" />
            <h2 className="text-sm font-bold text-[#1A1A1A]">Lead Intelligence</h2>
          </div>

          <div className="space-y-3">
            {leads.slice(0, 5).map((lead) => (
              <div key={lead.id} className="p-3 rounded-xl bg-[#F5F7F3] border border-[#E6E6E6] space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-[#1A1A1A] text-xs">{lead.companyName}</h4>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                    lead.status === 'DELIVERED' ? 'bg-[#00A651]/10 text-[#00A651]' :
                    lead.status === 'IN_TRANSIT' ? 'bg-[#CC3366]/10 text-[#CC3366]' :
                    'bg-[#4B5163]/10 text-[#4B5163]'
                  }`}>
                    {lead.status}
                  </span>
                </div>
                {lead.qualificationSummary && (
                  <p className="text-[10px] text-[#4B5163] leading-relaxed">{lead.qualificationSummary}</p>
                )}
                <div className="flex items-center gap-2 text-[10px] text-[#666666]">
                  <span className="font-mono">{lead.niche?.replace('_', ' ')}</span>
                </div>
              </div>
            ))}
          </div>

          {leads.length > 5 && (
            <Link href="/leads" className="block text-center text-xs text-[#00A651] hover:underline font-bold pt-2 border-t border-[#E6E6E6]">
              View All {leads.length} Partners →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, change, icon: Icon, color, highlight }: any) {
  return (
    <div className={`p-5 rounded-2xl border transition-all ${
      highlight 
        ? 'bg-white border-[#00A651]/40 shadow-md shadow-[#00A651]/5' 
        : 'bg-white border-[#E6E6E6]'
    }`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-[#4B5163]">{title}</span>
        <div className="p-2 rounded-xl bg-[#F5F7F3] border border-[#E6E6E6]" style={{ color: color }}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-3xl font-extrabold text-[#1A1A1A] tracking-tight">{value}</span>
      </div>
      <p className="text-xs font-bold mt-1.5" style={{ color: color }}>{change}</p>
    </div>
  );
}
