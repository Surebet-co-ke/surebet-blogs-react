import express from 'express';

import {
	authUser,
	deleteUser,
	getUserByID,
	getUserProfile,
	getUsers,
	registerUser,
	updateUser,
	updateUserProfile,
} from '../controllers/userController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/login').post(authUser);
router.route('/').post(registerUser);
router.route('/profile').get(protect, getUserProfile);
router.route('/profile').put(protect, updateUserProfile);
router.route('/').get(protect, getUsers);
router.route('/:id').delete(protect, admin,  deleteUser);
router.route('/:id').get(protect, getUserByID);
router.route('/:id').put(protect, admin, updateUser);

export default router;