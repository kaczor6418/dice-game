import { StoreConfig } from '@/store/interfaces/StoreConfig';

export const diceStoreConfig: StoreConfig = {
  storeName: 'DiceHistory',
  indexes: [
    { key: 'round', isUnique: true },
    { key: 'score', isUnique: false },
    { key: 'dice', isUnique: false },
    { key: 'guess', isUnique: false }
  ],
  autoIncrement: true
};
