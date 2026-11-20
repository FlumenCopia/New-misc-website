# LIVE WEBSITE BACKUP & PRODUCTION SEED DOCUMENTATION

**Website Target:** `https://miscarchive.com/`  
**Workspace:** `d:\flumenx\New-misc-website`  
**Status:** Completed & Verified  
**Date:** November 19, 2026  

---

## 1. Executive Summary

This deliverable provides two mission-critical data assets for the MiscArchive platform:
1. **Full Authentic Backup of the Original Live Website (`https://miscarchive.com/`):** A permanent, zero-loss snapshot of all 77 live pages, 66 live articles with complete HTML and metadata, all service structures, client logos, FAQs, careers, and asset references.
2. **Comprehensive, Idempotent Production Seed Suite:** An end-to-end production seed script (`npm run seed:prod`) supporting custom MongoDB connection strings (e.g. MongoDB Atlas), configurable admin credentials, pre/post-flight integrity checks, and dry-run execution.

---

## 2. Part 1 — Original Live Website Backup (`https://miscarchive.com/`)

### A. Backup Architecture & Location

All backed-up data has been organized and preserved under the repository's `backup/` directory:

```text
backup/
├── manifest.json                           # Audit manifest with timestamps, counts, and checksums
├── external-images/                        # Offline copies of external media assets (Unsplash, etc.)
└── live-website/
    ├── sitemap.xml                         # Exact sitemap downloaded from live site
    ├── blogs_index.json                    # Quick-lookup JSON index of all live blog posts
    ├── assets_inventory.json               # Full catalog of 127 image assets used on live site
    ├── site_content_backup.json            # Master consolidated JSON snapshot of all live pages
    ├── raw_pages/                          # Complete raw HTML of all 77 crawled live pages
    │   ├── home.html
    │   ├── about.html
    │   ├── services.html
    │   ├── services__digital-marketing.html
    │   ├── services__web-development.html
    │   ├── services__graphic-designing.html
    │   ├── services__miscaudibles.html
    │   ├── career.html
    │   ├── contact.html
    │   ├── Neyyattinkara.html
    │   ├── blog.html
    │   └── blog__*.html                    # Raw HTML of every live blog post
    ├── blogs/                              # Structured JSON files for each individual blog post
    │   └── <slug>.json                     # Title, slug, date, author, featuredImage, contentHtml, SEO
    └── blogs_html/                         # Cleaned HTML body extracts for each blog post
        └── <slug>.html
```

### B. Live Backup Inventory Metrics

| Item | Count | Details |
|---|:---:|---|
| **Live Pages Crawled** | **77** | All core pages + sub-services + location + blogs |
| **Live Blog Articles** | **66** | 100% of live blogs extracted with semantic HTML bodies |
| **Asset References** | **127** | Internal & external images cataloged |
| **Local Assets Coverage** | **100%** | All 123 internal website images already exist in `misc/public/` |
| **External Images Archived** | **4** | Downloaded to `backup/external-images/` |

### C. Live Website Backup Automation Script

To re-run or refresh the backup at any time in the future:
```bash
python scripts/backup_live_website.py
```
This script automatically discovers all sitemap URLs, crawls pagination and internal links, extracts clean metadata and semantic article HTML, downloads referenced images, and regenerates `backup/manifest.json`.

---

## 3. Part 2 — Production Database Seed Suite

### A. Production Seed Script Overview

The production seed script is located at `admin-api/src/scripts/seedProduction.ts` (and compiled to `admin-api/dist/scripts/seedProduction.js`).

**Key Architectural Guarantees:**
1. **100% Idempotent:** Safe to run repeatedly in any environment without creating duplicate documents or corrupting relational IDs.
2. **Safe Admin User Provisioning:** Never overwrites or resets an existing administrator account's password; only provisions if the admin user is absent.
3. **Preserves Customer Submissions:** Never touches or deletes user contact enquiries (`Enquiry` collection).
4. **Relational ID Integrity:** Sub-services and blogs automatically resolve their parent service and category ObjectIds dynamically during insertion.
5. **Dry-Run Capability:** Validate the dataset and test MongoDB cluster connectivity without committing any changes.

### B. Seeded Data Collections & Verified Counts

