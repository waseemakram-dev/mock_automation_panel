'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  Send, 
  Search, 
  Sparkles, 
  Paperclip, 
  Mic, 
  Square,
  Flame, 
  CheckCheck, 
  Loader2, 
  Bot, 
  RefreshCw, 
  Play, 
  Pause,
  Image as ImageIcon,
  FileText,
  ShieldCheck,
  Zap,
  Trash2,
  X,
  PhoneCall,
  MoreVertical,
  Download,
  Package
} from 'lucide-react';

interface Chat {
  id: string;
  phone: string;
  name: string;
  companyName: string;
  niche: string;
  country: string;
  status: 'HOT' | 'WARM';
  score: number;
  timeAgo: string;
}

interface ChatMessage {
  id: string;
  type: 'incoming' | 'outgoing';
  text: string;
  timestamp: string;
  fileUrl?: string;
  fileName?: string;
  fileType?: 'image' | 'pdf' | 'document';
  audioUrl?: string;
  typeMessage?: string;
}

// Mock data for demo
const mockChats: Chat[] = [
  {
    id: 'chat-1',
    phone: '923211234567',
    name: 'Ahmed Khan',
    companyName: 'Sapphire textiles',
    niche: 'ECOMMERCE',
    country: 'LAHORE',
    status: 'HOT',
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
    status: 'HOT',
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
    status: 'WARM',
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
    status: 'WARM',
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
    status: 'HOT',
    score: 8,
    timeAgo: '3 hours ago',
  },
];

const mockMessages: Record<string, ChatMessage[]> = {
  '923211234567': [
    { id: 'msg-1', type: 'incoming', text: 'Hi, I need reliable delivery for my ecommerce orders. How fast can you deliver in Lahore?', timestamp: '10:30 AM' },
    { id: 'msg-2', type: 'outgoing', text: 'AssalamuAlaikum! QWQER Pakistan offers instant, same-day, and next-day delivery across Lahore. For your ecommerce orders, we can deliver within 2-4 hours with live tracking.', timestamp: '10:32 AM' },
    { id: 'msg-3', type: 'incoming', text: 'That sounds great! We process about 200 orders daily. Do you support bulk uploads?', timestamp: '10:35 AM' },
    { id: 'msg-4', type: 'outgoing', text: 'Absolutely! Our platform supports bulk order uploads. You can upload hundreds of orders at once through our web portal or API.', timestamp: '10:37 AM' },
    { id: 'msg-5', type: 'incoming', text: 'Perfect! Can you share your pricing and how to get started?', timestamp: '10:40 AM' },
  ],
  '923331234567': [
    { id: 'msg-1', type: 'incoming', text: 'We need same-day delivery for our beauty products. Is temperature control available?', timestamp: '2:15 PM' },
    { id: 'msg-2', type: 'outgoing', text: 'WaAlaikumAssalam! Yes, QWQER provides careful handling for beauty and cosmetics. Our riders use secure packaging.', timestamp: '2:18 PM' },
    { id: 'msg-3', type: 'incoming', text: 'We have about 80 orders daily from our Instagram store. What areas do you cover?', timestamp: '2:22 PM' },
  ],
  '923001234567': [
    { id: 'msg-1', type: 'incoming', text: 'Looking for a delivery partner for our retail chain. Need reliable bulk delivery.', timestamp: 'Yesterday' },
    { id: 'msg-2', type: 'outgoing', text: 'Hello! QWQER Pakistan specializes in bulk delivery solutions for retail businesses. We offer scheduled pickups and dedicated riders.', timestamp: 'Yesterday' },
  ],
};

