# AutoDev AI - Professional AI Infrastructure Builder

AutoDev AI is a high-end, full-stack platform designed to automate the process of building backend architectures, API documentation, and folder structures using advanced AI.

## 🚀 Features

-   **AI Infrastructure Generation**: Generate complete backend blueprints, READMEs, API docs, and database schemas from a single prompt or GitHub URL.
-   **Subscription Management**: Integrated Stripe billing for "Pro" features (Unlimited generations, advanced templates).
-   **GitHub OAuth**: Secure login via GitHub with repository import support.
-   **Global Dark Mode**: A premium, developer-centric UI with seamless theme switching.
-   **Public Sharing**: Share your generated infrastructure plans with a public, read-only link.
-   **Real-time Updates**: Live build progress and status updates via WebSockets.

## 📁 Project Structure

```bash
AutoDev/
├── autodev-ai-backend/   # NestJS + Prisma + Stripe + Groq
└── autodev-ai-frontend/  # React + Tailwind CSS v4 + Lucide
```

## 🛠️ Quick Start

### 1. Prerequisites
- Node.js (v18+)
- PostgreSQL
- Stripe Account (for billing)
- Groq API Key (for AI generation)
- GitHub OAuth App

### 2. Backend Setup
```bash
cd autodev-ai-backend
npm install
# Configure your .env (see autodev-ai-backend/.env.example)
npx prisma db push
npm run start:dev
```

### 3. Frontend Setup
```bash
cd autodev-ai-frontend
npm install
# Configure your .env (see autodev-ai-frontend/.env)
npm run dev
```

## 📄 License
MIT
