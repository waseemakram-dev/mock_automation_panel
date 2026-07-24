'use client';

import React, { useEffect, useState } from 'react';
import { 
  BarChart3, 
  Download, 
  Database,
  Package
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

export default function AnalyticsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

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
        console.error(err);
      }
    }
    fetchData();
  }, []);

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
    sent: nicheMap[niche].sent,
    replies: nicheMap[niche].replies,
    booked: nicheMap[niche].booked,
  }));

  const channelData = [
    { name: 'Same-Day Delivery', value: 45, color: '#00A651' },
    { name: 'Next-Day Delivery', value: 35, color: '#16A34A' },
    { name: 'Instant Delivery', value: 20, color: '#0E4B2E' },
  ];

  function exportReportCSV() {
    const headers = 'Category,Total Orders,In Transit,Delivered\n';
    const rows = performanceData.map(d => `"${d.name}",${d.sent},${d.replies},${d.booked}`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `qwqer_delivery_report_${Date.now()}.csv`;
    a.click();
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">Delivery Analytics & Reports</h1>
          <p className="text-xs text-[#4B5163] mt-1">Real-time delivery performance data</p>
        </div>

        <button onClick={exportReportCSV} disabled={performanceData.length === 0} className="px-4 py-2 rounded-lg bg-[#00A651] disabled:opacity-50 hover:bg-[#16A34A] text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#00A651]/10 transition">
          <Download className="w-4 h-4" />
          <span>Export CSV Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border border-[#E6E6E6] rounded-xl p-6 space-y-4 shadow-sm">
          <h3 className="text-sm font-bold text-[#1A1A1A]">Delivery by Category</h3>
          {performanceData.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center space-y-2 text-[#666666]">
              <Database className="w-8 h-8 text-[#00A651]" />
              <p className="text-xs font-medium text-[#4B5163]">No delivery data yet.</p>
            </div>
          ) : (
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <XAxis dataKey="name" stroke="#4B5163" fontSize={11} tickLine={false} />
                  <YAxis stroke="#4B5163" fontSize={11} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E6E6E6', borderRadius: '8px', color: '#1A1A1A' }} />
                  <Bar dataKey="sent" fill="#D1D5DB" radius={[4, 4, 0, 0]} name="Total Orders" />
                  <Bar dataKey="replies" fill="#00A651" radius={[4, 4, 0, 0]} name="In Transit" />
                  <Bar dataKey="booked" fill="#16A34A" radius={[4, 4, 0, 0]} name="Delivered" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        <div className="bg-white border border-[#E6E6E6] rounded-xl p-6 space-y-4 shadow-sm">
          <h3 className="text-sm font-bold text-[#1A1A1A]">Service Distribution</h3>
          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={channelData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={5} dataKey="value">
                  {channelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E6E6E6', borderRadius: '8px', color: '#1A1A1A' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 text-xs border-t border-[#E6E6E6] pt-3">
            {channelData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[#4B5163] font-medium">{item.name}</span>
                </div>
                <span className="font-mono text-[#666666] font-bold">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
