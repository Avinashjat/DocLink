import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const AppContext = createContext();

const AppAppContextProvider = (props) => {
  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );

  const [userData, setUserData] = useState(false);

  const currencySymbol = "$";

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getDoctorData = async () => {
    try {
      const { data } = await axios.post(backendUrl + "/api/doctor/list");
      if (data.success) {
        setDoctors(data.doctors);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
        headers: { token },
      });
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error("Failed to load user data.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error(error.message);
    }
  };

  const value = {
    doctors,
    getDoctorData,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setDoctors,
    loadUserProfileData,
  };

  useEffect(() => {
    getDoctorData();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppAppContextProvider;


