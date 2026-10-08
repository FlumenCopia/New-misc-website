# PHASE 3A — COMPLETE WEBSITE DATA RECONCILIATION AUDIT

**Target Repository:** `c:\It Projects\New-misc-website`  
**Audit Date:** October 8, 2026  
**Auditor:** Antigravity AI Pair Programmer (DeepMind)  
**Execution Mode:** **STRICT READ-ONLY AUDIT** (Zero code changes, zero database writes, zero seed generation)

---

## 1. EXECUTIVE SUMMARY

This audit delivers the comprehensive source-level reconciliation of all authentic content, assets, and operational forms currently hardcoded within the public website (`misc/`). As established in Phase 1 and supported by the Phase 2 backend/frontend architecture (`admin-api` and `admin-ui`), the ultimate goal is to enable dynamic content delivery from MongoDB via an Admin Panel. 

The primary objectives achieved in Phase 3A are:
1. **Resolution of the 80 Components vs 79 Routes Blog Mystery:**
   - Previous Phase 1 audit noted 79 routes and 80 authored components, reporting ~38 routes importing "recycled/incorrect" components.
   - Deep AST analysis reveals that exactly **38 route files contain stacked/vestigial unused import statements** resulting from template copy-pasting. However, in **all 79 routes, the JSX return statement renders the authentic, dedicated article component**.
   - Exactly **79 unique authored components** are actively rendered across the 79 routes.
   - Exactly **1 authored component** (`DigitalMarketingBlog.js`, 76 lines) remains orphaned/unrouted in `src/components/blog/`, originally authored as a dedicated service or marketing overview.
2. **Client Logos Audit:**
   - Homepage ticker (`src/components/home/Logo.js`) holds exactly **30 client logos**.
   - About page slider (`src/components/about/About_logoslider.js`) holds **13 client logos** (8 overlapping, 5 unique: `cs.png`, `navaka.png`, `rainbo.png`, `rrv.png`, `JSM.png`), making **35 total unique client brand logos** across the repository.
3. **Hero Banners:** Exactly **3 responsive banner slides** with dedicated desktop/mobile images, light/dark themes, and targeted routing (`/Neyyattinkara`, `https://flumenx.com/`).
4. **Services & Sub-Services:** Exactly **6 core active services** on the homepage and **4 authentic sub-services** under Digital Marketing (`email`, `sem`, `seo`, `smm`).
5. **Team Members:** Exactly **4 executive leadership profiles** preserved in `About_about.js` (`Anoop D Anil`, `Anoop Krishna`, `Rohini A Pillai`, `Akhil G V`).
6. **FAQs & Careers:** Exactly **8 structured accordion FAQ items** and **1 active career flyer opening** (`dm-hiring.jpg`).
7. **Testimonials:** Verified **0 testimonials** present on the public website (schema in Phase 2 is prepared for future CMS additions).
8. **Heavy Asset Classification:** Confirmed that `HOME1.gif` (32.59 MB) and `HOME2.gif` (23.89 MB) are unreferenced legacy frontend visual assets, **not** CMS-managed content.
9. **Forms:** Exactly **3 active user-facing forms** (`Sidebar.js` enquiry drawer, `ContactContent.js` contact page form, `GetInTouch.js` Neyyattinkara landing form).

---

## 2. PUBLIC WEBSITE ROOT CONFIRMATION

The authentic source directory for the public website was inspected and verified:

```text
Public website root:          c:\It Projects\New-misc-website\misc
Framework:                    Next.js 15.5.9 (App Router)
React Version:                React 19.1.4
Language / Tooling:           JavaScript / ES Modules (with TailwindCSS & Bootstrap stylesheets)
Entry / Application:          misc/src/app/layout.js & misc/src/app/page.js
Blog Structure:               misc/src/app/blog/ (79 route subdirectories + 1 listing page)
Component Directory:          misc/src/components/ (blog, common, home, about, services, etc.)
Public Assets Root:           misc/public/ (312 total files, 151 CMS-relevant media assets)
```

**Integrity Status:** Untouched and strictly read-only.

---

## 3. GLOBAL / SETTINGS INVENTORY

Global website settings were extracted from `Header.js`, `FooterSection.js`, `layout.js`, and `WhatsappButton.js`:

| Setting Category | Field / Key | Authentic Value in Code | Source File |
|------------------|-------------|-------------------------|-------------|
| **Site Branding** | Site Name | MiscArchive | `Footer.js`, `layout.js` |
| | Tagline | IT Solution \| Digital Marketing Agency \| Audibles | `Footer.js` |
| **Logos** | Non-Sticky White Logo | `/assets/images/logo2.png` | `Header.js:61` |
| | Non-Sticky Black Logo | `/assets/images/42.png` | `Header.js:67` |
| | Sticky White Logo | `/assets/images/logo22.png` | `Header.js:73` |
| | Sticky Black Logo | `/assets/images/4.png` | `Header.js:79` |
| | Favicon | `/favicon.ico` | `app/favicon.ico` |
| **Contact Phone Numbers** | Primary Phone 1 | `+91 8907634900` | `Footer.js:27`, `ContactContent.js:56` |
| | Primary Phone 2 | `+91 8848608726` | `Footer.js:28`, `ContactContent.js:57` |
| | Regional Office (Neyyattinkara) | `+91 99958 62504` | `GetInTouch.js:85` |
| **WhatsApp Direct Chat** | WhatsApp Number | `918848608726` (`https://wa.me/918848608726`) | `WhatsappButton.js:3` |
| **Email Addresses** | Primary Business Email | `contact@miscarchive.com` | `Footer.js:37`, `GetInTouch.js:95` |
| | Secondary Inquiry Email | `contactmiscarchive@gmail.com` | `ContactContent.js:59` |
| **Physical Addresses** | Head Office | Rohini, MRA E34, Mele kuzhivila lane, Maruthankuzhy Brg, Kanjirampara, Thiruvananthapuram, Kerala 695030 | `Footer.js:16`, `ContactContent.js:47` |
| | Branch / Regional Location | Neyyattinkara, Trivandrum | `GetInTouch.js:75` |
| **Working Hours** | Operating Hours | Mon–Sat \| 9:30 AM – 6:30 PM | `Footer.js:45`, `GetInTouch.js:105` |
| **Tracking & Analytics** | Google Analytics ID | `G-NKFNZX5W56` | `layout.js:25` |
| | Google Tag Manager ID | `GTM-KCWBVHW` | `Footer.js:110` |
| **Social Links** | Instagram | `https://www.instagram.com/misc_archive_/` | `Header.js`, `Sidebar.js`, `Footer.js` |
| | Facebook | `https://www.facebook.com/miscarchives` | `Header.js`, `Sidebar.js`, `Footer.js` |
| | Twitter / X | `https://twitter.com/misc_archive` | `Header.js`, `Sidebar.js`, `Footer.js` |
| | LinkedIn | `https://www.linkedin.com/company/misc-archive/` | `Header.js`, `Sidebar.js`, `Footer.js` |
| **Google Maps Embed** | Office Location Embed | `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.817829742477!2d76.9749134744944!3d8.517061096793476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bb3682df7b0b%3A0x883771e7a4c3fd4f!2sMisc%20Archive!5e0!3m2!1sen!2sin!4v1751711918093!5m2!1sen!2sin` | `ContactContent.js:131` |

---

## 4. BANNER / HERO SECTION INVENTORY

Extracted from `misc/src/components/home/Banner.js`:

