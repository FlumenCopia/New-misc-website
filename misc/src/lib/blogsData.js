import { getBlogBySlug, resolveMediaUrl } from './api';

/**
 * Curated catalog of blog posts with fallback metadata
 */
export const fallbackBlogsCatalog = [
  {
    slug: 'social-media-builds-trust-before-sales',
    title: 'How Social Media Builds Trust Before Sales',
    category: 'Digital Marketing',
    subCategory: 'Social Media',
    publishDate: 'April 01, 2026',
    readTime: '6 min read',
    featuredImage: '/assets/images/blogs/bl63.webp',
    excerpt:
      "Trust is often built long before customers are ready to buy. Here's how social media shapes perception, creates connections, and influences decisions.",
    tableOfContents: [
      { id: 'why-trust-matters', step: '01', title: 'Why Trust Matters More Than Reach' },
      { id: 'what-happens-when-trust-is-missing', step: '02', title: 'What Happens When Trust Is Missing' },
      { id: 'how-social-media-builds-trust', step: '03', title: 'How Social Media Builds Trust' },
      { id: 'real-ways-to-build-trust', step: '04', title: 'Real Ways to Build Trust on Social Media' },
      { id: 'long-term-impact-on-sales', step: '05', title: 'The Long-Term Impact on Sales' },
      { id: 'final-thoughts', step: '06', title: 'Final Thoughts' },
    ],
  },
  {
    slug: 'strategy-beats-ad-spend',
    title: 'Top 5 Reasons Strategy Beats Ad Spend',
    category: 'Digital Marketing',
    subCategory: 'Strategy',
    publishDate: 'March 28, 2026',
    readTime: '5 min read',
    featuredImage: '/assets/images/blogs/bl62.webp',
    excerpt:
      'Pouring budget into ads without a coherent strategic foundation burns cash. Here is why clarity and positioning outperform brute-force ad spending every time.',
  },
  {
    slug: 'ai-without-losing-marketing-sense',
    title: 'A Guide to Using AI Without Losing Marketing Sense',
    category: 'Digital Marketing',
    subCategory: 'AI & Innovation',
    publishDate: 'March 24, 2026',
    readTime: '7 min read',
    featuredImage: '/assets/images/blogs/bl61.webp',
    excerpt:
      'AI can accelerate output, but human intuition, emotional resonance, and brand voice remain irreplaceable. Learn how to blend both effectively.',
    tableOfContents: [
      { id: 'why-avoiding-ai-is-a-quiet-mistake', step: '01', title: 'Why Avoiding AI Is a Quiet Mistake' },
      { id: 'five-real-ways-ai-changes-marketing-work', step: '02', title: 'Five Real Ways AI Changes Marketing Work' },
      { id: 'how-to-start-without-overcomplicating-it', step: '03', title: 'How to Start Without Overcomplicating It' },
      { id: 'the-balance-to-keep', step: '04', title: 'The Balance to Keep' },
    ],
  },
  {
    slug: 'ui-alone-keeps-letting-websites-down',
    title: 'Why UI Alone Keeps Letting Websites Down',
    category: 'Web Development',
    subCategory: 'UI/UX Design',
    publishDate: 'March 20, 2026',
    readTime: '5 min read',
    featuredImage: '/assets/images/blogs/bl60.webp',
    excerpt:
      'A beautiful website that fails to guide users toward clear decisions is just digital art. Discover the critical balance between aesthetics and conversion architecture.',
  },
  {
    slug: 'choose-a-tech-stack-wisely',
    title: 'How to Choose a Tech Stack Wisely',
    category: 'Web Development',
    subCategory: 'Engineering',
    publishDate: 'March 16, 2026',
    readTime: '6 min read',
    featuredImage: '/assets/images/blogs/bl59.webp',
    excerpt:
      'From Next.js and headless architectures to performance optimization, picking the right foundation shapes your product agility for years to come.',
  },
  {
    slug: 'choose-the-right-website',
    title: 'How to Choose the Right Website',
    category: 'Web Development',
    subCategory: 'Architecture',
    publishDate: 'March 10, 2026',
    readTime: '5 min read',
    featuredImage: '/assets/images/blogs/bl57.webp',
    excerpt:
      'Not all businesses need the same type of web presence. Understand the difference between high-converting landing pages, corporate portals, and custom apps.',
  },
];

