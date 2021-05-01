import UserRepository from '../repositories/user.js';

export const index = async (req, res, next) => {
  const users = await UserRepository.all();

  res.json(users);
};

export const show = (req, res, next) => {
  res.json(req.user);
};

export const store = async (req, res, next) => {
  console.log(req);
  res.status(201).json(await UserRepository.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  }));
};

export const update = async (req, res, next) => {
  res.status(202).json(await UserRepository.update(req.user.id, {
    name: req.body.name,
    email: req.body.email,
  }));
};

export const destroy = async (req, res, next) => {
  await UserRepository.delete(req.user.id);

  res.status(204).json({message: 'deleted'});
};
