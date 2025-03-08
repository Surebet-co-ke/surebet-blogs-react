import asyncHandler from 'express-async-handler';
import { Op } from 'sequelize';

import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';


/**
 * @desc 		Auth user
 * @route		POST /api/users/login
 * @access	 public
 */
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ where: { email } });

	if (user && (await user.matchPassword(password))) {
		res.json({
			id: user.id,
			name: user.name,
			email: user.email,
			phone: user.phone,
			isAdmin: user.isAdmin,
			role: user.role,
			token: generateToken(user.id),
		});
	} else {
		res.status(401);
		throw new Error('Invalid email or password');
	}
});


/**
 * @desc 		Get user profile
 * @route		GET /api/users/profile
 * @access	private
 */
const getUserProfile = asyncHandler(async (req, res, next) => {
	const user = await User.findByPk(req.user.id, {
		attributes: ['id', 'name', 'email', 'phone', 'role'],
	});

	if (user) {
		res.json({
			id: user.id,
			name: user.name,
			email: user.email,
			phone: user.phone,
			role: user.role,
		});
	} else {
		res.status(404);
		next(new Error('User not found'));
	}
});


/**
 * @desc 		Register new user
 * @route		POST /api/users
 * @access	 public
 */
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, phone, password, role } = req.body;

	const userExists = await User.findOne({
		where: { email: email },
	});

	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}

	const user = await User.create({
		name,
		email,
		phone,
		password,
		role,
	});

	if (user) {
		res.status(201).json({
			id: user.id,
			name: user.name,
			email: user.email,
			phone: user.phone,
			role: user.role,
			token: generateToken(user.id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});


/**
 * @desc 		Update user profile
 * @route		PUT /api/users/profile
 * @access	private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
	try {
		const user = await User.findByPk(req.body.id);

		if (user) {
			user.name = req.body.name || user.name;
			user.email = req.body.email || user.email;
			user.phone = req.body.phone || user.phone;

			if (req.body.password) {
				user.password = req.body.password;
			}

			const updatedUser = await user.save();

			res.json({
				id: updatedUser.id,
				name: updatedUser.name,
				email: updatedUser.email,
				phone: updatedUser.phone,
				role: updatedUser.role,
				isAdmin: updatedUser.isAdmin,
				token: generateToken(updatedUser.id),
			});
		} else {
			console.log('User not found.');
			res.status(404).json({ message: 'User not found' });
		}
	} catch (error) {
		console.error('Error updating user profile:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
});


/**
 * @desc    Get all users or search users by name or email
 * @route   GET /api/users/
 * @access  private/admin
 */
const getUsers = asyncHandler(async (req, res) => {
	const { search } = req.query;
	let whereCondition = {};

	if (search) {
		whereCondition = {
			[Op.or]: [
				{ name: { [Op.like]: `%${search}%` } },
				{ email: { [Op.like]: `%${search}%` } },
			],
		};
	}

	const users = await User.findAll({
		attributes: {
			exclude: ['password'],
		},
		where: whereCondition,
		order: [['created_at', 'DESC']],
	});

	res.json(users);
});


/**
 * @desc 		Delete user
 * @route		DELETE /api/users/:id
 * @access	private/admin
 */
const deleteUser = asyncHandler(async (req, res) => {
	const user = await User.findByPk(req.params.id);

	if (user) {
		await user.destroy();
		res.status(204).end();
	} else {
		res.status(404).json({ message: 'User not found' });
	}
});


/**
 * @desc 		Get user by ID
 * @route		GET /api/users/:id
 * @access	private/admin
 */
const getUserByID = asyncHandler(async (req, res) => {
	const userId = req.params.id;
	const user = await User.findByPk(userId, {
		attributes: { exclude: ['password'] },
	});

	if (user) {
		res.json(user);
	} else {
		res.status(404).json({ message: 'User not found' });
	}
});


/**
 * @desc 		Update a user
 * @route		PUT /api/users/:id
 * @access	private/admin
 */
const updateUser = asyncHandler(async (req, res) => {
	const user = await User.findByPk(req.params.id);

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		user.phone = req.body.phone || user.phone;
		user.isAdmin = req.body.isAdmin;
		user.role = req.body.role || user.role;

		if (req.body.password) {
			user.password = req.body.password;
		}

		const updatedUser = await user.save();

		res.json({
			id: updatedUser.id,
			name: updatedUser.name,
			email: updatedUser.email,
			phone: updatedUser.phone,
			role: updatedUser.role,
			isAdmin: updatedUser.isAdmin,
			token: generateToken(updatedUser.id),
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});


export {
	authUser,
	getUserProfile,
	registerUser,
	updateUserProfile,
	getUsers,
	deleteUser,
	getUserByID,
	updateUser,
};