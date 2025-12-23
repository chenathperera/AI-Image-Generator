import express from 'express';
import { addStyle } from '../controllers/styleController.js';
import upload from '../middlewares/multer.js';

const styleRouter = express.Router();

// This middleware captures the 4 specific images from the form
styleRouter.post('/add', upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
]), addStyle);

// You already have your /all route here
styleRouter.get('/all', async (req, res) => {
    // ... your list logic
});

export default styleRouter;