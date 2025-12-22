import multer from 'multer';

const storage = multer.memoryStorage(); // Store in memory to send directly to AI API
const upload = multer({ limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit

export default upload;