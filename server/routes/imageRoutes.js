import express from "express";
import { generateImage, imgToImg, deductCredit } from '../controllers/imageController.js'; // Fix: Added curly braces
import userAuth from "../middlewares/auth.js";
import multer from "multer";

const imageRouter = express.Router();

// Setting up multer memory storage for imgToImg
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Text to Image
imageRouter.post('/generate-image', userAuth, generateImage);

// Image to Image (Fixed: uses upload.array to handle files)
imageRouter.post('/img-to-img', upload.array('files', 2), userAuth, imgToImg);

// Deduct 1 credit after client-side image generation
imageRouter.post('/deduct-credit', userAuth, deductCredit);

export default imageRouter;