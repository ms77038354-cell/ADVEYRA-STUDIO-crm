# ADVEYRA CRM — Production & Live Deployment Guide

ADVEYRA CRM is a modern, high-performance React + TypeScript + Vite Single Page Application featuring dark navy branding, real-time leads, inbox, task management, client directory, and analytics.

---

## 🚀 Deployment Instructions for Render, Vercel or Netlify

### 1. Render Static Site Configuration
When deploying ADVEYRA CRM as a Static Site on Render:
* **Repository:** Connect your GitHub repository.
* **Branch:** `main` (or `master`)
* **Build Command:** `npm install && npm run build`
* **Publish Directory:** `dist`

### 2. Vercel Configuration
* **Framework Preset:** Vite
* **Build Command:** `npm run build`
* **Output Directory:** `dist`

### 3. Environment Variables (Optional)
If you are connecting a live Supabase backend, set these in your hosting dashboard:
* `VITE_SUPABASE_URL` = `your-supabase-project-url`
* `VITE_SUPABASE_ANON_KEY` = `your-supabase-anon-key`

*(If not provided, the CRM automatically falls back to robust local mock state).*

---

## 💻 Local Development
```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```
