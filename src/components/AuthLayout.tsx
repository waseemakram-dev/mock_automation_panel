'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AuthProvider, useAuth } from '@/lib/auth';
import { MobileMenuProvider } from '@/lib/mobileMenu';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { Loader2 } from 'lucide-react';

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const isLoginPage = pathname === '/login';

  useEffect(() => {
    if (!isLoggedIn && !isLoginPage) {
      router.push('/login');
    }
  }, [isLoggedIn, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#F5F7F3] flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-[#00A651] animate-spin" />
      </div>
    );
  }

  return (
    <MobileMenuProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-[#F5F7F3] text-[#1A1A1A] font-sans antialiased">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto min-h-0 relative">
            {children}
          </main>
        </div>
      </div>
    </MobileMenuProvider>
  );
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full overflow-hidden">
      <head>
        <title>QWQER Pakistan | Delivery & Logistics Dashboard</title>
        <meta name="description" content="QWQER Pakistan - Fast & Reliable Delivery and Courier Solutions for Businesses in Lahore" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="h-full overflow-hidden bg-[#F5F7F3] text-[#1A1A1A] font-sans antialiased">
        <AuthProvider>
          <DashboardLayout>{children}</DashboardLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
