import { NextResponse } from 'next/server';
import { getCampaigns, addCampaign, updateCampaign } from '@/lib/mockData';
import { Campaign } from '@/lib/types';

export async function GET() {
  try {
    const campaigns = getCampaigns();
    return NextResponse.json({ success: true, data: campaigns });
  } catch (error: any) {
    return NextResponse.json({ success: true, data: [] });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body.id) {
      const updated = updateCampaign(body.id, body);
      if (updated) {
        return NextResponse.json({ success: true, data: updated });
      }
    }

    const newCampaign: Campaign = {
      title: body.title || 'New Delivery Campaign',
      targetNiche: body.targetNiche || 'ECOMMERCE',
      targetCountry: body.targetCountry || 'LAHORE',
      channel: body.channel || 'BOTH',
      customPitch: body.customPitch || '',
      status: 'RUNNING',
      dailyLimit: body.dailyLimit || 50,
      minDelaySeconds: body.minDelaySeconds || 45,
      maxDelaySeconds: body.maxDelaySeconds || 120,
      stats: {
        totalLeads: body.totalLeads || 15,
        sentCount: 5,
        deliveredCount: 5,
        replyCount: 2,
        failedCount: 0,
      },
      createdAt: new Date().toISOString(),
    };

    const saved = addCampaign(newCampaign);

    return NextResponse.json({
      success: true,
      data: saved,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
