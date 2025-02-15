import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";



function TopDoctors() {

  const navigate = useNavigate();

  const {doctors} = useContext(AppContext)
  
  return (
    <>
      <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
        <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
        <p className="sm:w-1/3 text-center text-sm">
          Simply browse through our extensive list of trusted doctors.
        </p>

        <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
          {doctors.slice(0, 10).map((item, index) => (
            <div onClick={()=>{navigate(`/appointement/${item._id}`); scrollTo(0,0)}} key={index} className=" border border-blue-200 cursor-pointer rounded-xl overflow-hidden hover:translate-y-[-10px] transition-all duration-500">
              <img className="bg-blue-50 " src={item.image} alt="dcotor_img" />
              <div className="p-4">
                <div className="flex items-center text-center gap-2 text-sm text-green-500">
                  
                   <p className="w-2 h-2 rounded-full bg-green-500"></p><p>Available</p>
                </div>
                <p className="text-lg font-medium text-gray-900">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </div>
          
          ))}
        </div>
        <button onClick={()=>{navigate("./doctor"); scrollTo(0,0)}} className="mt-10 bg-blue-100 px-12 py-3 rounded-full text-gray-600"> more </button>

      </div>
    </>
  );
}

export default TopDoctors;
