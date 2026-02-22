import  { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function MyAppointment() {
  const { backendUrl, token, getDoctorData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const navigate = useNavigate();

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token },
      });

      if (data.success && Array.isArray(data.appointment)) {
        setAppointments([...data.appointment].reverse());
      } else {
        setAppointments([]); // Ensures the state is always an array
        toast.error(data.message);
        console.warn("Unexpected API response format:", data);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      if (!appointmentId) {
        console.error("❌ appointmentId is missing!");
        return;
      }

      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success("Appointment cancelled successfully!");
        getUserAppointments(); // Refresh appointment list
        getDoctorData();
      } else {
        toast.error(data.message, "data not success");
      }
    } catch (error) {
      console.error("❌ Error Canceling Appointment:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);

        try {
          const { data } = await axios.post(
            backendUrl + "/api/user/varifyRazorpay",
            response,
            { headers: { token } }
          );

          if (data.success) {
            getUserAppointments();
            navigate("/my-appointement");
          }
        } catch (error) {
          console.error(error);
          toast.error(error.message);
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };


  

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-razorpay",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        initPay(data.order);
      } else {
        toast.error(data.message, "data not success");
      }
    } catch (error) {
      console.error(" Error Canceling Appointment:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div>
      <p className="pb-3 mt-12 text-lg font-medium text-gray-600 border-b">
        My Appointments
      </p>
      <div>
        {appointments.length > 0 ? (
          appointments.map((item, index) => (
            <div
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b"
              key={index}
            >
              {/* Doctor Image */}
              <div>
                <img
                  className="w-32 bg-[#EAEFFF] rounded"
                  src={item.docData?.image || "/default-doctor.png"}
                  alt={item.docData?.name || "Doctor"}
                />
              </div>

              {/* Appointment Details */}
              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-[#262626] text-base font-semibold">
                  {item.docData?.name || "Unknown Doctor"}
                </p>
                <p className="text-gray-600">
                  {item.docData?.speciality || "Speciality Not Available"}
                </p>
                <p className="text-[#464646] font-medium mt-1">Address:</p>
                <p className="text-xs">
                  {item.docData?.address?.line1 || "N/A"}
                </p>
                <p className="text-xs">{item.docData?.address?.line2 || ""}</p>
                <p className="text-xs mt-1">
                  <span className="text-sm text-[#3C3C3C] font-medium">
                    {" "}
                    Date & Time:{" "}
                  </span>
                  {item.slotDate || "N/A"} | {item.slotTime || "N/A"}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 justify-end text-sm text-center">


              {!item.cancelled && item.payment && !item.isCompleted && (
                  <button
                    
                    className="text-stone-500 sm:min-w-48 py-2 border rounded bg-indigo-100"
                  >
                    Paid
                  </button>
                )}



                {!item.cancelled && !item.payment && !item.isCompleted && (
                  <button
                    onClick={() => {
                      appointmentRazorpay(item._id);
                    }}
                    className="text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    Pay Online
                  </button>
                )}
                {!item.cancelled && !item.isCompleted &&  (
                  <button
                    onClick={() => {
                      cancelAppointment(item._id);
                    }}
                    className="text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                  >
                    Cancel Appointment
                  </button>
                )}
                {item.cancelled && !item.isCompleted &&  (
                  <button className="sm:min-w-48 py-2 border rounded border-red-500 text-red-500 ">
                    {" "}
                    Appointment Cancelled{" "}
                  </button>
                )}

                {item.isCompleted &&  (
                  <button className="sm:min-w-48 py-2 border rounded border-green-500 text-green-500 ">
                    
                   Completed
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-4">
            No appointments found.
          </p>
        )}
      </div>
    </div>
  );
}

export default MyAppointment;
