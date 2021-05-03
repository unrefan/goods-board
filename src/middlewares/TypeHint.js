import BaseRepository from '../repositories/base.js';

export default async (req, res, next) => {
  const resource = Object.keys(req.params)[0];
  const param = req.params[resource];

  try {
    req.mapped = {
      [resource]: await BaseRepository(resource).findById(param)
    };

    next();
  } catch (e) {
    next(e);
  }
};
