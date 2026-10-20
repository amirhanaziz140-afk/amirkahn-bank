export interface BankCard {
  id: string;
  type: 'mastercard' | 'visa';
  number: string;
  holder: string;
  expiry: string;
  cvv: string;
}

export const cards: BankCard[] = [
  { id: '1', type: 'mastercard', number: '4562 1122 4595 7852', holder: 'AR Jonson', expiry: '24/2000', cvv: '6986' },
  { id: '2', type: 'visa', number: '4562 1122 4595 7852', holder: 'Smith Jonson', expiry: '24/2000', cvv: '1234' },
];
