import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import {v2 as cloudnary} from "cloudinary"

import jwt from "jsonwebtoken";

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




 //update the user profile
// const updateProfile = async (req, res) => {
//   try {
//     const { userId, name, phone, address, dob, gender } = req.body;

//     const imageFile = req.file;

//     if (!name || !phone || !address || !dob || !gender) {
//       res.json({ success: false, message: "Data Missing!" });
//     }

//     await userModel.findByIdAndUpdate(userId, {
//       name,
//       phone,
//       dob,
//       gender,
//       address: JSON.parse(address),
//     });

//     if(imageFile){

//       //upload image to cloudnary

//       const imageUpload = await cloudnary.uploader.upload(imageFile.path , {resource_type:'image'})
//       const imageURL =imageUpload.secure_url

//       await userModel.findByIdAndUpdate(userId , {image:imageURL})

//     }

//     res.json({succes:true , message:"Profile Updated !"})

//     console.log("Uploaded Image File:", req.file);


//   } catch (error) {
//     console.error("Error:", error);
//     res.json({ success: false, message: error.message });
//   }
// };



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
      const imageUpload = await cloudnary.uploader.upload_stream(
        { folder: "profile_images" },
        async (error, result) => {
          if (error) {
            console.error("Cloudinary Upload Error:", error);
            return res.json({ success: false, message: "Image upload failed" });
          }
          
          // Save Cloudinary URL to the database
          await userModel.findByIdAndUpdate(userId, { image: result.secure_url });

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








export { registerUser, loginUser, getProfile , updateProfile};
