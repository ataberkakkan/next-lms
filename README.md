<div align="center">
  <div>
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-Stripe-black?style=for-the-badge&logoColor=white&logo=stripe&color=635BFF" alt="stripe" />
    <img src="https://img.shields.io/badge/-Better_Auth-black?style=for-the-badge&logoColor=white&logo=better-auth&color=000" alt="better-auth" />
    <img src="https://img.shields.io/badge/-S3_Tigris-black?style=for-the-badge&logoColor=white&logo=amazonaws&color=569A31" alt="s3-tigris" />
    <img src="https://img.shields.io/badge/-Resend-black?style=for-the-badge&logoColor=white&color=000" alt="resend" />
    <img src="https://img.shields.io/badge/-Arcjet-black?style=for-the-badge&logo=arcjet&logoColor=white&color=5C3BFE" alt="arcjet" />
  </div>

  <h3 align="center">Learning Management System</h3>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🎓 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🚀 [Features](#features)
4. ⚡ [Quick Start](#quick-start)

## <a name="introduction">🎓 Introduction</a>

**Next LMS** is a powerful, modern Learning Management System built with the latest technologies like **Next.js**, **Stripe**, and **Tigris S3** for a seamless course experience. The platform supports video uploading, secure payments, AI-driven enhancements, and automated email notifications.

Using **Better-Auth** for authentication, **Resend** for transactional emails, and **Stripe** for course checkout and subscriptions, this project enables creators to launch, manage, and monetize learning content efficiently. All course assets are securely stored using an **S3-compatible storage layer** powered by **Tigris Data**.

## <a name="tech-stack">⚙️ Tech Stack</a>

- Better-Auth (Authentication)
- Resend (Transactional Emails)
- Tigris S3 (Media Storage)
- Stripe (Payments)
- ShadCN UI
- Neon Postgresql
- React Hook Form
- Zod
- Prisma ORM
- Arcjet (Security & Rate Limiting)

## <a name="features">🚀 Features</a>

👉 **Authentication**: Secure login with Better-Auth, using email-based flows and social providers.

👉 **Arcjet Security**: Protects critical routes like authentication and payments from abuse using rate limiting and bot detection.

👉 **Course Creation**: Instructors can create, edit, and publish rich course content including video, text, and images.

👉 **Video Uploading**: Tigris S3 used to store and stream course content.

👉 **Email OTP**: Login to your account with one time password.

👉 **Secure Payments**: Stripe-powered checkout flow with pricing plans and subscriptions.

👉 **User Dashboard**: Personalized dashboard for tracking enrolled courses, progress, and account settings.

👉 **Instructor Dashboard**: Manage courses, view analytics, and earnings via Stripe integration.

👉 **Lesson Player**: Built-in video player with lesson controls, completed status, and auto-save.

👉 **Course Catalog**: Explore available courses, filter by category, price, and tags.

👉 **Progress Tracking**: Save and visualize learning progress across lessons.

👉 **Access Control**: Content gating for paid courses; dynamic routing and protection.

👉 **Responsive Design**: Fully responsive layout for mobile, tablet, and desktop.

👉 **Modular Codebase**: Easy to extend and maintain with scalable architecture.

## <a name="quick-start">⚡ Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Ensure the following are installed:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)

**Cloning the Repository**

```bash
git clone https://github.com/ataberkakkan/next-lms.git
cd next-lms
```

**Installation**

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000

DATABASE_URL=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

RESEND_API_KEY=

ARCJET_KEY=

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_ENDPOINT_URL_S3=
AWS_ENDPOINT_URL_IAM=
AWS_REGION=auto

NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

Replace the placeholder values with your actual credentials. You can obtain these credentials by signing up on the respective websites

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.
