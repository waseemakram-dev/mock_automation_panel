// WhatsApp Green API & Safe Sender Integration Engine

export async function sendWhatsAppMessage(
  instanceId: string,
  apiToken: string,
  phoneNumber: string,
  message: string
) {
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');

  const inst = instanceId || process.env.NEXT_PUBLIC_GREEN_API_INSTANCE_ID || '710722688449';
  const token = apiToken || process.env.NEXT_PUBLIC_GREEN_API_TOKEN || '1871743456904db2819cdf711f2148fe4166012bb1194efb91';

  const url = `https://api.green-api.com/waInstance${inst}/sendMessage/${token}`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chatId: `${cleanPhone}@c.us`,
        message: message,
      }),
    });

    const data = await res.json();
    if (res.ok && data.idMessage) {
      return { success: true, id: data.idMessage };
    }
    throw new Error(data.message || 'WhatsApp Green API send failed');
  } catch (error: any) {
    console.error('WhatsApp API Error:', error);
    return { success: false, error: error.message || 'Failed to dispatch WhatsApp message' };
  }
}

export async function sendWhatsAppFileByUrl(
  phoneNumber: string,
  urlFile: string,
  fileName: string,
  caption: string = ''
) {
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  const inst = process.env.NEXT_PUBLIC_GREEN_API_INSTANCE_ID || '710722688449';
  const token = process.env.NEXT_PUBLIC_GREEN_API_TOKEN || '1871743456904db2819cdf711f2148fe4166012bb1194efb91';

  const url = `https://api.green-api.com/waInstance${inst}/sendFileByUrl/${token}`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chatId: `${cleanPhone}@c.us`,
        urlFile: urlFile,
        fileName: fileName,
        caption: caption,
      }),
    });

    const data = await res.json();
    if (res.ok && data.idMessage) {
      return { success: true, id: data.idMessage };
    }
    throw new Error(data.message || 'Send file failed');
  } catch (error: any) {
    console.error('WhatsApp File Error:', error);
    return { success: false, error: error.message };
  }
}

export async function getGreenApiChats() {
  const inst = process.env.NEXT_PUBLIC_GREEN_API_INSTANCE_ID || '710722688449';
  const token = process.env.NEXT_PUBLIC_GREEN_API_TOKEN || '1871743456904db2819cdf711f2148fe4166012bb1194efb91';

  const url = `https://api.green-api.com/waInstance${inst}/getChats/${token}`;

  try {
    const res = await fetch(url, { method: 'POST' });
    const data = await res.json();
    if (res.ok && Array.isArray(data)) {
      return data
        .filter((chat: any) => chat.type === 'user' && chat.id.includes('@c.us'))
        .map((chat: any, idx: number) => {
          const phone = chat.id.replace('@c.us', '');
          const score = Math.min(10, Math.max(3, 9 - (idx % 6)));
          return {
            id: chat.id,
            phone: phone,
            name: chat.name || `+${phone}`,
            companyName: chat.name || `WhatsApp Contact (+${phone})`,
            niche: phone.startsWith('61') ? 'HOME_RENOVATION' : 'TRADE_SERVICES',
            country: phone.startsWith('61') ? 'AUSTRALIA' : 'USA',
            status: score >= 7 ? 'HOT' : 'WARM',
            score: score,
            timeAgo: `${(idx % 12) + 1} hours ago`
          };
        });
    }
    return [];
  } catch (error) {
    console.error('Fetch chats error:', error);
    return [];
  }
}

export async function getGreenApiChatHistory(phoneNumber: string, count: number = 30) {
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  const inst = process.env.NEXT_PUBLIC_GREEN_API_INSTANCE_ID || '710722688449';
  const token = process.env.NEXT_PUBLIC_GREEN_API_TOKEN || '1871743456904db2819cdf711f2148fe4166012bb1194efb91';

  const url = `https://api.green-api.com/waInstance${inst}/getChatHistory/${token}`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chatId: cleanPhone.includes('@c.us') ? cleanPhone : `${cleanPhone}@c.us`,
        count: count,
      }),
    });

    const data = await res.json();
    if (res.ok && Array.isArray(data)) {
      return data.reverse().map((msg: any) => ({
        id: msg.idMessage,
        type: msg.type === 'outgoing' ? 'outgoing' : 'incoming',
        text: msg.textMessage || msg.extendedTextMessage?.text || (msg.type === 'outgoing' ? 'Sent message' : 'Incoming message'),
        timestamp: new Date((msg.timestamp || Date.now() / 1000) * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sender: msg.senderName || msg.chatId,
        fileUrl: msg.downloadUrl || msg.fileUrl || null,
        typeMessage: msg.typeMessage || 'text',
      }));
    }
    return [];
  } catch (error) {
    console.error('Fetch chat history error:', error);
    return [];
  }
}

export function calculateSafetyDelay(minSeconds: number = 45, maxSeconds: number = 120): number {
  const min = Math.max(30, minSeconds);
  const max = Math.max(min + 10, maxSeconds);
  return Math.floor(Math.random() * (max - min + 1) + min) * 1000;
}
