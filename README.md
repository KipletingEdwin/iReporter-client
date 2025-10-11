# iReporter Frontend

![React](https://img.shields.io/badge/React-18.2.0-blue) ![MUI](https://img.shields.io/badge/Material%20UI-5.15.0-orange) ![Vite](https://img.shields.io/badge/Vite-4.5.0-purple)

The **iReporter frontend** is a **modern, responsive, and user-friendly React application** built with **Vite** and **Material UI**, providing an intuitive interface to submit and track reports.

---

## Table of Contents

- [Demo](#demo)  
- [Features](#features)  
- [Project Structure](#project-structure)  
- [Installation](#installation)  
- [Running the App](#running-the-app)  
- [Available Pages](#available-pages)  
- [Screenshots](#screenshots)  
- [Dependencies](#dependencies)  
- [Contributing](#contributing)  

---

## Demo

> ⚠️ Replace the links below with your actual deployed site if available

- **Local Development:** http://localhost:3001  
- **Production Demo:** TBD  

---

## Features

- **Dashboard / Hero Section** – Beautiful, interactive cards for New, Pending, and Resolved reports.  
- **Submit Report Form** – Submit reports with title, description, category, location, and evidence upload (image/PDF).  
- **My Reports** – View all reports submitted by the user.  
- **Profile Page** – View user info and logout.  
- **Responsive Table** – Sticky headers, scrollable content, and mobile-friendly layout.  
- **JWT Authentication** – Works seamlessly with the backend API.  

---

## Project Structure

frontend/
├─ src/
│ ├─ Components/
│ │ ├─ Navbar/
│ │ ├─ Login/
│ │ ├─ Profile/
│ │ └─ Hero/
│ ├─ pages/
│ │ ├─ SubmitReport.jsx
│ │ ├─ MyReports.jsx
│ │ └─ Hero.jsx
│ ├─ App.jsx
│ └─ main.jsx
├─ public/
├─ package.json
└─ vite.config.js


---

## Installation

1. Clone the frontend repository (or navigate to `frontend` folder if monorepo):

```bash
git clone <your-repo-url>
cd frontend

2.Install dependencies:

npm install
# or
yarn

3.Running the App
Start the development server:

npm run dev
# or
yarn dev


The frontend runs on http://localhost:3001
 by default. Make sure your Rails backend API is running on http://localhost:3000
.

Available Pages
Page	Description
Hero / Dashboard	Shows welcome message, stats cards (New, Pending, Resolved), and recent reports table.
Submit Report	Form to create new reports with file upload.
My Reports	Lists all reports submitted by the logged-in user.
Profile	Shows user info and provides a logout button.
Login	User login page.

Screenshots
.......
Dependencies

React – UI library

React Router DOM – Routing between pages

Material UI (MUI) – Component library for beautiful UI

Axios – API requests to backend

React CountUp – Animated counters on dashboard

Contributing

Fork the repository

Create a branch: git checkout -b feature/feature-name

Commit your changes: git commit -m "Add feature"

Push to branch: git push origin feature/feature-name

Open a Pull Request

Notes

Make sure CORS is configured in the backend Rails API to allow requests from localhost:3001.

JWT token is stored in localStorage after login.

The app is fully responsive, works on mobile, tablet, and desktop.
