import guarded from './Guarded.js';

export default guarded(req => String(req.product.userId) === String(req.auth.id));