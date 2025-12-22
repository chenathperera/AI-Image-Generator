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
        prompt: 'change dress color into white keep other same',
        images: [assets.c1, assets.c2],
        steps: ["1. upload your photo", "2. upload partner photo", "3. Click generate button"],
        uploadType: 'single',
        description: 'romantic rain paris'
    },
    {
        id: 3,
        category: 'Women',
        prompt: 'change dress color red keep other same',
        images: [assets.f1, assets.c2],
        steps: ["1. upload your photo", "2. upload partner photo", "3. Click generate button"],
        uploadType: 'single',
        description: 'romantic rain paris'
    }
];