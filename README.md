
🛍️ BusyBuy — E-commerce Web Application

BusyBuy is a modern, responsive e-commerce web application built with React (Vite), Firebase, Redux Toolkit, Tailwind CSS, and DaisyUI.
It allows users to browse products, filter and search, manage their cart, place orders, and sign in securely using Email/Password or Google Authentication.

------------------------------------------------------------
🚀 FEATURES

👤 Authentication
- Email & Password registration and login via Firebase.
- Google Sign-In integration.
- Redirects based on authentication state.
- Protected routes for Cart and Orders pages.

🏪 Product Management
- Displays dynamic product lists from Firestore.
- Real-time search and filtering (by category and price).
- Sidebar filter with simultaneous search + filter functionality.

🛒 Cart Functionality
- Add, remove, and update product quantities.
- Displays total cart value dynamically.
- Prevents duplicate product entries (increments quantity instead).

📦 Orders
- Tracks all purchased items with order dates.
- Displays order history for logged-in users.

💬 User Experience
- Toast notifications for success/error using react-toastify.
- Loading indicators via react-spinners.
- Clean and aesthetic design with DaisyUI Forest Theme.

------------------------------------------------------------
🧠 TECH STACK

Frontend Framework: React (Vite)
State Management: Redux Toolkit
Backend & Auth: Firebase Authentication & Firestore
Routing: React Router DOM
Styling: Tailwind CSS + DaisyUI
Notifications: React Toastify
Loaders: React Spinners

------------------------------------------------------------
📂 FOLDER STRUCTURE

busybuy/
│
├── public/
│   └── index.html
│
├── src/
│   ├── api/
│   │   └── firebase.js
│   ├── app/
│   │   ├── store.js
│   │   └── rootReducer.js
│   ├── assets/
│   │   └── logo.png
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── ProductCard.jsx
│   │   ├── Loader.jsx
│   ├── features/
│   │   ├── auth/
│   │   │   ├── authSlice.js
│   │   │   └── authThunks.js
│   │   ├── cart/
│   │   │   ├── cartSlice.js
│   │   │   └── cartThunks.js
│   │   ├── products/
│   │   │   ├── productsSlice.js
│   │   │   └── productsThunks.js
│   │   └── orders/
│   │       ├── ordersSlice.js
│   │       └── ordersThunks.js
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── AuthPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── OrdersPage.jsx
│   │   ├── ProfilePage.jsx
│   │   └── NotFoundPage.jsx
│   ├── routes/
│   │   └── AppRoutes.jsx
│   ├── styles/
│   │   ├── global.css
│   │   └── components.css
│   ├── utils/
│   │   ├── validateForm.js
│   │   └── formatDate.js
│   ├── main.jsx
│   └── App.jsx
│
├── .gitignore
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md

------------------------------------------------------------
⚙️ SETUP & INSTALLATION

1️⃣ Clone the repository
git clone https://github.com/<your-username>/busybuy.git
cd busybuy

2️⃣ Install dependencies
npm install

3️⃣ Set up Firebase
- Go to Firebase Console
- Create a new project → BusyBuy
- Enable Authentication (Email/Password + Google)
- Enable Firestore Database
- Copy your credentials and paste them into src/api/firebase.js

4️⃣ Firestore Rules (for development)
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}

5️⃣ Run the development server
npm run dev
Visit http://localhost:5173

------------------------------------------------------------
🧭 ROUTES

/ - HomePage (public)
/auth - AuthPage (sign in / sign up)
/cart - CartPage (protected)
/myorders - OrdersPage (protected)
/profile - ProfilePage (protected)
* - NotFoundPage (public)

------------------------------------------------------------
📦 BUILD FOR PRODUCTION

npm run build

------------------------------------------------------------
🧑‍💻 AUTHOR

Shivam  
Frontend Developer  
🌐 Portfolio | 💼 LinkedIn | 🐙 GitHub

------------------------------------------------------------
🪄 LICENSE
This project is licensed under the MIT License.