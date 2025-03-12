
import multer from 'multer';

// Set storage engine
const storage = multer.diskStorage({
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

// Initialize Multer
const upload = multer({ storage });

export default upload;