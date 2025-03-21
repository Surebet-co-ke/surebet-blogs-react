import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
	let token;
  
	if (
	  req.headers.authorization &&
	  req.headers.authorization.startsWith('Bearer')
	) {
	  try {
		token = req.headers.authorization.split(' ')[1];
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
		const user = await User.findByPk(decoded.id, { attributes: ['name', 'email', 'isAdmin'] });
		if (!user) {
		  throw new Error('User not found');
		}
  
		req.user = user;
		next();
	  } catch (err) {
		console.error(err);
		throw new Error('Not authorized, token failed');
	  }
	} else {
	  throw new Error('Token not found');
	}
});

  
const admin = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		res.status(401);
		throw new Error('Not authorized. Only for administrators.');
	}
};

export { protect, admin };
