# BLOG-SPECIFIC — CMS VISUAL FIDELITY DIAGNOSIS AND FIX REPORT

**Target Blog:** "How Social Media Builds Trust Before Sales"  
**Slug:** `social-media-builds-trust-before-sales`  
**Route:** `/blog/social-media-builds-trust-before-sales`  
**Date:** October 08, 2026  
**Status:** Resolved & Verified  

---

## 1. Executive Summary

A visual fidelity diagnosis and targeted fix was executed for the blog **"How Social Media Builds Trust Before Sales"**.
Prior to this fix:
1. All article paragraphs and body text appeared in **yellow** (`#febd0e`) instead of the intended **black/dark charcoal** (`#2f2e33`).
2. The article featured image (`bl63.webp`) was **missing/broken**.

A read-only end-to-end trace from **MongoDB → Admin API → `getBlogBySlug()` → `CmsBlogArticle` → Public Page → CSS/Rendering** was performed.
The exact root causes were identified, verified, and fixed with the smallest necessary surgical intervention without modifying any unrelated blogs or running destructive seed commands.

---

## 2. Pipeline Trace & Root Cause Analysis

### A. Color Issue Root Cause
* **CSS Rule in Public Website:**
  In `misc/public/assets/css/style.css` (line 698):
  ```css
  .blog h3 {
      display: block;
      margin-top: 0;
      color: #febd0e;
  }
  ```
  The color `#febd0e` is the yellow/gold accent color intended **strictly for the article title heading (`<h3>`)**.
* **Original Pre-CMS Implementation:**
  In `misc/src/components/blog/SocialMediaBuildsTrustBeforeSales.js`:
  ```jsx
  <h3>How Social Media Builds Trust Before Sales</h3>
  <small>April 01, 2026</small> <span className="border d-inline-block my-2" style={{ width: '30px' }}></span>

  <p><img src='/assets/images/blogs/bl63.webp' alt="blog" className='img-fluid w-100' style={{ maxHeight: '400px',objectFit:'cover' }} /></p>
  <br/>
  <p>Have you noticed how quickly you decide whether you like a brand online?...</p>
  ```
  In the original component, only the title was an `<h3>`. All `<p>`, `<h4>`, `<small>`, and `<span>` elements were sibling tags outside `<h3>`, rendering in black (`#2f2e33`) or gray (`#98989a`).
* **Corrupted MongoDB Record:**
  In MongoDB (`miscarchive_cms.blogs`), document `_id: 6ac723cbe046b923834a2361` had been updated during an Admin UI editing session (`2026-10-08T07:08:08.851Z`).
  When saved from `admin-ui/src/components/blog/RichBlogEditor.tsx`, the browser's DOM serializer wrapped all body paragraphs inside nested `<h3>` elements:
  ```html
  <h3><small>...</small><p><img ...></p><p>Have you noticed...</p>...</h3>
  <h3><p>Why Trust Matters More Than Reach...</p>...</h3>
  ```
* **Why it turned yellow:**
  Because the text paragraphs were nested inside `<h3>`, the CSS rule `.blog h3 { color: #febd0e; }` matched all parent `<h3>` blocks, and CSS text color inherited down to all text inside them.

---

### B. Image Issue Root Cause
* **Physical Asset & HTTP Status:**
  - `misc/public/assets/images/blogs/bl63.webp` exists on disk (319,888 bytes).
  - `http://localhost:3000/assets/images/blogs/bl63.webp` returns **HTTP 200 `image/webp`**.
  - `admin-api/uploads/cms-assets/bl63.webp` exists on disk (319,888 bytes).
  - `http://localhost:5000/uploads/cms-assets/bl63.webp` returns **HTTP 200 `image/webp`**.
  - MongoDB `mediaassets` contains document `_id: 6ac723cbe046b923834a23ec`, filename `bl63.webp`.
* **Corrupted Image Tag in MongoDB:**
  In MongoDB `contentHtml`, the `<img>` tag was saved as:
  ```html
  <img src="http://localhost:5173/assets/images/blogs/bl63.webp" alt="blog" class="img-fluid w-100' style=" max-height:="" 400px;="" object-fit:="" cover"="" ...>
  ```
* **Why the image failed to load:**
  1. Port 5173 is the `admin-ui` (Vite SPA dev server).
  2. When the public website browser requested `http://localhost:5173/assets/images/blogs/bl63.webp`, Vite's SPA router returned its fallback HTML (`index.html`) with `Content-Type: text/html`.
  3. The browser attempted to parse HTML as an image, failed to decode it, and broke the image display.
  4. In addition, an unclosed quote typo in the original extraction (`class="img-fluid w-100' style="...`) caused the editor's DOM parser to corrupt style attributes into `400px;="" object-fit:=""`.

---

## 3. Scope Analysis: Are Other Blogs Affected?

A comprehensive audit was performed across all 80 blogs in MongoDB (`http://localhost:5000/api/blogs?limit=100`):
* Total blogs in CMS: **80**
* Blogs containing port `5173`: **1** (`social-media-builds-trust-before-sales`)
* Blogs containing `--tw-` tailwind style corruption: **1** (`social-media-builds-trust-before-sales`)
* Blogs containing paragraphs nested in `<h3>`: **1** (`social-media-builds-trust-before-sales`)
* Blogs with corrupted HTML length (> 20,000 chars): **1** (`social-media-builds-trust-before-sales` had 73,288 chars; others are 3,000–8,000 chars)

