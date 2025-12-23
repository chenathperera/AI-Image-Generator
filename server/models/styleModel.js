import mongoose from "mongoose";

const styleSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Added for better UI titles
    category: { type: String, required: true }, 
    prompt: { type: String, required: true },
    images: { type: Array, required: true }, // Stores the 4 image URLs
    steps: { type: Array, required: true },  
    uploadType: { type: String, enum: ['single', 'double'], default: 'single' },
    description: { type: String },
    date: { type: Number, required: true } // Using Number (Date.now()) is often faster for sorting
});

const styleModel = mongoose.models.style || mongoose.model('style', styleSchema);
export default styleModel;