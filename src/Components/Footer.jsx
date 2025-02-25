import React from "react";
import { assets } from "../assets/assets";

function Footer() {
  return (
    
      <div className="md:mx-10">

        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
          {/*-------- left----section----------  */}

          <div>
            <img className="mb-5 w-40" src={assets.logo} alt="" />
            <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Book your doctor appointments effortlessly with our user-friendly platform.
             Choose from a range of specialists, select a convenient date, and receive 
             real-time updates on your appointment status. Secure and easy,
              helping you prioritize your health with just a few clicks!
            </p>
          </div>

          {/*-------- center----section----------  */}
          <div >
            <p className="text-xl font-medium mb-5"> COMPANY </p>
            <ul className="flex flex-col gap-2 text-gray-600">
              <li> Home </li>
              <li> About us </li>
              <li> Contact us </li>
              <li> Privacy policy </li>
            </ul>
          </div>

          {/*-------- mid----section----------  */}

          <div>
            <p className="text-xl font-medium mb-5"> GET IN TOUCH </p>
            <ul className="flex flex-col gap-2 text-gray-600">
              <li> +91 9571332235 </li>
              <li> avijat164@gmail.com </li>
            </ul>
          </div>
        </div>
        {/*-------- copy right----section----------  */}

        <div>
          <hr />
          <p className="py-5 text-sm text-center">Copyright 2024 @ Greatstack.dev - All Right Reserved.</p>
        </div>

      </div>

  );
}

export default Footer;
