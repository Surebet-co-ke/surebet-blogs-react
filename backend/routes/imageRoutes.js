import express from 'express';

import { 
    getAllImages, 
    deleteImage, 
    removeRedundantImages,
 } from '../controllers/imageController.js';
import { protect} from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getAllImages);
router.route('/:filename').delete(protect, deleteImage);
router.route('/cleanup/unused').delete(protect, removeRedundantImages);


export default router;
