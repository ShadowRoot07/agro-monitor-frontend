# 🌿 ShadowRoot-Agro: Precision Farming Dashboard

**ShadowRoot-Agro** is a professional-grade agro-climatic monitoring system. It integrates a **Django** backend with a **React** frontend to provide real-time environmental analysis, including thermal trends and Vapor Pressure Deficit (VPD) calculations.

> **Development Note:** This entire project was developed, tested, and deployed using only a mobile device via **Termux** and **Neovim**.

## 🚀 Key Features

* **Real-time Monitoring:** Fetches weather data via OpenWeather API synced with a Django REST Backend.
* **Agro-Physics Engine:** Real-time calculation of **VPD (Vapor Pressure Deficit)** to assess plant transpiration stress.
* **Predictive Indicators:** Visual trend analysis (Up/Down/Stable) for temperature and humidity.
* **Data Portability:** Integrated CSV export for historical records.
* **Geographic Context:** Precise coordinate mapping and direct links to satellite locations.
* **Professional UI:** Dark-mode optimized dashboard built with **Tailwind CSS**, **Lucide Icons**, and **Recharts**.

## 🛠️ Tech Stack

### Backend
* **Framework:** Django / Django REST Framework
* **Database:** PostgreSQL (Hosted on Neon.tech)
* **Deployment:** Dockerized on Render
* **Cache:** LocMem (Local Memory Caching)

### Frontend
* **Library:** React.js + Vite
* **State Management:** TanStack Query (React Query)
* **Styling:** Tailwind CSS
* **Icons & Charts:** Lucide-React & Recharts

## 📦 Mobile Development Environment

The project demonstrates the power of mobile-first development:
- **Terminal:** Termux (Android)
- **Editor:** Neovim (LazyVim/Custom setup)
- **Environment:** Node.js & Python 3.x inside Termux

## 🔧 Installation & Setup

1. **Clone the repo:**
   ```bash
   git clone [https://github.com/tu-usuario/agro-monitor-frontend.git](https://github.com/tu-usuario/agro-monitor-frontend.git)

2. **Install dependencies:**
    ```bash
    npm Install
    ```

3. **Set up Environment Variables:**

Create a .env file with:
VITE_API_BASE_URL=https://your-render-app.onrender.com/api

4. **Run Development Server:**
    ```bash
    npm run dev -- --host 
    ```

**Developed by [ShadowRoot07]**
