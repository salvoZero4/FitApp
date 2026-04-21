# 🏋️‍♂️ F.I.T. - Fitness Information Tracker

> A modern, full-stack SaaS application to track your workouts, daily nutrition, and physical progress.

**🚀 Live Demo:** [https://fit-sandy.vercel.app/](https://fit-sandy.vercel.app/)

## 📖 About The Project

F.I.T. is a comprehensive fitness dashboard designed to give users complete control over their health journey. Built with performance and user experience in mind, it features a sleek dark-mode interface, secure authentication, and real-time database syncing.

### ✨ Key Features

* **🔒 Secure Authentication:** Registration and Login powered by Supabase Auth. Protected routing ensures privacy.
* **📊 Interactive Dashboard:** A daily overview of calories left, macronutrients, today's workout, and current weight.
* **🍎 Nutrition Tracker:** Manage daily meals and supplements. Features dynamic macro calculations and an **auto-save (debounce)** system that silently updates the database without manual saving.
* **💪 Workout Planner:** Create custom weekly splits, add exercises, sets, reps, and weights.
* **📈 Progress Monitoring:** Track body weight over time with interactive, responsive charts.
* **🛡️ Data Privacy:** Implements PostgreSQL Row Level Security (RLS) so users can only access their own data.

---

## 🛠️ Tech Stack

**Frontend:**
* **React 19** & **TypeScript**
* **Tailwind CSS v4** (Modern utility-first styling)
* **Vite** (Lightning-fast build tool)
* **Recharts** (Data visualization)
* **React Router v7** (Client-side routing)

**Backend & Deployment:**
* **Supabase** (PostgreSQL Database, Authentication, Row Level Security)
* **Vercel** (Hosting & CI/CD)

---

## 📂 Project Architecture

The codebase follows a modular and scalable structure using React Context for state management:

```text
src/
┣ api/                 # Supabase client configuration
┣ assets/              # Global CSS and static files
┣ components/
┃ ┣ layout/            # Shared UI (Sidebar, Header, ProtectedRoute)
┃ ┣ nutrition/         # Macro counters, Meal cards, Goal settings
┃ ┣ progress/          # Charts and weight history lists
┃ ┗ workout/           # Exercise lists, routine editors
┣ context/             # Global State Management (Auth, Meals, Progress, Workouts)
┣ pages/               # Main application views (Dashboard, Login, etc.)
┗ main.tsx             # Application entry point
