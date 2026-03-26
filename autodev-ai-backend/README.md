# AutoDev AI Backend

The engine behind AutoDev AI, built with **NestJS**, **Prisma**, and **Stripe**.

## 🏗️ Architecture

-   **Framework**: [NestJS](https://nestjs.com/)
-   **Database**: PostgreSQL with [Prisma ORM](https://www.prisma.io/)
-   **AI Engine**: [Groq](https://groq.com/) (Llama 3.3 70B)
-   **Payments**: [Stripe](https://stripe.com/) (Checkout & Webhooks)
-   **Auth**: Passport (JWT & GitHub OAuth)
-   **Real-time**: WebSockets (Socket.io)

## ⚙️ Environment Variables

Create a `.env` file with:

```env
DATABASE_URL=
JWT_SECRET=
GROK_API_KEY=
STRIPE_SECRET_KEY=
STRIPE_PRO_PRICE_ID=
STRIPE_WEBHOOK_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
FRONTEND_URL=
BACKEND_URL=
```

## 🚀 Run Locally
```bash
npm install
npx prisma generate
npx prisma db push
npm run start:dev
```
