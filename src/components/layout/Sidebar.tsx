'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMobileMenu } from '@/lib/mobileMenu';
import { 
  LayoutDashboard, 
  Package, 
  MessageSquare,
  Send, 
  FileText, 
  Settings, 
  Truck,
  X
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Orders & Tracking', href: '/whatsapp', icon: Package },
  { name: 'Business Leads', href: '/leads', icon: Truck },
  { name: 'Campaigns', href: '/campaigns', icon: Send },
  { name: 'Templates', href: '/templates', icon: FileText },
  { name: 'Delivery AI', href: '/ai-trainer', icon: MessageSquare },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [waConnected, setWaConnected] = useState(true);
  const { isOpen, close } = useMobileMenu();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={close}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-screen w-64 bg-white border-r border-[#E6E6E6] flex flex-col justify-between z-50 select-none
        transition-transform duration-300 ease-in-out
        lg:sticky lg:translate-x-0 lg:z-40
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div>
          {/* Brand Header */}
          <div className="p-5 border-b border-[#E6E6E6] flex items-center justify-between bg-[#F5F7F3]">
            <Link href="/" onClick={close} className="flex items-center gap-2.5">
              <img 
                src="https://qwqer.pk/wp-content/uploads/qwqer_assets/images/qwqer-logo.png" 
                alt="QWQER Pakistan Logo" 
                className="h-9 w-auto max-w-[160px] object-contain"
              />
            </Link>
            <button onClick={close} className="lg:hidden p-1 text-[#666666] hover:text-[#1A1A1A]">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="p-4 space-y-1.5">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={close}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 ${
                    isActive
                      ? 'bg-[#00A651] text-white shadow-md shadow-[#00A651]/20'
                      : 'text-[#4B5163] hover:text-[#1A1A1A] hover:bg-[#EEF6F0]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white stroke-[2.5]' : 'text-[#00A651]'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Connection Indicator & Footer */}
        <div className="p-4 border-t border-[#E6E6E6] bg-[#F5F7F3] space-y-3">
          <div className="p-3 rounded-xl bg-white border border-[#E6E6E6] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${waConnected ? 'bg-[#00A651] animate-pulse' : 'bg-[#CC3366]'}`} />
              <span className="text-xs text-[#1A1A1A] font-bold">
                {waConnected ? 'Operations Online' : 'Offline'}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center space-y-0.5 pt-2 border-t border-[#E6E6E6] select-text">
            <p className="text-[10px] font-semibold text-[#666666] tracking-wide">
              Powered by <span className="text-[#00A651] font-extrabold">Tech Finanza</span>
            </p>
            <p className="text-[9px] font-extrabold text-[#16A34A] uppercase tracking-wider">
              Fast & Reliable Delivery
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
