import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { crawlWebsiteUrl } = await req.json();

    // Mock website crawl for demo
    const crawledText = `Business Information: This is a ${crawlWebsiteUrl ? 'business website' : 'local business'} in Lahore offering services. They have active social media presence and handle daily customer orders. Delivery requirements include same-day and next-day options for local customers.`;

    return NextResponse.json({
      success: true,
      businessDnaText: crawledText,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
