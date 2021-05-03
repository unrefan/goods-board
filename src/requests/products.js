import validation from '../middlewares/validation.js';

export const create = validation({
  title: ['required', 'string', 'min:3', 'max:255'],
  price: ['required', 'numeric', 'min:0'],
});

export const update = validation({
  title: ['string', 'min:3', 'max:255'],
  price: ['numeric', 'min:0'],
});

export const upload = validation({
  file: ['required', 'size:10']
});
