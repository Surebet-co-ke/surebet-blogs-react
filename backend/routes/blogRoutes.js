import express from 'express';

import {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  deleteBlogsByDateRange,
  getAllBlogCategories,
   getBlogCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} from '../controllers/blogController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Blog Routes
router.route('/').get(getAllBlogs);
router.route('/:id').get(getBlogById);
router.route('/').post(protect, createBlog);
router.route('/:id').put(protect, updateBlog);
router.route('/:id').delete(protect, deleteBlog);
router.route('/delete-bulk').delete(protect, deleteBlogsByDateRange);

// Category Routes
router.route('/:blogId/categories').get(getAllBlogCategories);
router.route('/:blogId/categories/:id').get(getBlogCategoryById);
router.route('/:blogId/categories').post(protect, createCategory);
router.route('/:blogId/categories/:id').put(protect, updateCategory);
router.route('/:blogId/categories/:id').delete(protect, deleteCategory);

export default router;
