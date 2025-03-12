
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongoDb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js'


// Initialize Express app
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json()); 
app.use(cors()); 

connectDB();
connectCloudinary()



app.use('/api/admin' , adminRouter)
//localhost:4000/api/admin/add-doctor


app.get('/', (req, res) => {
    res.send('Express server is running!');
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});