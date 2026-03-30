<div align="center">
  <img src="./autodev-ai-frontend/src/assets/AutoDev%20AI%20logo.png" alt="AutoDev AI Logo" width="120" />
  <h1>AutoDev AI v2.0</h1>
  <p><strong>Professional AI Infrastructure Builder & Ship-Velocity Engine</strong></p>
  <p>Turn your ideas into production-ready codebases with a single prompt.</p>
</div>

<br/>

AutoDev AI is a high-end, full-stack platform designed to automate the process of building backend architectures, API documentation, and folder structures using advanced AI.

## ✨ New in v2.0 (Premium UI Update)

We've completely overhauled AutoDev AI to deliver a **Top-Tier SaaS Experience**:
- **Immersive Glassmorphic Landing Page**: Breathtaking 3D UI, bento-box layouts, and animated terminal mockups.
- **Dynamic Theming**: Seamless transitioning between ultra-clean Light Mode and neon-glowing Dark Mode.
- **Tier-Based Generation Logic**: An intelligent business backend that separates features between Free and Pro users.
- **Local Dev Environments**: Local checkout bypass logic so you don't need active Stripe webhooks during local testing.

---

## 🚀 Core Features

- **AI Infrastructure Blueprinting**: Generate entire backend blueprints, READMEs, API docs, and database schemas instantly.
- **Tier-Based Access Control**:
  - **Standard Users (Free)**: Access to basic `README.md` and basic Landing Page logic.
  - **Premium Users (Pro)**: Full access to API Route mappings, PostgreSQL DB Schemas, Postman Collections, and Deployment Guides.
- **Stripe Integration & Local Testing**: Integrated dynamic billing with optimistic state updates for rapid local dev iteration.
- **Clean Architecture & UI**: Built on React 18, Tailwind CSS v4, Lucide Icons, and React Router with highly polished glassmorphic components.
- **Real-time Event WebSockets**: Live progress streams as the AI is "thinking" and building your infrastructure.

---

## 📁 System Architecture

```bash
AutoDev/
├── autodev-ai-backend/   # Node.js + NestJS + Prisma ORM + Stripe + AI Engines (Grok/Groq)
└── autodev-ai-frontend/  # React + Vite + Tailwind CSS + Lucide
```

---

## 🛠️ Quick Start

### 1. Prerequisites
- Node.js (v18+)
- PostgreSQL (Local or managed)
- AI API Key (Groq / x.AI Grok)
- Stripe Account *(Optional for local dev, Required for prod)*

### 2. Backend Setup
```bash
cd autodev-ai-backend
npm install

# Configure your environment variables
cp .env.example .env

# Run database migrations
npx prisma db push

# Start NestJS development server
npm run start:dev
```

### 3. Frontend Setup
```bash
cd autodev-ai-frontend
npm install

# Configure your environment variables
cp .env.example .env

# Start Vite React server
npm run dev
```

### 4. Local Pro Upgrading
For local testing without exposing localhost to Stripe Webhooks, a dedicated bypass route is built-in:
- Navigate to the **Pricing Page** and click *Upgrade*. 
- The system will call the `/billing/upgrade-local` endpoint, bypassing Stripe and applying the `isPro = true` status to your user in the database.
- You can also utilize the `fix_pro.ts` script in the backend root to enforce Pro status directly via Prisma.

---

## 🔋 Technologies Used
* **Frontend**: React, Vite, Tailwind CSS, Lucide React, Framer Motion (via Tailwind animations)
* **Backend**: NestJS, TypeScript, Prisma, Socket.io
* **AI Integrations**: OpenAI / Groq SDK handling system prompts.
* **Database**: PostgreSQL

---

## 📄 License
MIT License.
