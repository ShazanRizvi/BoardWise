# BoardWise

## Overview
This project is a full-stack Project Management System designed for collaborative task management within organizations. It includes features such as user roles (Admin, Team Member), hierarchical access to resources (products, projects, tasks), and a drag-and-drop interface for managing tasks on a Kanban board.

---

## Features
- **User Management:** Admins can invite users, assign roles, and manage access levels for resources.
- **Resource Hierarchy:** Organizations contain products, products contain projects, and projects have tasks.
- **Access Control:** Admins can assign granular access to users for products, projects, and tasks.
- **Kanban Board:** Users can manage tasks visually with drag-and-drop functionality.
- **Authentication:** Includes user signup, login, and invite-based account activation.

---

## Tech Stack

### Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- Redis (for session management)
- bcrypt (password hashing)
- JSON Web Tokens (JWT) for authentication

### Frontend
- React.js
- React Router DOM
- DND Kit (drag-and-drop)
- Tailwind CSS

---

## Prerequisites

Ensure the following are installed on your system:

- Node.js (v16 or above)
- PostgreSQL (latest version)
- Redis (latest version)
- Git

---

## Installation Instructions

### 1. Clone the Repository
```bash
$ git clone https://github.com/ShazanRizvi/BoardWise
$ cd BoardWise
```

### 2. Backend Setup

#### Navigate to the Backend Directory
```bash
$ cd server
```

#### Install Dependencies
```bash
$ npm install
```

#### Configure Environment Variables
Create a `.env` file in the `server` directory and add the following:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/boardwise_db
SESSION_SECRET=your_session_secret
REDIS_PASSWORD=your_redis_password
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=your_jwt_secret
BOARDWISE_FRONTEND_HOST=your_frontend_URL
```

#### Initialize the Database
```bash
$ npx prisma migrate dev --name init
$ npx prisma db seed
```

#### Start the Server
```bash
$ npm start
```

The backend will be available at `http://localhost:5050`.

### 3. Frontend Setup

#### Navigate to the Frontend Directory
```bash
$ cd ../client
```

#### Install Dependencies
```bash
$ npm install
```

#### Configure Environment Variables
Create a `.env` file in the `client` directory and add:
```env
VITE_API_BASE_URL=http://localhost:5050/api
```

#### Start the Development Server
```bash
$ npm start
```

The frontend will be available at `http://localhost:3000`.

---

## Usage Instructions

### 1. Admin Flow
1. **Sign Up:** Create an admin account during the onboarding process.
2. **Create Organization:** Add an organization and upload an organization logo.
3. **Create Products and Projects:** Add products and their respective projects.
4. **Invite Users:** Send invite links to team members with specific roles.
5. **Assign Access:** Grant access to products, projects, and tasks for team members.

### 2. Team Member Flow
1. **Activate Account:** Use the invite link to set up an account.
2. **View Assigned Resources:** Access products, projects, and tasks as assigned by the admin.
3. **Kanban Board:** Use the drag-and-drop interface to view and manage tasks.

---

## API Documentation

API Documentation available at: http://localhost:5050/api-docs

---

## Contributing
1. Fork the repository.
2. Create a new branch for your feature/bugfix.
3. Commit your changes and push the branch.
4. Open a pull request.


