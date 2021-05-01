import validation from '../middlewares/validation.js';

export const create = validation({
  name: ['required', 'string', 'min:3'],
  email: ['required', 'email'],
  password: ['required', 'string', 'min:6'],
});

export const update = validation({
  name: ['required', 'string', 'min:3'],
  email: ['required', 'email'],
  password: ['required', 'string', 'min:6'],
});
