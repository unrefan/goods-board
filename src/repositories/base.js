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
  async findById(id, query = {}) {
    const {where = {}, ...rest} = query;
    const instance = await this.getClient().findFirst({
      ...rest,
      where: {
        ...where,
        id: Number(id)
      },
    });

    if (instance === null) {
      throw new NotFound(`${this.model} [${id}] not found.`);
    }

    return instance;
  }
  async all(query = {}) {
    return await this.getClient().findMany(query);
  }
  async create(query = {}) {
    return await this.getClient().create(query);
  }
  async update(id, query = {}) {
    const {where = {}, ...rest} = query;
    return await this.getClient().update({...rest, where: {...where, id: id}});
  }
  async delete(id) {
    return await this.getClient().delete({where: {id: id}});
  }
  async paginate(page = 1, perPage = this.perPage, query = {}) {
    return await this.getClient().findMany({
      skip: (page - 1) * perPage,
      take: perPage,
      ...query,
    });
  }
}

export default model => new BaseRepository(model);