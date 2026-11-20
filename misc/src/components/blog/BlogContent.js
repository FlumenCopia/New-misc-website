'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { getBlogs, resolveMediaUrl, submitEnquiry } from '@/lib/api';
import styles from './BlogContent.module.css';

export default function BlogContent({ initialBlogs }) {
  const formatBlogs = (list) => {
    if (!list || !Array.isArray(list)) return [];
    return list.map((b) => ({
      image: resolveMediaUrl(b.featuredImage || b.image) || '/assets/images/blogs/bl63.webp',
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
        `Practical insights and strategic perspectives on ${(b.title || '').toLowerCase()}.`,
    }));
  };

  const [blogPosts, setBlogPosts] = useState(() => {
    if (initialBlogs && Array.isArray(initialBlogs) && initialBlogs.length > 0) {
      return formatBlogs(initialBlogs);
    }
    return [];
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
          setBlogPosts(formatBlogs(data));
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  // Dynamically extract categories from articles
  const categories = useMemo(() => {
    const set = new Set();
    blogPosts.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    const customCats = Array.from(set);
    return customCats.length > 0 ? ['All', ...customCats] : ['All', 'Digital Marketing', 'Web Development'];
  }, [blogPosts]);

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
            {categories.map((cat) => {
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