| Collection | Model | Records Seeded | Primary Upsert Key |
|---|---|:---:|---|
| **Admin User** | `User` | 1 | `email` |
| **Website Settings** | `WebsiteSettings` | 1 | Singleton `{}` |
| **Blog Categories** | `BlogCategory` | 2 | `slug` |
| **Blog Articles** | `Blog` | **80** | `slug` |
| **Services** | `Service` | 11 | `slug` |
| **Sub-Services** | `SubService` | 4 | `slug` |
| **Website Pages** | `WebsitePage` | 7 | `slug` |
| **Navigation Menus** | `NavigationMenu` | 13 | `label` + `placement` |
| **Portfolio Projects** | `Project` | 3 | `slug` |
| **Client Logos** | `ClientLogo` | 35 | `logoImage` |
| **Team Members** | `TeamMember` | 4 | `name` |
| **FAQs** | `Faq` | 8 | `question` |
| **Careers** | `Career` | 1 | `title` |
| **Hero Banners** | `Banner` | 3 | `order` |
| **CMS Media Assets** | `MediaAsset` | 151 | `filename` |
| **Testimonials** | `Testimonial` | 0 | Ready schema |

> **Note on Blog Count (80 vs 66):** The seed dataset includes all **66** live blogs published on `https://miscarchive.com/` PLUS **14** authentic articles developed in the repository, providing complete coverage across both environments with zero data loss.

---

## 4. Production Deployment & Execution Instructions

### Option 1: Direct NPM Script (Recommended for CI/CD & Cloud)

In your production deployment environment (e.g., Render, Railway, Netlify, Docker, or Ubuntu VPS):

```bash
cd admin-api

# Set environment variables:
export MONGODB_URI="mongodb+srv://<username>:<password>@cluster.mongodb.net/miscarchive_production?retryWrites=true&w=majority"
export ADMIN_EMAIL="admin@miscarchive.com"
export ADMIN_PASSWORD="your-strong-production-password"

# Execute production seed:
npm run seed:prod
```

### Option 2: CLI Options & Flags

You can also pass arguments directly on the command line:

```bash
# Dry run to verify dataset and connectivity without writing:
npm run seed:prod -- --dry-run

# Custom MongoDB connection string and credentials:
npm run seed:prod -- --uri "mongodb+srv://admin:pass@cluster.mongodb.net/prod_db" --admin-email "owner@miscarchive.com" --admin-password "secret123"

# Quiet mode (summary audit table only):
npm run seed:prod -- --quiet
```

### Option 3: Running Built JavaScript in Pure Node.js

If running in a Docker container or minimal Node environment without `tsx`:

```bash
cd admin-api
npm run build
node dist/scripts/seedProduction.js --uri "$MONGODB_URI"
```

---

## 5. Verification Audit Output Sample

When `npm run seed:prod` executes, it outputs a verification table:

```text
===============================================================
             PRODUCTION SEED RECONCILIATION AUDIT              
===============================================================
Collection            | Expected | In Database | Status
----------------------+----------+-------------+---------------
Admin Users           |        1 |           1 | OK (VERIFIED)
Website Settings      |        1 |           1 | OK (VERIFIED)
Blog Categories       |        2 |           2 | OK (VERIFIED)
Blogs                 |       80 |          80 | OK (VERIFIED)
Services              |       11 |          11 | OK (VERIFIED)
Sub-Services          |        4 |           4 | OK (VERIFIED)
Client Logos          |       35 |          35 | OK (VERIFIED)
Team Members          |        4 |           4 | OK (VERIFIED)
FAQs                  |        8 |           8 | OK (VERIFIED)
Careers               |        1 |           1 | OK (VERIFIED)
Banners               |        3 |           3 | OK (VERIFIED)
Media Assets          |      151 |         151 | OK (VERIFIED)
Website Pages         |        7 |           7 | OK (VERIFIED)
Navigation Menus      |       13 |          13 | OK (VERIFIED)
Projects              |        3 |           3 | OK (VERIFIED)
===============================================================
[Integrity OK] Sample blog content verified (6839 characters of HTML)

[SUCCESS] Production database seeding completed with 100% data fidelity.
```
