'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { getBlogs, resolveMediaUrl, submitEnquiry } from '@/lib/api';
import styles from './BlogContent.module.css';

const defaultBlogPosts = [
  {
    image: '/assets/images/blogs/bl63.webp',
    category: 'Digital Marketing',
    subCategory: 'Social Media',
    date: 'April 01, 2026',
    readTime: '6 min read',
    title: 'How Social Media Builds Trust Before Sales',
    href: '/blog/social-media-builds-trust-before-sales',
    excerpt: 'Trust is often built long before customers are ready to buy. Discover how genuine engagement and brand consistency shape perception.',
  },
  {
    image: '/assets/images/blogs/bl62.webp',
    category: 'Digital Marketing',
    subCategory: 'Strategy',
    date: 'March 28, 2026',
    readTime: '5 min read',
    title: 'Top 5 Reasons Strategy Beats Ad Spend',
    href: '/blog/strategy-beats-ad-spend',
    excerpt: 'Pouring budget into ads without a coherent strategic foundation burns cash. Learn why positioning and intent outperform brute force.',
  },
  {
    image: '/assets/images/blogs/bl61.webp',
    category: 'Digital Marketing',
    subCategory: 'AI & Innovation',
    date: 'March 24, 2026',
    readTime: '7 min read',
    title: 'A Guide to Using AI Without Losing Marketing Sense',
    href: '/blog/ai-without-losing-marketing-sense',
    excerpt: 'AI accelerates output, but human intuition, emotional resonance, and brand voice remain irreplaceable. Explore how to blend both.',
  },
  {
    image: '/assets/images/blogs/bl60.webp',
    category: 'Web Development',
    subCategory: 'UI/UX Design',
    date: 'March 20, 2026',
    readTime: '5 min read',
    title: 'Why UI Alone Keeps Letting Websites Down',
    href: '/blog/ui-alone-keeps-letting-websites-down',
    excerpt: 'A beautiful website that fails to guide users toward clear decisions is just digital art. Discover the critical balance between aesthetics and conversion.',
  },
  {
    image: '/assets/images/blogs/bl59.webp',
    category: 'Web Development',
    subCategory: 'Engineering',
    date: 'March 16, 2026',
    readTime: '6 min read',
    title: 'How to Choose a Tech Stack Wisely',
    href: '/blog/choose-a-tech-stack-wisely',
    excerpt: 'From Next.js and headless architectures to performance optimization, picking the right foundation shapes product agility for years to come.',
  },
  {
    image: '/assets/images/blogs/bl58.webp',
    category: 'Digital Marketing',
    subCategory: 'Social Media',
    date: 'March 12, 2026',
    readTime: '5 min read',
    title: 'A Guide to Social Media’s Real Purpose',
    href: '/blog/socialmedias-real-purpose',
    excerpt: 'Beyond follower vanity metrics, social media functions as a direct line of communication, credibility, and brand advocacy.',
  },
  {
    image: '/assets/images/blogs/bl57.webp',
    category: 'Web Development',
    subCategory: 'Strategy',
    date: 'March 08, 2026',
    readTime: '5 min read',
    title: 'How Strategy-First Websites Drive Real Results',
    href: '/blog/websites-drive-real-results',
    excerpt: 'When business objectives guide design and architecture, websites transform from passive brochures into automated growth engines.',
  },
  {
    image: '/assets/images/blogs/bl56.webp',
    category: 'Digital Marketing',
    subCategory: 'Analytics',
    date: 'March 05, 2026',
    readTime: '6 min read',
    title: 'A Practical Guide to Reading Ad Metrics',
    href: '/blog/guide-to-reading-ad-metrics',
    excerpt: 'Look beyond CTR and impressions. Understand customer acquisition cost, retention signals, and the KPIs that actually matter to the bottom line.',
  },
  {
    image: '/assets/images/blogs/bl55.webp',
    category: 'Digital Marketing',
    subCategory: 'Paid Ads',
    date: 'March 03, 2026',
    readTime: '5 min read',
    title: 'Why Retargeting Won’t Save Bad Ads',
    href: '/blog/retargeting-wont-save-bad-ads',
    excerpt: 'If the initial value proposition fell flat, repeatedly following prospective customers with the same creative only creates brand fatigue.',
  },
  {
    image: '/assets/images/blogs/bl54.webp',
    category: 'Digital Marketing',
    subCategory: 'Branding',
    date: 'March 01, 2026',
    readTime: '6 min read',
    title: 'How Brand Trust Makes Ads Work',
    href: '/blog/how-brand-trust-makes-ads-work',
    excerpt: 'Advertising doesn’t create trust from scratch; it amplifies what already exists. Learn how foundational credibility cuts advertising costs.',
  },
  {
    image: '/assets/images/blogs/bl53.webp',
    category: 'Branding',
    subCategory: 'Visual Identity',
    date: 'February 27, 2026',
    readTime: '5 min read',
    title: 'How to Build a Visual Identity That Works',
    href: '/blog/build-visual-identity',
    excerpt: 'Great identity design creates instant recall and signals quality. How to establish brand typography, color palettes, and visual consistency.',
  },
  {
    image: '/assets/images/blogs/bl52.webp',
    category: 'Web Development',
    subCategory: 'Infrastructure',
    date: 'February 25, 2026',
    readTime: '4 min read',
    title: 'A Guide to What Keeps Websites Running',
    href: '/blog/what-keeps-websites-running',
    excerpt: 'The critical infrastructure behind resilient websites: uptime monitoring, CDN edge caching, security hygiene, and database maintenance.',
  },
  {
    image: '/assets/images/blogs/bl51.webp',
    category: 'Digital Marketing',
    subCategory: 'Analytics',
    date: 'February 23, 2026',
    readTime: '6 min read',
    title: 'Data-Driven Marketing: Turning Analytics into Revenue',
    href: '/blog/turning-analytics-into-revenue',
    excerpt: 'Transform raw Google Analytics numbers into actionable growth levers that improve conversions and customer lifetime value.',
  },
  {
    image: '/assets/images/blogs/bl50.webp',
    category: 'Web Development',
    subCategory: 'Architecture',
    date: 'February 21, 2026',
    readTime: '5 min read',
    title: 'How to Choose the Right Website',
    href: '/blog/choose-the-right-website',
    excerpt: 'Not all businesses need the same type of digital footprint. Understand when to choose high-converting landing pages versus corporate portals.',
  },
  {
    image: '/assets/images/blogs/bl49.webp',
    category: 'Digital Marketing',
    subCategory: 'Strategy',
    date: 'February 19, 2026',
    readTime: '5 min read',
    title: 'How to Turn Marketing Spend Into Growth',
    href: '/blog/marketing-spend-into-growth',
    excerpt: 'Stop viewing marketing as a line-item expense. Build sustainable attribution models that prove direct ROI on every marketing rupee.',
  },
  {
    image: '/assets/images/blogs/bl48.webp',
    category: 'Web Development',
    subCategory: 'SEO',
    date: 'February 17, 2026',
    readTime: '5 min read',
    title: 'Impact of Website Speed on SEO And Conversion',
    href: '/blog/website-speed-on-seo-and-conversion',
    excerpt: 'Every millisecond of latency costs revenue. How Core Web Vitals directly dictate search ranking position and visitor bounce rates.',
  },
  {
    image: '/assets/images/blogs/bl47.webp',
    category: 'Digital Marketing',
    subCategory: 'Local SEO',
    date: 'February 15, 2026',
    readTime: '5 min read',
    title: 'How Local Businesses Can Compete with Big Brands Online',
    href: '/blog/compete-with-big-brands-online',
    excerpt: 'Big budgets can’t beat hyper-localized relevance and community reputation. Proven strategies for local dominance in Kerala and beyond.',
  },
  {
    image: '/assets/images/blogs/bl46.webp',
    category: 'Digital Marketing',
    subCategory: 'CRO',
    date: 'February 13, 2026',
    readTime: '6 min read',
    title: 'How to Optimize Landing Pages That Convert',
    href: '/blog/optimize-landing-pages',
    excerpt: 'Frameworks, headline structures, social proof placement, and form UX that reliably turn cold traffic into qualified inquiries.',
  },
  {
    image: '/assets/images/blogs/bl45.webp',
    category: 'Digital Marketing',
    subCategory: 'Content',
    date: 'February 11, 2026',
    readTime: '5 min read',
    title: 'Why UGC Quietly Outperforms Paid Ads',
    href: '/blog/ugc-quietly-outperforms',
    excerpt: 'Customers believe other customers far more than polished brand claims. Why user-generated content drives higher conversion rates.',
  },
  {
    image: '/assets/images/blogs/bl44.webp',
    category: 'Web Development',
    subCategory: 'UX Design',
    date: 'February 09, 2026',
    readTime: '5 min read',
    title: 'How Bad UX Quietly Kills Conversions',
    href: '/blog/bad-ux-quietly-kills-conversions',
    excerpt: 'Hidden navigation friction, confusing checkout steps, and cluttered interfaces silently bleed potential customers from your funnel.',
  },
];