| # | Desktop Image | Mobile Image | Theme | CTA / Target Path | Order | Notes |
|---|---------------|--------------|-------|-------------------|-------|-------|
| 1 | `/assets/images/Bannermisc.jpg` | `/assets/images/MISC-PHONE-BANNER3.jpg` | `light` | *None* | 0 | Brand Hero introduction banner |
| 2 | `/assets/images/yeti-web3.jpeg` | `/assets/images/yeti-mobile2.jpeg` | `light` | `/Neyyattinkara` | 1 | Landing page promotion for Yeti / Neyyattinkara branch |
| 3 | `/assets/images/flumenxbanner.webp` | `/assets/images/flumenx-mobilebanner.webp` | `dark` | `https://flumenx.com/` | 2 | FlumenX partner ecosystem banner |

*Note: Headings and copy are graphic elements baked into the image assets themselves. The `Banner` MongoDB model supports optional dynamic overlay text if desired in future designs.*

---

## 5. SERVICES INVENTORY

Extracted from `misc/src/components/home/Services.js` and `misc/src/app/services/`:

| # | Service Title | Slug | Icon / Image | Route Target | Status | Summary Description |
|---|---------------|------|--------------|--------------|--------|---------------------|
| 1 | Digital Marketing | `digital-marketing` | `dm.png` | `/services/digital-marketing` | Active | Misc Archive is the best digital marketing company in Trivandrum. In a world driven by data, innovation, and connectivity, the key to your business success lies in digital marketing. |
| 2 | Web Development | `web-development` | `web devolepment 1.png` | `/services/web-development` | Active | Misc Archive is one of the finest web development companies in Trivandrum. We're passionate about turning your online presence into a masterpiece. A custom-built website is our main attraction. |
| 3 | Graphic Designing | `graphic-designing` | `web devolepment 1.png` | `/services/graphic-designing` | Active | Graphic design is the centre of attraction for any business. We at Misc Archive create unique graphic designs that help improve your business's online visibility. |
| 4 | Branding | `branding` | `dm.png` | `/` | Active | Misc Archive is a leading Digital Marketing Company in Trivandrum. We're dedicated to helping you shape your brand identity and elevate your impact in the world through branding. |
| 5 | SEO | `seo` | `seo.png` | `/coming-soon` | Active | SEO improves visibility, drives traffic, boosts sales, and converts clicks into customers. We make your site rank higher on search engines using trends and analytics. |
| 6 | Audibles | `miscaudibles` | `mic.png` | `/coming-soon` (has `/services/miscaudibles`) | Active | Misc Archive offers a creative hub where sounds and technology collide. The music studio serves as a refuge for both audiophiles and artists. |
| *7* | Event Management | `event-management` | `branding.png` | `/coming-soon` | Inactive (Commented) | We are the best event management company in Trivandrum from planning to organising, and executing a wide range of events. |
| *8* | Mobile App Development | `mobile-app-development` | `web devolepment 1.png` | `/coming-soon` | Inactive (Commented) | At Misc Archive, we're dedicated to turning your app vision into a reality that exceeds expectations. |
| *9* | RPA / AI | `rpa-ai` | `ai.png` | `/coming-soon` | Inactive (Commented) | We provide maintenance and support for the RPA and AI solutions, along with employee training. |
| *10* | Property Listing | `property-listing` | `ai.png` | `/coming-soon` | Inactive (Commented) | We specialize in connecting you with your ideal property with residential and commercial listings. |

---

## 6. SUB-SERVICES INVENTORY

Extracted from `misc/src/app/services/digital-marketing/` and `misc/src/components/services/DM-Subcategories/`:

| # | Parent Service | Sub-Service Title | Slug | Route | Component File | Summary Description |
|---|----------------|-------------------|------|-------|----------------|---------------------|
| 1 | Digital Marketing | E-mail Marketing | `email` | `/services/digital-marketing/email` | `emailContent.js` | Transform Connections into Conversions with Email Marketing. Targeted campaigns, automated flows, and measurable ROI. |
| 2 | Digital Marketing | Search Engine Marketing (SEM) | `sem` | `/services/digital-marketing/sem` | `SemContent.js` | Boost Visibility, Drive Traffic, and Achieve Measurable Results with Precision-Powered SEM Strategies. |
| 3 | Digital Marketing | Search Engine Optimization (SEO) | `seo` | `/services/digital-marketing/seo` | `SeoContent.js` | Increase organic rankings, high-intent traffic, and lasting authority across search engines. |
| 4 | Digital Marketing | Social Media Marketing (SMM) | `smm` | `/services/digital-marketing/smm` | `SmmContent.js` | Unlock the power of social media to grow your brand and engage with your audience like never before. |

---

## 7. CLIENT LOGOS INVENTORY

Audited from `misc/src/components/home/Logo.js` (Homepage slider) and `misc/src/components/about/About_logoslider.js` (About page slider):

### A. Homepage Carousel (30 Logos)
1. `promag-logo.png`
2. `icatch-logo.png`
3. `C L 01.webp`
4. `C L 02.webp`
5. `C L 03.webp`
6. `C L 05.webp`
7. `bulletclub.png`
8. `bm.png`
9. `jsml.png`
10. `pounchik.png`
11. `lemonsole_final.jpg`
12. `wisdom.jpg`
13. `kompeterzen.jpg`
14. `nanoos_final.jpg`
15. `swarasaakhi.jpg`
16. `math.jpg`
17. `ananthapuri.jpg`
18. `miscaudiable.jpg`
19. `misc web logos-01.jpg`
20. `misc web logos-02.jpg`
21. `misc web logos-03.jpg`
22. `misc web logos-04.jpg`
23. `misc web logos-05.jpg`
24. `misc web logos-06.jpg`
25. `misc web logos-07.jpg`
26. `misc web logos-08.jpg`
27. `misc web logos-09.jpg`
28. `misc web logos-10.jpg`
29. `ssnss.jpg`
30. `flyers.jpg`

### B. About Page Carousel (13 Logos, 5 Additional Unique Logos)
- Shared with Homepage: `C L 01.webp`, `C L 02.webp`, `C L 03.webp`, `C L 05.webp`, `bulletclub.png`, `bm.png`, `jsml.png`, `pounchik.png`.
- **5 Distinct Additional Logos:**
  31. `cs.png`
  32. `navaka.png`
  33. `rainbo.png`
  34. `rrv.png`
  35. `JSM.png`

**Total Unique Client Brand Logos in Repository:** **35 logos** (All verified present in `/assets/images/`).

---

## 8. TEAM MEMBERS INVENTORY

Extracted from `misc/src/components/about/About_about.js`:

| # | Name | Designation | Photo Image | Image File Verified | Status in Code | Notes |
|---|------|-------------|-------------|----------------------|----------------|-------|
| 1 | Anoop D Anil | Vice President, CFO | `/assets/images/sunny.webp` | YES (Exists) | Commented in JSX | Executive Leadership |
| 2 | Anoop Krishna | CEO, FOUNDER | `/assets/images/anoop.webp` | YES (Exists) | Commented in JSX | Executive Leadership |
| 3 | Rohini A Pillai | Co-Founder, COO | `/assets/images/anju.webp` | YES (Exists) | Commented in JSX | Executive Leadership |
| 4 | Akhil G V | Vice President, Creative Head | `/assets/images/akhil (1).webp` | YES (Exists) | Commented in JSX | Executive Leadership |

*All 4 image assets exist in `/misc/public/assets/images/` and are ready for CMS seeding.*

---

## 9. TESTIMONIALS INVENTORY

- **Verified Count on Website:** **0**
- Exhaustive code audit across all Next.js pages and components confirmed that no client reviews or testimonial cards are actively hardcoded in the frontend.
- Mentions of "testimonial" and "reviews" appear strictly as contextual topic words inside digital marketing blog articles.
- The `Testimonial` MongoDB model implemented in Phase 2 remains ready to receive new entries via the Admin Panel once the business elects to publish them.

---

## 10. FAQ INVENTORY

Extracted from `misc/src/components/home/Faqs.js` (Heading: *"Why Choose Miscarchive for Your Digital Marketing Needs?"*):

