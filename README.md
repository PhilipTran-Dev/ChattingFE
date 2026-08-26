💬 TingTing Chat App — Frontend Client
React Vite Tailwind CSS STOMP Protocol AWS S3

Modern, sleek, and responsive real-time chat application built with React 19, Vite, Tailwind CSS v4, and STOMP/SockJS WebSocket. Deployed seamlessly to AWS S3 Static Web Hosting via GitHub Actions.

📑 Table of Contents
Features
Tech Stack
Project Structure
Getting Started
Prerequisites
Installation
Environment Setup
Run Development Server
Key Components & Flow
CI/CD & Deployment
Scripts
✨ Features
⚡ Real-Time Messaging: Bidirectional instantaneous communication over STOMP protocol via SockJS fallback.
🚪 Room Management: Easily create rooms or join existing rooms with unique Room IDs.
📜 Message History & Pagination: Loads existing room chat history upon entry.
🎨 Modern Dark UI: Polished glassmorphism design styled with Tailwind CSS v4 and custom animations.
👤 Dynamic Avatars: Unique color-coded avatar generation powered by UI-Avatars API.
🔔 Toast Notifications: Interactive user feedback on room joining, creation, and connection status via react-hot-toast.
📱 Responsive Layout: Fully optimized for mobile, tablet, and desktop viewports.
🛠 Tech Stack
UI Framework: React 19
Build Tool: Vite 7
Styling: Tailwind CSS v4 (with @tailwindcss/vite)
WebSocket / STOMP Client: @stomp/stompjs & sockjs-client
Routing: react-router-dom v7
HTTP Client: axios
Icons: react-icons
Notifications: react-hot-toast
📂 Project Structure
ChattingApp/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/                # Icons & static media (chat.png, react.svg)
│   ├── Components/
│   │   ├── ChatPage.jsx       # Real-time chat interface & message bubble rendering
│   │   └── JoinCreateChat.jsx # Landing screen to create or join a chat room
│   ├── Config/
│   │   ├── AxiosHelper.js     # Axios instance & Base API URL configuration
│   │   └── Routes.jsx         # React Router navigation configuration
│   ├── Context/
│   │   └── ChatContext.jsx    # Global chat state (roomId, currentUser, connected)
│   ├── Services/
│   │   └── RoomService.js     # API integration (createRoom, joinChat, getMessages)
│   ├── App.css                # Custom scrollbar styles & global overrides
│   ├── App.jsx                # Main application entry component
│   ├── index.css              # Tailwind CSS imports
│   └── main.jsx               # React DOM root render with Context Providers
├── .env                       # Environment variables
├── package.json               # Dependencies & scripts
└── vite.config.js             # Vite configuration with Tailwind CSS plugin
🚀 Getting Started
Prerequisites
Node.js: v18+ or v20+
npm or yarn / pnpm
Installation
Clone the repository and enter the directory:

git clone https://github.com/your-username/chatting-frontend.git
cd chatting-frontend/ChattingApp
Install dependencies:

npm install
Environment Setup
Create or update .env in the ChattingApp root:

VITE_BACKEND_URL=http://localhost:8080
(Point to your backend server URL or AWS EC2 IP)

Run Development Server
npm run dev
Open http://localhost:5173 in your browser.

🧩 Key Components & Flow
Global State (ChatContext.jsx):
Manages active roomId, currentUser, and connected status across route changes.
Join / Create Screen (JoinCreateChat.jsx):
Validates input fields and communicates with /api/v1/rooms endpoints.
Navigates to /chat upon successful authentication and room join.
Chat Room Interface (ChatPage.jsx):
Connects to STOMP over SockJS via ${baseURL}/chat.
Subscribes to /topic/room/{roomId} for incoming messages.
Publishes messages to /app/sendMessage/{roomId}.
Automatically auto-scrolls down when new messages arrive.
🔄 CI/CD & Deployment
Automated deployment is configured with GitHub Actions (.github/workflows/cicd.yml):

Triggers: Pushes to main branch.
Workflow:
Installs Node.js & dependencies.
Runs npm run build to generate static production bundle in dist/.
Configures AWS Credentials using GitHub Secrets (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY).
Synchronizes the dist/ directory to Amazon S3 (s3://tingting-live) with --delete flag for static hosting.
📜 Scripts
Command	Description
npm run dev	Starts Vite local development server
npm run build	Compiles and optimizes assets into production dist/ bundle
npm run preview	Locally preview the production build
npm run lint	Runs ESLint to check for code quality and syntax issues
