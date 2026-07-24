'use client';

import React, { useState } from 'react';
import { LogOut, Menu } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { useMobileMenu } from '@/lib/mobileMenu';

export default function Header() {
  const { user, logout } = useAuth();
  const { toggle } = useMobileMenu();
  const [outreachActive, setOutreachActive] = useState(true);

  return (
    <header className="h-14 bg-white/95 backdrop-blur-md border-b border-[#E6E6E6] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Left: Hamburger + Logo */}
      <div className="flex items-center gap-3">
        <button 
          onClick={toggle} 
          className="lg:hidden p-2 -ml-2 text-[#4B5163] hover:text-[#1A1A1A] hover:bg-[#F5F7F3] rounded-lg transition"
        >
          <Menu className="w-5 h-5" />
        </button>
        <img 
          src="https://qwqer.pk/wp-content/uploads/qwqer_assets/images/qwqer-logo.png" 
          alt="QWQER Pakistan" 
          className="h-7 w-auto object-contain"
        />
        <span className="text-[#4B5163] font-semibold text-xs border-l border-[#E6E6E6] pl-3 hidden sm:inline">
          Delivery & Logistics Dashboard
        </span>
      </div>

      {/* Right: Status + User */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Status Pill - hidden on small mobile */}
        <button
          onClick={() => setOutreachActive(!outreachActive)}
          className={`hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-extrabold transition shadow-md ${
            outreachActive 
              ? 'bg-[#00A651]/10 text-[#00A651] border-[#00A651]/40 shadow-[#00A651]/5'
              : 'bg-[#CC3366]/10 text-[#CC3366] border-[#CC3366]/40 shadow-[#CC3366]/5'
          }`}
          title="Click to toggle status"
        >
          <div className={`w-2.5 h-2.5 rounded-full ${outreachActive ? 'bg-[#00A651] animate-pulse' : 'bg-[#CC3366]'}`} />
          <span>{outreachActive ? 'Active' : 'Paused'}</span>
        </button>

        {/* Mobile status dot */}
        <button
          onClick={() => setOutreachActive(!outreachActive)}
          className="sm:hidden p-2"
          title="Operations status"
        >
          <div className={`w-3 h-3 rounded-full ${outreachActive ? 'bg-[#00A651] animate-pulse' : 'bg-[#CC3366]'}`} />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2 border-l border-[#E6E6E6] pl-2 sm:pl-4">
          {user && (
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#EEF6F0] text-[#00A651] flex items-center justify-center font-bold text-xs">
                {user.name.charAt(0)}
              </div>
              <span className="text-xs text-[#1A1A1A] font-bold hidden md:inline">{user.name}</span>
              <button
                onClick={logout}
                title="Sign out"
                className="p-1.5 text-[#666666] hover:text-[#CC3366] transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
