import Validator from 'validatorjs';
import BaseRepository from '../repositories/base.js';

Validator.registerAsync('unique', async function (value, requirement, attribute, passes) {
  try {
    const [model, key] = this.ruleValue.split(',');
    const resource = await BaseRepository(model).getClient().findFirst({where: {
      [key]: this.inputValue,
    }, select: {
      	[key]: true,
	  }
    });
    if (resource) {
      return passes(false, `The given ${key} should be unique`);
	}
    return passes();
  } catch (e) {
    passes(false, e.message);
  }
});

export default Validator;
