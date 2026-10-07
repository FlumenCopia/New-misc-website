# MiscArchive CMS — Admin Console UI (`admin-ui`)

Independent, decoupled React-based administration dashboard frontend for the **MiscArchive Content Management System (CMS)**.  
Built with **React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons, and React Router**.

---

## 🌟 Overview

`admin-ui` is a standalone frontend application designed specifically for website administrators, content editors, and digital marketers to manage the MiscArchive online presence without touching code.

* **Completely Decoupled:** Connects exclusively via standard HTTP REST requests to `admin-api` (`http://localhost:5000/api`).
* **Zero MongoDB Interaction:** Has no direct database credentials or connection.
* **Preserves Authentic Content:** Built with a rich code & HTML preview editor designed to preserve the 80 long-form blog articles and original slug URLs identified during the Phase 1 audit.

---

## 🖥️ Modules & Interfaces

1. **Secure Admin Authentication (`/login`)**:
   - JWT session management, automatic redirect to login upon token expiry or 401 error.
2. **Interactive CMS Dashboard (`/`)**:
   - Real-time statistics on blog counts, enquiry statuses, service offerings, and quick-action navigation.
3. **Global Website Settings (`/settings`)**:
   - Singleton manager for brand names, taglines, 4 distinct navbar logo variants (white/black sticky/non-sticky), dual physical addresses, multiple phone numbers, WhatsApp, social profiles, and Google Analytics/GTM tracking tags.
4. **Hero Banners Manager (`/banners`)**:
   - Carousel slide management with desktop and mobile graphic asset paths, light/dark themes, and target routes.
5. **Services & Sub-Services (`/services`, `/sub-services`)**:
   - Core agency categories (Digital Marketing, Web Development, Audibles, etc.) and specialized nested sub-services.
6. **Client Logos Ticker (`/client-logos`)**:
   - Manage the 30 client partner logos with real-time preview, ordering, and alt texts.
7. **Team Profiles & Testimonials (`/team-members`, `/testimonials`)**:
   - Executive director profiles, bios, designations, and client review cards with star ratings.
8. **Complete Blog Articles Manager (`/blogs`, `/blogs/new`, `/blogs/edit/:id`)**:
   - Full-featured article editor supporting headings, paragraphs, bullet lists, quote blocks, links, embedded image assets, custom slugs, categories, tags, and comprehensive SEO meta tags.
9. **Blog Categories (`/blog-categories`)**:
   - Taxonomies and topic filters.
10. **Frequently Asked Questions (`/faqs`)**:
    - Accordion Q&A items and categorization.
11. **Careers & Job Openings (`/careers`)**:
    - Recruitment postings, departments, locations, and flyer previews.
12. **Lead Enquiries Inbox (`/enquiries`)**:
    - Inbox triaging incoming prospective customer leads, status workflows (`new`, `in_progress`, `replied`, `archived`), and private follow-up notes.
13. **Media Asset Library (`/media`)**:
    - File uploader supporting multiple images and documents, file size calculation, copy-to-clipboard asset URL shortcut, and asset deletion.

---

## 🛠️ Tech Stack

* **Framework:** React `18.3.1`
* **Build Tool:** Vite `6.0.7`
* **Language:** TypeScript `5.7.3`
* **Routing:** React Router DOM `6.28.0`
* **Icons:** Lucide React `0.469.0`
* **Styling:** Tailwind CSS `3.4.17`

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (Optional)
By default, the UI connects to `http://localhost:5000/api`. To change this, create a `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Start Development Server
```bash
npm run dev
```
Launches local dev server on `http://localhost:5173`.

### 4. Build for Production
```bash
npm run build
```
Generates production build in `dist/`.

### 5. Preview Production Build
```bash
npm run preview
```

---

## 🔐 Default Credentials

* **Email:** `admin@miscarchive.com`
* **Password:** `admin123456`
