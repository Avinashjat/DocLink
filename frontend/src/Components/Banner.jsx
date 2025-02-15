import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

function Banner() {

    const naviagte = useNavigate();

  return (
    <>
      <div className="flex  bg-primary rounded-lg px-6 sm:px-10  md:px-14   lg:px-12 my-20 md:mx-10 ">
        {/* left ---- side */}
        <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5">
          <div className=" text-xl  sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white">
            <p >Book Appointment</p>
            <p className="mt-4">With 100+ Trusted Doctors</p>
          </div>

          <button onClick={()=> {naviagte("/login"); scrollTo(0,0)}} className="bg-white text-gray-600 rounded-full text-sm sm:text-base  mt-6 py-3 px-8 hover:scale-105 transition-all " > Create aacount </button>
        </div>

        {/* right ---- side */}

        <div className="hidden md:block  md:w-1/2 lg:w-[370px] relative">
          
            <img className=" w-full absolute bottom-0 right-0 max-w-md" src={assets.appointment_img} alt="" />
          
        </div>
      </div>
    </>
  );
}

export default Banner;
