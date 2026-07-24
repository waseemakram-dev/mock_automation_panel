import React from 'react';
import './globals.css';
import AuthLayout from '@/components/AuthLayout';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}
