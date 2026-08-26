# 💬 TingTing Chat App — Frontend Client

TingTing is a modern, responsive real-time chat application built with **React 19**, **Vite**, **Tailwind CSS v4**, and WebSocket messaging powered by **STOMP / SockJS**.

---

## 🚀 Key Features

- 🏠 **Create & Join Rooms:** Easily create a new chat room or join an existing one using a unique Room ID.
- ⚡ **Real-Time Messaging:** Send and receive instant messages seamlessly via WebSocket protocol (STOMP + SockJS).
- 📜 **Message History:** Automatically retrieves and loads previous chat history upon entering a room.
- 🎨 **Modern Dark UI:** Clean, elegant dark-mode interface built with Tailwind CSS v4, optimized for smooth user experience.
- 👤 **Dynamic Avatars:** Automatically generates user avatars using the UI Avatars API based on display names.
- 🐳 **Docker & Nginx Integration:** Multi-stage Docker build served by Nginx for minimal image size and optimal production performance.
- ⚙️ **Automated CI/CD:** Integrated GitHub Actions workflow for continuous deployment to self-hosted servers.

---

## 🛠️ Tech Stack

### **Core & UI**
- **React 19** - User interface library
- **Vite 7** - Next-generation frontend build tool
- **Tailwind CSS v4** - Utility-first CSS framework
- **React Router v7** - Client-side routing
- **React Hot Toast** - Toast notifications
- **React Icons** - System icon library

### **Real-time & Network**
- **SockJS Client & STOMP JS (`@stomp/stompjs`)** - Real-time WebSocket messaging
- **Axios** - HTTP RESTful API client

### **DevOps & Deployment**
- **Docker** (Multi-stage build)
- **Nginx** (SPA static file web server)
- **GitHub Actions** (CI/CD Pipeline)

---

## 📁 Directory Structure

```text
ChattingAppFE/
├── .github/workflows/   # GitHub Actions CI/CD workflows
├── public/              # Static assets
├── src/
│   ├── assets/          # Images and SVG icons
│   ├── Components/      # Core UI components
│   │   ├── ChatPage.jsx        # Main chat page view
│   │   └── JoinCreateChat.jsx  # Room join/create form
│   ├── Config/          # Axios & Router configurations
│   │   ├── AxiosHelper.js
│   │   └── Routes.jsx
│   ├── Context/         # Global state context (ChatContext)
│   ├── Services/        # API service layer (RoomService)
│   ├── App.jsx
│   └── main.jsx
├── Dockerfile           # Multi-stage Docker configuration
├── nginx.conf           # Nginx web server config
├── vite.config.js       # Vite configuration
└── package.json
⚙️ Getting Started & Local Setup
Prerequisites
Node.js: >= 20.x

npm or yarn

Installation Steps
Clone the repository:

Bash
git clone <YOUR_REPOSITORY_URL>
cd ChattingAppFE
Install dependencies:

Bash
npm install
Configure Environment Variables (.env):
Create a .env file in the project root directory and set your Backend API URL:

Đoạn mã
VITE_BACKEND_URL=http://localhost:8080
(If not provided, it defaults to http://192.168.1.9:8080).

Run Development Server:

Bash
npm run dev
Access the app at: http://localhost:5173

Build for Production:

Bash
npm run build
🐳 Deployment with Docker & Nginx
To containerize and run the application using Docker:

Build Docker Image:

Bash
docker build -t chatting-frontend:latest .
Run Container:

Bash
docker run -d -p 80:80 --name chatting-frontend chatting-frontend:latest
Open your browser at http://localhost.

🔄 CI/CD Pipeline
This project uses GitHub Actions (.github/workflows/cicd.yml) to automate deployment upon every push to the main branch:

Checkout: Pulls the latest source code.

Clean: Stops and removes the existing container (chatting-frontend).

Build: Builds a fresh Docker image using the multi-stage Dockerfile.

Deploy: Runs the new container mapped to port 80 with --restart unless-stopped.

Prune: Automatically cleans up unused dangling Docker images to save disk space.
