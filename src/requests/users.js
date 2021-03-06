import validation from '../middlewares/validation.js';

export const create = validation({
  phone: ['string', 'between:10,13', 'regex:/^\\+380[0-9]{9,13}/'],
  name: ['required', 'string', 'min:3', 'max:255'],
  email: ['required', 'email', 'max:255', 'unique:user,email'],
  password: ['required', 'string', 'min:6', 'max:255'],
});

export const updateCurrent = (req, res, next) => validation({
  phone: ['string', 'between:10,13', 'regex:/^\\+380[0-9]{9,13}/'],
  name: ['string', 'min:3', 'max:255'],
  email: ['string', 'email', 'max:255', `unique:user,email,id,${req.auth.id}`],
  currentPassword: ['string', 'min:6', 'max:255'],
  newPassword: ['required_with:currentPassword', 'same:currentPassword', 'string', 'min:6', 'max:255'],
})(req, res, next);
