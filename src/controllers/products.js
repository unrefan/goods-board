import ProductRepository, {deserializePrice} from '../repositories/product.js';
import ProductResource from '../resources/ProductResource.js';

export const index = async (req, res, next) => {
  try {
    const products = await ProductRepository.all({
	  where: {
        AND: [
		  {title: {contains: req.query.title}},
		  {userId: req.query.userId},
        ]
	  },
	  orderBy: {
	    [req.query.orderBy || 'createdAt']: req.query.orderType || 'desc'
	  },
	  include: {
	    user: true,
	  }
    });

    res.json(ProductResource.collection(products));
	
  } catch(error) {
    next(error);
  }
};

export const show = async (req, res, next) => {
  try {
    const productResource = new ProductResource(req.mapped.product);

    res.json(await productResource.loadUser());
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const product = await ProductRepository.create({
      title: req.body.title,
      price: req.body.price,
      userId: req.user.id,
    }, {
      include: {
        user: true
      }
	});
	  
    res.status(201).json(ProductResource.wrap(product));
  } catch (e) {
	  next(e);
  }
};

export const update = async (req, res, next) => {
  try {
	  const updated = await ProductRepository.update(req.mapped.product.id, {
	    title: req.body.title,
	    price: req.body.price === undefined ? deserializePrice(req.mapped.product.price) : req.body.price,
	  }, {
	    include: {
		  user: true
		}
	  });

	  res.status(202).json(ProductResource.wrap(updated));
  } catch (error) {
	  next(error);
  }
};

export const destroy = async (req, res, next) => {
  try {
    await ProductRepository.delete(req.mapped.product.id);

    res.status(204).json({message: 'deleted.'});
  } catch (error) {
    next(error);
  }
};
