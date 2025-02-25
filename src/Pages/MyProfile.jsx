

import React, { useState } from "react";
import { assets } from "../assets/assets";

function MyProfile() {
  const [userData, setUserData] = useState({
    name: "Avinash Jat",
    image: assets.profile_pic,
    email: "avinash@gmail.com",
    phone: "+91 9934883499",
    address: {
      line1: "74th Ramihvar, Ranipath",
      line2: "Rani Road, Putra, Delhi",
    },
    gender: "Male",
    dob: "2000-02-02",
  });

  const [isEdit, setIsEdit] = useState(false);

  const handleEditClick = () => {
    setIsEdit((prev) => !prev);
  };

  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm pt-5">
      <img className="w-36 rounded" src={userData.image} alt="Profile" />

      {isEdit ? (
        <input
          className="bg-gray-100 text-3xl font-medium max-w-60 px-2 py-1 rounded-md"
          type="text"
          value={userData.name}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      ) : (
        <p className="font-medium text-3xl text-neutral-800 mt-4">
          {userData.name}
        </p>
      )}

      <hr className="bg-zinc-400 h-[1px] border-none" />

      <div>
        <p className="text-gray-600 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[#363636]">
          <p className="font-medium">Email:</p>
          <p className="text-blue-500">{userData.email}</p>

          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              className="bg-gray-100 max-w-52 px-2 py-1 rounded-md"
              type="text"
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          ) : (
            <p className="text-blue-400">{userData.phone}</p>
          )}

          <p className="font-medium">Address:</p>
          {isEdit ? (
            <div className="flex flex-col gap-2">
              <input
                className="bg-gray-100 px-2 py-1 rounded-md"
                type="text"
                value={userData.address.line1}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
              />
              <input
                className="bg-gray-100 px-2 py-1 rounded-md"
                type="text"
                value={userData.address.line2}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
              />
            </div>
          ) : (
            <div>
              <p className="text-gray-500">{userData.address.line1}</p>
              <p className="text-gray-500">{userData.address.line2}</p>
            </div>
          )}
        </div>
      </div>

      <div>
        <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[#363636]">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
              className="max-w-20 bg-gray-100 px-2 py-1 rounded-md"
              value={userData.gender}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <p className="text-gray-400">{userData.gender}</p>
          )}

          <p className="font-medium">Birthday:</p>
          {isEdit ? (
            <input
              className="max-w-28 bg-gray-100 px-2 py-1 rounded-md"
              type="date"
              value={userData.dob}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
            />
          ) : (
            <p className="text-gray-400">{userData.dob}</p>
          )}
        </div>
      </div>

      <br />

      <div>
        <button
          className="border border-blue-500 text-blue-500 px-8 py-2 rounded-full transition hover:bg-blue-500 hover:text-white"
          onClick={handleEditClick}
        >
          {isEdit ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
}

export default MyProfile;