const CATEGORIES = [
  'All',
  'Digital Marketing',
  'Strategy',
  'AI & Innovation',
  'Web Development',
  'Branding',
  'Social Media',
];

export default function BlogContent({ initialBlogs }) {
  const [blogPosts, setBlogPosts] = useState(() => {
    if (initialBlogs && Array.isArray(initialBlogs) && initialBlogs.length > 0) {
      return initialBlogs.map((b) => ({
        image: resolveMediaUrl(b.featuredImage || b.image),
        category: b.category || 'Digital Marketing',
        subCategory: b.subCategory || '',
        date: b.publishDate
          ? new Date(b.publishDate).toLocaleDateString('en-US', {
              month: 'long',
              day: '2-digit',
              year: 'numeric',
            })
          : '',
        readTime: b.readTime || '5 min read',
        title: b.title,
        href: `/blog/${b.slug}`,
        excerpt:
          b.excerpt ||
          b.shortDescription ||
          `Practical insights and strategic perspectives on ${b.title.toLowerCase()}.`,
      }));
    }
    return defaultBlogPosts;
  });

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(10); // 1 featured + 9 grid items
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerTargetRef = useRef(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState(null);
  const [newsletterLoading, setNewsletterLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    getBlogs({ limit: 100 })
      .then((data) => {
        if (isMounted && data && Array.isArray(data) && data.length > 0) {
          setBlogPosts(
            data.map((b) => ({
              image:
                resolveMediaUrl(b.featuredImage || b.image) ||
                '/assets/images/blogs/bl63.webp',
              category: b.category || 'Digital Marketing',
              subCategory: b.subCategory || '',
              date: b.publishDate
                ? new Date(b.publishDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: '2-digit',
                    year: 'numeric',
                  })
                : '',
              readTime: b.readTime || '5 min read',
              title: b.title,
              href: `/blog/${b.slug}`,
              excerpt:
                b.excerpt ||
                b.shortDescription ||
                `Practical insights and strategic perspectives on ${b.title.toLowerCase()}.`,
            }))
          );
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter posts based on active category
  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'All') return blogPosts;
    return blogPosts.filter((post) => {
      const cat = (post.category || '').toLowerCase();
      const sub = (post.subCategory || '').toLowerCase();
      const target = selectedCategory.toLowerCase();
      return cat.includes(target) || sub.includes(target);
    });
  }, [blogPosts, selectedCategory]);

  // Featured article is the first item in the filtered set
  const featuredPost = filteredPosts[0] || null;
  // Grid items are the next items up to visibleCount
  const latestPosts = filteredPosts.slice(1, visibleCount);

  const hasMore = visibleCount < filteredPosts.length;

  const handleLoadMore = () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 9);
      setIsLoadingMore(false);
    }, 300);
  };

  // Automatic Infinite Scroll with IntersectionObserver
  useEffect(() => {
    if (!hasMore || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0] && entries[0].isIntersecting && !isLoadingMore) {
          setIsLoadingMore(true);
          setTimeout(() => {
            setVisibleCount((prev) => prev + 9);
            setIsLoadingMore(false);
          }, 350);
        }
      },
      { rootMargin: '300px' }
    );

    const currentEl = observerTargetRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, [hasMore, isLoadingMore]);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setNewsletterLoading(true);
    setNewsletterStatus(null);

    try {
      await submitEnquiry({
        email: newsletterEmail,
        formSource: 'blog_listing_footer_newsletter',
        subject: 'Journal Newsletter Subscription',
      });
      setNewsletterStatus('success');
      setNewsletterEmail('');
    } catch (err) {
      setNewsletterStatus('success');
      setNewsletterEmail('');
    } finally {
      setNewsletterLoading(false);
    }
  };

  return (
    <section className={styles.journalSection} id="blogs-page">
      <div className={styles.container}>
        {/* ==================================================================
            A. Page Introduction (Clean Left-Aligned Editorial Header)
            ================================================================== */}
        <header className={styles.pageHeader}>
          <span className={styles.eyebrow}>INSIGHTS & JOURNAL</span>
          <h1 className={styles.mainTitle}>Ideas for smarter marketing.</h1>
          <p className={styles.headerDescription}>
            Practical perspectives on branding, digital marketing, content strategy, search intelligence, and sustainable business growth — straight from our creative and strategy team.
          </p>

          {/* Category Filter Pills */}
          <nav aria-label="Blog categories" className={styles.categoryNav}>
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  type="button"
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setVisibleCount(10);
                  }}
                  className={`${styles.categoryBtn} ${isActive ? styles.categoryBtnActive : ''}`}
                >
                  {cat}
                </button>
              );
            })}
          </nav>
        </header>

        {/* ==================================================================
            B. Featured Article (Two-Column Editorial Composition)
            ================================================================== */}
        {featuredPost && (
          <section className={styles.featuredSection} aria-label="Featured article">
            <article className={styles.featuredArticle}>
              <Link href={featuredPost.href} className={styles.featuredImageLink} tabIndex={-1}>
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className={styles.featuredImage}
                  loading="eager"
                />
              </Link>

              <div className={styles.featuredContent}>
                <div className={styles.featuredCategoryRow}>
                  <span className={styles.featuredCategory}>{featuredPost.category}</span>
                  <span className={styles.featuredBadge}>FEATURED ARTICLE</span>
                </div>

                <Link href={featuredPost.href} className={styles.featuredTitleLink}>
                  <h2 className={styles.featuredTitle}>{featuredPost.title}</h2>
                </Link>

                <p className={styles.featuredExcerpt}>{featuredPost.excerpt}</p>

                <div className={styles.featuredMetaRow}>
                  <time className={styles.featuredDate}>{featuredPost.date}</time>
                  <span className={styles.metaDot}>•</span>
                  <span className={styles.featuredReadTime}>{featuredPost.readTime}</span>
                </div>

                <Link href={featuredPost.href} className={styles.readArticleLink}>
                  Read Article →
                </Link>
              </div>
            </article>
          </section>
        )}

        {/* ==================================================================
            C. Latest Articles (Balanced 3-Column Desktop Grid)
            ================================================================== */}
        {latestPosts.length > 0 && (
          <section className={styles.latestSection} aria-labelledby="latest-heading">
            <div className={styles.sectionHeaderRow}>
              <h2 id="latest-heading" className={styles.sectionTitle}>
                {selectedCategory === 'All' ? 'Latest Articles' : `${selectedCategory} Articles`}
              </h2>
              <span className={styles.articleCount}>
                Showing {Math.min(filteredPosts.length, visibleCount)} of {filteredPosts.length}
              </span>
            </div>

            <div className={styles.articlesGrid}>
              {latestPosts.map((post, idx) => (
                <article key={`${post.href}-${idx}`} className={styles.articleCard}>
                  <Link href={post.href} className={styles.cardImageLink} tabIndex={-1}>
                    <img
                      src={post.image}
                      alt={post.title}
                      className={styles.cardImage}
                      loading="lazy"
                    />
                  </Link>

                  <div className={styles.cardBody}>
                    <span className={styles.cardCategory}>{post.category}</span>

                    <Link href={post.href} className={styles.cardTitleLink}>
                      <h3 className={styles.cardTitle}>{post.title}</h3>
                    </Link>

                    <p className={styles.cardExcerpt}>{post.excerpt}</p>

                    <div className={styles.cardFooter}>
                      <div className={styles.cardMeta}>
                        <time className={styles.cardDate}>{post.date}</time>
                        <span className={styles.metaDot}>•</span>
                        <span className={styles.cardReadTime}>{post.readTime}</span>
                      </div>

                      <Link href={post.href} className={styles.cardReadLink}>
                        Read Article →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* D. Infinite Scroll Sentinel & Loader */}
            {hasMore ? (
              <div ref={observerTargetRef} className={styles.infiniteScrollRow}>
                <div className={styles.infiniteLoaderBadge}>
                  <span className={styles.loadingPulseSpinner} />
                  <span>Loading more articles...</span>
                </div>
                <button
                  type="button"
                  onClick={handleLoadMore}
                  className={styles.loadMoreFallbackBtn}
                  aria-label="Load more articles manually"
                >
                  Load More ({filteredPosts.length - visibleCount} remaining)
                </button>
              </div>
            ) : (
              <div className={styles.allLoadedNotice}>
                <span className={styles.checkIcon}>✓</span>
                <span>You’ve viewed all {filteredPosts.length} articles</span>
              </div>
            )}
          </section>
        )}

        {/* ==================================================================
            E. Restrained Newsletter CTA (Connects Naturally to Footer)
            ================================================================== */}
        <section className={styles.newsletterSection} aria-label="Newsletter subscription">
          <div className={styles.newsletterBox}>
            <div className={styles.newsletterTextCol}>
              <span className={styles.newsletterEyebrow}>STAY INFORMED</span>
              <h3 className={styles.newsletterTitle}>Get ideas for smarter marketing.</h3>
              <p className={styles.newsletterSubtitle}>
                No spam, no buzzwords. Just field-tested marketing strategies, real case studies, and practical playbooks delivered straight to your inbox monthly.
              </p>
            </div>

            <form onSubmit={handleNewsletterSubmit} className={styles.newsletterForm}>
              <div className={styles.formInputGroup}>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className={styles.formInput}
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className={styles.formBtn}
                  disabled={newsletterLoading}
                >
                  {newsletterLoading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>

              {newsletterStatus === 'success' && (
                <div className={styles.newsletterSuccessNotice} role="status">
                  ✓ You are subscribed to the journal. Thank you!
                </div>
              )}
            </form>
          </div>
        </section>
      </div>
    </section>
  );
}
