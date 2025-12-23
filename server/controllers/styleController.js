import styleModel from "../models/styleModel.js";

const addStyle = async (req, res) => {
    try {
        const { name, prompt, category, steps, uploadType, description } = req.body;

        // req.files comes from Multer .fields()
        const imageFiles = req.files;
        const imagesBase64 = [];

        // Convert the 4 images to Base64 strings
        for (let i = 1; i <= 4; i++) {
            const fieldName = `image${i}`;
            if (imageFiles[fieldName] && imageFiles[fieldName][0]) {
                const file = imageFiles[fieldName][0];
                const base64Data = file.buffer.toString('base64');
                const contentType = file.mimetype;
                imagesBase64.push(`data:${contentType};base64,${base64Data}`);
            }
        }

        const styleData = {
            name,
            prompt,
            category,
            description,
            uploadType,
            // Parse steps because they come as a JSON string from Frontend FormData
            steps: JSON.parse(steps), 
            images: imagesBase64,
            date: Date.now()
        };

        const style = new styleModel(styleData);
        await style.save();

        res.json({ success: true, message: "Style Added to MongoDB!" });

    } catch (error) {
        console.log("Error adding style:", error);
        res.json({ success: false, message: error.message });
    }
}

export { addStyle };