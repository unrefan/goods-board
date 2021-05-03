import Resource from './Resource.js';

export default class UserResource extends Resource {
  constructor(user = {}) {
    super(user, ['password']);
  }
  static wrap(user = {}) {
    return new UserResource(user);
  }
  static collection(users = []) {
    return users.map(user => new UserResource(user));
  }
}