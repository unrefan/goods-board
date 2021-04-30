import Strategy from 'passport-local';
import prisma from '../config/database.js';
import {compare} from '../utils/hash.js';

export default passport => {
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		prisma.user.findFirst({where: {id: id}})
		  .then(user => done(null, user))
		  .catch(e => done(e));
	});
	passport.use(new Strategy({
		usernameField: 'email'
	  },
		function(email, password, done) {
		  prisma.user.findFirst({where: {email: email}})
			.then(user => {
			  if (compare(password, user.password)) {
				done(null, user);
			  }

			  done(null, false, { message: 'Incorrect password.' });
			})
			.catch(e => done(e));
		}
	));  
};
