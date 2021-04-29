import express from 'express';
import prisma from '../config/database.js';

const router = new express.Router();

router.route('/users')
	.get((req, res, next) => {
	  prisma.user.findMany().then(users => {
	    res.json(users);
	  }).catch(e => {
	    res.status(400).json({message: e.message});
	  });
	})
	.post((req, res, next) => {
		res.send('todo');
	});

router.route('/users/:id')
	.get((req, res, next) => {
		res.send('todo');
	})
	.put((req, res, next) => {
		res.send('todo');
	})
	.delete((req, res, next) => {
		res.send('todo');
	});

export default router;