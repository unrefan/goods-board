import db from '../config/database.js';

export default async (req, res, next) => {
	const param = req.params[0];
	const resource = Object.keys(req.params)[0];
	const instance = await db[resource].findFirst({where: {id: param}});

	if (!instance) {
	  throw new Error(`${resource} [${param}] not found`);
	}

  	req[resource] = instance;
  
	next();
};
