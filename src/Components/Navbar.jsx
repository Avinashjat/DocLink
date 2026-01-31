import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

function Navbar() {

  const navigate = useNavigate();
  const{token , setToken , userData} = useContext(AppContext)
  const [showMenu , setshowMenu] = useState(false)


  const Logout = () =>{
    setToken(false)
    localStorage.removeItem('token')
}

  return (
    <>

      <div className="flex justify-between items-center text-sm py-4 mb-5 border-b border-b-gray-500" >
        <img onClick={()=>{navigate("/")}} className="cursor-pointer w-44" src={assets.doc_logo_tras} alt="" />

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
            token && userData
           ? <div className="flex items-center gap-2 cursor-pointer group relative">  
                  <img  className="w-9 rounded-full" src={userData.image? userData.image : assets.profile_pic} alt="" />
                  <img  className="w-3.5 rounded-full" src={assets.dropdown_icon} alt="" />
                  <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                    <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 " >
                      <p onClick={()=>{navigate('/my-profile')}}  className="cursor-pointer hover:text-black"> My Profile </p>
                      <p onClick={()=>{navigate('/my-appointement')}}  className="cursor-pointer hover:text-black"> My Appointments </p>
                      <p onClick={Logout} className="cursor-pointer hover:text-black"> Logout </p>
                    </div>
                  </div>
            </div>
            : <button onClick={()=>{navigate('/login')}} className="hidden bg-primary text-white md:block py-3 px-9 rounded-full  font-normal"> create account </button>
          }

          <img onClick={()=>setshowMenu(true)} className="w-6 md:hidden" src={assets.menu_icon} alt="" />

          <div className={` ${showMenu ? 'fixed w-full ' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
            <div className="flex items-center justify-between px-5 py-6">
              <img className="w-36" src={assets.logo} alt="" />
              <img className="w-7" onClick={()=>setshowMenu(false)} src={assets.cross_icon} alt="" />
            </div>
            <ul className="flex flex-col items-center gap-3 mt-5 px-5 text-lg font-medium">
                <NavLink  onClick={()=> setshowMenu(false)} to='/'> <p className='px-4 py-2 rounded inline-block'> Home</p></NavLink>
                <NavLink  onClick={()=> setshowMenu(false)} to='/doctor'><p className='px-4 py-2 rounded inline-block'>All Doctors</p></NavLink>
                <NavLink  onClick={()=> setshowMenu(false)} to='/about'><p className='px-4 py-2 rounded inline-block'>About</p></NavLink>
                <NavLink  onClick={()=> setshowMenu(false)} to='/contact'><p className='px-4 py-2 rounded inline-block'>Contact</p></NavLink>
            </ul>
          </div>
            
          </div>

      </div>
    
      </>
  );
}

export default Navbar;
