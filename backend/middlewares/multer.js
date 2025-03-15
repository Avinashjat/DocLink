
// import multer from 'multer';

// // Set storage engine
// const storage = multer.diskStorage({
//     filename: (req, file, callback) => {
//         callback(null, file.originalname);
//     }
// });

// // Initialize Multer
// const upload = multer({ storage });

// export default upload;


import multer from "multer";

// Use memory storage instead of disk storage
const storage = multer.memoryStorage();

// Initialize Multer
const upload = multer({ storage });

export default upload;

