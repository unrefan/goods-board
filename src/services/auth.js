import passport from 'passport';
import Strategy from 'passport-local';
import {compare} from '../utils/hash.js';
import UserRepository from '../repositories/user.js';
import ValidationError from '../exceptions/ValidationError.js';

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  UserRepository.findById(id)
    .then(user => done(null, user))
    .catch(e => done(e));
});

passport.use(new Strategy({usernameField: 'email'},
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

export default passport;