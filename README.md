<<<<<<< HEAD
<p align="center">
  <img src="https://img.icons8.com/fluency/96/restaurant.png" alt="E-Waiter Logo" width="80"/>
</p>

<h1 align="center">🍽️ E-Waiter</h1>

<p align="center">
  A full-stack MERN application designed to elevate dining experiences by streamlining<br/>
  restaurant order management, real-time communication, and customer service.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React"/>
  <img src="https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/Node.js-20+-339933?logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/Socket.io-black?logo=socket.io&logoColor=white" alt="Socket.io" />
</p>

---

## 📸 Screenshots
> *screenshots (Chef & Waiter interfaces) coming soon._*

---

## ✨ Features

### 👤 User/Table Role
- Browse diverse recipes and menu items.
- Filter food by category (`Breakfast`, `Lunch`, `Snacks`, `Dinner`).
- Quickly request items via **Add to Cart** generating real-time kitchen tickets.

### 🍽️ Waiter Role
- Monitor table statuses and requests interactively.
- Push confirmed order tickets smoothly into the processing flow.
- Ensure prompt delivery updates from Chef completion back to the dining area.

### 👨‍🍳 Chef Role
- Real-time notification flow receiving live order tickets immediately after order placement.
- Manage order states actively from "pending" to "processing" to "processed".

### 🛡️ Admin
- Full business health oversight visually summarized on a robust KPI dashboard.
- Full access management for all staff identities (Waiters and Chefs) and managing interactive Tables.
- Full capabilities to toggle features and manage historical records.

### 🔌 Real-Time Functionality & Auth
- Implements WebSockets using **Socket.io** bridging instant connection across all interfaces.
- Custom protected routing enforcing **JWT-based authorization**.
- Media asset storage using **Appwrite** to handle visual consistency.

---

## 🏗️ Tech Stack

| Layer        | Technology                                                       |
| ------------ | ---------------------------------------------------------------- |
| **Frontend** | React 19, React Router 7, React Hot Toast                       |
| **Styling**  | Vanilla CSS Modules with custom App layout theme                 |
| **Bundler**  | Vite                                                       |
| **Backend**  | Node.js, Express 5, Socket.io for Real-time events               |
| **Database** | MongoDB Atlas, Mongoose 8                                        |
| **Auth**     | JSON Web Tokens, bcrypt, Appwrite Backend Services               |
| **HTTP**     | Axios, CORS                                                      |

---

## 📁 Project Structure

```
E-Waiter/
├── client/                     # React frontend (Vite)
│   └── src/
│       ├── components/         # Reusable UI components (Loader, Card, Cart, Modal)
│       ├── pages/              
│       │   ├── admin/          # Dashboard, Tables, History, Orders, Recipes
│       │   ├── shef/           # Real-time Ticket Handling view for Kitchen
│       │   ├── waiter/         # Staff View for table and request management
│       │   └── user/           # Interactive ordering menu accessible by tables
│       ├── Layouts/            # Security verification Wrappers
│       ├── Context/            # Core state (AuthContext, CartContext)
│       └── Api/                # Modular Axios fetching helpers
│
└── server/                     # Express backend
    └── src/
        ├── controllers/        # Logical operators for requests (auth, cart, map)
        ├── models/             # Mongoose schemas (Food, Order, User)
        ├── router/             # Express API maps ensuring protected traffic
        ├── middleware/         # Decoding/Authorizing middleware
        ├── utils/              # Responders (ApiError, ApiSuccess)
        └── index.js            # Entry Point bundling Socket.io with Express
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- **MongoDB** / Atlas URI
- **Appwrite** Setup (Cloud/Local)

### 1. Clone the Repository

```bash
git clone https://github.com/Manuacharya55/E-Waiter.git
cd E-Waiter
```

### 2. Setup the Server

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` directory:

```env
PORT=4000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SALT=10
```

Start the backend:

```bash
npm run dev
```

### 3. Setup the Client

```bash
cd client
npm install
```

Create a `.env` file inside `client/` :

```env
VITE_PROJECT_END_POINT=https://cloud.appwrite.io/v1
VITE_PROJECT_ID=your_appwrite_id
VITE_BUCKET_ID=your_appwrite_bucket_key

VITE_ADD_FOOD_URL=http://localhost:4000/api/v1/food/
VITE_GET_FOOD_URL=http://localhost:4000/api/v1/food/
VITE_EDIT_FOOD_URL=http://localhost:4000/api/v1/food/
VITE_POST_CART_URL=http://localhost:4000/api/v1/cart/
VITE_ORDER_URL=http://localhost:4000/api/v1/order/
VITE_DASHBOARD_URL=http://localhost:4000/api/v1/dashboard/
VITE_AUTH_URL=http://localhost:4000/api/v1/auth/
```

