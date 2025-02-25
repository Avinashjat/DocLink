import React, { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const [token , settoken] = useState(true)

  const [showMenu , setshowMenu] = useState(false)

  return (
    <>

      <div className="flex justify-between items-center text-sm py-4 mb-5 border-b border-b-gray-500" >
        <img onClick={()=>{navigate("/")}} className="cursor-pointer w-44" src={assets.logo} alt="" />

        <ul className="hidden md:flex justify-start items-center font-medium gap-5">
          <NavLink to='/'>
            <li className="py-1"> HOME </li>
            <hr className=" border-none outline-none h-0.5 bg-primary w-3/5  m-auto hidden"  />
          </NavLink>

          <NavLink to='/doctor'>
            <li className="py-1"> ALL DOCTORS </li>
            <hr className=" border-none outline-none h-0.5 bg-primary w-3/5  m-auto hidden" />
          </NavLink>

          <NavLink to='about'>
            <li className="py-1"> ABOUT </li>
            <hr className=" border-none outline-none h-0.5 bg-primary w-3/5  m-auto hidden" />
          </NavLink>

          <NavLink to="contact">
            <li className="py-1"> CONTACT </li>
            <hr className=" border-none outline-none h-0.5 bg-primary w-3/5  m-auto hidden" />
          </NavLink>
        </ul>

        <div className=" flex justify-center gap-4">
          {
            token?
            <div className="flex items-center gap-2 cursor-pointer group relative">  
                  <img  className="w-9 rounded-full" src={assets.profile_pic} alt="" />
                  <img  className="w-3.5 rounded-full" src={assets.dropdown_icon} alt="" />
                  <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                    <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 " >
                      <p onClick={()=>{navigate('/my-profile')}}  className="cursor-pointer hover:text-black"> My Profile </p>
                      <p onClick={()=>{navigate('/my-appointement')}}  className="cursor-pointer hover:text-black"> My Appointments </p>
                      <p onClick={()=>{settoken(false)}} className="cursor-pointer hover:text-black"> Logout </p>
                    </div>
                  </div>
            </div>
            : <button onClick={()=>{navigate('/login')}} className="hidden bg-primary text-white md:block py-3 px-9 rounded-full  font-normal"> create account </button>
          }
            
          </div>

      </div>
    
      </>
  );
}

export default Navbar;
