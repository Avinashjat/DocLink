import express from 'express';

import { doctorList } from '../controllers/doctorController.js';



const doctorRouter = express.Router();

// Route to add a doctor

doctorRouter.post('/list', doctorList);


export default doctorRouter;