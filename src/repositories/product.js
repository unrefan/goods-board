import {BaseRepository} from './base.js';

export function serializePrice(price) {
  return price ? price * 100 : price;
}

export function deserializePrice(price) {
  return price ? (price / 100).toFixed(2) : price;
}

export class ProductRepository extends BaseRepository {
  constructor() {
    super('product');
  }
  async create(data = {}, query = {}) {
    return super.create({
      ...data,
      price: serializePrice(data.price)
    }, query);
  }
  async update(id, data = {}, query = {}) {
    return super.update(id, {
      ...data,
      price: serializePrice(data.price)
    }, query);
  }
}

export default new ProductRepository();