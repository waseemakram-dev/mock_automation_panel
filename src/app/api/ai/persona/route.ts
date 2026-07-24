import { NextResponse } from 'next/server';

let storedPersona: any = null;

function getDefaultPersona() {
  return {
    name: 'QWQER Pakistan',
    role: 'Delivery & Logistics Solutions Specialist',
    experience: '3+ years helping businesses in Lahore with instant, same-day, and bulk delivery services',
    offers: 'Instant Delivery, Same-Day Delivery, Next-Day Delivery, Bulk Order Processing, Live Tracking, Rider Coordination',
    tone: 'Professional, Reliable, Customer-Focused, Efficient',
    caseStudies: 'Partnered with Sapphire for 200+ daily deliveries with 99.2% on-time rate. Scaled Cozmetica beauty deliveries to 80+ orders daily.',
    objections: 'For "Too expensive": We offer competitive rates starting from PKR 99 with bulk discounts. For "Already have a courier": Free trial period to compare our service quality and speed.',
    customKnowledge: 'QWQER Pakistan serves ecommerce, retail, pharma, grocery, and gift businesses in Lahore. Key features: instant delivery, live tracking, bulk uploads, dedicated rider coordination.',
    selectedModel: 'gpt-4o',
  };
}

export async function GET() {
  try {
    return NextResponse.json({ success: true, data: storedPersona || getDefaultPersona() });
  } catch (error: any) {
    return NextResponse.json({ success: true, data: getDefaultPersona() });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const updatedData = {
      name: body.name || 'QWQER Pakistan',
      role: body.role || 'Delivery & Logistics Solutions Specialist',
      experience: body.experience || '3+ years helping businesses in Lahore with delivery services',
      offers: body.offers || 'Instant Delivery, Same-Day Delivery, Next-Day Delivery, Bulk Orders',
      tone: body.tone || 'Professional, Reliable, Customer-Focused',
      caseStudies: body.caseStudies || 'Partnered with Sapphire for 200+ daily deliveries.',
      objections: body.objections || 'Offer free trial period to compare service quality.',
      customKnowledge: body.customKnowledge || 'QWQER Pakistan serves ecommerce, retail, pharma, grocery businesses in Lahore.',
      selectedModel: body.selectedModel || 'gpt-4o',
      updatedAt: new Date().toISOString(),
    };

    storedPersona = updatedData;

    return NextResponse.json({ success: true, data: updatedData });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
