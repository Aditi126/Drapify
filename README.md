# 🛍️ Drapify - E-Commerce Website (MERN Stack)

Drapify is a full-stack e-commerce application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js).  
It comes with a **customer-facing store** and a **dedicated admin panel** for product management.  

---

## 🚀 Features

### 🛒 Customer Site
![Customer Store](./screenshots/home.png)
- Browse products
- View new collections & trending categories
- User authentication with JWT
- Add/remove items from cart
- Persist cart per user

### 🛠️ Admin Panel
![Admin Panel](./screenshots/admin.png)
- Add new products with image upload (Multer)
- Remove products
- View all products

---

## 🛠️ Tech Stack

- **Frontend**: React.js CRA for Customer UI + Vite for Admin Panel
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JSON Web Tokens (JWT)
- **Image Upload**: Multer
- **CORS Handling**: cors middleware
- **Deployment**: Render

---

## 📂 Project Structure
```bash
drapify/
├── admin/                 # React (Vite) admin panel
├── client/               # React (CRA) customer-facing store
├── server/               # Backend (Node.js + Express)
└── README.md             # Project documentation
```

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/drapify.git
cd drapify
```

2️⃣ Setup Backend (Server)
```bash
cd server
npm install
```

Create a .env file in the server folder:
```bash
MONGO_URI=your-mongodb-atlas-connection-string
JWT_SECRET=your-secret-key
PORT=4000
```

Run the backend:
```bash
npm start
```

3️⃣ Setup Client (User Storefront - CRA)
```bash
cd client
npm install
npm start
```

4️⃣ Setup Admin Panel (Vite)
```bash
cd admin
npm install
npm run dev
```


