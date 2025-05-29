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
