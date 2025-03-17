import asyncHandler from 'express-async-handler';
import path from 'path';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import Blog from '../models/blogModel.js'; 


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const uploadsDirectory = path.join(__dirname, '../../uploads');


/**
 * @desc    Get all images in the uploads directory
 * @route   GET /api/images
 * @access  Public
 */
export const getAllImages = asyncHandler(async (req, res) => {
  const files = await fs.promises.readdir(uploadsDirectory);
  res.status(200).json({ success: true, images: files });
});


/**
 * @desc    Delete a specific image by filename
 * @route   DELETE /api/images/:filename
 * @access  private/admin
 */
export const deleteImage = asyncHandler(async (req, res) => {
  const { filename } = req.params;
  const imagePath = path.join(uploadsDirectory, filename);

  try {
    const fileExists = await fs.pathExists(imagePath);

    if (!fileExists) {
      console.log(`File not found: ${filename}`);
      res.status(404);
      throw new Error('File not found');
    }

    await fs.unlink(imagePath);

    res.status(200).json({ success: true, message: 'File deleted successfully' });
  } catch (error) {
    console.error(`Error deleting image: ${error.message}`);
    res.status(500);
    throw new Error('Server error during file deletion');
  }
});


/**
 * @desc    Remove redundant images (images not referenced in the Blog model)
 * @route   DELETE /api/images/cleanup/unused
 * @access  private/admin
 */
export const removeRedundantImages = asyncHandler(async (req, res) => {
  try {
   
    const files = await fs.promises.readdir(uploadsDirectory);

    const blogs = await Blog.findAll({ attributes: ['image'] });

    const storedImages = blogs
      .map((blog) => blog.image) 
      .filter((image) => image !== null)
      .map((image) => path.basename(image)); 

    const redundantFiles = files.filter((file) => !storedImages.includes(file));

    console.log(`Found ${redundantFiles.length} redundant images.`);

    for (const file of redundantFiles) {
      await fs.promises.unlink(path.join(uploadsDirectory, file));
    }

    res.status(200).json({
      success: true,
      message: `Deleted ${redundantFiles.length} redundant images.`,
      deletedFiles: redundantFiles,
    });
  } catch (error) {
    console.error(`Error during image cleanup: ${error.message}`);

    res.status(500).json({
      success: false,
      message: 'Server error during image cleanup',
      error: error.message,
    });
  }
});