import { IProduct } from '../schemas/models/product.interface';

export abstract class ProductRepository {
  abstract createStock(product: IProduct): Promise<void>;
  abstract getAllStock(limit: number, page: number): Promise<IProduct[]>;
  abstract getStock(productId: string): Promise<IProduct>;
  abstract updateStock(productId: string, stock: number): Promise<void>;
  abstract deleteStock(id: string): Promise<void>;
}
