import userModel from "../models/userModel.js";

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

export default generateImage;