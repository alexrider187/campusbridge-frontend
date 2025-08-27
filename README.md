🎨 Campus Bridge Frontend

This is the frontend of Campus Bridge, a platform that connects students and lecturers through events, announcements, and shared resources.

Built with React (TypeScript), Vite, TailwindCSS, and modern React features like hooks, context, and reusable components.

✨ Features

🔐 Authentication – login & registration connected to backend API

📢 Announcements – view and manage lecturer announcements

🎉 Events – browse and create campus events

📂 Resources – upload and download learning resources

🎨 Modern UI – styled with TailwindCSS

⚡ Optimized DX – fast dev build with Vite + TypeScript

🛠️ Tech Stack

Framework: React 18 + Vite

Language: TypeScript

Styling: TailwindCSS

State Management: Context API + Hooks

API Handling: Fetch / Axios (to connect backend)

Deployment: Vercel / Netlify

📂 Project Structure
campus-bridge-frontend/
│── public/               # Static assets
│── src/
│   ├── api/              # API calls (auth, events, resources, announcements)
│   ├── components/       # Reusable UI components (Navbar, Footer, Button, etc.)
│   ├── context/          # Global context (AuthContext, ThemeContext, etc.)
│   ├── hooks/            # Custom hooks (useAuth, useFetch, etc.)
│   ├── pages/            # Pages (Login, Register, Dashboard, Events, Resources)
│   ├── styles/           # Global styles (tailwind.css, custom classes)
│   ├── App.tsx           # Main app entry
│   ├── main.tsx          # ReactDOM entry (Vite default)
│── index.html            # Entry HTML
│── tailwind.config.js    # Tailwind config
│── tsconfig.json         # TypeScript config
│── vite.config.ts        # Vite config
│── package.json

🚀 Getting Started
1. Clone the repository
git clone https://github.com/your-username/campus-bridge-frontend.git
cd campus-bridge-frontend

2. Install dependencies
npm install

3. Configure environment variables

Create a .env file:

VITE_API_URL=https://campusbridge-backend-zhn7.onrender.com/api

4. Run the app
npm run dev


Frontend will run on:
👉 http://localhost:5173

🔗 API Integration

This frontend consumes the Campus Bridge Backend
 REST API.

Example usage:

// src/api/auth.ts
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const login = async (email: string, password: string) => {
  const { data } = await axios.post(`${API}/auth/login`, { email, password });
  return data;
};

🖥️ Pages

/login → User login

/register → User registration

/dashboard → User dashboard (role-specific view)

/announcements → List announcements

/events → View and create events

/resources → Upload and browse resources

🎨 Styling

TailwindCSS for utility-first design

Custom components built with reusable UI patterns

☁️ Deployment

Deployed on Vercel or Netlify

Connect GitHub repo → set VITE_API_URL in environment variables → deploy 🚀

📖 Future Enhancements

Dark mode with Tailwind + Context

Offline caching with Service Workers

Realtime updates (Socket.IO or WebSockets)

👨‍💻 Author

Your Name
Frontend Developer | React | TypeScript | TailwindCSS

📫 Contact: [dicksonngari71@gmail.com
]