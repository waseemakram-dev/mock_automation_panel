import OpenAI from 'openai';
import { NicheType } from '../types';

export async function generatePersonalizedOutreach(
  apiKey: string,
  companyName: string,
  contactName: string,
  niche: NicheType,
  website?: string,
  customPersona?: any
) {
  const client = new OpenAI({ apiKey: apiKey || process.env.NEXT_PUBLIC_OPENAI_API_KEY });

  const personaName = customPersona?.name || 'Komal Fatima';
  const personaRole = customPersona?.role || 'Meta Ads Strategist';
  const personaExp = customPersona?.experience || '7+ years scaling high-ticket trade services & clinics';
  const personaOffers = customPersona?.offers || 'Meta Ads Lead Funnels, Instant Call Retargeting, Loom Video Audits';
  const personaTone = customPersona?.tone || 'Professional, Confident, Data-Driven';
  const personaCaseStudies = customPersona?.caseStudies || 'Scaled a Sydney Roofing client to 4.2x ROAS in 90 days.';
  const personaObjections = customPersona?.objections || 'Address pricing by offering 3-min Loom audit to showcase missed lead retargeting.';
  const modelToUse = 'gpt-4o';

  const systemPrompt = `
You are ${personaName}, a world-class ${personaRole}.
Experience: ${personaExp}
Core Offers: ${personaOffers}
Tone of Voice: ${personaTone}
Social Proof / Case Studies: ${personaCaseStudies}
Objection Handling Strategy: ${personaObjections}

Target Business Niche: ${niche}
Target Company Name: ${companyName}
Contact Name: ${contactName || 'Business Owner'}
Website: ${website || 'N/A'}

Generate ultra-accurate, high-converting outreach responses adhering strictly to your persona:
1. Short & Punchy WhatsApp message (max 3-4 sentences, natural executive tone, strong curiosity hook).
2. Professional Cold Email (Engaging Subject Line, clear ROI value proposition, concise social proof, soft CTA).

Respond strictly in valid JSON format:
{
  "whatsapp": "string",
  "emailSubject": "string",
  "emailBody": "string",
  "leadScore": number (1 to 100 fit score),
  "qualificationReason": "string (1 line summary)"
}
`;

  try {
    const response = await client.chat.completions.create({
      model: modelToUse,
      messages: [{ role: 'user', content: systemPrompt }],
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error('Failed to generate response from OpenAI');

    return JSON.parse(content);
  } catch (error: any) {
    console.error(`OpenAI (${modelToUse}) generation error:`, error);
    return {
      whatsapp: `Hi ${contactName || 'there'}, loved what you're doing at ${companyName}! We recently helped a ${niche} business scale their leads by 3.4x using targeted Meta ad funnels. Would you be open to a quick 3-min loom video showing how to optimize your ad spend this month?`,
      emailSubject: `Meta Ads audit & ROI opportunity for ${companyName}`,
      emailBody: `Hi ${contactName || 'Team'},\n\nI was looking into top-performing ${niche} businesses in your area and noticed a huge growth opportunity for ${companyName} on Meta Ads.\n\nMy name is ${personaName}, and I help high-growth service businesses scale their client acquisition using data-driven Meta ad campaigns.\n\nWould you be open to a brief review of your current customer acquisition strategy?\n\nBest regards,\n${personaName}\n${personaRole}`,
      leadScore: 88,
      qualificationReason: `High daily operational volume in ${niche} makes them ideal for high-ticket Meta Ad campaigns.`
    };
  }
}

/**
 * Generates an AI reply based strictly on the last 50 messages of chat memory context
 */
export async function generateChatReplyWith50MessageMemory(
  apiKey: string,
  chatHistory50Messages: any[],
  customPersona?: any
) {
  const client = new OpenAI({ apiKey: apiKey || process.env.NEXT_PUBLIC_OPENAI_API_KEY });

  const personaName = customPersona?.name || 'Komal Fatima';
  const personaRole = customPersona?.role || 'Meta Ads Strategist';
  const personaTone = customPersona?.tone || 'Professional, Confident, Data-Driven';
  const personaObjections = customPersona?.objections || 'Offer a 3-minute Loom video audit to demonstrate missed lead retargeting opportunities.';

  // Format last 50 messages into conversational transcript memory context
  const recent50 = chatHistory50Messages.slice(-50);
  const formattedChatMemory = recent50.map(m => `${m.type === 'outgoing' ? personaName : 'Lead'}: ${m.text}`).join('\n');

  const memoryPrompt = `
You are ${personaName}, ${personaRole}.
Tone of Voice: ${personaTone}
Objection Strategy: ${personaObjections}

Here is the exact conversational transcript history memory for this lead (up to last 50 messages):
---
${formattedChatMemory || 'Lead: Hi, interested in Meta Ads.'}
---

Generate a natural, context-aware, highly relevant WhatsApp reply as ${personaName} responding to the lead's latest message based on the 50-message context above. Keep it concise (2-4 sentences).
`;

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: memoryPrompt }],
    });

    return response.choices[0]?.message?.content || `Thank you for your message! Let's schedule a quick 3-minute video review of your Meta Ads strategy.`;
  } catch (error: any) {
    console.error('OpenAI 50-message memory reply error:', error);
    return `Thank you for your message! Let's schedule a quick 3-minute video review of your Meta Ads strategy.`;
  }
}
