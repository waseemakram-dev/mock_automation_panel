import { NextResponse } from 'next/server';
import { getWhatsAppChats } from '@/lib/mockData';

export async function GET() {
  try {
    const chats = getWhatsAppChats();
    return NextResponse.json({ success: true, data: chats });
  } catch (error: any) {
    return NextResponse.json({ success: true, data: [] });
  }
}
