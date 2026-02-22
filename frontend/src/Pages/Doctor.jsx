

import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';

const Doctor = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();

  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter ,setShowFilter] = useState(false)
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
    
<div >
  <p className='text-gray-600'>Browse through the doctors specialist.</p>
  <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
    <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden  ${showFilter ? 'bg-primary text-white' : ' ' }`} onClick={()=> setShowFilter(prev => !prev)}> Filters </button>
    <div className={` flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'} `}>
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
                  <div className={`flex items-center text-center gap-2 text-sm ${item.available ? ' text-green-500' : 'text-gray-500' }`}> 
                   <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-500' } rounded-full `}></p><p>{item.available ? 'Available': 'Not Available'}</p>
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

