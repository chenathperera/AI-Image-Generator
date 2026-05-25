import userModel from "../models/userModel.js";

import axios from 'axios';

import FormData from 'form-data';

import { GoogleGenerativeAI } from "@google/generative-ai";

import { SocksProxyAgent } from 'socks-proxy-agent';

// Routes HF requests through Windscribe's local SOCKS5 proxy (port 1080)
const proxyAgent = new SocksProxyAgent('socks5://127.0.0.1:1080');



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



        const imageBase64 = files[0].buffer.toString('base64');

        // Call Hugging Face instruct-pix2pix (free, fast with VPN)
        console.log("Calling Hugging Face API...");
        let response;
        let retries = 3;

        while (retries > 0) {
            try {
                response = await axios.post(
                    "https://api-inference.huggingface.co/models/timbrooks/instruct-pix2pix",
                    {
                        inputs: imageBase64,
                        parameters: {
                            prompt: prompt,
                            num_inference_steps: 20,
                            image_guidance_scale: 1.5,
                            guidance_scale: 7.5
                        }
                    },
                    {
                        headers: {
                            "Authorization": `Bearer ${process.env.HF_API_KEY}`,
                            "Content-Type": "application/json",
                        },
                        httpsAgent: proxyAgent,
                        responseType: "arraybuffer",
                        timeout: 60000
                    }
                );
                console.log("HuggingFace generation successful!");
                break;
            } catch (retryErr) {
                if (retryErr.response && retryErr.response.status === 503) {
                    console.log("Model loading, retrying in 10 seconds...");
                    retries--;
                    if (retries === 0) throw retryErr;
                    await new Promise(r => setTimeout(r, 10000));
                } else {
                    throw retryErr;
                }
            }
        }

        await userModel.findByIdAndUpdate(userId, { creditBalance: user.creditBalance - 1 });

        const base64Image = Buffer.from(response.data).toString('base64');
        const resultImageUrl = `data:image/jpeg;base64,${base64Image}`;

        res.json({ success: true, resultImageUrl, creditBalance: user.creditBalance - 1 });

    } catch (error) {
        if (error.response && error.response.data) {
            const errorMsg = Buffer.from(error.response.data).toString();
            console.log("HF Error:", errorMsg);
            return res.json({ success: false, message: "AI Error: " + errorMsg });
        }
        console.log("HF Error:", error.message);
        res.json({ success: false, message: error.message });
    }

};



const deductCredit = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await userModel.findById(userId);
        if (!user) return res.json({ success: false, message: "User not found" });
        if (user.creditBalance <= 0) return res.json({ success: false, message: "No credit balance", creditBalance: 0 });

        await userModel.findByIdAndUpdate(userId, { creditBalance: user.creditBalance - 1 });
        res.json({ success: true, creditBalance: user.creditBalance - 1 });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export { generateImage, imgToImg, deductCredit };