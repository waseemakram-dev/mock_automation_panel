import { NextResponse } from 'next/server';
import { getWhatsAppChatHistory } from '@/lib/mockData';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const phone = searchParams.get('phone');

  if (!phone) {
    return NextResponse.json({ success: false, error: 'Phone number required' }, { status: 400 });
  }

  try {
    const messages = getWhatsAppChatHistory(phone);
    return NextResponse.json({ success: true, data: messages });
  } catch (error: any) {
    return NextResponse.json({ success: true, data: [] });
  }
}

export async function POST(req: Request) {
  try {
    const { phone, message } = await req.json();

    if (!phone) {
      return NextResponse.json({ success: false, error: 'Phone required' }, { status: 400 });
    }

    // Mock send - in demo mode we just acknowledge
    return NextResponse.json({ 
      success: true, 
      id: `mock-msg-${Date.now()}`,
      message: 'Demo mode - message simulated' 
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
