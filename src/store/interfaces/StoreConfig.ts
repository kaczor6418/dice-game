import { StoreIndex } from '@/store/interfaces/StoreIndex';

export interface StoreConfig {
  storeName: string;
  indexes: StoreIndex[];
  autoIncrement: boolean;
}
