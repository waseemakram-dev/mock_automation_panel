// Mock data store for demo purposes - no Firebase needed

import { Lead, Campaign, NicheType, CountryType, LeadStatus } from './types';

// Mock Leads Data
const mockLeads: Lead[] = [
  {
    id: 'lead-1',
    name: 'Ahmed Khan',
    companyName: 'Sapphire textiles',
    niche: 'ECOMMERCE',
    country: 'LAHORE',
    email: 'ahmed@sapphire.pk',
    phone: '+923211234567',
    website: 'https://sapphire.pk',
    status: 'DELIVERED',
    hasWhatsApp: true,
    score: 92,
    qualificationSummary: 'High volume ecommerce - 200+ orders daily',
    source: 'MANUAL',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'lead-2',
    name: 'Fatima Ali',
    companyName: 'Cozmetica Beauty',
    niche: 'ECOMMERCE',
    country: 'LAHORE',
    email: 'fatima@cozmetica.pk',
    phone: '+923331234567',
    website: 'https://cozmetica.pk',
    status: 'IN_TRANSIT',
    hasWhatsApp: true,
    score: 88,
    qualificationSummary: 'Beauty brand - 80+ daily deliveries needed',
    source: 'WEB',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'lead-3',
    name: 'Hassan Raza',
    companyName: 'Nishat Mills',
    niche: 'RETAIL',
    country: 'LAHORE',
    email: 'hassan@nishat.com',
    phone: '+923001234567',
    status: 'DISPATCHED',
    hasWhatsApp: true,
    score: 95,
    qualificationSummary: 'Major retail chain - bulk delivery contract',
    source: 'MANUAL',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'lead-4',
    name: 'Sara Malik',
    companyName: 'Jenpharm Pharma',
    niche: 'PHARMA',
    country: 'LAHORE',
    email: 'sara@jenpharm.com',
    phone: '+923111234567',
    website: 'https://jenpharm.com',
    status: 'PENDING',
    hasWhatsApp: true,
    score: 85,
    qualificationSummary: 'Pharmaceutical delivery - temperature sensitive',
    source: 'CSV_IMPORT',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'lead-5',
    name: 'Usman Sheikh',
    companyName: 'Dekcrate Gifts',
    niche: 'GIFTS',
    country: 'LAHORE',
    email: 'usman@dekcrate.pk',
    phone: '+923451234567',
    status: 'DELIVERED',
    hasWhatsApp: true,
    score: 78,
    qualificationSummary: 'Gift delivery service - same day delivery focus',
    source: 'WEB',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'lead-6',
    name: 'Bilal Ahmed',
    companyName: 'MnM Fashion',
    niche: 'ECOMMERCE',
    country: 'LAHORE',
    email: 'bilal@mnmfashion.pk',
    phone: '+923221234567',
    website: 'https://mnmfashion.pk',
    status: 'IN_TRANSIT',
    hasWhatsApp: true,
    score: 90,
    qualificationSummary: 'Fashion ecommerce - Instagram store 150+ orders',
    source: 'MANUAL',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'lead-7',
    name: 'Ayesha Noor',
    companyName: 'Preet Pret',
    niche: 'RETAIL',
    country: 'LAHORE',
    email: 'ayesha@preetpret.com',
    phone: '+923341234567',
    status: 'PENDING',
    hasWhatsApp: true,
    score: 82,
    qualificationSummary: 'Premium retail - same-day delivery for VIP clients',
    source: 'CSV_IMPORT',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'lead-8',
    name: 'Omar Farooq',
    companyName: 'Body & Secret',
    niche: 'ECOMMERCE',
    country: 'LAHORE',
    email: 'omar@bodysecret.pk',
    phone: '+923121234567',
    website: 'https://bodysecret.pk',
    status: 'DISPATCHED',
    hasWhatsApp: true,
    score: 87,
    qualificationSummary: 'Beauty & wellness - Shopify store 100+ orders',
    source: 'WEB',
    createdAt: new Date().toISOString(),
  },
];

// Mock Campaigns Data
const mockCampaigns: Campaign[] = [
  {
    id: 'camp-1',
    title: 'Lahore E-commerce Bulk Delivery Drive',
    targetNiche: 'ECOMMERCE',
    targetCountry: 'LAHORE',
    channel: 'WHATSAPP',
    status: 'RUNNING',
    dailyLimit: 50,
    minDelaySeconds: 45,
    maxDelaySeconds: 120,
    stats: { totalLeads: 45, sentCount: 18, deliveredCount: 18, replyCount: 6, failedCount: 0 },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'camp-2',
    title: 'Pharma & Grocery Delivery Partners',
    targetNiche: 'PHARMA',
    targetCountry: 'LAHORE',
    channel: 'BOTH',
    status: 'PAUSED',
    dailyLimit: 30,
    minDelaySeconds: 60,
    maxDelaySeconds: 150,
    stats: { totalLeads: 25, sentCount: 10, deliveredCount: 10, replyCount: 3, failedCount: 0 },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'camp-3',
    title: 'Same-Day Retail Delivery Outreach',
    targetNiche: 'RETAIL',
    targetCountry: 'LAHORE',
    channel: 'EMAIL',
    status: 'COMPLETED',
    dailyLimit: 40,
    minDelaySeconds: 30,
    maxDelaySeconds: 90,
    stats: { totalLeads: 35, sentCount: 35, deliveredCount: 32, replyCount: 12, failedCount: 3 },
    createdAt: new Date().toISOString(),
  },
];

