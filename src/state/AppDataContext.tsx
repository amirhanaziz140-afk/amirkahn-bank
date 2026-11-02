import React, { createContext, useContext, useState } from 'react';
import { cards as demoCards, BankCard } from '../data/cards';
import { user as demoUser } from '../data/profile';

type Profile = typeof demoUser;
type AppData = {
  cards: BankCard[];
  addCard: (card: Omit<BankCard, 'id'>) => void;
  profile: Profile;
  updateProfile: (updates: Pick<Profile, 'name' | 'fullName' | 'email' | 'phone' | 'birth'>) => void;
  languageId: string;
  setLanguageId: (id: string) => void;
};

const AppDataContext = createContext<AppData | null>(null);

// Demo state, held in memory. This application does not connect to a bank or save real cards.
export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const [cards, setCards] = useState<BankCard[]>(demoCards);
  const [profile, setProfile] = useState<Profile>(demoUser);
  const [languageId, setLanguageId] = useState('en');

  const addCard: AppData['addCard'] = card =>
    setCards(previous => [...previous, { ...card, id: `demo-${Date.now()}` }]);
  const updateProfile: AppData['updateProfile'] = updates =>
    setProfile(previous => ({ ...previous, ...updates }));

  return (
    <AppDataContext.Provider value={{ cards, addCard, profile, updateProfile, languageId, setLanguageId }}>
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const value = useContext(AppDataContext);
  if (!value) throw new Error('useAppData must be used inside AppDataProvider');
  return value;
}