| # | Question / Feature Heading | Answer / Content |
|---|----------------------------|------------------|
| 1 | Expertise Across the Spectrum | Our team comprises seasoned experts in every facet of digital marketing - from SEO and content creation to social media management and PPC advertising. We've got the skills and know-how to tackle all your digital marketing challenges. |
| 2 | Tailored Strategies, Measurable Results: | We don't believe in one-size-fits-all solutions. Our approach begins with a deep understanding of your business, goals, and target audience. We then craft customized strategies that deliver measurable results. |
| 3 | Data-Driven Decision Making: | With Miscarchive, you're not flying blind. We're obsessed with data. Our team rigorously analyzes performance metrics, ensuring that every campaign is optimized for success. We make informed decisions to maximize ROI. |
| 4 | Creativity and Innovation: | Digital marketing isn't just about numbers; it's also about creativity. Our team is a melting pot of innovative thinkers, always pushing the boundaries to create engaging content and cutting-edge campaigns. |
| 5 | Proven Track Record: | Our portfolio is a testament to our success. We've helped businesses of all sizes and industries achieve their digital marketing goals. When you choose Miscarchive, you're choosing a track record of excellence. |
| 6 | Scalability and Adaptability: | As your business grows, we grow with you. Our strategies are designed to scale seamlessly, ensuring that your digital marketing efforts remain effective as you expand. |
| 7 | Cost-Effective Solutions: | Quality doesn't have to come at a premium. Miscarchive offers competitive pricing without compromising on the quality of service. We believe in delivering value that exceeds your investment. |
| 8 | Client-Centric Approach : | Your success is our success. We're committed to building long-lasting client relationships. When you choose Miscarchive, you're choosing a partner dedicated to your growth. |

---

## 11. CAREERS INVENTORY

Extracted from `misc/src/components/career/CareerContent.js`:

| # | Job Title / Heading | Flyer Image | Image Verified | Form / Apply Info | Status |
|---|---------------------|-------------|----------------|-------------------|--------|
| 1 | Digital Marketing Executive / Hiring | `/assets/images/career/dm-hiring.jpg` | YES (Exists) | Handled via General Inquiries / Direct Email | Active Flyer |

---

## 12. COMPLETE BLOG RECONCILIATION

### Technical Analysis: Resolving the 80 vs 79 Count & Mismatch Reality

1. **Route Directories:** Under `misc/src/app/blog/`, there is `page.js` (the listing view) and exactly **79 route subdirectories** representing individual blog article URLs (`/blog/<slug>`).
2. **Component Directory:** Under `misc/src/components/blog/`, there are 82 JavaScript files:
   - `BlogContent.js` (The 66-item card listing grid helper)
   - `Blogtitle.js` (The hero breadcrumb header helper)
   - Exactly **80 authored article components**.
3. **The 38 "Mismatches" Explained:**
   When developers created new routes, they copied an existing `page.js` as a template and imported their new component at the end of the file, leaving the old imported component statements at the top without cleaning them up.
   - Example (`src/app/blog/AI-Without-Losing-Your-Marketing-Soul/page.js`):
     ```javascript
     import Hijackers from '@/components/blog/Hijackers';            // Unused copy-paste artifact
     import MicroViralitys from '@/components/blog/Micro-Viralitys';  // Unused copy-paste artifact
     import MarketingSoul from '@/components/blog/MarketingSoul';    // Authentic intended import
     
     export default function page() {
       return (
         <div>
           <Header />
           <Blogtitle title="How to Use AI Without Losing Your Marketing Soul" />
           <MarketingSoul /> // Renders authentic component!
           <FooterSection />
         </div>
       );
     }
     ```
   - Crucially, in **100% of all 79 route files**, the JSX return block renders the **authentic, dedicated component**, meaning visitors to `/blog/<slug>` actually see the correct article!
4. **The 80th Authored Component:**
   `DigitalMarketingBlog.js` (76 lines) sits in `src/components/blog/`. It contains copy detailing FlumenCopia / MiscArchive digital marketing solutions. It is currently unrouted. In Phase 3B seeding, this will be seeded as an authenticated standalone article record.
5. **Listing Grid Alignment (`BlogContent.js`):**
   - 66 articles are featured on the `/blog` index page under categories `Digital Marketing` and `Web Development`.
   - 13 articles are direct-link unlisted articles.
   - Total: 66 + 13 = 79 routed articles.

### Full Reconciliation Table (All 80 Blog Articles)

