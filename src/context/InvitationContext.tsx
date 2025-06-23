import React, { createContext, useContext, useState } from 'react';

export interface Invitation {
  id: string;
  location: string;
  date: string;
  time: string;
  tableNumber: string;
  guestName: string;
  hostName: string;
  email: string;
  message: string;
  createdAt: string;
  response?: 'accepted' | 'declined' | null;
  responseDate?: string;
}

interface InvitationContextType {
  addInvitation: (invitation: Omit<Invitation, 'id' | 'createdAt'>) => Promise<string>;
  getInvitation: (id: string) => Promise<Invitation | undefined>;
  sendResponse: (id: string, response: 'accepted' | 'declined') => Promise<void>;
}

const InvitationContext = createContext<InvitationContextType | undefined>(undefined);

export function InvitationProvider({ children }: { children: React.ReactNode }) {
  // Backend API url-ийг production болон development орчинд тохируулах
  const API_BASE_URL = process.env.NODE_ENV === 'production' 
    ? 'https://bolziy.onrender.com' 
    : 'http://localhost:4000';
    
  const API_URL = `${API_BASE_URL}/api/invitations`;

  // Урилга үүсгэх
  const addInvitation = async (invitationData: Omit<Invitation, 'id' | 'createdAt'>): Promise<string> => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invitationData)
    });
    if (!res.ok) throw new Error('Урилга үүсгэхэд алдаа гарлаа');
    const data = await res.json();
    return data.id;
  };

  // Урилга авах
  const getInvitation = async (id: string): Promise<Invitation | undefined> => {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) return undefined;
    return await res.json();
  };

  // Урилгын хариулт илгээх
  const sendResponse = async (id: string, response: 'accepted' | 'declined'): Promise<void> => {
    const res = await fetch(`${API_URL}/${id}/response`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ response })
    });
    if (!res.ok) throw new Error('Хариулт илгээхэд алдаа гарлаа');
  };

  return (
    <InvitationContext.Provider value={{ addInvitation, getInvitation, sendResponse }}>
      {children}
    </InvitationContext.Provider>
  );
}

export function useInvitations() {
  const context = useContext(InvitationContext);
  if (context === undefined) {
    throw new Error('useInvitations must be used within an InvitationProvider');
  }
  return context;
}