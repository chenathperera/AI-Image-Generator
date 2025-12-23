import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
    userId: { type: String, required: true },
    image: { type: String, required: true },
    name: { type: String, required: true },
    prompt: { type: String, required: true },
    date: { type: Number, required: true }
})

const historyModel = mongoose.models.history || mongoose.model("history", historySchema);
export default historyModel;