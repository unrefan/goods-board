import bcrypt from 'bcryptjs';

const rounds = 10

export const hash = function(password) {
  return bcrypt.hashSync(password, rounds);
}

export const compare = function(password, hash) {
  return bcrypt.compareSync(password, hash);
}
