import UserRepository from '../repositories/user.js';
import UserResource from '../resources/UserResource.js';
import {searchIn} from '../utils/prizma.js';
import {generate} from '../utils/jsonWebToken.js';

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
  res.json(UserResource.wrap(req.user));
};

export const store = async (req, res, next) => {
  try {
    const user = await UserRepository.create({
      phone: req.body.phone,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    req.login(user, {session: false}, (error) => {
      if (error) return next(error);
      res.status(201).json({
        token: generate(user),
      });
    });
  } catch (e) {
    next(e);
  }
};

export const destroy = async (req, res, next) => {
  try {
    await UserRepository.delete(req.user.id);

    res.status(204).json({});
  } catch (e) {
    next(e);
  }
};
