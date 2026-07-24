'use client';

import React, { useState } from 'react';
import { 
  Settings, 
  ShieldCheck, 
  RefreshCw, 
  Download, 
  Zap, 
  Power, 
  Radio, 
  MessageSquare,
  Bot,
  Sliders,
  Loader2
} from 'lucide-react';

export default function SettingsPage() {
  const [waLive, setWaLive] = useState(true);
  const [liveSyncActive, setLiveSyncActive] = useState(true);
  const [autoReplyEnabled, setAutoReplyEnabled] = useState(false);
  const [batchScoring, setBatchScoring] = useState(false);
  const [batchMessage, setBatchMessage] = useState<string | null>(null);
  const [extraRules, setExtraRules] = useState('Always highlight QWQERs fast delivery, live tracking, and bulk order support. Focus on same-day and instant delivery benefits.');

  async function handleImportExistingChats() {
    alert('Demo mode - 5 partner conversations loaded');
  }

  async function handleBatchScoreChats() {
    setBatchScoring(true);
    setBatchMessage(null);
    try {
      await new Promise(r => setTimeout(r, 1000));
      setBatchMessage('Successfully scored 8 business partners!');
    } catch (e) {
      setBatchMessage('Scoring complete.');
    } finally {
      setBatchScoring(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-[#00A651]/10 text-[#00A651] border border-[#00A651]/20">
          <Settings className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">Settings</h1>
          <p className="text-xs text-[#4B5163] mt-0.5">Configure QWQER delivery operations and AI assistant</p>
        </div>
      </div>

      {/* Connection Panel */}
      <div className="bg-white border border-[#E6E6E6] rounded-2xl p-6 space-y-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#00A651]/10 text-[#00A651] border border-[#00A651]/20">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-[#1A1A1A] text-base">Communication Hub</h3>
              <p className="text-xs text-[#4B5163] font-mono">WhatsApp & Email integration</p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#00A651]/10 text-[#00A651] border border-[#00A651]/30 flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Live</span>
          </span>
        </div>

        <div className="p-4 rounded-xl bg-[#EEF6F0] border border-[#00A651]/20 space-y-1">
          <div className="flex items-center gap-2 text-[#00A651] font-bold text-xs">
            <ShieldCheck className="w-4 h-4" />
            <span>Operations Active</span>
          </div>
          <p className="text-xs text-[#4B5163]">
            Dashboard is live and syncing delivery data in real-time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          <button
            onClick={() => setLiveSyncActive(!liveSyncActive)}
            className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition ${
              liveSyncActive
                ? 'bg-[#00A651]/10 text-[#00A651] border border-[#00A651]/30'
                : 'bg-[#F5F7F3] text-[#666666] border border-[#E6E6E6]'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${liveSyncActive ? 'animate-spin' : ''}`} />
            <span>{liveSyncActive ? 'Live Sync Enabled' : 'Enable live sync'}</span>
          </button>

          <button onClick={handleImportExistingChats} className="px-4 py-2.5 rounded-xl bg-[#00A651] hover:bg-[#16A34A] text-white font-bold flex items-center gap-2 shadow-md shadow-[#00A651]/10 transition">
            <Download className="w-3.5 h-3.5" />
            <span>Load Demo Data</span>
          </button>

          <button onClick={() => alert('System status: All operational!')} className="px-4 py-2.5 rounded-xl bg-[#F5F7F3] hover:bg-[#EEF6F0] text-[#1A1A1A] border border-[#E6E6E6] font-semibold flex items-center gap-2 transition">
            <RefreshCw className="w-3.5 h-3.5 text-[#00A651]" />
            <span>Refresh state</span>
          </button>

          <button onClick={() => setWaLive(!waLive)} className="px-4 py-2.5 rounded-xl bg-[#F5F7F3] hover:bg-[#CC3366]/10 text-[#666666] hover:text-[#CC3366] border border-[#E6E6E6] font-semibold flex items-center gap-2 transition">
            <Power className="w-3.5 h-3.5" />
            <span>{waLive ? 'Disconnect' : 'Connect'}</span>
          </button>
        </div>
      </div>

      {/* AI Analysis Panel */}
      <div className="bg-white border border-[#E6E6E6] rounded-2xl p-6 space-y-4 shadow-sm">
        <h3 className="font-bold text-[#1A1A1A] text-base">AI Partner Scoring</h3>

        <div className="space-y-3 text-xs">
          <button onClick={handleBatchScoreChats} disabled={batchScoring} className="px-5 py-3 rounded-xl bg-[#F5F7F3] hover:bg-[#EEF6F0] text-[#1A1A1A] font-bold border border-[#E6E6E6] flex items-center gap-2 transition">
            {batchScoring ? <Loader2 className="w-4 h-4 animate-spin text-[#00A651]" /> : <Zap className="w-4 h-4 text-[#00A651]" />}
            <span>Score all business partners</span>
          </button>
          <p className="text-[#666666]">AI scoring helps prioritize high-value delivery partners.</p>
          {batchMessage && <p className="text-[#00A651] font-bold">{batchMessage}</p>}
        </div>
      </div>

      {/* Auto-Reply Toggle */}
      <div className="bg-white border border-[#E6E6E6] rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-[#1A1A1A] text-base">Auto-Response Assistant</h3>
            <p className="text-xs text-[#4B5163] mt-1">Automatic responses for incoming delivery inquiries.</p>
          </div>

          <button onClick={() => setAutoReplyEnabled(!autoReplyEnabled)} className={`w-14 h-8 rounded-full p-1 transition duration-300 ${autoReplyEnabled ? 'bg-[#00A651]' : 'bg-[#D1D5DB]'}`}>
            <div className={`w-6 h-6 rounded-full bg-white transition duration-300 transform shadow-sm ${autoReplyEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>

        <div className="text-xs font-semibold">
          Status: <strong className={autoReplyEnabled ? 'text-[#00A651]' : 'text-[#666666]'}>
            {autoReplyEnabled ? 'ON - Auto-reply active' : 'OFF - Auto-reply paused'}
          </strong>
        </div>
      </div>

      {/* Reply Guidelines */}
      <div className="bg-white border border-[#E6E6E6] rounded-2xl p-6 space-y-4 shadow-sm">
        <h3 className="font-bold text-[#1A1A1A] text-base">Response Guidelines</h3>
        <div className="space-y-2 text-xs">
          <label className="block text-[#4B5163] font-medium">Custom rules for AI responses:</label>
          <textarea value={extraRules} onChange={(e) => setExtraRules(e.target.value)} rows={3} className="w-full bg-[#F5F7F3] border border-[#E6E6E6] rounded-xl p-3 text-[#1A1A1A]" />
          <button onClick={() => alert('Guidelines saved!')} className="px-4 py-2 bg-[#00A651] hover:bg-[#16A34A] text-white font-bold rounded-lg transition">
            Save Guidelines
          </button>
        </div>
      </div>
    </div>
  );
}
