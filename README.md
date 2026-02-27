# DocLink – Doctor Booking Appointment System 🏥

<p align="center">
  <!-- <img src="public/frontend/Doclink-Screenshot.png" alt="DocLink Project Snapshot" width="800"/> -->
  <img src="frontend/public/Doclink-Screenshot.png" alt="DocLink Project Snapshot" width="800"/>
</p>

DocLink is a **full-stack MERN application** designed to simplify doctor appointment scheduling.  
It provides a **user-friendly portal** for patients to book appointments and an **admin panel** for managing doctors, patients, and schedules.

---

## 🚀 Live Demo
- 🌐 **Main Website (User Panel):** [DocLink User Panel](https://doclink-6a1w.onrender.com)  
- 🔑 **Admin Panel:** [DocLink Admin Panel](https://doclink-admin-ou9e.onrender.com)

---

## ✨ Features

### 👩‍⚕️ User Panel
- OTP-based authentication and secure login.  
- Profile management with photo, name, and email.  
- Search and book doctor appointments.  
- View, cancel, or reschedule appointment.  
- Mobile-friendly, responsive UI.  

### 🛠 Admin Panel
- Secure admin login.  
- Manage doctors and their availability.  
- Approve or reject patient appointments.  
- Manage patient records and schedules.  
- Dashboard overview of system activity.  

---

## 🛠 Tech Stack

**Frontend (User + Admin)**  
- React.js + Vite  
- Context API  
- JavaScript  
- Tailwind CSS (UI styling)  

**Backend**  
- Node.js + Express.js  
- MongoDB + Mongoose  
- JWT Authentication  
- Multer + Cloudinary (image uploads)  

**Other Tools**  
- Render (deployment)  
- Git & GitHub (version control)  

---

## ⚙️ Installation & Setup

Clone the repository and install dependencies for backend, user panel, and admin panel.

```bash
git clone https://github.com/your-username/doclink.git
cd doclink

# Backend setup
cd backend
npm install
npm start

# User panel setup
cd frontend
npm install
npm run dev

# Admin panel setup
cd admin
npm install
npm run dev

Create a .env file inside the backend folder with the following values:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
