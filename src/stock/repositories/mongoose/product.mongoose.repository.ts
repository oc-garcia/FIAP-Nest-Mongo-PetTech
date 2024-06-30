import { IProduct } from 'src/stock/schemas/models/product.interface';
import { ProductRepository } from '../product.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from 'src/stock/schemas/product.schema';
import { Model } from 'mongoose';

export class ProductMongooseRepository implements ProductRepository {
  constructor(
    @InjectModel(Product.name) private ProductModel: Model<Product>,
  ) {}
  async createStock(product: IProduct): Promise<void> {
    const createStock = new this.ProductModel(product);
    await createStock.save();
  }
  getAllStock(limit: number, page: number): Promise<IProduct[]> {
    const offset = limit * (page - 1);
    return this.ProductModel.find().skip(offset).limit(limit).exec();
  }
  getStock(productId: string): Promise<IProduct> {
    return this.ProductModel.findById(productId).exec();
  }
  async updateStock(productId: string, stock: number): Promise<void> {
    await this.ProductModel.updateOne(
      { _id: productId },
      { quantity: stock },
    ).exec();
  }
  async deleteStock(id: string): Promise<void> {
    await this.ProductModel.deleteOne({ _id: id }).exec();
  }
}
