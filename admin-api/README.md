# MiscArchive CMS — Admin API (`admin-api`)

Independent, decoupled REST API backend for the **MiscArchive Content Management System (CMS)**.  
Built with **Node.js, Express, TypeScript, MongoDB, and Mongoose**.

---

## 🚀 Key Features

* **Strict Decoupling**: Completely independent of the public website. Public website remains 100% untouched.
* **Authentication & Authorization**: Secure JWT-based authentication with bcrypt password hashing.
* **Complete Content Data Layer**:
  * Website Settings (Singleton with 4 logo variants, primary & secondary addresses, phone numbers, social links, tracking codes)
  * Hero Banners (order, light/dark themes, desktop/mobile images)
  * Services & Sub-services (full descriptions, slug routing, feature arrays)
  * Client Logos Ticker (30 logos support, ordering, alt text)
  * Team Members & Testimonials
  * Complete Blog CMS (full rich content HTML preservation, slug routing, SEO title/description/keywords, categories, publish/draft state)
  * Blog Categories
  * FAQs & Careers (job openings, flyers, requirements)
  * Enquiries Inbox (lead capture, status workflows, notes)
  * Media Asset Library (file uploads, MIME type validation, static serving)
* **API Security & Error Handling**: Centralized error interceptor, CORS control, Mongoose validation, and duplicate key protection.

---

## 🛠️ Tech Stack & Dependencies

* **Runtime:** Node.js (`>=18.x`, tested on `v22.22.2`)
* **Language:** TypeScript `5.7.3`
* **Framework:** Express `4.21.2`
* **Database & ODM:** MongoDB (`127.0.0.1:27017`), Mongoose `8.9.5`
* **Auth:** JSON Web Tokens (`jsonwebtoken`), `bcryptjs`
* **File Uploads:** `multer`
* **Development Engine:** `tsx`

---

## ⚙️ Environment Variables

Create `.env` in `admin-api/` (modeled after `.env.example`):

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/miscarchive_cms
JWT_SECRET=miscarchive_jwt_secret_dev_key_2026
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=admin@miscarchive.com
ADMIN_PASSWORD=admin123456
ADMIN_NAME=MiscArchive Administrator
BASE_URL=http://localhost:5000
```

---

## 📦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Seed Default Administrator & Settings
```bash
npm run seed:admin
```
This initializes:
* Admin User: `admin@miscarchive.com` / `admin123456`
* Singleton `WebsiteSettings` with all default branding discovered in Phase 1.

### 3. Start Development Server
```bash
npm run dev
```
Starts server on `http://localhost:5000` with hot-reloading.

### 4. Build for Production
```bash
npm run build
```
Compiles TypeScript into `dist/`.

### 5. Start Production Server
```bash
npm start
```

### 6. Run Integration Test Suite
```bash
npx tsx src/test_api.ts
```

---

## 📡 API Endpoints Overview

### Health
* `GET /api/health` — System status

### Auth
* `POST /api/auth/login` — Authenticate and receive JWT
* `GET /api/auth/me` — Verify current user profile *(Protected)*
* `POST /api/auth/change-password` — Update user password *(Protected)*

### Dashboard
* `GET /api/dashboard/stats` — Content counts and recent activity *(Protected)*

### Content Management
| Resource | Base Endpoint | Public Access | Protected (Admin) |
| :--- | :--- | :--- | :--- |
| **Settings** | `/api/settings` | `GET /` | `PUT /` |
| **Banners** | `/api/banners` | `GET /`, `GET /:id` | `POST /`, `PUT /:id`, `DELETE /:id`, `PATCH /reorder` |
| **Services** | `/api/services` | `GET /`, `GET /:identifier` | `POST /`, `PUT /:id`, `DELETE /:id` |
| **Sub Services** | `/api/sub-services` | `GET /`, `GET /:id` | `POST /`, `PUT /:id`, `DELETE /:id` |
| **Client Logos** | `/api/client-logos` | `GET /`, `GET /:id` | `POST /`, `PUT /:id`, `DELETE /:id`, `PATCH /reorder` |
| **Team Members** | `/api/team-members` | `GET /`, `GET /:id` | `POST /`, `PUT /:id`, `DELETE /:id` |
| **Testimonials** | `/api/testimonials` | `GET /`, `GET /:id` | `POST /`, `PUT /:id`, `DELETE /:id` |
| **Blog Categories**| `/api/blog-categories` | `GET /`, `GET /:id` | `POST /`, `PUT /:id`, `DELETE /:id` |
| **Blogs** | `/api/blogs` | `GET /`, `GET /:identifier` | `POST /`, `PUT /:id`, `DELETE /:id` |
| **FAQs** | `/api/faqs` | `GET /`, `GET /:id` | `POST /`, `PUT /:id`, `DELETE /:id` |
| **Careers** | `/api/careers` | `GET /`, `GET /:id` | `POST /`, `PUT /:id`, `DELETE /:id` |
| **Enquiries** | `/api/enquiries` | `POST /` (Submit) | `GET /`, `GET /:id`, `PATCH /:id/status`, `DELETE /:id` |
| **Media Library** | `/api/media` | Static files via `/uploads/*` | `GET /`, `POST /upload`, `DELETE /:id` |
