import express from 'express';
import upload from '../middlewares/multer.js';
import { addDoctor , allDoctors, loginAdmin , appointmentAdmin ,appointmentCancel , adminDashboard} from '../controllers/adminController.js';
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailable } from '../controllers/doctorController.js';


const adminRouter = express.Router();

// Route to add a doctor
adminRouter.post('/add-doctor', authAdmin ,upload.single('image'), addDoctor);
adminRouter.post('/login' , loginAdmin);
adminRouter.post('/all-doctors', authAdmin, allDoctors);
adminRouter.post('/change-availability', authAdmin , changeAvailable);
adminRouter.get('/appointments', authAdmin , appointmentAdmin);
adminRouter.post('/cancel-appointment', authAdmin , appointmentCancel);
adminRouter.get('/dashboard', authAdmin , adminDashboard);

export default adminRouter; 