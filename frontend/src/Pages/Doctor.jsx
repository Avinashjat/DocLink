// import React, { useContext, useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { AppContext } from '../Context/AppContext'

// const Doctor = () => {

//   const { speciality } = useParams()

//   const {filterDoc ,setFilterDoc} = useState([]);

//   const {doctors} = useContext(AppContext)

//   const applyFilter = () =>{ 

//     if(speciality){
//       setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
//     } else
//     setFilterDoc(doctors)
//   }

//   useEffect(()=>{
//    applyFilter()
//   },[doctors,speciality])

//   return (
//     <>
      
// <div>
//   <p> Browse through the doctors specialist. </p>

//   <div> 
//     </div>
//       <p> General physician </p>
//       <p> Gynecologist </p>
//       <p> Dermatologist </p>
//       <p> Pediatricians </p>
//       <p> Neurologist </p>
//       <p> Gastroenterologist </p>
//       <div> 

//         <div> { 
//         filterDoc.map((item, index) => (
//             <div onClick={()=>{navigate(`/appointement/${item._id}`)}} key={index} className=" border border-blue-200 cursor-pointer rounded-xl overflow-hidden hover:translate-y-[-10px] transition-all duration-500">
//               <img className="bg-blue-50 " src={item.image} alt="dcotor_img" />
//               <div className="p-4">
//                 <div className="flex items-center text-center gap-2 text-sm text-green-500">
                  
//                    <p className="w-2 h-2 rounded-full bg-green-500"></p><p>Available</p>
//                 </div>
//                 <p className="text-lg font-medium text-gray-900">{item.name}</p>
//                 <p className="text-gray-600 text-sm">{item.speciality}</p>
//               </div>
//             </div>
          
//           ))
//           }</div> 
//     </div>
// </div>



//     </>
//   )
// }

// export default Doctor






import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';

const Doctor = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();

  const [filterDoc, setFilterDoc] = useState([]);
  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    if (doctors) {
      setFilterDoc(speciality ? doctors.filter((doc) => doc.speciality === speciality) : doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <>
      {/* <div>
        <p className='text-gray-600'>Browse through the doctors specialist.</p>
        <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <div  className=' flex flex-col gap-4 text-sm text-gray-600' >
          <p onClick={()=> speciality === 'General physician' ? navigate('/doctor') : navigate('/doctor/General physician')}     className={`w-[94vw] sm:w-auto pl-3 py-1.5  pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality.trim() === " General physician" ? "bg-indigo-100 text-black" : "" }`}> General physician </p>
          <p onClick={()=> speciality === 'Gynecologist' ? navigate('/doctor') : navigate('/doctor/Gynecologist')}               className={`w-[94vw] sm:w-auto pl-3 py-1.5  pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist " ? "bg-indigo-100 text-black" : "" }`}> Gynecologist </p>
          <p onClick={()=> speciality === 'Dermatologist' ? navigate('/doctor') : navigate('/doctor/Dermatologist')}             className={`w-[94vw] sm:w-auto pl-3 py-1.5  pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist " ? "bg-indigo-100 text-black" : "" }`}> Dermatologist </p>
          <p onClick={()=> speciality === 'Pediatricians' ? navigate('/doctor') : navigate('/doctor/Pediatricians')}             className={`w-[94vw] sm:w-auto pl-3 py-1.5  pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === " Pediatricians" ? "bg-indigo-100 text-black" : "" }`}> Pediatricians </p>
          <p onClick={()=> speciality === 'Neurologist' ? navigate('/doctor') : navigate('/doctor/Neurologist')}                 className={`w-[94vw] sm:w-auto pl-3 py-1.5  pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist " ? "bg-indigo-100 text-black" : "" }`}> Neurologist </p>
          <p onClick={()=> speciality === 'Gastroenterologist' ? navigate('/doctor') : navigate('/doctor/Gastroenterologist')}   className={`w-[94vw] sm:w-auto pl-3 py-1.5  pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gastroenterologist " ? "bg-indigo-100 text-black" : "" }`}> Gastroenterologist </p>
        </div>  */}




<div >
  <p className='text-gray-600'>Browse through the doctors specialist.</p>
  <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
    <div className='flex flex-col gap-4 text-sm text-gray-600'>
      {[
        'General physician',
        'Gynecologist',
        'Dermatologist',
        'Pediatricians',
        'Neurologist',
        'Gastroenterologist',
      ].map((specialityName) => (
        <p
          key={specialityName}
          onClick={() =>
            speciality?.trim() === specialityName
              ? navigate('/doctor')
              : navigate(`/doctor/${specialityName}`)
          }
          className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
            speciality?.trim() === specialityName ? 'bg-indigo-200 text-black' : ''
          }`}
        >
          {specialityName}
        </p>
      ))}
    </div>
   


        
          <div className='w-full grid grid-cols-auto gap-4 gap-y-6'  >
            { 
              filterDoc.map((item , index) => (
                <div 
                onClick={()=>{navigate(`/appointement/${item._id}`)}}
                  key={item._id}
                  className="border border-blue-200 cursor-pointer rounded-xl overflow-hidden hover:-translate-y-2 transition-all duration-500"
                >
                  <img className="bg-blue-50" src={item.image} alt="doctor" />
                  <div className="p-4">
                    <div className="flex items-center text-center gap-2 text-sm text-green-500">
                      <p className="w-2 h-2 rounded-full bg-green-500"></p>
                      <p>Available</p>
                    </div>
                    <p className="text-lg font-medium text-gray-900">{item.name}</p>
                    <p className="text-gray-600 text-sm">{item.speciality}</p>
                  </div>
                </div>
              ))
           }
          </div>
          </div>
      </div>
    </>
  );
};

export default Doctor;

