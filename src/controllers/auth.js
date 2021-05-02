import passport from 'passport';

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

