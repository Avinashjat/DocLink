import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import { v2 as cloudnary } from "cloudinary";
import validator from 'validator';


import jwt from "jsonwebtoken";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import razorpay from "razorpay";

// api to register User

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Deatails" });
    }

    // validating email

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "enter a valid email" });
    }

    // validating strong password
    if (password.length < 8) {
      return res.json({ success: false, message: "enter a strong Password" });
    }

    // hashing user password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    // create JWTtoken

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.error("Error:", error);
    res.json({ success: false, message: error.message });
  }
};

//api for user login

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.json({ success: false, message: error.message });
  }
};

//get the user profile data

const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await userModel.findById(userId).select("-password");

    res.json({ success: true, userData });
  } catch (error) {
    console.error("Error:", error);
    res.json({ success: false, message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file; // This will now be stored in memory

    if (!name || !phone || !address || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing!" });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      dob,
      gender,
      address: JSON.parse(address),
    });

    if (imageFile) {
      // Upload image to Cloudinary using Buffer (not file path)
      const imageUpload =  cloudnary.uploader.upload_stream(
        { folder: "profile_images" },
        async (error, result) => {
          if (error) {
            console.error("Cloudinary Upload Error:", error);
            return res.json({ success: false, message: "Image upload failed" });
          }

          // Save Cloudinary URL to the database
          await userModel.findByIdAndUpdate(userId, {
            image: result.secure_url,
          });

          res.json({ success: true, message: "Profile Updated!" });
        }
      );

      // Pipe the image buffer to Cloudinary
      imageUpload.end(imageFile.buffer);
    } else {
      res.json({ success: true, message: "Profile Updated!" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.json({ success: false, message: error.message });
  }
};

// API to book appointment
const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;

    const docData = await doctorModel.findById(docId).select("-password");

    if (!docData.available) {
      return res.json({ success: false, message: "Doctor not available" });
    }

    let slots_booked = docData.slots_booked;

    // checking for slot avilability
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "slot not available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await userModel.findById(userId).select("-password");

    delete docData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotDate,
      slotTime,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // save new slots data in docData
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    return res.json({ success: true, message: "Appointment Booked" });
  } catch (error) {
    console.error("Error:", error);
    res.json({ success: false, message: error.message });
  }
};

// API to get appointment for frontend my appointment page

const listAppointment = async (req, res) => {
  try {
    const { userId } = req.body;

    const appointment = await appointmentModel.find({ userId });

    res.json({ success: true, appointment });
  } catch (error) {
    console.error("Error:", error);
    res.json({ success: false, message: error.message });
  }
};

// // API to cancel appointments

const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;

    if (!appointmentId) {
      return res
        .status(400)
        .json({ success: false, message: "Appointment ID is required." });
    }

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found." });
    }

    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized action!" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    //releasing doctor slot

    const { docId, slotDate, slotTime } = appointmentData;

    const doctorData = await doctorModel.findById(docId);

    let slots_booked = doctorData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    return res.json({
      success: true,
      message: "Appointment cancelled !",
    });
  } catch (error) {
    console.error("Error in cancelAppointment:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};






const razorpayIntance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});



// make razorpay for online payment method


const paymentRazorpay = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData || appointmentData.cancelled) {
      return res.json({
        success: false,
        message: "Appointment Cancelled or Not Found!",
      });
    }

    if (!appointmentData.amount) {
      return res.status(400).json({ success: false, message: "Appointment amount is missing." });
    }

    const options = {
      amount: appointmentData.amount * 100, 
      currency: process.env.CURRENCY || "INR",
      receipt: appointmentId,
    };

    const order = await razorpayIntance.orders.create(options);

    res.json({ success: true, order });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};




//api to verify payment razorpay 



const  varifyRazorpay = async(req, res) =>{
  try {

    const {razorpay_order_id} = req.body;

    const orderInfo = await razorpayIntance.orders.fetch(razorpay_order_id);

    console.log(orderInfo);


    if(orderInfo.status === 'paid'){
      await appointmentModel.findByIdAndUpdate(orderInfo.receipt ,{payment:true})
      return res.json({success: true, message: "Pyament successful !"})
    }else{
      return res.json({success: false, message: "Pyament failed !"})
    }
    
    
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}


export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  paymentRazorpay,
  varifyRazorpay,
  
};
