# LinkedIn Gamified Onboarding & Coffee Chat Scheduler

## 🚀 Overview

This project reimagines LinkedIn's social experience for college students and new users. Our goal is to empower new users to explore and adopt LinkedIn features through a **gamified onboarding experience**, while fostering meaningful professional relationships via a **built-in Coffee Chat Scheduler** integrated with calendar tools.

By turning discovery into a game and enabling seamless in-app networking, we help LinkedIn become not just a profile builder, but a platform for personal growth and career momentum.

## 🎯 Problem Statement

LinkedIn offers powerful tools—posting, joining groups, following industry leaders, connecting with professionals—but college students are often unaware of these features.

> **Pain Point:** Many students sign up for LinkedIn but stop at creating a profile. They don't know what to do next, and LinkedIn doesn't actively guide them.

> **Result:** Dormant accounts, missed opportunities, and impersonal networking.

## 💡 Our Solution

We designed a **two-pronged feature upgrade** that addresses discoverability and engagement:

### 1. 🌟 Gamified Onboarding System
- Users earn points by exploring underused features (e.g., creating a post, following hashtags, joining a group, leaving a comment).
- Milestones unlock **2 weeks of free LinkedIn Premium**—an immediate value boost.
- Points system encourages consistent usage with **daily missions**, **badges**, and **progress banners** to display on profiles.

### 2. ☕ Coffee Chat Scheduler (powered by AI)
- Premium users unlock a **built-in calendar integration** (via Calendly API) to schedule Zoom-like chats *without leaving LinkedIn*.
- AI suggests ideal times by cross-referencing mutual availability.
- Users build **coffee chat streaks**—encouraging ongoing dialogue and real relationships.
- Streak points unlock profile banners and social rewards.

## 🧑‍💻 User Journey

1. **Create an account**
2. **Complete discovery challenges** (e.g., follow 3 creators, react to 5 posts)
3. **Unlock Premium trial**
4. **Schedule coffee chats with AI help**
5. **Maintain streaks to earn profile enhancements**

## 🧪 Tech Stack

- **Frontend:** Next.js, TypeScript, Tailwind CSS
- **Backend:** Express, TypeScript, Supabase
- **Authentication:** Clerk
- **Database:** Supabase (PostgreSQL)
- **AI Integration:** OpenAI API
- **Calendar Integration:** Calendly API
- **Version Control:** GitHub

## 📦 Project Structure

```
linkedin-hackathon/
├── frontend/           # Next.js frontend (port 5179)
│   ├── app/           # Next.js app directory
│   ├── components/    # React components
│   ├── lib/           # Utilities and API helpers
│   └── types/         # TypeScript type definitions
├── backend/           # Express backend (port 5179)
│   ├── src/
│   │   ├── models/    # Database models
│   │   ├── lib/       # Utilities
│   │   ├── routes/    # API routes
│   │   └── index.ts   # Main entry point
└── package.json       # Root package.json for managing both services
```

## 🚀 Setup

### Quick Start (Recommended)
```bash
# Install all dependencies
npm run install:all

# Run both frontend and backend on port 5179
npm run dev
```

### Individual Setup

#### Frontend
```bash
cd frontend
npm install
npm run dev  # Runs on http://localhost:5179
```

#### Backend
```bash
cd backend
npm install
npm run dev  # Runs on http://localhost:5179
```

## 🔑 Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
NEXT_PUBLIC_API_URL=http://localhost:5179
```

### Backend (.env)
```
PORT=5179
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
NODE_ENV=development
```

## 🌐 API Configuration

Both frontend and backend are configured to run on **port 5179**:

- **Frontend:** http://localhost:5179
- **Backend API:** http://localhost:5179/api
- **API Proxy:** Next.js automatically proxies `/api/*` requests to the backend

The frontend includes a comprehensive API utility (`frontend/lib/api.ts`) for making requests to the backend.

## ✨ Features
- User authentication with Clerk
- Create and manage posts
- Like and comment on posts
- Real-time updates
- Responsive design
- Gamified onboarding system
- AI-powered coffee chat scheduling

## 🎨 Designs & Wireframes

- Initial user dashboard with mission tracker
- Premium-unlock modal with CTA
- Coffee Chat Scheduler UI
- Profile streak banners (design mockups in `/docs/wireframes`)

## 🎥 Demo (2 min video)
[Insert link to demo video]

## 🔮 Future Vision

- Expand gamification to recruiters (e.g., points for responding to students)
- AI-generated content tips based on profile goals
- Custom AI coach for career suggestions

## 📚 References

- LinkedIn Developer Docs: https://learn.microsoft.com/en-us/linkedin/
- Calendly API Docs: https://developer.calendly.com/
- OpenAI Copilot & ChatGPT API (for AI matching logic)
- [Hackathon Brief & Rules](/docs/2025%20Hackathon%20-%20LinkedIn%20Possibilities%20in%20Tech.pdf)

## 🙌 Team Social (LinkedIn Social Track)
- **Kemi** – Harvard University
- **Patrick** – Yale University
- **Danielle** – Stony Brook University
- **Gabriela** – Stanford University
