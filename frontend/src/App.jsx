import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Login from './Pages/Login'
import Contact from './Pages/Contact'
import Doctor from './Pages/Doctor'
import MyAppointement from './Pages/MyAppointement'
import Appointement from './Pages/Appointement'
import MyProfile from './Pages/MyProfile'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { ToastContainer, toast } from 'react-toastify';

function App() {
  return (
    < >
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />

   <Navbar />
      
      <Routes>
      
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login/>} /> 
        <Route path='/contact' element={<Contact />} />
        <Route path='/doctor' element={<Doctor />} />
        <Route path='/doctor/:speciality' element={<Doctor />} />
        <Route path='/my-appointement' element={<MyAppointement />} />
        <Route path='/appointement/:docId' element={<Appointement />} />
        <Route path='/my-profile' element={<MyProfile />} /> 
       
      </Routes>

      <Footer />
    </div>


  </>
  )
}

export default App
