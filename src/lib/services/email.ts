import { Resend } from 'resend';

export async function sendOutreachEmail(
  apiKey: string,
  to: string,
  subject: string,
  bodyText: string,
  senderName: string = 'Komal Fatima - Meta Ads Strategist',
  senderEmail: string = 'komal@komalfatima.com'
) {
  const token = apiKey || process.env.RESEND_API_KEY;

  if (!token || token === 'your_resend_api_key') {
    // Simulated Resend dispatch for demonstration
    console.log(`[Email Sandbox] Dispatch to ${to} | Subject: "${subject}"`);
    await new Promise(res => setTimeout(res, 600));
    return { success: true, simulated: true, id: `email_sim_${Date.now()}` };
  }

  const resend = new Resend(token);

  try {
    const data = await resend.emails.send({
      from: `${senderName} <${senderEmail}>`,
      to: [to],
      subject: subject,
      text: bodyText,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; color: #0A192F; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #E2E8F0; border-radius: 8px;">
          <div style="border-bottom: 2px solid #D4AF37; padding-bottom: 12px; margin-bottom: 20px;">
            <h2 style="color: #0A192F; margin: 0; font-size: 20px;">${senderName}</h2>
            <p style="color: #D4AF37; margin: 4px 0 0 0; font-weight: 600; font-size: 13px;">Scale Your Business With Data-Driven Meta Ads</p>
          </div>
          <div style="white-space: pre-wrap; font-size: 15px; color: #1E293B;">${bodyText}</div>
          <div style="margin-top: 30px; padding-top: 16px; border-top: 1px solid #CBD5E1; font-size: 12px; color: #64748B;">
            <p style="margin: 0;">Sent via Komal Fatima Lead Automation Hub • <a href="https://komalfatima.com" style="color: #D4AF37; text-decoration: none;">komalfatima.com</a></p>
          </div>
        </div>
      `,
    });

    if (data.error) throw new Error(data.error.message);
    return { success: true, id: data.data?.id };
  } catch (error: any) {
    console.error('Email Dispatch Error:', error);
    return { success: false, error: error.message || 'Failed to dispatch email' };
  }
}
