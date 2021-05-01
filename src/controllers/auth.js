import passport from 'passport';

export const login = passport.authenticate('local', {
  successRedirect: '/api/users',
  failureRedirect: '/login',
  failureFlash: true
});
