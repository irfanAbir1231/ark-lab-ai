# ArkLab AI Agent Catalog

## Project Overview

A take-home challenge for the Frontend Developer Intern role at ArkLab AI. The objective is to build a responsive, SEO-friendly webpage that displays a catalog of AI agents using Next.js and TypeScript, leveraging Server-Side Rendering (SSR).

---

## 🚀 Live Demo

[View the deployed app on Vercel](https://ark-lab-ai.vercel.app/)

---

## Core Features

### 🗂️ AI Agent Listing Page

- Responsive grid/list display of AI agents
- Each agent card shows:
  - **Name**
  - **Short Description**
  - **Status**
  - **Category**
  - **Pricing Model**
- Built using [Shadcn UI](https://ui.shadcn.com/) components

### ⚡ Server-Side Rendering (SSR)

- Initial agent data fetched on the server via a React Server Component
- Data loaded from a `mock-agents.json` file using Next.js App Router conventions
- Initial HTML is pre-rendered on the server for fast load and SEO

### 🔍 Client-Side Filtering & Search

- Search bar to filter agents by name or description (case-insensitive)
- Multi-select filters for **Status** and **Category**
- Single-select filter for **Pricing Model**
- 'Clear All Filters' button to reset filters

### 💎 User Experience (UX) & SEO

- Fully responsive: works on desktop, tablet, and mobile
- At least one subtle animation using [Framer Motion](https://www.framer.com/motion/)
- Dynamic `<title>` and `<meta name="description">` for SEO

---

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Redux](https://redux.js.org/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Git & GitHub](https://github.com/)

---

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- npm or yarn

### Setup

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd ark-lab
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Set up environment variables:**
   - Copy `.env.local.example` to `.env.local` and fill in any required values.
   ```bash
   cp .env.local.example .env.local
   ```
4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧠 Key Design Decisions & Challenges

### State Management

- **Redux Toolkit** is used for global state management, handling agent data, filters, and authentication state. Redux provides predictable state updates and easy debugging, especially as the app scales.
- The Redux store is set up in `lib/store.ts` and slices are organized in `store/slices/` for modularity.

### Component Structure

- The app uses a modular, reusable component structure. UI elements (buttons, cards, filters) are in `components/ui/` and feature-specific components (agent card, filters, search) are in `components/`.
- The main page (`app/page.tsx`) is a React Server Component that fetches agent data server-side for SSR and passes it to client components for interactivity.
- Layout and session management are handled in `app/layout.tsx` and `components/SessionProviderWrapper.tsx`.

### Data Fetching & SSR

- Agent data is loaded from a local `mock-agents.json` file using Next.js server components, ensuring fast initial load and SEO benefits.
- Client-side filtering/search is performed on the pre-fetched data, providing a responsive UX without extra API calls.

### UI & Animation

- [Shadcn UI](https://ui.shadcn.com/) is used for consistent, accessible UI components.
- [Framer Motion](https://www.framer.com/motion/) adds subtle animations (e.g., agent card hover effects) to enhance UX.

### Authentication

- Google OAuth 2.0 login is implemented with [`next-auth`](https://next-auth.js.org/), with session state synced to Redux for global access.
- Environment variables for OAuth are managed securely via `.env.local`.

### Challenges & Solutions

- **SSR with Client-Side Interactivity:** Balancing server-side data fetching with client-side filtering required careful separation of server and client components.
- **State Sync:** Ensuring Redux state stays in sync with NextAuth session required custom hooks and middleware.
- **UI Consistency:** Integrating Shadcn UI with custom styles and Tailwind required some overrides for a cohesive look.

---

## 🔐 Advanced Challenge: Google OAuth 2.0 Login

- Implemented using [`next-auth`](https://next-auth.js.org/)
- Session state managed with Redux
- Challenges faced and solutions
- `.env.local.example` includes placeholders for Google Client ID and Secret

---

## License

[MIT or your preferred license]
