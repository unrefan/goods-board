import Resource from './Resource.js';
import UserRepository from '../repositories/user.js';
import UserResource from './UserResource.js';
import {deserializePrice} from '../repositories/product.js';

export default class ProductResource extends Resource {
  constructor(product = {}) {
    super(product);
    this.user = this.user ? UserResource.wrap(this.user) : undefined;
    this.price = deserializePrice(this.price);
  }
  static wrap(product = {}) {
    return new ProductResource(product);
  }
  static collection(products = []) {
    return products.map(product => new ProductResource(product));
  }
  async loadUser() {
    if (!this.user) {
      try {
        this.user = await UserRepository.findById(this.userId);
      } catch (error) {
        console.error(error);

        this.user = {};
      }
    }
    return Object.assign(this, {
      user: UserResource.wrap(this.user)
    });
  }
}