/**
 * Normalizes blog post data ensuring consistent fields across all articles
 */
export function normalizeBlog(raw, fallback = null, slug = '') {
  const base = fallback || {};
  const b = raw || {};

  const title = b.title || base.title || slugToTitle(slug) || 'Blog Article';
  const category = b.category || base.category || 'Digital Marketing';
  const subCategory = b.subCategory || base.subCategory || category;
  const publishDate =
    b.publishDate
      ? new Date(b.publishDate).toLocaleDateString('en-US', {
          month: 'long',
          day: '2-digit',
          year: 'numeric',
        })
      : base.publishDate || 'April 01, 2026';

  const wordCount = (b.contentHtml || '').replace(/<[^>]*>/g, '').split(/\s+/).length;
  const calculatedReadTime = `${Math.max(4, Math.ceil(wordCount / 180))} min read`;
  const readTime = b.readTime || base.readTime || calculatedReadTime;

  const featuredImage = resolveMediaUrl(
    b.featuredImage ||
      b.image ||
      base.featuredImage ||
      base.image ||
      '/assets/images/blogs/bl63.webp'
  );

  const excerpt =
    b.excerpt ||
    b.shortDescription ||
    base.excerpt ||
    'Insights, practical strategies, and actionable advice to help your business build brand equity and accelerate digital growth.';

  return {
    title,
    slug: b.slug || base.slug || slug,
    category,
    subCategory,
    publishDate,
    readTime,
    featuredImage,
    excerpt,
    tableOfContents: base.tableOfContents || null,
    contentHtml: b.contentHtml || '',
  };
}

/**
 * Converts a slug into a readable title
 */
