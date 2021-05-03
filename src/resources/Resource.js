export default class Resource {
  constructor(resource = {}, hidden = []) {
    const copied = {...resource};
    hidden.forEach(key => delete copied[key]);
    Object.assign(this, copied);
  }
  static wrap(resource = {}, hidden = []) {
    return new Resource(resource, hidden);
  }
  static collection(resources = [], hidden = []) {
    return resources.map(resource => new Resource(resource, hidden));
  }
}