| # | Slug | Route Component File | Authentic Source Component | Source Status | Content Verified | Image(s) | Notes |
|---|------|---------------------|---------------------------|---------------|------------------|----------|-------|
| 1 | `A-Simple-SEO-First-Approach` | `/src/app/blog/A-Simple-SEO-First-Approach/page.js` | `SEO-FirstApproach.js` | AUTHENTIC (CONVENTIONAL SLUG) | YES | `/assets/images/blogs/bl21.png` | Date: december 30, 2025; 1 headings |
| 2 | `AI-Search-Era` | `/src/app/blog/AI-Search-Era/page.js` | `AI-Search-Era.js` | AUTHENTIC | YES | `/assets/images/blogs/smm.jpg` | Date: November 01, 2025; 11 headings |
| 3 | `AI-Without-Losing-Your-Marketing-Soul` | `/src/app/blog/AI-Without-Losing-Your-Marketing-Soul/page.js` | `MarketingSoul.js` | AUTHENTIC (VESTIGIAL IMPORTS IN ROUTE) | YES | `/assets/images/blogs/SMM1.jpg` | Vestigial unused imports: Hijackers, Micro-Viralitys; Date: November 10, 2025; 10 headings |
| 4 | `AR-&-VR-Magic` | `/src/app/blog/AR-&-VR-Magic/page.js` | `AR&VRMagic.js` | AUTHENTIC (VESTIGIAL IMPORTS IN ROUTE) | YES | `/assets/images/blogs/bl18.png` | Vestigial unused imports: Cookieless_Future; Date: december 23, 2025; 10 headings |
| 5 | `Ai-driven-search-results` | `/src/app/blog/Ai-driven-search-results/page.js` | `Ai-driven-search-results.js` | AUTHENTIC (VESTIGIAL IMPORTS IN ROUTE) | YES | `/assets/images/blogs/SMM1.jpg` | Vestigial unused imports: SEO-and-AEO; Date: November 3, 2025; 10 headings |
| 6 | `Blog-misc-archive` | `/src/app/blog/Blog-misc-archive/page.js` | `Blogmiscarchive.js` | AUTHENTIC (VESTIGIAL IMPORTS IN ROUTE) | YES | None | Vestigial unused imports: PpcBlog; Date: September 03, 2025; 14 headings |
| 7 | `Content-Strategy-Engine` | `/src/app/blog/Content-Strategy-Engine/page.js` | `ContentStrategyEngine.js` | AUTHENTIC | YES | `/assets/images/blogs/SMM1.jpg` | Date: November 6, 2025; 11 headings |
| 8 | `Content-That-Converts` | `/src/app/blog/Content-That-Converts/page.js` | `ContentThatConverts.js` | AUTHENTIC | YES | `/assets/images/blogs/smm.jpg` | Date: january 29, 2026; 1 headings |
| 9 | `Creativity-AI-Marketing` | `/src/app/blog/Creativity-AI-Marketing/page.js` | `AI-Marketing.js` | AUTHENTIC (CONVENTIONAL SLUG) | YES | `/assets/images/image-gen_(6).jpeg` | Date: October 27, 2025; 9 headings |
| 10 | `Digital-Marketing-Agency-in-Trivandrum` | `/src/app/blog/Digital-Marketing-Agency-in-Trivandrum/page.js` | `DigitalMarketingAgencyTrivandrum.js` | AUTHENTIC (CONVENTIONAL SLUG) | YES | `/assets/images/blogs/smm.jpg` | Date: january 11, 2026; 1 headings |
| 11 | `Digital-Marketing-Changing-Business` | `/src/app/blog/Digital-Marketing-Changing-Business/page.js` | `Marketing-Changing-Business.js` | AUTHENTIC (VESTIGIAL IMPORTS IN ROUTE) | YES | `/assets/images/blogs/SMM1.jpg` | Vestigial unused imports: SEO-and-AEO, Ai-driven-search-results; Date: November 4, 2025; 10 headings |
| 12 | `Digital-Marketing-Company` | `/src/app/blog/Digital-Marketing-Company/page.js` | `Digital_Marketing_Company.js` | AUTHENTIC (VESTIGIAL IMPORTS IN ROUTE) | YES | None | Vestigial unused imports: PpcBlog; Date: September 03, 2025; 17 headings |
| 13 | `Digital-Marketing-tvm-blogs` | `/src/app/blog/Digital-Marketing-tvm-blogs/page.js` | `Digital_Marketing_tvm_blogs.js` | AUTHENTIC (VESTIGIAL IMPORTS IN ROUTE) | YES | None | Vestigial unused imports: PpcBlog; Date: September 03, 2025; 20 headings |
| 14 | `EEAT-and-AEO` | `/src/app/blog/EEAT-and-AEO/page.js` | `EEATandAEO.js` | AUTHENTIC (VESTIGIAL IMPORTS IN ROUTE) | YES | `/assets/images/blogs/smm.jpg` | Vestigial unused imports: PpcBlog, Digital_Marketing_Company; Date: November 01, 2025; 11 headings |
| 15 | `First-Party-Data` | `/src/app/blog/First-Party-Data/page.js` | `FirstParty.js` | AUTHENTIC (CONVENTIONAL SLUG) | YES | `/assets/images/blogs/bl14.jpeg` | Date: december 12, 2025; 16 headings |
| 16 | `From-Keywords-to-SXO` | `/src/app/blog/From-Keywords-to-SXO/page.js` | `FromKeywords.js` | AUTHENTIC (CONVENTIONAL SLUG) | YES | `/assets/images/blogs/smm.jpg` | Date: january 13, 2026; 1 headings |
| 17 | `Google-Ads-vs-Meta-Ads` | `/src/app/blog/Google-Ads-vs-Meta-Ads/page.js` | `GoogleAdsVsMeta.js` | AUTHENTIC (VESTIGIAL IMPORTS IN ROUTE) | YES | `/assets/images/blogs/smm.jpg` | Vestigial unused imports: ChangingGoogle; Date: january 16, 2026; 1 headings |
| 18 | `How-AI-Is-Redefining-Digital-Agencies` | `/src/app/blog/How-AI-Is-Redefining-Digital-Agencies/page.js` | `Ai-Redefining-Digital-Agencies.js` | AUTHENTIC (VESTIGIAL IMPORTS IN ROUTE) | YES | `/assets/images/blogs/bl34.webp` | Vestigial unused imports: Hijackers, Micro-Viralitys, MarketingSoul; Date: November 18, 2025; 12 headings |
| 19 | `How-AI-IsTransforming` | `/src/app/blog/How-AI-IsTransforming/page.js` | `AITransforming.js` | AUTHENTIC (VESTIGIAL IMPORTS IN ROUTE) | YES | `/assets/images/blogs/smm.jpg` | Vestigial unused imports: FirstParty; Date: december 14, 2025; 10 headings |
| 20 | `How-AI-Search-Is-Changing-Google-Rankings` | `/src/app/blog/How-AI-Search-Is-Changing-Google-Rankings/page.js` | `ChangingGoogle.js` | AUTHENTIC (CONVENTIONAL SLUG) | YES | `/assets/images/blogs/smm.jpg` | Date: january 14, 2026; 1 headings |
| 21 | `How-Digital-Marketing-Builds-Trust-for-Builders` | `/src/app/blog/How-Digital-Marketing-Builds-Trust-for-Builders/page.js` | `HowDigitalMarketing.js` | AUTHENTIC (VESTIGIAL IMPORTS IN ROUTE) | YES | `/assets/images/blogs/smm.jpg` | Vestigial unused imports: FirstParty, AITransforming, HowLinkedIn; Date: january 06, 2026; 1 headings |
| 22 | `How-LinkedIn` | `/src/app/blog/How-LinkedIn/page.js` | `HowLinkedIn.js` | AUTHENTIC (VESTIGIAL IMPORTS IN ROUTE) | YES | `/assets/images/blogs/smm.jpg` | Vestigial unused imports: FirstParty, AITransforming; Date: january 05, 2026; 1 headings |
| 23 | `Inside-2026-The-Quiet-Role-Generative-AI-Plays-in-Digital-Marketing` | `/src/app/blog/Inside-2026-The-Quiet-Role-Generative-AI-Plays-in-Digital-Marketing/page.js` | `Inside2026.js` | AUTHENTIC (CONVENTIONAL SLUG) | YES | `/assets/images/blogs/smm.jpg` | Date: january 09, 2026; 1 headings |
| 24 | `Local-Growth-Powerhouses` | `/src/app/blog/Local-Growth-Powerhouses/page.js` | `LocalGrowthPowerhouses.js` | AUTHENTIC (VESTIGIAL IMPORTS IN ROUTE) | YES | `/assets/images/blogs/bl20.png` | Vestigial unused imports: Cookieless_Future, AR&VRMagic, ReelsIntoRealSales; Date: december 28, 2025; 5 headings |
| 25 | `Local-SEO-Strategies` | `/src/app/blog/Local-SEO-Strategies/page.js` | `LocalSeoStrategies.js` | AUTHENTIC (VESTIGIAL IMPORTS IN ROUTE) | YES | `/assets/images/blogs/smm.jpg` | Vestigial unused imports: DigitalMarketingAgencyTrivandrum, ReduceAdSpend; Date: january 23, 2026; 1 headings |
| 26 | `Navigating-the-Digital-Future` | `/src/app/blog/Navigating-the-Digital-Future/page.js` | `Navigating_the_Digital_Future.js` | AUTHENTIC (VESTIGIAL IMPORTS IN ROUTE) | YES | None | Vestigial unused imports: PpcBlog; Date: September 03, 2025; 19 headings |
| 27 | `Quietly-Damage-Your-Brand` | `/src/app/blog/Quietly-Damage-Your-Brand/page.js` | `QuietlyDamage.js` | AUTHENTIC (CONVENTIONAL SLUG) | YES | `/assets/images/blogs/bl23.png` | Date: january 04, 2026; 1 headings |
| 28 | `Real-Guide-to-Micro-Viralitys` | `/src/app/blog/Real-Guide-to-Micro-Viralitys/page.js` | `Micro-Viralitys.js` | AUTHENTIC (VESTIGIAL IMPORTS IN ROUTE) | YES | `/assets/images/blogs/bl8.jpg` | Vestigial unused imports: Hijackers; Date: November 8, 2025; 11 headings |
| 29 | `Reduce-Ad-Spend-While-Increasing-Conversions` | `/src/app/blog/Reduce-Ad-Spend-While-Increasing-Conversions/page.js` | `ReduceAdSpend.js` | AUTHENTIC (VESTIGIAL IMPORTS IN ROUTE) | YES | `/assets/images/blogs/smm.jpg` | Vestigial unused imports: DigitalMarketingAgencyTrivandrum; Date: january 21, 2026; 1 headings |
| 30 | `Reels-Into-Real-Sales` | `/src/app/blog/Reels-Into-Real-Sales/page.js` | `ReelsIntoRealSales.js` | AUTHENTIC (VESTIGIAL IMPORTS IN ROUTE) | YES | `/assets/images/blogs/bl19.png` | Vestigial unused imports: Cookieless_Future, AR&VRMagic; Date: december 26, 2025; 6 headings |
| 31 | `SEO-vs-AEO` | `/src/app/blog/SEO-vs-AEO/page.js` | `SEO-and-AEO.js` | AUTHENTIC (CONVENTIONAL SLUG) | YES | `/assets/images/blogs/SMM1.jpg` | Date: November 02, 2025; 13 headings |
| 32 | `Social-Media-Marketing-in-2026` | `/src/app/blog/Social-Media-Marketing-in-2026/page.js` | `Social-Media-Marketing-2026.js` | AUTHENTIC (VESTIGIAL IMPORTS IN ROUTE) | YES | `/assets/images/blogs/smm.jpg` | Vestigial unused imports: ChangingGoogle, GoogleAdsVsMeta; Date: january 17, 2026; 1 headings |
| 33 | `Transforming-Digital-Marketing` | `/src/app/blog/Transforming-Digital-Marketing/page.js` | `Transforming_Digital.js` | AUTHENTIC (CONVENTIONAL SLUG) | YES | `/assets/images/blogs/smm.jpg` | Date: October 27, 2025; 11 headings |
| 34 | `Unlocking-Digital-Success` | `/src/app/blog/Unlocking-Digital-Success/page.js` | `Unlocking_Digital_Success.js` | AUTHENTIC (VESTIGIAL IMPORTS IN ROUTE) | YES | None | Vestigial unused imports: PpcBlog; Date: September 03, 2025; 18 headings |
| 35 | `Unlocking-Growth` | `/src/app/blog/Unlocking-Growth/page.js` | `Unlocking_Growth.js` | AUTHENTIC (VESTIGIAL IMPORTS IN ROUTE) | YES | None | Vestigial unused imports: PpcBlog; Date: September 03, 2025; 14 headings |
| 36 | `Website-Is-Your-Best-Salesperson` | `/src/app/blog/Website-Is-Your-Best-Salesperson/page.js` | `WebsiteIsYourBestSalesperson.js` | AUTHENTIC | YES | `/assets/images/blogs/smm.jpg` | Date: january 30, 2026; 1 headings |
| 37 | `What-Makes-a-High-Converting-Landing-Page-in-2026` | `/src/app/blog/What-Makes-a-High-Converting-Landing-Page-in-2026/page.js` | `HighConvertingLanding.js` | AUTHENTIC (CONVENTIONAL SLUG) | YES | `/assets/images/blogs/smm.jpg` | Date: january 10, 2026; 1 headings |
| 38 | `Why-Digital-Marketing-Matters` | `/src/app/blog/Why-Digital-Marketing-Matters/page.js` | `WhyDigitalMarketing.js` | AUTHENTIC (CONVENTIONAL SLUG) | YES | `/assets/images/blogs/smm.jpg` | Date: january 08, 2026; 1 headings |
| 39 | `Why-Human-Creativity` | `/src/app/blog/Why-Human-Creativity/page.js` | `Why-Human-Creativity.js` | AUTHENTIC (VESTIGIAL IMPORTS IN ROUTE) | YES | `/assets/images/blogs/SMM1.jpg` | Vestigial unused imports: SEO-and-AEO, Ai-driven-search-results, Marketing-Changing-Business; Date: November 5, 2025; 12 headings |
| 40 | `Will-AI-Replace-Marketing-People-by-2026` | `/src/app/blog/Will-AI-Replace-Marketing-People-by-2026/page.js` | `ReplaceMarketing.js` | AUTHENTIC (CONVENTIONAL SLUG) | YES | `/assets/images/blogs/bl22.png` | Date: january 01, 2026; 1 headings |
| 41 | `Your-Ads-from-Hidden-Hijackers` | `/src/app/blog/Your-Ads-from-Hidden-Hijackers/page.js` | `Hijackers.js` | AUTHENTIC (CONVENTIONAL SLUG) | YES | `/assets/images/blogs/SMM1.jpg` | Date: November 7, 2025; 20 headings |
| 42 | `Your-Brand-Ready-for-Voice` | `/src/app/blog/Your-Brand-Ready-for-Voice/page.js` | `YourBrandReady.js` | AUTHENTIC (VESTIGIAL IMPORTS IN ROUTE) | YES | `/assets/images/blogs/smm.jpg` | Vestigial unused imports: webdevelopmentBlog; 10 headings |
| 43 | `Zero-Click-Searches` | `/src/app/blog/Zero-Click-Searches/page.js` | `ZeroClickSearches.js` | AUTHENTIC (VESTIGIAL IMPORTS IN ROUTE) | YES | `/assets/images/blogs/smm.jpg` | Vestigial unused imports: DigitalMarketingAgencyTrivandrum, ReduceAdSpend, LocalSeoStrategies; Date: january 28, 2026; 1 headings |
| 44 | `ai-and-rpa` | `/src/app/blog/ai-and-rpa/page.js` | `Rpablog.js` | AUTHENTIC (CONVENTIONAL SLUG) | YES | `/assets/images/blogs/RPA.png` | Date: October 27, 2024; 5 headings |
| 45 | `ai-tools-that-redefine-marketing` | `/src/app/blog/ai-tools-that-redefine-marketing/page.js` | `Ai_that_redefine_marketing.js` | AUTHENTIC (CONVENTIONAL SLUG) | YES | `/assets/images/blogs/bl16.png` | 1 headings |
| 46 | `ai-without-losing-marketing-sense` | `/src/app/blog/ai-without-losing-marketing-sense/page.js` | `AiWithoutLosingMarketingSense.js` | AUTHENTIC | YES | `/assets/images/blogs/bl61.webp` | Date: March 24, 2026; 5 headings |
| 47 | `bad-ux-quietly-kills-conversions` | `/src/app/blog/bad-ux-quietly-kills-conversions/page.js` | `BadUXQuietlyKillsConversions.js` | AUTHENTIC (VESTIGIAL IMPORTS IN ROUTE) | YES | `/assets/images/blogs/bl44.webp` | Vestigial unused imports: Ai-Redefining-Digital-Agencies, GuideToMasteringVoice, ChooseContentThatActuallyPaysOff; Date: February 2, 2025; 13 headings |
| 48 | `brands-can-turn-followers-into-customers` | `/src/app/blog/brands-can-turn-followers-into-customers/page.js` | `FollowersIntoCustomers.js` | AUTHENTIC (VESTIGIAL IMPORTS IN ROUTE) | YES | `/assets/images/blogs/smm.jpg` | Vestigial unused imports: MarketingSoul; Date: january 30, 2026; 1 headings |
| 49 | `build-powerful-backlinks` | `/src/app/blog/build-powerful-backlinks/page.js` | `Backlinks.js` | AUTHENTIC (CONVENTIONAL SLUG) | YES | `/assets/images/blogs/smm.jpg` | Date: October 20, 2025; 11 headings |
| 50 | `build-visual-identity` | `/src/app/blog/build-visual-identity/page.js` | `BuiltaVisualIdentity.js` | AUTHENTIC (CONVENTIONAL SLUG) | YES | `/assets/images/blogs/bl53.webp` | Date: February 27, 2026; 7 headings |
| 51 | `choose-a-tech-stack-wisely` | `/src/app/blog/choose-a-tech-stack-wisely/page.js` | `ChooseaTechStackWisely.js` | AUTHENTIC | YES | `/assets/images/blogs/bl59.webp` | Date: March 16, 2026; 6 headings |
| 52 | `choose-content-that-actually-pays-off` | `/src/app/blog/choose-content-that-actually-pays-off/page.js` | `ChooseContentThatActuallyPaysOff.js` | AUTHENTIC (VESTIGIAL IMPORTS IN ROUTE) | YES | `/assets/images/blogs/bl43.webp` | Vestigial unused imports: Ai-Redefining-Digital-Agencies, GuideToMasteringVoice; Date: February 2, 2025; 10 headings |
| 53 | `choose-the-right-website` | `/src/app/blog/choose-the-right-website/page.js` | `ChoosetheRightWebsite.js` | AUTHENTIC | YES | `/assets/images/blogs/bl50.webp` | Date: February 7, 2026; 6 headings |
| 54 | `common-digital-marketing-mistakes` | `/src/app/blog/common-digital-marketing-mistakes/page.js` | `CommonDigitalMarketingMistakes.js` | AUTHENTIC (VESTIGIAL IMPORTS IN ROUTE) | YES | `/assets/images/blogs/smm.jpg` | Vestigial unused imports: MarketingSoul, FollowersIntoCustomers; Date: january 31, 2026; 1 headings |
| 55 | `compete-with-big-brands-online` | `/src/app/blog/compete-with-big-brands-online/page.js` | `CompeteWithBigBrandsOnline.js` | AUTHENTIC (VESTIGIAL IMPORTS IN ROUTE) | YES | `/assets/images/blogs/smm.jpg` | Vestigial unused imports: ChangingGoogle, GoogleAdsVsMeta; Date: February 3, 2026; 1 headings |
| 56 | `cookieless-future-is-here` | `/src/app/blog/cookieless-future-is-here/page.js` | `Cookieless_Future.js` | AUTHENTIC (CONVENTIONAL SLUG) | YES | `/assets/images/blogs/bl17.png` | Date: November 6, 2025; 15 headings |
| 57 | `digital-marketer-in-trivandrum` | `/src/app/blog/digital-marketer-in-trivandrum/page.js` | `MarketingBlog.js` | AUTHENTIC (CONVENTIONAL SLUG) | YES | `/assets/images/blogs/misc-blog.jpg` | Date: July 1, 2024; 9 headings |
| 58 | `guide-to-mastering-voice` | `/src/app/blog/guide-to-mastering-voice/page.js` | `GuideToMasteringVoice.js` | AUTHENTIC (VESTIGIAL IMPORTS IN ROUTE) | YES | `/assets/images/blogs/bl42.webp` | Vestigial unused imports: Ai-Redefining-Digital-Agencies; Date: January 31, 2025; 10 headings |
| 59 | `guide-to-reading-ad-metrics` | `/src/app/blog/guide-to-reading-ad-metrics/page.js` | `GuidetoReadingAdMetrics.js` | AUTHENTIC | YES | `/assets/images/blogs/bl56.webp` | 5 headings |
| 60 | `how-a-digital-markting-in-trivandrum` | `/src/app/blog/how-a-digital-markting-in-trivandrum/page.js` | `Marketingcompanytvmblog.js` | AUTHENTIC (VESTIGIAL IMPORTS IN ROUTE) | YES | `/assets/images/blogs/smm.jpg` | Vestigial unused imports: PpcBlog; Date: September 03, 2025; 17 headings |
| 61 | `how-brand-trust-makes-ads-work` | `/src/app/blog/how-brand-trust-makes-ads-work/page.js` | `BrandTrustMakesAdsWork.js` | AUTHENTIC (CONVENTIONAL SLUG) | YES | `/assets/images/blogs/bl54.webp` | Date: March 1, 2026; 6 headings |
| 62 | `marketing-spend-into-growth` | `/src/app/blog/marketing-spend-into-growth/page.js` | `MarketingSpendIntoGrowth.js` | AUTHENTIC (VESTIGIAL IMPORTS IN ROUTE) | YES | `/assets/images/blogs/bl49.webp` | Vestigial unused imports: UgcQuietlyOutperforms, OptimizeLandingPages; Date: February 6, 2026; 6 headings |
| 63 | `optimize-landing-pages` | `/src/app/blog/optimize-landing-pages/page.js` | `OptimizeLandingPages.js` | AUTHENTIC (VESTIGIAL IMPORTS IN ROUTE) | YES | `/assets/images/blogs/bl46.webp` | Vestigial unused imports: UgcQuietlyOutperforms; Date: February 3, 2026; 7 headings |
| 64 | `pay-per-click` | `/src/app/blog/pay-per-click/page.js` | `PpcBlog.js` | AUTHENTIC (CONVENTIONAL SLUG) | YES | `/assets/images/blogs/PPC.png` | Date: October 27, 2024; 10 headings |
| 65 | `retargeting-wont-save-bad-ads` | `/src/app/blog/retargeting-wont-save-bad-ads/page.js` | `RetargetingWontSaveBadAds.js` | AUTHENTIC | YES | `/assets/images/blogs/bl55.webp` | Date: March 3, 2026; 6 headings |
| 66 | `search-engine-optimization` | `/src/app/blog/search-engine-optimization/page.js` | `SeoBlog.js` | AUTHENTIC (VESTIGIAL IMPORTS IN ROUTE) | YES | `/assets/images/blogs/smo.jpg` | Vestigial unused imports: PpcBlog; Date: October 27, 2024; 2 headings |
| 67 | `social-media-builds-trust-before-sales` | `/src/app/blog/social-media-builds-trust-before-sales/page.js` | `SocialMediaBuildsTrustBeforeSales.js` | AUTHENTIC | YES | `/assets/images/blogs/bl63.webp` | Date: April 01, 2026; 6 headings |
| 68 | `social-media-marketing` | `/src/app/blog/social-media-marketing/page.js` | `SmmBlog.js` | AUTHENTIC (CONVENTIONAL SLUG) | YES | `/assets/images/blogs/smm.jpg` | Date: October 27, 2024; 6 headings |
| 69 | `socialmedias-real-purpose` | `/src/app/blog/socialmedias-real-purpose/page.js` | `SocialMediasRealPurpose.js` | AUTHENTIC | YES | `/assets/images/blogs/bl58.webp` | Date: March 12, 2026; 6 headings |
| 70 | `strategy-beats-ad-spend` | `/src/app/blog/strategy-beats-ad-spend/page.js` | `StrategyBeatsAdSpend.js` | AUTHENTIC | YES | `/assets/images/blogs/bl62.webp` | Date: March 28, 2026; 7 headings |
| 71 | `the-power-of-ai-analytics` | `/src/app/blog/the-power-of-ai-analytics/page.js` | `Power_Of_Ai_Analytics.js` | AUTHENTIC (CONVENTIONAL SLUG) | YES | `/assets/images/blogs/bl15.png` | Date: december 16, 2025; 1 headings |
| 72 | `turning-analytics-into-revenue` | `/src/app/blog/turning-analytics-into-revenue/page.js` | `TurningAnalyticsintoRevenue.js` | AUTHENTIC (VESTIGIAL IMPORTS IN ROUTE) | YES | `/assets/images/blogs/smm.jpg` | Vestigial unused imports: ChangingGoogle, GoogleAdsVsMeta; Date: january 23, 2026; 1 headings |
| 73 | `ugc-quietly-outperforms` | `/src/app/blog/ugc-quietly-outperforms/page.js` | `UgcQuietlyOutperforms.js` | AUTHENTIC | YES | `/assets/images/blogs/bl45.webp` | Date: February 3, 2025; 6 headings |
| 74 | `ui-alone-keeps-letting-websites-down` | `/src/app/blog/ui-alone-keeps-letting-websites-down/page.js` | `UiAloneKeepsLettingWebsitesDown.js` | AUTHENTIC | YES | `/assets/images/blogs/bl60.webp` | Date: March 20, 2026; 5 headings |
| 75 | `web-Development-Company-in-Trivandrum` | `/src/app/blog/web-Development-Company-in-Trivandrum/page.js` | `web_development_Company.js` | AUTHENTIC (VESTIGIAL IMPORTS IN ROUTE) | YES | `/assets/images/blogs/SMM1.jpg` | Vestigial unused imports: Rpablog; Date: december 02, 2025; 10 headings |
| 76 | `web-development` | `/src/app/blog/web-development/page.js` | `webdevelopmentBlog.js` | AUTHENTIC (CONVENTIONAL SLUG) | YES | `/assets/images/blogs/smm.jpg` | Date: August 23, 2025; 11 headings |
| 77 | `website-speed-on-seo-and-conversion` | `/src/app/blog/website-speed-on-seo-and-conversion/page.js` | `SpeedonSeoAndConversion.js` | AUTHENTIC (VESTIGIAL IMPORTS IN ROUTE) | YES | `/assets/images/blogs/smm.jpg` | Vestigial unused imports: ChangingGoogle, GoogleAdsVsMeta; Date: february 5, 2026; 1 headings |
| 78 | `websites-drive-real-results` | `/src/app/blog/websites-drive-real-results/page.js` | `WebsitesDriveRealResults.js` | AUTHENTIC | YES | `/assets/images/blogs/bl57.webp` | Date: March 08, 2026; 6 headings |
| 79 | `what-keeps-websites-running` | `/src/app/blog/what-keeps-websites-running/page.js` | `whatKeepsWebsitesRunning.js` | AUTHENTIC | YES | `/assets/images/blogs/bl52.webp` | Date: February 25, 2026; 6 headings |
| 80 | `digital-marketing-overview` *(proposed)* | *None (Unrouted)* | `DigitalMarketingBlog.js` | ORPHANED / UNROUTED AUTHORED COMPONENT | YES | None | Standalone authored article/service component in `src/components/blog/`. Contains 76 lines of copy on Digital Marketing solutions. |

