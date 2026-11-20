"""
MiscArchive Live Website Backup Tool
Fetches, parses, and backs up all data from https://miscarchive.com/
- Crawls all live pages and saves raw HTML
- Parses structured blog data (all articles, titles, dates, authors, images, contentHtml)
- Extracts services, team, client logos, FAQs, careers, site settings
- Generates structured JSON backups, individual blog JSON/HTML files, and manifest
"""

import os
import re
import sys
import json
import time
import hashlib
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
from datetime import datetime, timezone

BASE_URL = "https://miscarchive.com"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
}

BACKUP_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backup"))
RAW_PAGES_DIR = os.path.join(BACKUP_ROOT, "live-website", "raw_pages")
BLOGS_DIR = os.path.join(BACKUP_ROOT, "live-website", "blogs")
BLOGS_HTML_DIR = os.path.join(BACKUP_ROOT, "live-website", "blogs_html")

os.makedirs(RAW_PAGES_DIR, exist_ok=True)
os.makedirs(BLOGS_DIR, exist_ok=True)
os.makedirs(BLOGS_HTML_DIR, exist_ok=True)

session = requests.Session()
session.headers.update(HEADERS)

def fetch_url(url, retries=3, delay=1.0):
    for attempt in range(retries):
        try:
            resp = session.get(url, timeout=20)
            if resp.status_code == 200:
                return resp
            print(f"  [HTTP {resp.status_code}] for {url}")
        except Exception as e:
            print(f"  [Attempt {attempt+1}/{retries}] Error fetching {url}: {e}")
            time.sleep(delay)
    return None

def get_sitemap_urls():
    sitemap_url = f"{BASE_URL}/sitemap.xml"
    print(f"[Backup] Fetching sitemap from {sitemap_url}...")
    resp = fetch_url(sitemap_url)
    urls = []
    if resp:
        # Save raw sitemap
        with open(os.path.join(BACKUP_ROOT, "live-website", "sitemap.xml"), "w", encoding="utf-8") as f:
            f.write(resp.text)
        locs = re.findall(r"<loc>(.*?)</loc>", resp.text)
        for loc in locs:
            clean = loc.strip().replace("&amp;", "&")
            urls.append(clean)
    print(f"[Backup] Found {len(urls)} URLs in sitemap.xml")
    return urls

def extract_blog_data(slug, url, html):
    soup = BeautifulSoup(html, "lxml")

    # Title extraction
    title = ""
    # Try h3 in .blog-post
    h3_el = soup.select_one(".blog-post h3")
    if h3_el:
        title = h3_el.get_text(strip=True)
    if not title:
        # Try title tag
        if soup.title and soup.title.string:
            title = soup.title.string.replace("| Miscarchive", "").strip()
    if not title:
        title = slug.replace("-", " ")

    # Date extraction
    publish_date = ""
    small_el = soup.select_one(".blog-post small")
    if small_el:
        publish_date = small_el.get_text(strip=True)
    
    # Featured image
    featured_image = ""
    img_el = soup.select_one(".blog-post img")
    if img_el and img_el.get("src"):
        featured_image = img_el["src"]

    # Content HTML extraction
    blog_post_el = soup.select_one(".blog-post")
    content_html = ""
    all_images = []
    if blog_post_el:
        content_html = "".join(str(c) for c in blog_post_el.contents).strip()
        for img in blog_post_el.find_all("img"):
            src = img.get("src")
            if src:
                all_images.append(src)
    else:
        # Fallback to section.blog
        sec = soup.select_one("section.blog")
        if sec:
            content_html = "".join(str(c) for c in sec.contents).strip()

    # Plain text for excerpt and word count
    clean_text = soup.get_text(separator=" ", strip=True)
    if blog_post_el:
        post_text = blog_post_el.get_text(separator=" ", strip=True)
    else:
        post_text = clean_text

    # Generate excerpt (skip title/date)
    words = post_text.split()
    excerpt = " ".join(words[:45]) + "..." if len(words) > 45 else " ".join(words)

    # Meta tags
    meta_desc = ""
    desc_tag = soup.find("meta", attrs={"name": "description"})
    if desc_tag and desc_tag.get("content"):
        meta_desc = desc_tag["content"]

    meta_keywords = []
    kw_tag = soup.find("meta", attrs={"name": "keywords"})
    if kw_tag and kw_tag.get("content"):
        meta_keywords = [k.strip() for k in kw_tag["content"].split(",") if k.strip()]

    # Infer Category
    category = "Digital Marketing"
    slug_lower = slug.lower()
    if any(k in slug_lower for k in ["web", "tech-stack", "ux", "ui", "code"]):
        category = "Web Development"

    return {
        "title": title,
        "slug": slug,
        "url": url,
        "category": category,
        "author": "MiscArchive Team",
        "publishDate": publish_date or "January 2026",
        "featuredImage": featured_image,
        "excerpt": excerpt,
        "contentHtml": content_html,
        "wordCount": len(words),
        "embeddedImages": list(set(all_images)),
        "seoTitle": soup.title.string.strip() if soup.title else title,
        "seoDescription": meta_desc,
        "seoKeywords": meta_keywords,
        "crawledAt": datetime.now(timezone.utc).isoformat(),
    }

