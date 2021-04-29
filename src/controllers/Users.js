import express from 'express';
import prisma from '../config/database.js';
import {hash} from '../utils/hash.js';

const router = new express.Router();

router.route('/users')
	.get(async (req, res, next) => {
	  const users = await prisma.user.findMany();

	  res.json(users);
	})
	.post(async (req, res, next) => {
	  console.log(req);
		const user = await prisma.user.create({
		  data: {
		    	name: req.body.name,
				email: req.body.email,
				password: hash(req.body.password),
		  }
		});
		res.status(201).json(user);
	});

router.route('/users/:user')
	.get((req, res, next) => {
		res.json(req.user);
	})
	.put(async (req, res, next) => {
		const updated = await prisma.user.update({
		  data: {
		    	name: req.body.name,
				email: req.body.email,
		  }
		});
		res.status(202).json(updated);
	})
	.delete(async (req, res, next) => {
	  	await prisma.user.delete({where: {id: req.params.user.id}});

		res.status(204).json({message: 'deleted'});
	});

export default router;