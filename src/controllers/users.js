import UserRepository from '../repositories/user.js';
import UserResource from '../resources/UserResource.js';
import {searchIn} from '../utils/prizma.js';

export const index = async (req, res, next) => {
  try {
    const {name, email} = req.query;

    const users = await UserRepository.all({
      where: {
        ...searchIn({name, email})
      }
    });

    res.json(UserResource.collection(users));
  } catch (e) {
    next(e);
  }
};

export const show = (req, res, next) => {
  res.json(UserResource.wrap(req.mapped.user));
};

export const store = async (req, res, next) => {
  try {
    const user = await UserRepository.create({
      phone: req.body.phone,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    req.login(user, (error) => {
      if (error) return next(error);
      res.status(201).json({});
    });
  } catch (e) {
    next(e);
  }
};

export const destroy = async (req, res, next) => {
  try {
    await UserRepository.delete(req.mapped.user.id);

    res.status(204).json({});
  } catch (e) {
    next(e);
  }
};
