import { WarehouseStock } from '@prisma/client';
import { ProductCategory } from './product-category.interface';
import { ProductPrice } from './product-price.interface';
import { ProductStoreStock } from './product-store-stock.interface';

export interface SingleProduct {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  categories: ProductCategory[];
  prices: ProductPrice[];
  storeStocks: ProductStoreStock[];
  warehouseStocks: WarehouseStock[];
}
