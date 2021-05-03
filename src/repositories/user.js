import {BaseRepository} from './base.js';
import {hash} from '../utils/hash.js';

export class UserRepository extends BaseRepository {
  constructor() {
    super('user');
  }
  async findByEmail(email) {
    return await this.findBy(email, 'email');
  }
  async create(data = {}) {
    return await super.create({...data, password: hash(data.password)});
  }
  async update(id, data = {}) {
    return await super.update(id, {...data, password: hash(data.password)});
  }
}

export default new UserRepository();