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

// import { createContext, useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// export const AppContext = createContext();

// const AppContextProvider = (props) => {
//   const [doctors, setDoctors] = useState([]);
//   const [token, setToken] = useState(localStorage.getItem("token") || "");
//   const [userData, setUserData] = useState(null);
//   const currencySymbol = "$";
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;

//   const getDoctorData = async () => {
//     try {
//       const { data } = await axios.post(`${backendUrl}/api/doctor/list`);
//       if (data.success) {
//         setDoctors(data.doctors);
//       }
//     } catch (error) {
//       console.error("Error fetching doctor data:", error);
//       toast.error("Failed to fetch doctor data.");
//     }
//   };

//   const loadUserProfileData = async () => {
//     if (!token) {
//       setUserData(null);
//       return;
//     }

//     try {
//       console.log("Fetching user data...");
//       const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
//         headers: { token },
//       });

//       console.log("User Data API Response:", data);

//       // Fix: Check for 'succes' instead of 'success'
//       if (data.succes && data.userData) {
//         setUserData(data.userData);
//         console.log("User data updated:", data.userData);
//       } else {
//         toast.error("Failed to load user data.");
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//       toast.error("Error loading user profile.");
//     }
//   };

//   useEffect(() => {
//     getDoctorData();
//   }, []);

//   useEffect(() => {
//     loadUserProfileData();
//   }, [token]);

//   return (
//     <AppContext.Provider
//       value={{ doctors, currencySymbol, token, setToken, backendUrl, userData, setUserData }}
//     >
//       {props.children}
//     </AppContext.Provider>
//   );
// };

// export default AppContextProvider;
