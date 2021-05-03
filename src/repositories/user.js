import {BaseRepository} from './base.js';
import {hash} from '../utils/hash.js';

export class UserRepository extends BaseRepository {
  constructor() {
    super('user');
  }
  async findByEmail(email) {
    return await this.getClient().findFirst({where: {email}});
  }
  async create(data = {}, query = {}) {
    return await super.create({
      ...data,
      password: hash(data.password)
    }, query);
  }
  async update(id, data = {}, query = {}) {
    return await super.update(id, {
      ...data,
      password: hash(data.password)
    }, query);
  }
}

export default new UserRepository();