---

## 13. ASSET / MEDIA RECONCILIATION

A full file-system sweep of `misc/public/` identified **312 total static files**.

### Heavy Files Audit: `HOME1.gif` and `HOME2.gif`

| File | Size (Bytes) | Size (MB) | Referenced in Code? | CMS Managed? | Migration Action |
|------|--------------|-----------|----------------------|--------------|------------------|
| `HOME1.gif` | 34,171,852 B | **32.59 MB** | NO (0 references in `src/`) | NO | Keep in static public folder; do **not** seed into MongoDB. |
| `HOME2.gif` | 25,050,471 B | **23.89 MB** | NO (0 references in `src/`) | NO | Keep in static public folder; do **not** seed into MongoDB. |

### CMS-Managed Media Distribution (151 Assets)

| Category / Entity | Count | Typical Paths / Location | Migration Strategy |
|-------------------|-------|--------------------------|---------------------|
| **Blog Featured & Inline Images** | 98 | `/assets/images/blogs/*.png`, `*.jpg`, `*.webp` | Seed file paths to `Blog.featuredImage` & content. |
| **Client Brand Logos** | 35 | `/assets/images/*logo*`, `/assets/images/misc web logos-*.jpg` | Seed file paths to `ClientLogo.logoImage`. |
| **Website Settings Logos** | 4 | `/assets/images/logo2.png`, `42.png`, `logo22.png`, `4.png` | Seed file paths to `WebsiteSettings.logos.*`. |
| **Service Icons** | 8 | `/assets/images/dm.png`, `web devolepment 1.png`, `seo.png`, `mic.png`, `ai.png`, `branding.png` | Seed file paths to `Service.iconImage`. |
| **Banner Slides (Desktop & Mobile)** | 6 | `/assets/images/Bannermisc.jpg`, `MISC-PHONE-BANNER3.jpg`, `yeti-web3.jpeg`, `yeti-mobile2.jpeg`, `flumenxbanner.webp`, `flumenx-mobilebanner.webp` | Seed to `Banner.desktopImage` & `mobileImage`. |
| **Team Member Photos** | 4 | `/assets/images/sunny.webp`, `anoop.webp`, `anju.webp`, `akhil (1).webp` | Seed to `TeamMember.photoImage`. |
| **Career Flyers** | 1 | `/assets/images/career/dm-hiring.jpg` | Seed to `Career.flyerImage`. |
| **Non-CMS Theme Assets** | 159 | `/assets/css/*`, `/assets/js/*`, layout background icons (`icon5.png` - `icon8.png`) | Retain purely in Next.js public assets directory. |

