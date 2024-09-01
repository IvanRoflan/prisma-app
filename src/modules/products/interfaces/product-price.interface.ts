import { Decimal } from '@prisma/client/runtime/library';
import { ProductStore } from './product-store.interface';

export interface ProductPrice {
  amount: Decimal;
  currency: string;
  store: ProductStore;
}
