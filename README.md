# BoardWise

## Overview
BoardWise is a full-stack Project Management System designed to facilitate collaborative task management within organizations. It supports user roles (Admin, Team Member), hierarchical access to products, projects, and tasks, and offers an intuitive drag-and-drop Kanban board interface.

---

## Features
- **User Management:** Admins can invite users, assign roles, and manage access levels for resources.
- **Resource Hierarchy:** Organizations contain products, which contain projects, which hold tasks.
- **Access Control:** Granular user access management for products, projects, and tasks.
- **Kanban Board:** Drag-and-drop task management user interface.
- **Authentication:** Signup, login, and invite-based account activation.

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
- Docker Desktop (running Docker daemon)

---

## Installation Instructions

### 1. Clone the Repository
```bash
$ git clone https://github.com/ShazanRizvi/BoardWise
$ cd BoardWise
```

### 2. Run App through docker

#### Navigate to the Backend Directory
```bash
$ cd packages/server
```

#### Install Dependencies
```bash
$ npm install
```

#### Navigate to the Frontend Directory
```bash
$ cd packages/Frontend
```

#### Install Dependencies
```bash
$ npm install
```

#### Configure Environment Variables
Create a `.env` file in the `Boardwise` main directory from `.env.example` file

#### Make sure docker desktop or damon is running

#### Start the App in dev mode
```bash
$ npm run migrate:dev 
$ npm run start:dev 
```

The backend will be available at `http://localhost:5050`.
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

---

## Additional Notes
- Backend and Frontend are managed as separate packages inside a monorepo under `packages/` with Lerna and npm workspaces.
- Docker Compose manages PostgreSQL and Redis containers.
- The project switches environment variables and connection strings depending on whether the app is running locally or inside Docker.
- Separate scripts handle migrations in development (`prisma migrate dev`) and production (`prisma migrate deploy`) scenarios.
- The dev startup script verifies Docker daemon availability and orchestrates container startup and app execution smoothly.

---
