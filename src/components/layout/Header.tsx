'use client';

import React, { useState } from 'react';
import { LogIn, LogOut } from 'lucide-react';
import { useAuth } from '@/lib/auth';

export default function Header() {
  const { user, logout } = useAuth();
  const [outreachActive, setOutreachActive] = useState(true);

  return (
    <header className="h-14 bg-white/95 backdrop-blur-md border-b border-[#E6E6E6] px-6 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Brand Header */}
      <div className="flex items-center gap-3">
        <img 
          src="https://qwqer.pk/wp-content/uploads/qwqer_assets/images/qwqer-logo.png" 
          alt="QWQER Pakistan" 
          className="h-7 w-auto object-contain"
        />
        <span className="text-[#4B5163] font-semibold text-xs border-l border-[#E6E6E6] pl-3 hidden sm:inline">
          Delivery & Logistics Dashboard
        </span>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-4">
        {/* Status Pill */}
        <button
          onClick={() => setOutreachActive(!outreachActive)}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-extrabold transition shadow-md ${
            outreachActive 
              ? 'bg-[#00A651]/10 text-[#00A651] border-[#00A651]/40 shadow-[#00A651]/5'
              : 'bg-[#CC3366]/10 text-[#CC3366] border-[#CC3366]/40 shadow-[#CC3366]/5'
          }`}
          title="Click to toggle status"
        >
          <div className={`w-2.5 h-2.5 rounded-full ${outreachActive ? 'bg-[#00A651] animate-pulse' : 'bg-[#CC3366]'}`} />
          <span>{outreachActive ? 'Operations Active' : 'Operations Paused'}</span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2 border-l border-[#E6E6E6] pl-4">
          {user && (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#EEF6F0] text-[#00A651] flex items-center justify-center font-bold text-xs">
                {user.name.charAt(0)}
              </div>
              <span className="text-xs text-[#1A1A1A] font-bold">{user.name}</span>
              <button
                onClick={logout}
                title="Sign out"
                className="p-1 text-[#666666] hover:text-[#CC3366] transition"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