**Conclusion:** Only this single blog was corrupted. All other 79 blogs in MongoDB have authentic, valid HTML.

---

## 4. Files Inspected

1. `misc/src/components/blog/SocialMediaBuildsTrustBeforeSales.js` (Original pre-CMS component)
2. `misc/src/components/blog/CmsBlogArticle.js` (Universal CMS blog article renderer)
3. `misc/src/app/blog/social-media-builds-trust-before-sales/page.js` (Target blog Next.js route)
4. `misc/src/lib/api.js` (Public website API client)
5. `misc/public/assets/css/style.css` (Public website stylesheet, line 698)
6. `admin-api/src/data/websiteSeedData.json` (Seed reference dataset)
7. `admin-api/src/controllers/blogsController.ts` (Admin API blog controller)
8. `admin-api/src/models/Blog.ts` (Mongoose schema)
9. `admin-ui/src/components/blog/RichBlogEditor.tsx` (Admin UI WYSIWYG editor)

---

## 5. Files Changed & Exact Changes

### 1. MongoDB Document Update (Direct Database Modification)
* **Script:** `admin-api/src/scripts/fixTargetBlogFidelity.ts`
* **Target:** `Blog.findOneAndUpdate({ slug: 'social-media-builds-trust-before-sales' })`
* **Changes Applied:**
  - Replaced corrupted 73,288-byte `contentHtml` with authentic, clean HTML extracted directly from `SocialMediaBuildsTrustBeforeSales.js`.
  - Ensured only the title heading is enclosed in `<h3>`.
  - All 32 body paragraphs (`<p>`) and 4 subheadings (`<h4>`) placed outside `<h3>`.
  - Replaced corrupted `http://localhost:5173/assets/images/blogs/bl63.webp` with `/assets/images/blogs/bl63.webp`.
  - Fixed single quote typo `w-100'` to clean `class="img-fluid w-100" style="max-height: 400px; object-fit: cover;"`.
  - Set `featuredImage` to `/assets/images/blogs/bl63.webp`.
  - Removed all injected Tailwind CSS inline properties.

### 2. [CmsBlogArticle.js](file:///c:/It%20Projects/New-misc-website/misc/src/components/blog/CmsBlogArticle.js)
* **Changes Applied:**
  - Enhanced `cleanContentHtml(html)` to defensively normalize any localhost dev server URLs pointing to `/assets/` (e.g. `http://localhost:5173/assets/...` -> `/assets/...`).
  - Added defensive quote normalization for malformed class attributes (`class="([^"]*)'\s+style="` -> `class="$1" style="`).
* **Why this change was necessary:**
  Provides defensive immunity across all CMS blogs rendered on the public website, ensuring that if an admin ever saves content from the Admin UI on port 5173 with local origin prefixes, the public website automatically resolves the image path correctly.

### 3. [websiteSeedData.json](file:///c:/It%20Projects/New-misc-website/admin-api/src/data/websiteSeedData.json)
* **Changes Applied:**
  - Synchronized line 1945 for `social-media-builds-trust-before-sales` with the clean HTML and corrected `w-100"` quote, preserving dataset consistency.

---

## 6. Safety & Seed Operations Compliance

* **Did we run `npm run seed:website`?** **NO.** (Strictly avoided as instructed).
* **Did we run `npm run seed:all`?** **NO.**
* **Did we delete the original component?** **NO.** `SocialMediaBuildsTrustBeforeSales.js` remains intact.
* **Did we modify any unrelated blogs?** **NO.** Only the target blog was updated.
* **Did we commit or push to Git?** **NO.**

---

## 7. Verification Results

| Verification Check | Expected Behavior | Actual Behavior | Status |
| :--- | :--- | :--- | :--- |
| **API Endpoint Response** | Returns clean HTML without `5173` or `--tw-` | Length 7,443 chars, title in H3, 32 P tags, valid bl63 URL | **PASS** |
| **Blog Route HTTP** | Route `/blog/social-media-builds-trust-before-sales` returns HTTP 200 | HTTP 200 OK | **PASS** |
| **Image Tag** | `<img src="/assets/images/blogs/bl63.webp" ...>` | Exact tag with `class="img-fluid w-100"` and `style="max-height: 400px; object-fit: cover;"` | **PASS** |
| **Image HTTP Status** | `http://localhost:3000/assets/images/blogs/bl63.webp` returns HTTP 200 image | HTTP 200 OK, `image/webp`, 319,888 bytes | **PASS** |
| **Body Paragraph Color** | Paragraphs outside `<h3>` render black (`#2f2e33`) | Exactly 0 `<p>` tags nested in `<h3>`; rendered as siblings in `.blog` | **PASS** |
| **Title Color** | Article title in `<h3>` renders yellow (`#febd0e`) | Exactly 1 `<h3>` for title; inherits `.blog h3 { color: #febd0e; }` | **PASS** |
| **Subheadings & Bold Text** | 4 `<h4>` headings, bold elements styled properly | All 4 `<h4>` tags and `<b>` tags intact and rendered | **PASS** |
| **CMS as Active Source** | Page renders data from Admin API / MongoDB | Rendered HTML matches updated MongoDB `contentHtml` | **PASS** |
| **Fallback Availability** | Fallback static component available if CMS is down | `<SocialMediaBuildsTrustBeforeSales />` passed as fallback prop | **PASS** |
| **Build & Type Check** | `admin-api` builds without errors | `tsc` completed with 0 errors | **PASS** |
