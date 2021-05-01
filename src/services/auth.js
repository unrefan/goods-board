import passport from 'passport';
import Strategy from 'passport-local';
import {compare} from '../utils/hash.js';
import UserRepository from '../repositories/user.js';

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
		  done(null, false, { message: 'Requested user dont exists.' });
        }
	    
        if (compare(password, user.password)) {
		  done(null, user);
        }

        done(null, false, { message: 'Incorrect password.' });
	  })
	  .catch(e => done(e));
  }
));

export default passport;