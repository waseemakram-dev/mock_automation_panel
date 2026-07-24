export type NicheType = 
  | 'GROCERIES'
  | 'ECOMMERCE'
  | 'GIFTS'
  | 'PHARMA'
  | 'BAKERY'
  | 'RETAIL';

export type CountryType = 'LAHORE' | 'PAKISTAN';

export type LeadStatus = 
  | 'NEW'
  | 'PENDING'
  | 'DISPATCHED'
  | 'IN_TRANSIT'
  | 'DELIVERED'
  | 'RETURNED'
  | 'CANCELLED';

export interface Lead {
  id?: string;
  name: string;
  companyName: string;
  niche: NicheType;
  country: CountryType;
  email: string;
  phone: string;
  website?: string;
  status: LeadStatus;
  hasWhatsApp?: boolean;
  score?: number;
  qualificationSummary?: string;
  aiPersonalizedNote?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  source: 'CSV_IMPORT' | 'MANUAL' | 'WEB';
  createdAt?: string;
}

export interface Campaign {
  id?: string;
  title: string;
  targetNiche: NicheType;
  targetCountry: CountryType;
  channel: 'WHATSAPP' | 'EMAIL' | 'BOTH';
  templateId?: string;
  customPitch?: string;
  status: 'DRAFT' | 'SCHEDULED' | 'RUNNING' | 'PAUSED' | 'COMPLETED';
  dailyLimit: number;
  minDelaySeconds: number;
  maxDelaySeconds: number;
  stats: {
    totalLeads: number;
    sentCount: number;
    deliveredCount: number;
    replyCount: number;
    failedCount: number;
  };
  createdAt?: string;
}

export interface Template {
  id?: string;
  name: string;
  channel: 'WHATSAPP' | 'EMAIL';
  subject?: string;
  body: string;
  niche: NicheType;
  attachmentUrl?: string;
  attachmentName?: string;
  aiEnhanceEnabled: boolean;
  createdAt?: string;
}

export interface AppSettings {
  openaiApiKey?: string;
  apifyApiKey?: string;
  greenApiInstanceId?: string;
  greenApiToken?: string;
  resendApiKey?: string;
  senderEmail?: string;
  senderName?: string;
}
