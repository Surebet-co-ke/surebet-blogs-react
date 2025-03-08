import asyncHandler from 'express-async-handler';
import { Op } from 'sequelize';

import Blog from '../models/blogModel.js';
import Category from '../models/categoryModel.js';

/**
 * @desc    Get all blogs
 * @route   GET /api/blogs
 * @access  Public
 */
const getAllBlogs = asyncHandler(async (req, res) => {
  const { search } = req.query;
  let whereCondition = {};

  if (search) {
    whereCondition = {
      [Op.or]: [
        { title: { [Op.like]: `%${search}%` } },
        { '$categories.name$': { [Op.like]: `%${search}%` } }, // Search in associated categories
      ],
    };
  }

  const blogs = await Blog.findAll({
    include: [
      {
        model: Category,
        as: 'categories', // Ensure this matches the alias defined in the model
        attributes: ['id', 'name'], // Only fetch necessary fields
        required: false, // Left join to include blogs without categories
      },
    ],
    where: whereCondition,
    order: [['created_at', 'DESC']],
  });

  res.json(blogs);
});

/**
 * @desc    Get blog by ID
 * @route   GET /api/blogs/:id
 * @access  Public
 */
const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findByPk(req.params.id, {
    include: [
      {
        model: Category,
        as: 'categories',
        attributes: ['id', 'name'],
      },
    ],
  });

  if (blog) {
    res.json(blog);
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

/**
 * @desc    Create a blog
 * @route   POST /api/blogs
 * @access  Private/Admin
 */
const createBlog = asyncHandler(async (req, res) => {
  const { author, title, article, image, categories } = req.body;

  // Create the blog
  const blog = await Blog.create({ author, title, article, image });

  // If categories are provided, associate them with the blog
  if (categories && categories.length > 0) {
    const categoryInstances = await Category.findAll({
      where: { id: categories }, // Find categories by their IDs
    });
    await blog.setCategories(categoryInstances); // Associate categories with the blog
  }

  res.status(201).json(blog);
});

/**
 * @desc    Update a blog
 * @route   PUT /api/blogs/:id
 * @access  Private/Admin
 */
const updateBlog = asyncHandler(async (req, res) => {
  const { author, title, article, image, categories } = req.body;
  const blog = await Blog.findByPk(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }

  // Update blog fields
  blog.author = author || blog.author;
  blog.title = title || blog.title;
  blog.article = article || blog.article;
  blog.image = image || blog.image;

  // Save the updated blog
  const updatedBlog = await blog.save();

  // Update associated categories if provided
  if (categories && categories.length > 0) {
    const categoryInstances = await Category.findAll({
      where: { id: categories },
    });
    await updatedBlog.setCategories(categoryInstances);
  }

  res.json(updatedBlog);
});

/**
 * @desc    Delete a blog
 * @route   DELETE /api/blogs/:id
 * @access  Private/Admin
 */
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }

  await blog.destroy();
  res.json({ message: 'Blog removed' });
});

/**
 * @desc    Delete blogs by date range
 * @route   DELETE /api/blogs/delete-bulk
 * @access  Private/Admin
 */
const deleteBlogsByDateRange = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.body;

  if (!startDate || !endDate) {
    res.status(400);
    throw new Error('Please provide both start and end dates');
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  const result = await Blog.destroy({
    where: {
      created_at: { [Op.between]: [start, end] },
    },
  });

  res.json({ message: `${result} blogs deleted` });
});

/**
 * @desc    Get all categories
 * @route   GET /api/blogs/categories
 * @access  Public
 */
const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.findAll({
    attributes: ['id', 'name'], // Only fetch necessary fields
  });
  res.json(categories);
});

/**
 * @desc    Get category by ID
 * @route   GET /api/blogs/categories/:id
 * @access  Public
 */
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findByPk(req.params.id, {
    attributes: ['id', 'name'],
  });

  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }

  res.json(category);
});

/**
 * @desc    Create a category
 * @route   POST /api/blogs/categories
 * @access  Private/Admin
 */
const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    throw new Error('Please provide a category name');
  }

  const category = await Category.create({ name });
  res.status(201).json(category);
});

/**
 * @desc    Update a category
 * @route   PUT /api/blogs/categories/:id
 * @access  Private/Admin
 */
const updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = await Category.findByPk(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }

  category.name = name || category.name;
  const updatedCategory = await category.save();

  res.json(updatedCategory);
});

/**
 * @desc    Delete a category
 * @route   DELETE /api/blogs/categories/:id
 * @access  Private/Admin
 */
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByPk(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }

  await category.destroy();
  res.json({ message: 'Category removed' });
});

export {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  deleteBlogsByDateRange,
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};