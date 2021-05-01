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
  async findBy(value, key = 'id') {
    return await this.getClient().findFirst({where: {[key]: value}});
  }
  async findById(id) {
    const instance = await this.getClient().findFirst({where: {id: Number(id)}});

    if (instance === null) {
      throw new NotFound(`${this.model} [${id}] not found.`);
    }

    return instance;
  }
  async all() {
    return await this.getClient().findMany();
  }
  async create(payload = {}) {
    return await this.getClient().create({data: payload});
  }
  async update(id, payload = {}) {
    return await this.getClient().create({where: {id: id}, data: payload});
  }
  async delete(id) {
    return await this.getClient().delete({where: {id: id}});
  }
  async paginate(page = 1, perPage = this.perPage) {
    return await this.getClient().findMany({
      skip: (page - 1) * perPage,
      take: perPage,
    });
  }
}

export default model => new BaseRepository(model);