export default function WhatsAppWebPage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTag, setFilterTag] = useState<'ALL' | 'HOT'>('ALL');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [loadingChats, setLoadingChats] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [sendingMsg, setSendingMsg] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [suggestedAiReply, setSuggestedAiReply] = useState<string>('');
  
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<any>(null);

  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const activeAudioRef = useRef<HTMLAudioElement | null>(null);

  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const docInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedDeleteMsgId, setSelectedDeleteMsgId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchChats();
  }, []);

  async function fetchChats() {
    setLoadingChats(true);
    try {
      // Use mock data for demo
      setChats(mockChats);
      setSelectedChat(mockChats[0]);
      loadChatHistory(mockChats[0].phone);
    } catch (e) {
      console.error('Fetch chats error:', e);
    } finally {
      setLoadingChats(false);
    }
  }

  async function loadChatHistory(phone: string) {
    if (!phone) return;
    setLoadingHistory(true);
    try {
      // Use mock data for demo
      const mockMsgs = mockMessages[phone] || [];
      setMessages(mockMsgs);
    } catch (e) {
      console.error(e);
      setMessages([]);
    } finally {
      setLoadingHistory(false);
      scrollToBottom();
    }
  }

  function handleSelectChat(chat: Chat) {
    setSelectedChat(chat);
    loadChatHistory(chat.phone);
    generateAiCopilotAnalysis(chat);
  }

  async function generateAiCopilotAnalysis(chat: Chat) {
    setAiGenerating(true);
    try {
      // Mock AI response for demo
      setSuggestedAiReply(`Hi ${chat.name}! QWQER Pakistan offers fast delivery for ${chat.niche} businesses in Lahore. We handle bulk orders with live tracking. Would you like to know our pricing?`);
    } catch (e) {
      console.error(e);
    } finally {
      setAiGenerating(false);
    }
  }

  async function handleSendMessage(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!inputText.trim() || !selectedChat || sendingMsg) return;

    const newMsgText = inputText.trim();
    setInputText('');

    const tempMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      type: 'outgoing',
      text: newMsgText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, tempMsg]);
    scrollToBottom();
    setSendingMsg(true);

    try {
      // Mock send for demo
      await new Promise(r => setTimeout(r, 500));
    } catch (e) {
      console.error(e);
    } finally {
      setSendingMsg(false);
    }
  }

  async function startAudioRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);

        const newVoiceNote: ChatMessage = {
          id: `voice-${Date.now()}`,
          type: 'outgoing',
          text: 'Voice Note',
          audioUrl: audioUrl,
          typeMessage: 'audioMessage',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev, newVoiceNote]);
        scrollToBottom();
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      setRecordingSeconds(0);

      recordingTimerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Microphone access error:', err);
      alert('Microphone permission required to record voice notes.');
    }
  }

  function stopAudioRecording() {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
      clearInterval(recordingTimerRef.current);
    }
  }

  function togglePlayAudio(msgId: string, audioUrl?: string) {
    if (!audioUrl) return;

    if (playingAudioId === msgId && activeAudioRef.current) {
      activeAudioRef.current.pause();
      setPlayingAudioId(null);
    } else {
      if (activeAudioRef.current) {
        activeAudioRef.current.pause();
      }
      const audio = new Audio(audioUrl);
      activeAudioRef.current = audio;
      setPlayingAudioId(msgId);
      audio.play();
      audio.onended = () => setPlayingAudioId(null);
    }
  }

  function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>, isImage: boolean) {
    const files = e.target.files;
    if (!files || files.length === 0 || !selectedChat) return;

    const file = files[0];
    const fileUrl = URL.createObjectURL(file);
    setShowAttachMenu(false);

    const newMediaMsg: ChatMessage = {
      id: `media-${Date.now()}`,
      type: 'outgoing',
      text: isImage ? `Photo: ${file.name}` : `Document: ${file.name}`,
      fileUrl: fileUrl,
      fileName: file.name,
      fileType: isImage ? 'image' : 'pdf',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMediaMsg]);
    scrollToBottom();
  }

  function handleDeleteForMe() {
    if (!selectedDeleteMsgId) return;
    setMessages((prev) => prev.filter((m) => m.id !== selectedDeleteMsgId));
    setSelectedDeleteMsgId(null);
  }

  function handleDeleteForEveryone() {
    if (!selectedDeleteMsgId) return;
    setMessages((prev) =>
      prev.map((m) =>
        m.id === selectedDeleteMsgId
          ? { ...m, text: 'This message was deleted', fileUrl: undefined, audioUrl: undefined }
          : m
      )
    );
    setSelectedDeleteMsgId(null);
  }

  function scrollToBottom() {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  const filteredChats = chats.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.phone.includes(searchQuery);
    if (filterTag === 'HOT') return matchesSearch && c.status === 'HOT';
    return matchesSearch;
  });

  return (
    <div className="h-full w-full flex bg-[#070B12] text-[#E9EDEF] overflow-hidden select-none">
      {/* Hidden Native File Inputs */}
      <input type="file" ref={imageInputRef} accept="image/*,video/*" className="hidden" onChange={(e) => handleFileSelected(e, true)} />
      <input type="file" ref={docInputRef} accept=".pdf,.doc,.docx,.txt" className="hidden" onChange={(e) => handleFileSelected(e, false)} />

      {/* Column 1: Leads Inbox Sidebar */}
      <div className="w-80 sm:w-96 border-r border-[#1F2C34] bg-[#0F1420] flex flex-col h-full shrink-0">
        {/* Header & Search */}
        <div className="p-3.5 border-b border-[#1F2C34] space-y-3 bg-[#0F1420]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#00A651] animate-pulse" />
              <h2 className="font-bold text-white text-sm">Delivery Orders</h2>
            </div>
            <button onClick={fetchChats} className="p-1.5 text-slate-400 hover:text-[#00A651] transition rounded-lg hover:bg-slate-800" title="Sync">
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search businesses..."
              className="w-full pl-9 pr-3 py-1.5 bg-[#1F2C34] border border-transparent rounded-lg text-xs text-[#E9EDEF] placeholder-slate-400 focus:outline-none focus:border-[#00A651]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto text-[10px]">
            <button
              onClick={() => setFilterTag('ALL')}
              className={`px-3 py-1 rounded-full font-semibold transition ${
                filterTag === 'ALL' ? 'bg-[#00A651]/20 text-[#00A651] border border-[#00A651]/40' : 'bg-[#1F2C34] text-slate-400'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterTag('HOT')}
              className={`px-3 py-1 rounded-full font-semibold flex items-center gap-1 transition ${
                filterTag === 'HOT' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'bg-[#1F2C34] text-slate-400'
              }`}
            >
              <Flame className="w-3 h-3 text-rose-400" />
              <span>Hot Leads</span>
            </button>
          </div>
        </div>

        {/* Lead List */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#1F2C34]">
          {loadingChats ? (
            <div className="p-8 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-[#00A651]" />
              <span>Loading orders...</span>
            </div>
          ) : (
            filteredChats.map((chat) => {
              const isSelected = selectedChat?.id === chat.id;
              return (
                <div
                  key={chat.id}
                  onClick={() => handleSelectChat(chat)}
                  className={`p-3 flex items-start justify-between cursor-pointer transition ${
                    isSelected ? 'bg-[#1F2C34] border-l-4 border-[#00A651]' : 'hover:bg-[#1F2C34]/50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-[#00A651]/20 text-[#00A651] flex items-center justify-center font-bold text-sm shrink-0">
                      {chat.name.charAt(0) || 'B'}
                    </div>
                    <div className="min-w-0 space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-semibold text-[#E9EDEF] text-xs truncate">{chat.name}</h4>
                        {chat.status === 'HOT' && <Flame className="w-3 h-3 text-rose-400 shrink-0" />}
                      </div>
                      <p className="text-[11px] text-slate-400 font-mono">+{chat.phone}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="text-[10px] text-slate-500">{chat.timeAgo}</span>
                    <span className="px-1.5 py-0.2 rounded bg-[#00A651]/20 text-[#00A651] font-bold text-[9px] border border-[#00A651]/30">
                      {chat.score}/10
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Column 2: Chat Window */}
      {selectedChat ? (
        <div className="flex-1 flex flex-col h-full bg-[#0B141A] border-r border-[#1F2C34] relative">
          {/* Header */}
          <div className="h-16 px-6 bg-[#202C33] border-b border-[#1F2C34] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#00A651]/20 text-[#00A651] font-bold flex items-center justify-center text-sm">
                {selectedChat.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-[#E9EDEF] text-sm flex items-center gap-2">
                  {selectedChat.name}
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#00A651]/20 text-[#00A651] border border-[#00A651]/40">
                    {selectedChat.score}/10 readiness
                  </span>
                </h3>
                <p className="text-[11px] text-[#8696A0] font-mono">+{selectedChat.phone} • delivery partner</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-[#00A651]/20 text-[#00A651] border border-[#00A651]/30 text-xs font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Connected</span>
              </span>
            </div>
          </div>

          {/* Chat Feed */}
          <div className="flex-1 p-6 overflow-y-auto space-y-3 bg-[#0B141A] bg-[radial-gradient(#1f2c34_1px,transparent_1px)] [background-size:16px_16px]">
            {loadingHistory ? (
              <div className="flex items-center justify-center h-full text-slate-400 text-xs gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-[#00A651]" />
                <span>Loading conversation...</span>
              </div>
            ) : (
              messages.map((msg) => {
                const isOutgoing = msg.type === 'outgoing';
                const isPlaying = playingAudioId === msg.id;

                return (
                  <div key={msg.id} className={`flex flex-col group ${isOutgoing ? 'items-end' : 'items-start'}`}>
                    <div className={`max-w-md px-3.5 py-2 rounded-lg text-xs leading-relaxed font-sans shadow relative ${
                      isOutgoing ? 'bg-[#005C4B] text-[#E9EDEF] rounded-tr-none' : 'bg-[#202C33] text-[#E9EDEF] rounded-tl-none'
                    }`}>
                      {msg.typeMessage === 'audioMessage' || msg.audioUrl ? (
                        <div className="flex items-center gap-3 py-1">
                          <button onClick={() => togglePlayAudio(msg.id, msg.audioUrl)} className="w-8 h-8 rounded-full bg-[#00A651] text-white flex items-center justify-center hover:scale-105 transition">
                            {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
                          </button>
                          <div className="flex-1 min-w-[140px]">
                            <div className="h-1.5 w-full bg-[#111B21] rounded-full overflow-hidden">
                              <div className={`h-full ${isPlaying ? 'bg-[#00A651] animate-pulse w-3/4' : 'bg-[#00A651] w-1/3'} rounded-full transition-all`} />
                            </div>
                            <span className="text-[10px] text-slate-300 mt-1 block font-mono">Voice Note {isPlaying ? 'Playing...' : '0:14'}</span>
                          </div>
                        </div>
                      ) : (
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                      )}

                      {msg.fileType === 'image' && msg.fileUrl && (
                        <div className="mt-2 rounded-lg overflow-hidden border border-slate-700/60 max-w-xs">
                          <img src={msg.fileUrl} alt={msg.fileName || 'Image'} className="max-h-48 w-full object-cover" />
                          <div className="p-1.5 bg-[#111B21] text-[10px] text-slate-300 font-semibold truncate">{msg.fileName}</div>
                        </div>
                      )}

                      {msg.fileType === 'pdf' && msg.fileUrl && (
                        <div className="mt-2 p-2.5 rounded-lg bg-[#111B21] border border-slate-700/60 flex items-center justify-between gap-3 text-[11px] text-[#00A651] font-mono">
                          <div className="flex items-center gap-2 truncate">
                            <FileText className="w-4 h-4 shrink-0" />
                            <span className="truncate">{msg.fileName || 'Document.pdf'}</span>
                          </div>
                          <a href={msg.fileUrl} download className="p-1 text-slate-400 hover:text-white">
                            <Download className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}

                      <div className="flex items-center justify-end gap-1 text-[9px] text-slate-400 mt-1">
                        <span>{msg.timestamp}</span>
                        {isOutgoing && <CheckCheck className="w-3.5 h-3.5 text-[#53BDEB]" />}
                        <button onClick={() => setSelectedDeleteMsgId(msg.id)} className="opacity-0 group-hover:opacity-100 transition text-rose-400 hover:text-rose-300 ml-1.5" title="Delete">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* AI Reply Quick Toolbar */}
          <div className="p-2.5 bg-[#202C33] border-t border-[#1F2C34] flex items-center gap-2 text-xs">
            <button
              onClick={() => setInputText(suggestedAiReply || 'Hi! QWQER Pakistan offers fast delivery for your business. Would you like to know more?')}
              className="px-3 py-1.5 rounded-lg bg-[#00A651] text-white font-bold flex items-center gap-1.5 shadow hover:bg-[#16A34A] transition"
            >
              <Zap className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Generate AI Reply</span>
            </button>
            {suggestedAiReply && (
              <button onClick={() => setInputText(suggestedAiReply)} className="px-3 py-1.5 rounded-lg bg-[#111B21] text-slate-300 font-semibold hover:bg-[#182229] transition">
                Use last AI reply
              </button>
            )}
          </div>

          {/* Attachment Menu */}
          {showAttachMenu && (
            <div className="absolute bottom-16 left-4 bg-[#233138] border border-slate-700/80 rounded-2xl p-3 shadow-2xl space-y-2 z-40 w-56 text-xs text-[#E9EDEF]">
              <button onClick={() => imageInputRef.current?.click()} className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#182229] transition text-left">
                <div className="p-2 rounded-full bg-[#00A651]/20 text-[#00A651]">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-xs">Photos & Videos</p>
                  <span className="text-[10px] text-slate-400">Open Gallery</span>
                </div>
              </button>
              <button onClick={() => docInputRef.current?.click()} className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#182229] transition text-left">
                <div className="p-2 rounded-full bg-blue-500/20 text-blue-400">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-xs">Document / PDF</p>
                  <span className="text-[10px] text-slate-400">Open Downloads / Files</span>
                </div>
              </button>
            </div>
          )}

          {/* Delete Modal */}
          {selectedDeleteMsgId && (
            <div className="fixed inset-0 bg-navy-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-[#222E35] border border-slate-700 rounded-2xl max-w-xs w-full p-5 space-y-4 shadow-2xl relative text-xs text-white">
                <h4 className="font-bold text-sm">Delete message?</h4>
                <div className="space-y-2">
                  <button onClick={handleDeleteForEveryone} className="w-full py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold">Delete for Everyone</button>
                  <button onClick={handleDeleteForMe} className="w-full py-2.5 rounded-xl bg-[#111B21] hover:bg-[#182229] text-slate-300 font-semibold">Delete for Me</button>
                  <button onClick={() => setSelectedDeleteMsgId(null)} className="w-full py-2 text-slate-400 font-semibold">Cancel</button>
                </div>
              </div>
            </div>
          )}

          {/* Input Bar */}
          <form onSubmit={handleSendMessage} className="p-3 bg-[#202C33] border-t border-[#1F2C34] flex items-center gap-3">
            <button type="button" onClick={() => setShowAttachMenu(!showAttachMenu)} className="p-2 text-slate-400 hover:text-[#00A651] transition rounded-lg hover:bg-[#111B21]" title="Attach">
              <Paperclip className="w-5 h-5" />
            </button>

            {isRecording ? (
              <div className="flex items-center gap-2 bg-rose-500/20 px-3 py-1.5 rounded-lg border border-rose-500/40 animate-pulse">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="text-xs font-mono font-bold text-rose-400">Recording {recordingSeconds}s</span>
                <button type="button" onClick={stopAudioRecording} className="p-1 rounded bg-rose-500 text-white font-bold ml-1">
                  <Square className="w-3.5 h-3.5 fill-white" />
                </button>
              </div>
            ) : (
              <button type="button" onClick={startAudioRecording} className="p-2 text-slate-400 hover:text-[#00A651] hover:bg-[#111B21] transition rounded-lg" title="Record Voice">
                <Mic className="w-5 h-5" />
              </button>
            )}

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-[#2A3942] border border-transparent rounded-lg px-4 py-2.5 text-xs text-[#E9EDEF] placeholder-slate-400 focus:outline-none focus:border-[#00A651]"
            />

            <button type="submit" disabled={sendingMsg || !inputText.trim()} className="p-2.5 rounded-lg bg-[#00A651] text-white disabled:opacity-50 font-bold hover:bg-[#008f6f] transition">
              {sendingMsg ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 fill-white" />}
            </button>
          </form>
        </div>
      ) : null}

      {/* Column 3: AI Analysis & Sales Copilot */}
      {selectedChat && (
        <div className="w-80 sm:w-96 bg-[#0F1420] p-6 space-y-6 flex flex-col h-full overflow-y-auto shrink-0 border-l border-[#1F2C34]">
          <div className="flex items-center justify-between border-b border-[#1F2C34] pb-4">
            <h3 className="font-bold text-white text-sm">Order Analysis</h3>
            <button onClick={() => generateAiCopilotAnalysis(selectedChat)} className="px-2.5 py-1 rounded-lg bg-[#202C33] text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1">
              <RefreshCw className={`w-3 h-3 ${aiGenerating ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#00A651]/20 text-[#00A651] font-bold flex items-center justify-center text-sm">
              {selectedChat.name.charAt(0)}
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">{selectedChat.name}</h4>
              <p className="text-xs text-slate-400 font-mono">+{selectedChat.phone}</p>
            </div>
          </div>

          {/* Lead Score */}
          <div className="space-y-2 bg-[#202C33] p-4 rounded-xl">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Partner Score</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-[#00A651]">{selectedChat.score}</span>
              <span className="text-xs text-slate-400 font-bold">/ 10 readiness</span>
            </div>
            <div className="h-2 w-full bg-[#111B21] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#00A651] to-[#16A34A] rounded-full" style={{ width: `${selectedChat.score * 10}%` }} />
            </div>
            <div className="flex items-center gap-2 pt-1">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#00A651]/20 text-[#00A651] border border-[#00A651]/30">
                Hot Lead
              </span>
            </div>
          </div>

          {/* AI Summaries */}
          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-400 font-bold text-[10px] uppercase block mb-1">Summary</span>
              <p className="text-[#E9EDEF] leading-relaxed bg-[#202C33] p-3 rounded-lg">
                Business is showing strong interest in QWQER delivery services for their ecommerce operations in Lahore.
              </p>
            </div>
            <div>
              <span className="text-slate-400 font-bold text-[10px] uppercase block mb-1">Delivery Needs</span>
              <p className="text-[#E9EDEF] leading-relaxed bg-[#202C33] p-3 rounded-lg">
                Requires same-day delivery support with bulk order processing capability.
              </p>
            </div>
            <div>
              <span className="text-slate-400 font-bold text-[10px] uppercase block mb-1">Action Tip</span>
              <div className="bg-[#202C33] p-3 rounded-lg border border-[#00A651]/30 space-y-1.5">
                <div className="flex items-center gap-1.5 text-[#00A651] font-bold text-xs">
                  <Package className="w-3.5 h-3.5" />
                  <span>Quick Win</span>
                </div>
                <p className="text-[#E9EDEF] leading-relaxed">
                  Offer a free trial delivery to demonstrate QWQER's speed and tracking capabilities.
                </p>
              </div>
            </div>
          </div>

          {/* AI Suggested Response */}
          <div className="space-y-2 border-t border-[#1F2C34] pt-4">
            <span className="text-[10px] font-bold text-[#00A651] uppercase tracking-wider block">Suggested Reply</span>
            <div className="p-3.5 rounded-xl bg-[#202C33] border border-[#00A651]/30 space-y-3">
              <p className="text-xs text-slate-200 italic leading-relaxed">
                "{suggestedAiReply || 'Hi! QWQER Pakistan offers fast delivery for your business. Would you like to know more about our services?'}"
              </p>
              <button
                onClick={() => setInputText(suggestedAiReply || 'Hi! QWQER Pakistan offers fast delivery for your business.')}
                className="w-full py-2 rounded-lg bg-[#00A651] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow hover:bg-[#16A34A] transition"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Use This Reply</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
