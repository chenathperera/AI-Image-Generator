import userModel from "../models/userModel.js";

import axios from 'axios';

import FormData from 'form-data';

import { GoogleGenerativeAI } from "@google/generative-ai";




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

        // Use Stable Horde — free volunteer GPU network (confirmed reachable)
        console.log("Submitting to Stable Horde...");

        const submitRes = await axios.post(
            "https://stablehorde.net/api/v2/generate/async",
            {
                prompt: `safe for work, SFW, fully clothed, appropriate, ${prompt}, high quality, detailed`,
                negative_prompt: "nsfw, nude, naked, explicit, inappropriate, adult content",
                params: {
                    sampler_name: "k_euler_a",
                    cfg_scale: 7,
                    denoising_strength: 0.7,
                    height: 512,
                    width: 512,
                    steps: 15,
                    n: 1
                },
                source_image: imageBase64,
                source_processing: "img2img",
                nsfw: false,
                censor_nsfw: true,
                slow_workers: true,
                allow_downgrade: true,
                r2: false
            },
            {
                headers: {
                    "apikey": process.env.STABLE_HORDE_API_KEY,
                    "Content-Type": "application/json"
                },
                timeout: 30000
            }
        );

        const jobId = submitRes.data.id;
        console.log("Job ID:", jobId);

        // Poll until done — max 15 minutes
        let resultImageUrl = null;

        for (let attempt = 1; attempt <= 150; attempt++) {
            await new Promise(r => setTimeout(r, 6000));

            try {
                const checkRes = await axios.get(
                    `https://stablehorde.net/api/v2/generate/check/${jobId}`,
                    { headers: { "apikey": process.env.STABLE_HORDE_API_KEY }, timeout: 30000 }
                );

                console.log(`Attempt ${attempt} — done: ${checkRes.data.done}, queue: ${checkRes.data.queue_position}`);

                if (checkRes.data.done) {
                    const statusRes = await axios.get(
                        `https://stablehorde.net/api/v2/generate/status/${jobId}`,
                        { headers: { "apikey": process.env.STABLE_HORDE_API_KEY }, timeout: 30000 }
                    );
                    const generation = statusRes.data.generations?.[0];
                    if (generation?.censored) {
                        console.log("Image censored — retrying...");
                        // don't break, let it loop and submit a fresh job isn't possible
                        // just return a helpful message
                        return res.json({ success: false, message: "Image was flagged by content filter. Please try a different style or photo." });
                    }
                    if (generation?.img) {
                        resultImageUrl = `data:image/webp;base64,${generation.img}`;
                    }
                    break;
                }
            } catch (pollErr) {
                console.log(`Attempt ${attempt} — poll error, continuing: ${pollErr.message}`);
            }
        }

        if (!resultImageUrl) {
            return res.json({ success: false, message: "Generation timed out. Please try again." });
        }

        console.log("Generation successful!");
        await userModel.findByIdAndUpdate(userId, { creditBalance: user.creditBalance - 1 });
        res.json({ success: true, resultImageUrl, creditBalance: user.creditBalance - 1 });

    } catch (error) {
        console.log("Error:", error.message);
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