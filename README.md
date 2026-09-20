# Bloglogo — Full-Stack Blogging & Social Publishing Platform

Bloglogo is a full-stack blogging platform that allows users to create, manage, publish, and interact with blog posts in a modern and user-friendly environment.

The application provides complete blog management functionality along with user profile customization, social interactions, theme switching, and content visibility controls.

## 📌 Project Overview

Bloglogo is designed to provide users with a complete blogging experience where they can write and manage their own content, publish or unpublish blogs, update existing posts, and explore blogs published by other users.

Users can also customize their profiles, connect their social media accounts, interact with blog content through likes and comments, and switch between dark and light themes.

The project demonstrates practical implementation of full-stack development concepts including authentication, CRUD operations, database management, REST APIs, user-generated content, and responsive frontend design.

## ✨ Features

### 📝 Blog Management

* Create new blog posts
* Edit and update existing blogs
* Publish or unpublish blogs
* View published blogs
* Manage personal blog content
* Read blogs from other users

### 👤 User Profile

* Update profile information
* Change profile picture
* Add or update profile title/bio
* Add social media links:

  * GitHub
  * Instagram
  * Facebook
  * LinkedIn

### 💬 Social Interactions

* Like blog posts
* Unlike blog posts
* Add comments to blogs
* Like comments
* Read comments from other users

### 🎨 User Experience

* Dark mode and light mode toggle
* Responsive user interface
* Clean and modern design
* Interactive blog reading experience

### 🔐 Authentication & Security

* User registration and login
* Protected user-specific operations
* Authenticated blog management
* Secure API communication

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* React Router
* Axios

### Backend

* Node.js
* Express.js
* RESTful APIs

### Database

* MongoDB
* Mongoose
* JWT Authentication
* Cloudinary / Image Upload Service
* Git & GitHub

## 🏗️ Application Workflow

1. User registers or logs into the application.
2. User can create a new blog post.
3. The blog can be saved, published, or unpublished.
4. Published blogs become visible to other users.
5. Users can read blogs and interact through likes and comments.
6. Users can like comments and engage with the community.
7. Users can customize their profile and social links.
8. Users can switch between dark mode and light mode.

## 📊 Core Functionalities

* User Authentication
* Blog CRUD Operations
* Publish / Unpublish Blog
* User Profile Management
* Profile Image Upload
* Social Media Profile Links
* Blog Likes
* Comment System
* Comment Likes
* Theme Toggle
* Responsive UI


## ⚙️ Installation & Setup

### Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd bloglogo-fullstack
```

### Install frontend dependencies

```bash
cd frontend
npm install
```

### Install backend dependencies

```bash
cd ../backend
npm install
```

### Configure environment variables

Create a `.env` file inside the backend directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SECRET_KEY=yourkey
CLOUD_NAME=
API_SECRET=
```

Add any other required environment variables used by the project.

### Run the backend

```bash
npm run dev
```

### Run the frontend

```bash
npm start
```

## 🔮 Future Improvements

* Follow/unfollow users
* Blog search functionality
* Categories and tags
* Rich text editor
* Notifications
* Bookmark blogs
* Admin moderation dashboard
* Pagination and advanced filtering

## 👨‍💻 Author

Nitin Bhoria

Full-Stack MERN Developer
