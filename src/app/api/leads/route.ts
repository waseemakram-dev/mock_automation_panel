import { NextResponse } from 'next/server';
import { getLeads, addLead } from '@/lib/mockData';
import { Lead } from '@/lib/types';

export async function GET() {
  try {
    const leads = getLeads();
    return NextResponse.json({ success: true, data: leads });
  } catch (error: any) {
    return NextResponse.json({ success: true, data: [] });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newLead: Lead = {
      name: body.name || 'Contact',
      companyName: body.companyName || 'Business',
      niche: body.niche || 'ECOMMERCE',
      country: body.country || 'LAHORE',
      email: body.email || '',
      phone: body.phone || '',
      website: body.website || '',
      status: body.status || 'NEW',
      score: body.score || 80,
      qualificationSummary: body.qualificationSummary || 'Imported Lead',
      aiPersonalizedNote: body.aiPersonalizedNote || '',
      source: body.source || 'CSV_IMPORT',
      createdAt: new Date().toISOString(),
    };

    const saved = addLead(newLead);

    return NextResponse.json({
      success: true,
      data: saved,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
