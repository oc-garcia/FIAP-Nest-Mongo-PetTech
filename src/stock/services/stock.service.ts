import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repository';
import { IProduct } from '../schemas/models/product.interface';

@Injectable()
export class StockService {
  constructor(private readonly productRepository: ProductRepository) {}

  async createStock(product: IProduct) {
    return this.productRepository.createStock(product);
  }

  async getAllStock(limit: number, page: number) {
    return this.productRepository.getAllStock(limit, page);
  }

  async getStock(productId: string) {
    const products = await this.productRepository.getStock(productId);
    if (!products) throw new NotFoundException('Product not found');

    return products;
  }

  async updateStock(productId: string, stock: number) {
    return this.productRepository.updateStock(productId, stock);
  }

  async deleteStock(id: string) {
    return this.productRepository.deleteStock(id);
  }
}
