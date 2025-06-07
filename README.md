# AuthApp
AuthApp - JWT Authentication with Role-Based Access

# AuthApp 🔐

A basic authentication system using **Node.js**, **Express**, **MongoDB**, and **JWT**, with role-based access for `admin` and `student`.

---

## 🚀 Features

- User signup & login
- JWT-based auth with cookies
- Role-based route access (admin/student)
- Secure password hashing with bcrypt
- MongoDB integration with Mongoose

---

## ⚙️ Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT + bcrypt + cookie-parser
- dotenv + nodemon

---

## 🛠️ Setup

1. **Clone and install**
   ```bash
   git clone https://github.com/Vedanshh14/AuthApp.git
   cd AuthApp
   npm install
Configure .env


PORT=5000
MONGODB_URL=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
Start MongoDB locally (Mac)


mongod --config /opt/homebrew/etc/mongod.conf
Run the server


npm run dev
🔐 API Routes
Route	Method	Access
/signup	POST	Public
/login	POST	Public
/student	GET	Student
/admin	GET	Admin

📦 Scripts
bash
Copy code
npm run dev  # Starts server with nodemon
🧑‍💻 Author
Made by Vedansh Upadhyay
