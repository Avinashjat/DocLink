import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from 'axios'
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";

function AdminLogin() {
  const [userType, setUserType] = useState("Admin"); // "Admin" or "Doctor"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {setAToken , backendUrl} = useContext(AdminContext)
  const {setDToken } = useContext(DoctorContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    
    try {
    

      if (userType === 'Admin') {
        const {data} = await axios.post(backendUrl + '/api/admin/login' , {email , password});

        if (data.success) {
         setAToken(data.token)  
         localStorage.setItem('aToken' , data.token)
         toast.success(data.message)
        } else {
          toast.error(data.message)
        }
      } else {
            

        const {data} = await axios.post(backendUrl + '/api/doctor/login' , {email , password});

        if (data.success) {
         setDToken(data.token)  
         localStorage.setItem('dToken' , data.token)
         toast.success(data.message)
         console.log(data.token);
         
        } else {
          toast.error(data.message)
        }
      }


    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg min-w-[350px] sm:min-w-[400px]">
      
        <p className="text-2xl font-semibold text-center text-gray-700">
          <span className="text-primary font-bold">{userType}</span> Login
        </p>

       
        <form onSubmit={onSubmitHandler} className="mt-5">
          
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Email</label>
            <input
              type="email"
              className="border border-gray-300 rounded w-full p-2 mt-1"
             
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Password</label>
            <input
              type="password"
              className="border border-gray-300 rounded w-full p-2 mt-1"
              
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="bg-primary text-white w-full py-2 rounded-md text-lg font-medium hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Toggle Login Type */}
        <p className="mt-4 text-center text-gray-600 text-sm">
          {userType === "Admin" ? "Doctor Login?" : "Admin Login?"}{" "}
          <span
            className="text-blue-600 underline cursor-pointer"
            onClick={() => setUserType(userType === "Admin" ? "Doctor" : "Admin")}
          >
            Click here
          </span>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