function slugToTitle(slug = '') {
  if (!slug) return '';
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

/**
 * Automatically extracts headings from HTML content to build Table of Contents
 * and elevates raw HTML into a magazine-grade editorial layout.
 */
export function extractTableOfContentsFromHtml(html = '') {
  if (!html) return { cleanHtml: '', tableOfContents: [] };

  let cleaned = html
    // Strip trailing CMS divs/section tags
    .replace(/(?:<\/(?:div|section)>\s*)+$/gi, '')
    .replace(/<div\s+class=["']blog["']>[\s\S]*?<div\s+class=["']blog-post["']>/gi, '')
    .replace(/<div\s+class=["']blog-post["']>/gi, '')
    .trim();

  // Strip duplicate top image, title, or small dates from legacy CMS markup
  cleaned = cleaned.replace(/<h3>.*?<\/h3>\s*<small>.*?<\/small>[\s\S]*?<p><img.*?\/><\/p>/gi, '');

  // Extract lead intro (everything before the first <hr> or <h[2-4]>)
  const firstHeaderIndex = cleaned.search(/<hr|<h[2-4]/i);
  if (firstHeaderIndex > 0) {
    const leadText = cleaned.slice(0, firstHeaderIndex).trim();
    const restText = cleaned.slice(firstHeaderIndex).trim();
    if (leadText.length > 20) {
      cleaned = `<div class="blogLeadIntro">${leadText}</div>\n${restText}`;
    }
  }

  // Replace <hr...> with modern editorial divider
  cleaned = cleaned.replace(
    /<hr[^>]*><\/hr>|<hr[^>]*>/gi,
    '<div class="blogDivider"><span class="blogDividerLine"></span><span class="blogDividerDot"></span><span class="blogDividerLine"></span></div>'
  );

  const toc = [];
  let index = 1;

  // Match and elevate <h2>, <h3>, <h4> tags with styled badges and anchor IDs
  cleaned = cleaned.replace(
    /<(h[2-4])([^>]*)>(.*?)<\/\1>/gi,
    (match, tag, attrs, text) => {
      const cleanText = text.replace(/<[^>]*>/g, '').trim();
      if (!cleanText || cleanText.length < 3) return match;

      let idMatch = attrs.match(/id=["'](.*?)["']/i);
      let id = idMatch ? idMatch[1] : '';

      if (!id) {
        id = cleanText
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');
        if (!id) id = `section-${index}`;
      }

      const step = index.toString().padStart(2, '0');
      toc.push({
        id,
        step,
        title: cleanText,
      });
      index++;

      return `<div class="blogSectionHeader" id="${id}">
        <h2 class="blogSectionTitle">${cleanText}</h2>
        <span class="blogSectionBar"></span>
      </div>`;
    }
  );

  // Transform raw numbered points into clean cards without number badges
  cleaned = cleaned.replace(
    /<p><(?:b|strong)>(\d+)\.\s*(.*?)<\/(?:b|strong)><\/p>([\s\S]*?)(?=(?:<p><(?:b|strong)>\d+\.|\s*<div class="blogSectionHeader"|<div class="blogDivider"|<div class="blogConclusionCard"|$))/gi,
    (match, num, title, body) => {
      return `<div class="blogNumberedCard"><div class="blogNumberedContent"><h3 class="blogNumberedTitle">${title.trim()}</h3><div class="blogNumberedText">${body.trim()}</div></div></div>`;
    }
  );

  // Transform closing bold takeaways into an elegant conclusion card
  if (/<p><b>Marketing tools evolve/i.test(cleaned)) {
    const step = index.toString().padStart(2, '0');
    toc.push({
      id: 'the-balance-to-keep',
      step,
      title: 'The Balance to Keep',
    });
    cleaned = cleaned.replace(
      /<p><b>Marketing tools evolve[\s\S]*?<\/p>\s*<p><b>Let Misc\s*Archive[\s\S]*?<\/p>/gi,
      `<div class="blogConclusionCard" id="the-balance-to-keep">
        <h3 class="blogConclusionTitle">The Strategic Takeaway</h3>
        <p class="blogConclusionText">Marketing tools evolve. Judgment doesn't.</p>
        <p class="blogConclusionBold">Let MiscArchive help you use AI where it makes sense, without losing the clarity, creativity, and intent that make marketing work.</p>
      </div>`
    );
  }

  // Clean trailing <br>, empty tags
  cleaned = cleaned.replace(/(?:<br\s*\/?>\s*)+$/gi, '').trim();

  return { cleanHtml: cleaned, tableOfContents: toc };
}

/**
 * Unified blog fetcher combining CMS API with curated fallback catalog
 */
export async function getUnifiedBlog(slug) {
  if (!slug) return null;
  const normalizedSlug = slug.toLowerCase().trim();

  let cmsBlog = null;
  try {
    cmsBlog = await getBlogBySlug(normalizedSlug);
  } catch (e) {
    // CMS unavailable, fallback safely
  }

  const fallback =
    fallbackBlogsCatalog.find((b) => b.slug.toLowerCase() === normalizedSlug) || null;

  return normalizeBlog(cmsBlog, fallback, normalizedSlug);
}

/**
 * Retrieves related blogs for an article, excluding current slug
 */
export function getRelatedBlogs(currentSlug, limit = 3) {
  const normSlug = (currentSlug || '').toLowerCase().trim();
  const curated = [
    {
      slug: 'build-visual-identity',
      title: 'How Branding Builds Long-Term Business Value',
      category: 'BRANDING',
      publishDate: 'March 18, 2026',
      readTime: '6 min read',
      featuredImage: '/assets/images/blogs/blog_phone_desk.jpg',
    },
    {
      slug: 'turning-analytics-into-revenue',
      title: 'Turning Marketing Data into Actionable Strategy',
      category: 'STRATEGY',
      publishDate: 'March 10, 2026',
      readTime: '7 min read',
      featuredImage: '/assets/images/blogs/bl51.webp',
    },
    {
      slug: 'guide-to-reading-ad-metrics',
      title: 'A Practical Guide to an Effective Digital Marketing Plan',
      category: 'DIGITAL MARKETING',
      publishDate: 'February 28, 2026',
      readTime: '8 min read',
      featuredImage: '/assets/images/blogs/blog_trust_notes.jpg',
    },
  ];

  const filtered = curated.filter((b) => b.slug.toLowerCase() !== normSlug);
  if (filtered.length >= limit) return filtered.slice(0, limit);

  const fallback = fallbackBlogsCatalog
    .filter((b) => b.slug.toLowerCase() !== normSlug && !filtered.some((f) => f.slug === b.slug))
    .slice(0, limit - filtered.length);

  return [...filtered, ...fallback].slice(0, limit);
}

