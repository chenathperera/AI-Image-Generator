import { assets } from "./assets";

export const styleItems = [
    {
        id: 1,
        category: 'With Celebrities',
        prompt: 'Photorealistic image of standing on a bright, green football pitch, taking a selfie with Cristiano Ronaldo and Lionel Messi...',
        images: [assets.a1, assets.a2, assets.a3], // Sample style images
        steps: ["1. upload your photo", "2. Click generate button"],
        uploadType: 'single', // or 'double'
        description: 'football selfie messi ronaldo'
    },
    {
        id: 2,
        category: 'Couple',
        prompt: 'A romantic couple walking in a rain-washed Parisian street, cinematic lighting...',
        images: [assets.c1, assets.c2],
        steps: ["1. upload your photo", "2. upload partner photo", "3. Click generate button"],
        uploadType: 'double',
        description: 'romantic rain paris'
    }
];