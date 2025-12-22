import express from 'express';
import styleModel from '../models/styleModel.js';

const styleRouter = express.Router();

styleRouter.get('/all', async (req, res) => {
    try {
        const styles = await styleModel.find({});
        res.json({ success: true, styles });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

export default styleRouter;