---

## 14. FORMS / ENQUIRIES ANALYSIS

The public website operates 3 lead-generation entry points:

### 1. Slide-out Quick Enquiry Drawer (`misc/src/components/common/Sidebar.js`)
- **Fields:**
  - `name` (text, required)
  - `email` (email, required)
  - `phone` (text, required)
  - `service` (dropdown select: `Digital marketing`, `SMM`, `WEB DEVELOPMENT`, `APPLICATION DEVELOPMENT`, `BRAND BUILDING`, `Audiable`)
  - `message` (textarea, required)
- **Current Action:** jQuery AJAX `POST` to Google Apps Script webhook (`https://script.google.com/macros/s/AKfycbxLw60yrM_9HtfrIsIJLyKTBD5FGKZ9UWUrPDe_FIquLZ3f8_hoQA_qm2RJnIRs2kub/exec`).
- **CMS Mapping:** Maps to `Enquiry` model (`formSource: "sidebar"`).

### 2. Main Contact Us Page Form (`misc/src/components/contact/ContactContent.js`)
- **Fields:**
  - `name` (text, required)
  - `email` (email, required)
  - `phone` (text, required)
  - `subject` (text, required)
  - `message` (textarea, required)
- **Current Action:** jQuery AJAX `POST` to the same Google Apps Script webhook. Reloads page upon alert.
- **CMS Mapping:** Maps to `Enquiry` model (`formSource: "contact"`).

