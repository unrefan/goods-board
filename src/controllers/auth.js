import passport from 'passport';
import UserResource from '../resources/UserResource.js';
import UserRepository from '../repositories/user.js';

export const login = (req, res, next) => {
  passport.authenticate('local', (error, user, flash) => {
    if (error) {
      return next(error);
    }

    if (!user) {
      return res.status(401).json(flash);
    }
    req.login(user, () => res.json({}));
  })(req, res);
};

export const logout = (req, res, next) => {
  req.logout();
  res.status(200).json({});
};

export const me = (req, res, next) => {
  res.json(UserResource.wrap(req.user));
};

export const update = (req, res, next) => {
  UserRepository.update(req.user.id, {
    name: req.body.name || req.user.name,
    phone: req.body.phone || req.user.phone,
    email: req.body.email || req.user.email,
    password: req.body.currentPassword ? req.body.newPassword : undefined,
  })
    .then(user => res.status(202).json(UserResource.wrap(user)))
    .catch(e => next(e));
};
