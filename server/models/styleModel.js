import mongoose from "mongoose";

const styleSchema = new mongoose.Schema({
    category: { type: String, required: true }, // Men, Women, Couple, etc.
    prompt: { type: String, required: true },
    images: [{ type: String }], // URLs to the sample style images (max 4)
    steps: [{ type: String }],  // Array of instruction strings
    uploadType: { type: String, enum: ['single', 'double'], default: 'single' },
    description: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const styleModel = mongoose.models.style || mongoose.model('style', styleSchema);
export default styleModel;