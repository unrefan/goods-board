import prisma from '../config/database.js';
import NotFound from '../exceptions/NotFound.js';

export class BaseRepository {
  constructor(model) {
  	this.model = model;
  	this.perPage = 15;
  }
  getClient() {
    return prisma[this.model];
  }
  async findBy(value, key = 'id', select = {}) {
    return await this.getClient().findFirst({where: {[key]: value}}, select);
  }
  async findById(id, select = {}) {
    const instance = await this.getClient().findFirst({where: {id: Number(id)}}, select);

    if (instance === null) {
      throw new NotFound(`${this.model} [${id}] not found.`);
    }

    return instance;
  }
  async all(where = {}, select = {}) {
    return await this.getClient().findMany(where, select);
  }
  async create(data = {}, select = {}) {
    return await this.getClient().create({data}, select);
  }
  async update(id, data = {}, select = {}) {
    return await this.getClient().update({where: {id: id}, data}, select);
  }
  async delete(id) {
    return await this.getClient().delete({where: {id: id}});
  }
  async paginate(page = 1, where = {}, select = {}, perPage = this.perPage) {
    return await this.getClient().findMany({
      skip: (page - 1) * perPage,
      take: perPage,
      where,
    }, select);
  }
}

export default model => new BaseRepository(model);