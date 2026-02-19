# Feature Flags Manager

A full-stack feature flag management application built with **Next.js 16**, **TypeScript**, **Redux Toolkit**, and **json-server**. It allows teams to view, filter, search, and toggle feature flags across different environments.

---

## ✨ Features

- 📋 **Feature Flags Table** — view all flags with name, environment, status, and created date
- 🔁 **Toggle Flags** — enable/disable flags with loading indicators and error recovery (auto-revert on failure)
- 🔍 **Search** — search flags by name (static + backend)
- 🔽 **Filters** — filter by environment (development / staging / production) and status (enabled / disabled)
- 📊 **Sorting** — sort table columns dynamically
- 📄 **Pagination** — server-side pagination
- 🌗 **Dark / Light Mode** — full theme switching
- 🌐 **Internationalization** — Arabic & English language support (i18next)
- 🍞 **Toast Notifications** — success and error feedback for all actions

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| State Management | Redux Toolkit |
| HTTP Client | Axios |
| Forms | Formik |
| Styling | Tailwind CSS |
| i18n | i18next + react-i18next |
| Mock API | json-server v0.17 |

---

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) **v18 or higher**
- npm (comes with Node.js)

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

### 2. Install dependencies

```bash
npm install
```

---

## Running the Project Locally

This project requires **two terminals** running simultaneously.

### Terminal 1 — Start the JSON Server (Backend API)

```bash
npm run json-server
```

The API will be available at: **`http://localhost:3001`**

### Terminal 2 — Start the Next.js App (Frontend)

```bash
npm run dev
```

The app will be available at: **`http://localhost:3000`**

---

## API Endpoints

> Base URL: `http://localhost:3001`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/feature-flags` | Fetch all feature flags (supports pagination, filtering, sorting) |
| PATCH | `/feature-flags/:id` | Toggle a flag's enabled/disabled status |

### Query Parameters for GET `/feature-flags`

| Parameter | Type | Description |
|-----------|------|-------------|
| `_page` | number | Page number (default: 1) |
| `_limit` | number | Items per page (default: 10) |
| `environment` | string | Filter by environment (`development`, `staging`, `production`) |
| `status` | string | Filter by status (`enabled`, `disabled`) |
| `q` | string | Search by name |
| `_sort` | string | Column to sort by |
| `_order` | string | Sort direction (`asc` / `desc`) |

---

## Project Structure

```
├── app/                  # Next.js App Router pages
├── axios/                # Axios client configuration
├── components/           # Reusable UI components
├── interfaces/           # TypeScript interfaces
├── store/                # Redux Toolkit store & slices
├── services/             # API service functions
├── public/               # Static assets
├── db.json               # json-server database
├── server.mjs            # json-server entry point
├── middleware.js          # json-server custom middleware (pagination)
└── README.md
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run json-server` | Start json-server mock API |
| `npm run lint` | Run ESLint |