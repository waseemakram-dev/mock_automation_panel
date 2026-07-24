import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { companyName, contactName, niche, website } = await req.json();

    const result = {
      whatsapp: `Hi ${contactName || 'there'}! QWQER Pakistan offers instant, same-day, and bulk delivery for ${niche || 'ecommerce'} businesses in Lahore. We handle 200+ daily orders with live tracking. Would you like to know how we can power your deliveries?`,
      emailSubject: `Fast & Reliable Delivery Solutions for ${companyName || 'Your Business'}`,
      emailBody: `Hi ${contactName || 'Team'},\n\nI noticed ${companyName || 'your business'} could benefit from QWQER's fast delivery services.\n\nWe help businesses in ${niche || 'ecommerce'} manage same-day, next-day, and bulk deliveries with:\n- Live tracking\n- Dedicated riders\n- Bulk order uploads\n- Flexible scheduling\n\nWould you be open to a quick chat about optimizing your delivery operations?\n\nBest regards,\nQWQER Pakistan Team`,
      leadScore: 88,
      qualificationReason: `Business in ${niche || 'ecommerce'} sector with delivery needs in Lahore.`
    };

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
