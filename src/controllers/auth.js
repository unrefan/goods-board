import passport from 'passport';
import UserResource from '../resources/UserResource.js';
import UserRepository from '../repositories/user.js';
import {generate} from '../utils/jsonWebToken.js';

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

export const loginJWT = (req, res, next) => {
  passport.authenticate('local', {session: false}, (error, user, flash) => {
    if (error) {
      return next(error);
    }

    if (!user) {
      return res.status(401).json(flash);
    }

    req.login(user, {session: false}, (error) => {
      if (error) return next(error);

      res.json({
        token: generate(user),
      });
    });
  })(req, res);
};

export const logout = (req, res, next) => {
  req.logout();
  res.status(200).json({});
};

export const me = (req, res, next) => {
  res.json(UserResource.wrap(req.auth));
};

export const update = async (req, res, next) => {
  try {
    const user = await UserRepository.update(req.auth.id, {
      name: req.body.name || req.auth.name,
      phone: req.body.phone || req.auth.phone,
      email: req.body.email || req.auth.email,
      password: req.body.currentPassword ? req.body.newPassword : undefined,
    });

    res.status(202).json(UserResource.wrap(user));
  } catch (e) {
    next(e); 
  }
};

export const register = async (req, res, next) => {
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
