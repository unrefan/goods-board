import {BaseRepository} from './base.js';
import {hash} from '../utils/hash.js';

export class UserRepository extends BaseRepository {
  constructor() {
    super('user');
  }
  async findByEmail(email) {
    return await this.findBy(email, 'email');
  }
  async create(payload = {}) {
    return await super.create({...payload, password: hash(payload.password)});
  }
}

export default new UserRepository();