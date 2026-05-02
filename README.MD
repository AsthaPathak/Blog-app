# 📝 Blog & Forum Application

A simple full-stack **Blog & Forum Web Application** built using **Node.js, Express, SQLite, HTML, CSS, and JavaScript**.

This project demonstrates the core concepts of web development including frontend rendering, backend API handling, and database integration.

---

## 🚀 Features

* 🔐 Simple Login System (Mock Authentication)
* 📝 Create Blog Posts
* 📖 View All Posts
* 💬 Add Comments to Posts
* 🗑️ Delete Posts
* ⚡ Fast and Lightweight (Beginner-Friendly)

---

## 🧠 Project Objective

The goal of this project is to build a **basic blog system** while keeping the implementation simple and easy to understand.

As described in the project documentation, the system avoids complex features like JWT authentication, hashing, and multiple backend files to maintain simplicity .

---

## 🏗️ Tech Stack

**Frontend:**

* HTML
* CSS
* JavaScript

**Backend:**

* Node.js
* Express.js

**Database:**

* SQLite

---

## 📂 Project Structure

```
blog-app/
│── server.js
│── package.json
│── blog.db
└── public/
    ├── index.html
    ├── post.html
    ├── create.html
    ├── login.html
    ├── style.css
    └── script.js
```

---

## ⚙️ How to Run the Project

### 1️⃣ Install Dependencies

```
npm install
```

### 2️⃣ Start the Server

```
node server.js
```

### 3️⃣ Open in Browser

```
http://localhost:3000/login.html
```

👉 Login credentials:

* Username: `alice`
* Password: `pass123`

---

## 🔌 API Endpoints

| Method | Endpoint       | Description     |
| ------ | -------------- | --------------- |
| POST   | /api/login     | Login user      |
| GET    | /api/posts     | Get all posts   |
| GET    | /api/posts/:id | Get single post |
| POST   | /api/posts     | Create post     |
| DELETE | /api/posts/:id | Delete post     |
| GET    | /api/comments  | Get comments    |
| POST   | /api/comments  | Add comment     |

---

## 🗄️ Database Design

The project uses a **simple 2-table structure**:

* **posts** → id, title, body, author, created_at
* **comments** → id, post_id, author, body, created_at

No foreign keys or complex relations are used to keep it beginner-friendly .

---

## 🎯 Key Highlights

* Beginner-friendly full-stack project
* Clean and minimal architecture
* All backend logic in a single file (`server.js`)
* Easy to understand and explain (ideal for viva)

---

## 📌 Future Improvements

* User authentication with JWT
* Like & reply system
* Image upload support
* Responsive UI improvements

---

## 👩‍💻 Author

**Astha Pathak**

---

## 📜 License

This project is for educational purposes.
