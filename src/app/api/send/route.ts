import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { channel, recipientPhone, recipientEmail, message, subject } = body;

    // Mock send for demo
    return NextResponse.json({
      success: true,
      whatsapp: channel === 'WHATSAPP' || channel === 'BOTH' ? { success: true, simulated: true } : null,
      email: channel === 'EMAIL' || channel === 'BOTH' ? { success: true, simulated: true } : null,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
