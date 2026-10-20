export interface TxIcon {
  lib: 'ion' | 'mci';
  name: string;
  color?: string;
}

export interface Transaction {
  id: string;
  title: string;
  category: string;
  amount: number; // теріс сан = шығыс
  group: 'Today' | 'Last 7 Day';
  icon: TxIcon;
}

const apple: TxIcon = { lib: 'ion', name: 'logo-apple' };
const spotify: TxIcon = { lib: 'mci', name: 'spotify', color: '#1DB954' };
const netflix: TxIcon = { lib: 'mci', name: 'netflix', color: '#E50914' };
const transfer: TxIcon = { lib: 'ion', name: 'download-outline' };
const grocery: TxIcon = { lib: 'ion', name: 'cart-outline', color: '#F26B5B' };

export const transactions: Transaction[] = [
  { id: '1', title: 'Apple Store', category: 'Entertainment', amount: -5.99, group: 'Today', icon: apple },
  { id: '2', title: 'Spotify', category: 'Music', amount: -12.99, group: 'Today', icon: spotify },
  { id: '3', title: 'Money Transfer', category: 'Transaction', amount: 300, group: 'Today', icon: transfer },
  { id: '4', title: 'Grocery', category: 'Shopping', amount: -88, group: 'Today', icon: grocery },
  { id: '5', title: 'Netflix', category: 'Entertainment', amount: -5.99, group: 'Last 7 Day', icon: netflix },
  { id: '6', title: 'Apple Store', category: 'Entertainment', amount: -5.99, group: 'Last 7 Day', icon: apple },
  { id: '7', title: 'Spotify', category: 'Music', amount: -12.99, group: 'Last 7 Day', icon: spotify },
  { id: '8', title: 'Money Transfer', category: 'Transaction', amount: 300, group: 'Last 7 Day', icon: transfer },
  { id: '9', title: 'Grocery', category: 'Shopping', amount: -88, group: 'Last 7 Day', icon: grocery },
];

export const formatAmount = (n: number): string => {
  const abs = Math.abs(n);
  const s = Number.isInteger(abs) ? String(abs) : abs.toFixed(2).replace('.', ',');
  return n < 0 ? `- $${s}` : `$${s}`;
};
