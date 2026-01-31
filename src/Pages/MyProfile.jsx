
import{ useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

function MyProfile() {
  const { userData,  token, backendUrl, loadUserProfileData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: userData?.name || "",
    phone: userData?.phone || "",
    address: {
      line1: userData?.address?.line1 || "",
      line2: userData?.address?.line2 || "",
    },
    gender: userData?.gender || "",
    dob: userData?.dob || "",
  });

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Address Changes
  const handleAddressChange = (e) => {
    setFormData({
      ...formData,
      address: { ...formData.address, [e.target.name]: e.target.value },
    });
  };

  // Handle Image Upload
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Update Profile Function
  const updateUserProfileData = async () => {
    try {
      const updatedFormData = new FormData();
      updatedFormData.append("name", formData.name);
      updatedFormData.append("phone", formData.phone);
      updatedFormData.append("address", JSON.stringify(formData.address));
      updatedFormData.append("gender", formData.gender);
      updatedFormData.append("dob", formData.dob);
      if (image) updatedFormData.append("image", image);

      const { data } = await axios.post(backendUrl + "/api/user/update-profile", updatedFormData, {
        headers: { token },
      });

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error(error.message);
    }
  };

  // Toggle Edit Mode
  const handleEditClick = () => {
    setIsEdit(true);
    setFormData({
      name: userData.name,
      phone: userData.phone,
      address: { ...userData.address },
      gender: userData.gender,
      dob: userData.dob,
    });
  };

  if (!userData) {
    return <p className="text-gray-500 text-lg">Loading user data...</p>;
  }

  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm pt-5">
      {/* Profile Image Upload */}
      {isEdit ? (
        <label htmlFor="image">
          <div className="inline-block relative cursor-pointer">
            <img
              className="w-36 rounded opacity-75"
              src={image ? URL.createObjectURL(image) : userData.image}
              alt="Profile"
            />
            <img className="w-10 absolute bottom-12 right-12" src={assets.upload_icon} alt="" />
          </div>
          <input type="file" id="image" hidden onChange={handleImageChange} />
        </label>
      ) : (
        <img className="w-36 rounded" src={userData.image} alt="Profile" />
      )}

      {/* Name */}
      {isEdit ? (
        <input
          className="bg-gray-100 text-3xl font-medium max-w-60 px-2 py-1 rounded-md"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      ) : (
        <p className="font-medium text-3xl text-neutral-800 mt-4">{userData.name}</p>
      )}

      <hr className="bg-zinc-400 h-[1px] border-none" />

      {/* Contact Information */}
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
              name="phone"
              value={formData.phone}
              onChange={handleChange}
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
                name="line1"
                value={formData.address.line1}
                onChange={handleAddressChange}
              />
              <input
                className="bg-gray-100 px-2 py-1 rounded-md"
                type="text"
                name="line2"
                value={formData.address.line2}
                onChange={handleAddressChange}
              />
            </div>
          ) : (
            <div>
              <p className="text-gray-500">{userData.address?.line1 || "N/A"}</p>
              <p className="text-gray-500">{userData.address?.line2 || "N/A"}</p>
            </div>
          )}
        </div>
      </div>

      {/* Basic Information */}
      <div>
        <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[#363636]">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
              className="max-w-20 bg-gray-100 px-2 py-1 rounded-md"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
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
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
          ) : (
            <p className="text-gray-400">{userData.dob}</p>
          )}
        </div>
      </div>

      <br />

      {/* Buttons */}
      <div>
        {isEdit ? (
          <button
            className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
            onClick={updateUserProfileData}
          >
            Save Info
          </button>
        ) : (
          <button
            className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
            onClick={handleEditClick}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}

export default MyProfile;



