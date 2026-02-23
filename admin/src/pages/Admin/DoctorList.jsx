import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

function DoctorList() {
  const { doctors, aToken, getAllDoctors, changeAvailability } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
  <div className="m-5 max-h-[90vh] overflow-y-scroll">
  <h1 className="text-lg font-medium">All Doctors</h1>

  <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5 ">
    {doctors.map((item, index) => (
      <div
        key={index}
        className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer group flex flex-col h-full w-56"
      >
        {/* Image */}
        <div className="w-full h-40 overflow-hidden bg-[#EAEFFF] group-hover:bg-primary transition-all duration-500">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <p className="text-[#262626] text-lg font-medium line-clamp-2">
            {item.name}
          </p>

          <p className="text-[#5C5C5C] text-sm line-clamp-2">
            {item.speciality}
          </p>

          <div className="mt-auto flex items-center gap-1 text-sm">
            <input
              onChange={() => changeAvailability(item._id)}
              type="checkbox"
              checked={item.available}
            />
            <p>Available</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
  );
}

export default DoctorList;