Start the development app:

```bash
npm run dev
```

### 4. Viewing the Application

Visit **[http://localhost:5173](http://localhost:5173)** to open E-Waiter!

---

## 🧑‍💻 System Access Roles

| Role           | Purpose / Operation Level                                               |
| -------------- | ---------------------------------------------------------------------- |
| **Table**      | Acts as the guest interacting with the menu, building carts & ordering.|
| **Waiter**     | Direct line staff; verifying states and ferrying physical operations.  |
| **Chef**       | Kitchen manager; modifying order pipelines inside the real-time queue. |
| **Admin**      | Root operations; assigning identities, altering menus, seeing finance. |

---

## 🤝 Contributing

Contributions are welcome! Please start by filing an issue or picking up an active request. 

1. **Fork** the repository
2. **Create** a feature branch — `git checkout -b feature/amazing-feature`
3. **Commit** your changes — `git commit -m "Add amazing feature"`
4. **Push** to the branch — `git push origin feature/amazing-feature`
5. **Open** a Pull Request

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

<p align="center">
  Made with ❤️ by <strong>Manu</strong>
</p>
=======
# E-Waiter
# 🍽️ E-Waiter

> Elevate dining experiences with seamless, real-time order management.

![last-commit](https://img.shields.io/github/last-commit/Manuacharya55/E-Waiter?style=flat&logo=git&logoColor=white&color=0080ff)
![repo-top-language](https://img.shields.io/github/languages/top/Manuacharya55/E-Waiter?style=flat&color=0080ff)
![repo-language-count](https://img.shields.io/github/languages/count/Manuacharya55/E-Waiter?style=flat&color=0080ff)

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![React.js](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Appwrite](https://img.shields.io/badge/Appwrite-F02E65?style=flat&logo=appwrite&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=flat&logo=socket.io&logoColor=white)


---

## 📑 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Usage](#usage)
- [Contributing](#contributing)

---

## 📝 Overview

**E-Waiter** is a modern restaurant management app built with the **MERN stack** (MongoDB, Express.js, React, Node.js). It streamlines order processing, real-time communication, and customer service for restaurants. The app uses **Appwrite** for secure authentication and image storage, and **Socket.IO** for instant updates between waiters, chefs, and admins.

---

## 🚀 Features

- **Real-Time Order Updates:** Live communication between staff, kitchen, and admin via Socket.IO.
- **Role-Based Dashboards:** Distinct interfaces for waiters, chefs, and admins.
- **Authentication & User Management:** Secure login and user roles powered by jsonwebtoken.
- **Image Storage:** Images stored and managed with Appwrite.
- **Interactive UI:** Built with React, including live notifications (react-hot-toast).
- **Robust Data Handling:** Orders, menus, and users managed with Mongoose and MongoDB.

---

## 🛠 Tech Stack

- **Frontend:** React, react-hot-toast , axios , react-icon , react-router-dom
- **Backend:** Node.js, Express.js, Socket.IO
- **Database:** MongoDB, Mongoose
- **Storage:** Appwrite

---

## 🧰 Getting Started

### Prerequisites

- Node.js & npm
- MongoDB Compass or MongoDB Atlas
- Appwrite

### Installation

1. **Clone the repository**
        ```bash
        git clone https://github.com/Manuacharya55/E-Waiter.git
        cd E-Waiter
        ```

2. **Install dependencies**
        ```bash
        cd server
        npm install
        cd client
        npm install
        ```

4. **Configure Environment Variables**
        - Create `.env` files for both server and client with your MongoDB URI, Appwrite credentials, etc.

5. **Run the Application**
        - Start backend:
            ```bash
            cd server
            node index.js
            ```
        - Start frontend:
            ```bash
            cd client
            npm run dev
            ```

---

### Usage

- Each table has a dedicated system where users (customers) can browse the menu and place orders directly from their table.

- Once an order is placed:

     - Chefs are instantly notified and can update the order status from "Processing" to "Processed".

     - When an order is marked as "Processed", the Waiter receives a real-time notification.

     - Waiters can then update the order status from "Yet to Deliver" to "Delivered".

- During each stage of the order lifecycle, the Admin is notified of the updates.

- Admins also have full control to manage menus, users, and monitor order analytics.

- Images for menu items and users are securely uploaded and managed using Appwrite.



---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---
>>>>>>> 6e4d3e221289d1ae8a9a5116d56513e4ecec58d7