### 3. Neyyattinkara Landing Page Form (`misc/src/components/Neyyattinkara/GetInTouch.js`)
- **Fields:**
  - `name` (text, required)
  - `email` (email, required)
  - `message` (textarea, required)
- **Current Action:** Vanilla JS client-side alert only (`"Thank you! We will get back to you shortly."`). Not currently piped to any endpoint.
- **CMS Mapping:** Maps to `Enquiry` model (`formSource: "neyyattinkara"`).

---

## 15. WEBSITE DATA TO MONGODB MODEL MAPPING

Comparison between discovered website data and the Phase 2 Mongoose models:

| MongoDB Model | Existing Data Available | Source File(s) | Discovered Fields | Schema Supported | Discrepancies / Missing Fields |
|---------------|-------------------------|----------------|-------------------|------------------|--------------------------------|
| **WebsiteSettings** | YES | `Header.js`, `Footer.js`, `layout.js` | Site name, tagline, 4 logos, 3 phones, 2 emails, 2 addresses, WhatsApp, 4 social links, GA ID, GTM ID | 100% | None. Schema perfectly models dual addresses, multiple phones, and all 4 sticky/non-sticky logo variants. |
| **Banner** | YES | `Banner.js` | 3 slides: desktopImg, mobileImg, theme, path/link | 100% | None. Schema supports `desktopImage`, `mobileImage`, `theme`, `linkUrl`, `order`. |
| **Service** | YES | `Services.js`, `Service_*.js` | 6 core services + 4 inactive: title, slug, route, image, description, HTML content | 100% | None. |
| **SubService** | YES | `DM-Subcategories/*.js` | 4 sub-services: Email, SEM, SEO, SMM under Digital Marketing | 100% | None. `parentService` reference field correctly links to parent. |
| **ClientLogo** | YES | `Logo.js`, `About_logoslider.js` | 35 logos: filenames, alt texts, order | 100% | None. |
| **TeamMember** | YES | `About_about.js` | 4 members: name, designation, photo image | 100% | None. `photoImage` matches paths. |
| **Testimonial** | NO (0 on site) | N/A | None currently on site | 100% | Schema exists and ready for future CMS entries. |
| **BlogCategory** | YES | `BlogContent.js` | 2 core categories: "Digital Marketing", "Web Development" | 100% | None. |
| **Blog** | YES | 79 routes + 80 components | 80 articles: title, slug, HTML content, images, dates, categories, SEO titles/descriptions | 100% | None. `originalAuthoredComponent` field captures source traceability. |
| **Faq** | YES | `Faqs.js` | 8 items: question, answer | 100% | None. |
| **Career** | YES | `CareerContent.js` | 1 hiring flyer: title, flyerImage | 100% | None. |
| **Enquiry** | YES (Schema) | 3 form sources | name, email, phone, service, subject, message | 100% | None. `formSource` discriminator supports sidebar, contact, and neyyattinkara. |
| **MediaAsset** | YES | `misc/public/assets/` | 151 media items | 100% | None. |
| **User** | YES (Seeded) | `admin-api/src/seed.ts` | Default admin user created in Phase 2 | 100% | Operational. |