// Mock WhatsApp Chats for Demo
export const mockWhatsAppChats = [
  {
    id: 'chat-1',
    phone: '923211234567',
    name: 'Ahmed Khan',
    companyName: 'Sapphire textiles',
    niche: 'ECOMMERCE',
    country: 'LAHORE',
    status: 'HOT' as const,
    score: 9,
    timeAgo: '2 hours ago',
  },
  {
    id: 'chat-2',
    phone: '923331234567',
    name: 'Fatima Ali',
    companyName: 'Cozmetica Beauty',
    niche: 'ECOMMERCE',
    country: 'LAHORE',
    status: 'HOT' as const,
    score: 8,
    timeAgo: '5 hours ago',
  },
  {
    id: 'chat-3',
    phone: '923001234567',
    name: 'Hassan Raza',
    companyName: 'Nishat Mills',
    niche: 'RETAIL',
    country: 'LAHORE',
    status: 'WARM' as const,
    score: 7,
    timeAgo: '1 day ago',
  },
  {
    id: 'chat-4',
    phone: '923111234567',
    name: 'Sara Malik',
    companyName: 'Jenpharm Pharma',
    niche: 'PHARMA',
    country: 'LAHORE',
    status: 'WARM' as const,
    score: 6,
    timeAgo: '2 days ago',
  },
  {
    id: 'chat-5',
    phone: '923451234567',
    name: 'Usman Sheikh',
    companyName: 'Dekcrate Gifts',
    niche: 'GIFTS',
    country: 'LAHORE',
    status: 'HOT' as const,
    score: 8,
    timeAgo: '3 hours ago',
  },
];

// Mock Chat Messages for Demo
export const mockChatMessages: Record<string, any[]> = {
  '923211234567': [
    {
      id: 'msg-1',
      type: 'incoming',
      text: 'Hi, I need reliable delivery for my ecommerce orders. How fast can you deliver in Lahore?',
      timestamp: '10:30 AM',
    },
    {
      id: 'msg-2',
      type: 'outgoing',
      text: 'AssalamuAlaikum! QWQER Pakistan offers instant, same-day, and next-day delivery across Lahore. For your ecommerce orders, we can deliver within 2-4 hours with live tracking.',
      timestamp: '10:32 AM',
    },
    {
      id: 'msg-3',
      type: 'incoming',
      text: 'That sounds great! We process about 200 orders daily. Do you support bulk uploads?',
      timestamp: '10:35 AM',
    },
    {
      id: 'msg-4',
      type: 'outgoing',
      text: 'Absolutely! Our platform supports bulk order uploads. You can upload hundreds of orders at once through our web portal or API. We also provide dedicated rider coordination for high-volume sellers like Sapphire.',
      timestamp: '10:37 AM',
    },
    {
      id: 'msg-5',
      type: 'incoming',
      text: 'Perfect! Can you share your pricing and how to get started?',
      timestamp: '10:40 AM',
    },
  ],
  '923331234567': [
    {
      id: 'msg-1',
      type: 'incoming',
      text: 'We need same-day delivery for our beauty products. Is temperature control available?',
      timestamp: '2:15 PM',
    },
    {
      id: 'msg-2',
      type: 'outgoing',
      text: 'WaAlaikumAssalam! Yes, QWQER provides careful handling for beauty and cosmetics. Our riders use secure packaging to ensure products reach customers in perfect condition.',
      timestamp: '2:18 PM',
    },
    {
      id: 'msg-3',
      type: 'incoming',
      text: 'We have about 80 orders daily from our Instagram store. What areas do you cover?',
      timestamp: '2:22 PM',
    },
  ],
  '923001234567': [
    {
      id: 'msg-1',
      type: 'incoming',
      text: 'Looking for a delivery partner for our retail chain. Need reliable bulk delivery.',
      timestamp: 'Yesterday',
    },
    {
      id: 'msg-2',
      type: 'outgoing',
      text: 'Hello! QWQER Pakistan specializes in bulk delivery solutions for retail businesses. We offer scheduled pickups, dedicated riders, and real-time tracking for all your store deliveries.',
      timestamp: 'Yesterday',
    },
  ],
};

// In-memory store
let leadsStore = [...mockLeads];
let campaignsStore = [...mockCampaigns];

export function getLeads(): Lead[] {
  return leadsStore;
}

export function addLead(lead: Lead): Lead {
  const newLead = { ...lead, id: `lead-${Date.now()}` };
  leadsStore.unshift(newLead);
  return newLead;
}

export function getCampaigns(): Campaign[] {
  return campaignsStore;
}

export function addCampaign(campaign: Campaign): Campaign {
  const newCampaign = { ...campaign, id: `camp-${Date.now()}` };
  campaignsStore.unshift(newCampaign);
  return newCampaign;
}

export function updateCampaign(id: string, data: Partial<Campaign>): Campaign | null {
  const idx = campaignsStore.findIndex(c => c.id === id);
  if (idx >= 0) {
    campaignsStore[idx] = { ...campaignsStore[idx], ...data };
    return campaignsStore[idx];
  }
  return null;
}

export function getWhatsAppChats() {
  return mockWhatsAppChats;
}

export function getWhatsAppChatHistory(phone: string) {
  return mockChatMessages[phone] || [];
}
