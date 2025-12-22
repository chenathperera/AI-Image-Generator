import userModel from "../models/userModel.js";
import axios from 'axios';
import FormData from 'form-data';

const generateImage = async (req, res) => {
    try {
        const { userId, prompt } = req.body;

        // 1. Validate User and Prompt
        const user = await userModel.findById(userId);
        if (!user || !prompt) {
            return res.json({ success: false, message: "Missing details" });
        }

        // 2. Check Credit Balance
        if (user.creditBalance <= 0) {
            return res.json({
                success: false,
                message: "No credit balance",
                creditBalance: user.creditBalance
            });
        }

        /* 3. Generate the Image URL 
           According to the cheatsheet, the format is:
           https://image.pollinations.ai/prompt/{prompt} 
        */
        const encodedPrompt = encodeURIComponent(prompt);
        // You can add parameters like width, height, and model as seen in the docs
        const resultImageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true`;

        // 4. Deduct User Credits
        await userModel.findByIdAndUpdate(user._id, {
            creditBalance: user.creditBalance - 1
        });

        // 5. Send Response
        res.json({
            success: true,
            message: "Image Generated",
            creditBalance: user.creditBalance - 1,
            resultImageUrl
        });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

const imgToImg = async (req, res) => {
    try {
        const { userId, prompt } = req.body;
        const files = req.files; 

        if (!userId || !prompt || !files || files.length === 0) {
            return res.json({ success: false, message: "Missing image or prompt details" });
        }

        const user = await userModel.findById(userId);
        if (user.creditBalance <= 0) {
            return res.json({ success: false, message: "No credit balance" });
        }

        const formData = new FormData();
        // Stability AI expects the key "image" for the primary file
        formData.append("image", files[0].buffer, files[0].originalname);
        
        if (files.length > 1) {
            formData.append("secondary_image", files[1].buffer, files[1].originalname);
        }

        formData.append("prompt", prompt);
        formData.append("output_format", "webp");

        const response = await axios.post(
            "https://api.stability.ai/v2beta/stable-image/control/structure",
            formData,
            {
                headers: {
                    ...formData.getHeaders(),
                    // Use the key exactly as defined in .env
                    "Authorization": `Bearer ${process.env.STABILITY_API_KEY}`,
                    "Accept": "image/*",
                },
                responseType: "arraybuffer",
            }
        );

        // Deduct credit only after successful AI response
        await userModel.findByIdAndUpdate(userId, { creditBalance: user.creditBalance - 1 });

        const base64Image = Buffer.from(response.data).toString('base64');
        const resultImageUrl = `data:image/webp;base64,${base64Image}`;

        res.json({ 
            success: true, 
            resultImageUrl, 
            creditBalance: user.creditBalance - 1 
        });

    } catch (error) {
        // This helper catches if Stability AI sends a 401, 403, or 500
        if (error.response && error.response.data) {
            const errorMsg = Buffer.from(error.response.data).toString();
            console.log("Detailed AI Error:", errorMsg);
            return res.json({ success: false, message: "AI Service Error: " + errorMsg });
        }
        res.json({ success: false, message: error.message });
    }
};

export { generateImage, imgToImg };