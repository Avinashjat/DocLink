
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongoDb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';


// Initialize Express app
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json()); 
app.use(cors()); 
app.use(express.static(path.join(__dirname, 'build')));

connectDB();
connectCloudinary()



app.use('/api/admin' , adminRouter)
//localhost:4000/api/admin/add-doctor


app.use('/api/doctor' , doctorRouter)
//localhost:4000/api/doctor/list


app.use('/api/user' , userRouter)
//localhost:4000/api/user/register





app.get('/', (req, res) => {
    res.send('Express server is running!');
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});