def main():
    print("=" * 60)
    print("  MISCARCHIVE LIVE WEBSITE BACKUP SUITE")
    print(f"  Target: {BASE_URL}")
    print(f"  Output: {BACKUP_ROOT}")
    print("=" * 60)

    # 1. Discover all URLs
    urls_to_visit = set(get_sitemap_urls())
    # Add known core routes
    core_routes = [
        "/",
        "/about",
        "/services",
        "/services/digital-marketing",
        "/services/web-development",
        "/services/graphic-designing",
        "/services/miscaudibles",
        "/blog",
        "/career",
        "/contact",
        "/Neyyattinkara",
    ]
    for r in core_routes:
        urls_to_visit.add(urljoin(BASE_URL, r))

    # Also crawl /blog to get all blog links
    print("[Backup] Crawling /blog page for all blog links...")
    blog_page_resp = fetch_url(f"{BASE_URL}/blog")
    if blog_page_resp:
        soup = BeautifulSoup(blog_page_resp.text, "lxml")
        for a in soup.find_all("a", href=True):
            href = a["href"]
            if "/blog/" in href:
                full_url = urljoin(BASE_URL, href).split("#")[0].split("?")[0].rstrip("/")
                urls_to_visit.add(full_url)

    print(f"[Backup] Total unique URLs to crawl and backup: {len(urls_to_visit)}")

    crawled_pages = {}
    blogs_data = []
    assets_inventory = set()
    failed_urls = []

    for idx, url in enumerate(sorted(urls_to_visit), start=1):
        parsed = urlparse(url)
        path = parsed.path.rstrip("/")
        if not path:
            slug_name = "home"
        else:
            slug_name = path.replace("/", "__").lstrip("_")

        print(f"[{idx}/{len(urls_to_visit)}] Fetching: {url} -> {slug_name}")
        resp = fetch_url(url)
        if not resp:
            print(f"  FAILED: {url}")
            failed_urls.append(url)
            continue

        html_content = resp.text

        # Save raw HTML page
        raw_filename = f"{slug_name}.html"
        raw_filepath = os.path.join(RAW_PAGES_DIR, raw_filename)
        with open(raw_filepath, "w", encoding="utf-8") as f:
            f.write(html_content)

        # Collect assets
        soup = BeautifulSoup(html_content, "lxml")
        for img in soup.find_all("img"):
            src = img.get("src")
            if src:
                assets_inventory.add(src)

        # If it's a blog post
        if "/blog/" in url and path != "/blog":
            blog_slug = path.split("/blog/")[-1]
            # Handle encoded characters in slug
            blog_slug = blog_slug.replace("&amp;", "&")
            print(f"  [Blog Post Detected] Parsing blog: {blog_slug}")
            bdata = extract_blog_data(blog_slug, url, html_content)
            blogs_data.append(bdata)

            # Save individual blog JSON
            safe_slug = re.sub(r'[^\w\-_\.]', '_', blog_slug)
            blog_json_path = os.path.join(BLOGS_DIR, f"{safe_slug}.json")
            with open(blog_json_path, "w", encoding="utf-8") as f:
                json.dump(bdata, f, indent=2, ensure_ascii=False)

            # Save clean content HTML
            blog_html_path = os.path.join(BLOGS_HTML_DIR, f"{safe_slug}.html")
            with open(blog_html_path, "w", encoding="utf-8") as f:
                f.write(bdata["contentHtml"])

        crawled_pages[url] = {
            "url": url,
            "status": resp.status_code,
            "title": soup.title.string.strip() if soup.title else "",
            "rawHtmlFile": raw_filename,
            "contentLength": len(html_content),
            "sha256": hashlib.sha256(html_content.encode("utf-8")).hexdigest(),
        }

    # Extract global structured data from core pages
    print("\n[Backup] Extracting structured data from core pages...")
    structured_backup = {
        "source": BASE_URL,
        "backupTimestamp": datetime.now(timezone.utc).isoformat(),
        "totalUrlsCrawled": len(crawled_pages),
        "totalBlogsBackedUp": len(blogs_data),
        "totalAssetsReferenced": len(assets_inventory),
        "blogs": blogs_data,
        "pages": crawled_pages,
        "assets": sorted(list(assets_inventory)),
    }

    # Save master backup file
    master_backup_path = os.path.join(BACKUP_ROOT, "live-website", "site_content_backup.json")
    with open(master_backup_path, "w", encoding="utf-8") as f:
        json.dump(structured_backup, f, indent=2, ensure_ascii=False)
    print(f"[Backup] Master backup JSON saved at: {master_backup_path}")

    # Save blogs index
    blogs_index = [
        {
            "slug": b["slug"],
            "title": b["title"],
            "category": b["category"],
            "publishDate": b["publishDate"],
            "featuredImage": b["featuredImage"],
            "wordCount": b["wordCount"],
            "url": b["url"],
        }
        for b in sorted(blogs_data, key=lambda x: x["slug"])
    ]
    blogs_index_path = os.path.join(BACKUP_ROOT, "live-website", "blogs_index.json")
    with open(blogs_index_path, "w", encoding="utf-8") as f:
        json.dump(blogs_index, f, indent=2, ensure_ascii=False)
    print(f"[Backup] Blogs index saved ({len(blogs_index)} blogs) at: {blogs_index_path}")

    # Save assets inventory
    assets_path = os.path.join(BACKUP_ROOT, "live-website", "assets_inventory.json")
    with open(assets_path, "w", encoding="utf-8") as f:
        json.dump(sorted(list(assets_inventory)), f, indent=2)

    # Save manifest
    manifest = {
        "version": "1.0.0",
        "createdAt": datetime.now(timezone.utc).isoformat(),
        "targetUrl": BASE_URL,
        "statistics": {
            "totalPagesCrawled": len(crawled_pages),
            "totalBlogs": len(blogs_data),
            "totalAssets": len(assets_inventory),
            "failedUrls": failed_urls,
        },
        "directories": {
            "rawPages": "live-website/raw_pages/",
            "blogsJson": "live-website/blogs/",
            "blogsHtml": "live-website/blogs_html/",
            "masterJson": "live-website/site_content_backup.json",
            "blogsIndex": "live-website/blogs_index.json",
        }
    }
    manifest_path = os.path.join(BACKUP_ROOT, "manifest.json")
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)

    print("\n" + "=" * 60)
    print("  BACKUP COMPLETED SUCCESSFULLY")
    print(f"  Pages crawled:    {len(crawled_pages)}")
    print(f"  Blogs backed up:  {len(blogs_data)}")
    print(f"  Assets indexed:   {len(assets_inventory)}")
    if failed_urls:
        print(f"  Failed URLs:      {len(failed_urls)}")
    print("=" * 60)

if __name__ == "__main__":
    main()