---

## 16. CMS DATA VS. FRONTEND STRUCTURE SEPARATION

To avoid over-engineering and retain frontend rendering speed, CMS data and frontend layout must remain cleanly separated:

### What Belongs in MongoDB (CMS Data)
- Text copy (headings, paragraphs, FAQs, biographies, job descriptions).
- Media URLs (banner graphics, blog article hero images, client logo image links, executive headshots).
- Metadata (slugs, SEO meta titles, meta descriptions, publication dates, categories, tags).
- Settings (phone numbers, email addresses, office physical addresses, social profile links, analytics tracking IDs).
- Form submissions (customer contact messages, service quote enquiries).

### What Remains in the Public Website Codebase (Frontend Structure)
- Next.js layout tree (`layout.js`, `Header.js`, `FooterSection.js`, navigation bars, drawer toggles).
- CSS stylesheets and design tokens (`animate.css`, `bootstrap.css`, `style.css`, TailwindCSS).
- Micro-interactions, animations, scroll listeners, and carousel mechanics (`react-slick`, `Slider`, intersection observers).
- Static decorative visual graphics (background patterns, icons `icon5.png`–`icon8.png`, loading spinners).
- Legacy animations (`HOME1.gif`, `HOME2.gif`).

---

## 17. MISSING, DUPLICATE, AND CONFLICTING DATA NOTES

1. **Unrouted Blog Component:**
   `DigitalMarketingBlog.js` exists in `misc/src/components/blog/` but is never imported into any App Router `page.js`. Its text is genuine copy detailing FlumenCopia and MiscArchive digital marketing solutions. Phase 3B will seed this article cleanly with slug `digital-marketing-solutions-overview`.
2. **Vestigial Imports in 38 Blog Routes:**
   38 `page.js` files carry dead imports at the top of the file. However, because the JSX return statement renders the authentic component, the page content itself is not broken. When public website consumption is switched to MongoDB in Phase 4, dynamic routing `src/app/blog/[slug]/page.js` will eliminate all 79 hardcoded route folders and all 38 vestigial imports simultaneously.
3. **Logo Slider Divergence:**
   `Logo.js` on the homepage contains 30 logos; `About_logoslider.js` on the about page contains 13 logos, with 5 unique logos not on the homepage. Seeding will register all 35 unique client logos with an `isFeatured` or `order` flag.
4. **Inactive Services:**
   4 services are commented out in `Services.js` (`Event Management`, `Mobile App Development`, `RPA / AI`, `Property Listing`). They will be seeded into MongoDB with `isActive: false`, allowing administrators to enable them instantly via the Admin Panel toggle when ready.

---

## 18. VERIFIED MIGRATION COUNTS

| CMS Entity | Verified Unique Count | Source Location |
|------------|-----------------------|-----------------|
| **Blogs** | **80** (79 routed + 1 unrouted) | `src/app/blog/*/page.js` & `src/components/blog/*.js` |
| **Blog Categories** | **2** ("Digital Marketing", "Web Development") | `src/components/blog/BlogContent.js` |
| **Core Services** | **6** Active (+ 4 Inactive) | `src/components/home/Services.js` |
| **Sub-Services** | **4** | `src/components/services/DM-Subcategories/*.js` |
| **Client Logos** | **35** (30 homepage + 5 about page) | `src/components/home/Logo.js` & `About_logoslider.js` |
| **Team Members** | **4** | `src/components/about/About_about.js` |
| **Testimonials** | **0** (Schema ready) | Verified 0 on public website |
| **FAQs** | **8** | `src/components/home/Faqs.js` |
| **Careers** | **1** | `src/components/career/CareerContent.js` |
| **Banners** | **3** | `src/components/home/Banner.js` |
| **Global Settings** | **1** (Singleton document) | `Header.js`, `Footer.js`, `layout.js`, `WhatsappButton.js` |
| **CMS Media Assets** | **151** | `misc/public/assets/images/` |
| **Forms / Enquiries** | **3** | `Sidebar.js`, `ContactContent.js`, `GetInTouch.js` |

---

## 19. MIGRATION RISKS & MITIGATION MEASURES

1. **URL Slug Stability:**
   - *Risk:* 79 blog routes currently have active search engine indexing and backlink history. Any alteration to letter casing or hyphens in slugs would cause SEO link rot.
   - *Mitigation:* The seed script must retain the exact slug string as found in the directory name of `src/app/blog/<slug>` (case-preserved).
2. **Blog Body HTML Extraction Fidelity:**
   - *Risk:* In 80 components, content is expressed as JSX. Naive string scraping could strip inline formatting, styled pull quotes, or embedded image paths.
   - *Mitigation:* The seed extractor must parse the JSX container cleanly, converting JSX-specific attributes (e.g. `className`, `style={{...}}`) into standard semantic HTML.
3. **Image Path References:**
   - *Risk:* Blog images use relative paths (`/assets/images/blogs/bl1.png`). If modified, images will fail to load.
   - *Mitigation:* Retain `/assets/...` public web paths intact in MongoDB so existing Next.js static asset routing resolves them seamlessly.

---

## 20. RECOMMENDED PHASE 3B SEED STRATEGY

For the forthcoming Phase 3B migration phase, the following automated architecture is recommended:

1. **AST-Based Content Extractor (`admin-api/src/scripts/extractWebsiteContent.ts`):**
   - Read each of the 80 component files in `misc/src/components/blog/*.js`.
   - Extract the complete JSX body markup, title, date, featured image, and headings without loss or summarization.
   - Pair each component with its verified route slug from the audit table.
2. **Unified Seed Script (`admin-api/src/scripts/seedWebsiteData.ts`):**
   - Seed `WebsiteSettings` with all 4 logos, dual addresses, phones, and analytics IDs.
   - Seed 3 `Banner` documents with exact desktop/mobile images and target links.
   - Seed 6 active `Service` documents + 4 inactive services.
   - Seed 4 `SubService` documents linked to Digital Marketing.
   - Seed 35 `ClientLogo` documents.
   - Seed 4 `TeamMember` documents.
   - Seed 8 `Faq` documents.
   - Seed 1 `Career` document.
   - Seed 2 `BlogCategory` documents.
   - Seed all 80 `Blog` documents with full HTML bodies, SEO titles, descriptions, and category associations.
3. **Idempotence & Safety:**
   - Use `upsert` (`findOneAndUpdate` with `upsert: true`) based on unique keys (`slug` for blogs and services, `clientName` for logos, `siteName` for settings) so the seed can be run repeatedly without duplicating records.
   - Keep `misc/` completely untouched until Phase 4 (public website API integration).

---

# FINAL SAFETY VERIFICATION

```text
Public website files modified: 0
Public website files deleted: 0
Public website files moved: 0
Public website files renamed: 0
Public website hardcoded data changed: 0
Public website connected to Admin API: NO
MongoDB website data migration performed: NO
Final seed created: NO
Admin UI modified: NO
Admin API modified: NO
Git staged: NO
Git committed: NO
Git pushed: NO
```
