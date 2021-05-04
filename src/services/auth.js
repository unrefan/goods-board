import passport from 'passport';
import LocalStrategy from 'passport-local';
import {compare} from '../utils/hash.js';
import UserRepository from '../repositories/user.js';
import ValidationError from '../exceptions/ValidationError.js';
import jwt from 'passport-jwt';

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  UserRepository.findById(id)
    .then(user => done(null, user))
    .catch(e => done(e));
});

passport.use(new LocalStrategy({usernameField: 'email'},
  function(email, password, done) {
    UserRepository.findByEmail(email)
	  .then(user => {
	    if (!user) {
		  return done(new ValidationError({
            errors: {
			  email: ['Requested user does not exists.']
            }
		  }));
        }
	    
        if (compare(password, user.password)) {
		  return done(null, user);
        }

        done(new ValidationError({
		  errors: {
            passport: ['Incorrect password.']
		  }
        }));
	  })
	  .catch(e => done(e));
  }
));

const options = {
  jwtFromRequest: jwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.APP_KEY,
};

passport.use(new jwt.Strategy(options, (jwtPayload, cb) => {
  UserRepository.findById(jwtPayload.id)
    .then(user => {
	  return cb(null, user);
    })
    .catch(err => {
	  return cb(err);
    });
}));

export default passport;