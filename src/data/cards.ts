export interface BankCard {
  id: string;
  type: 'mastercard' | 'visa';
  number: string;
  holder: string;
  expiry: string;
  cvv: string;
}

export const cards: BankCard[] = [
  { id: '1', type: 'mastercard', number: '•••• •••• •••• 7852', holder: 'AR Jonson', expiry: '24/2000', cvv: '•••' },
  { id: '2', type: 'visa', number: '•••• •••• •••• 7852', holder: 'Smith Jonson', expiry: '24/2000', cvv: '•••' },
];
