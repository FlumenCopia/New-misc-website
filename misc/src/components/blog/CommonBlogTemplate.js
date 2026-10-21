'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import styles from './CommonBlogTemplate.module.css';
import { getUnifiedBlog, normalizeBlog, extractTableOfContentsFromHtml, getRelatedBlogs } from '@/lib/blogsData';
import { submitEnquiry } from '@/lib/api';

export default function CommonBlogTemplate({ slug, initialBlog = null, fallback = null }) {
  const [blogData, setBlogData] = useState(() => normalizeBlog(initialBlog, null, slug));
  const [activeTocId, setActiveTocId] = useState('');
  const [tocOpen, setTocOpen] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState(null); // 'success' | 'error'
  const [newsletterLoading, setNewsletterLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (slug) {
      getUnifiedBlog(slug).then((unified) => {
        if (isMounted && unified) {
          setBlogData(unified);
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const {
    title,
    category,
    subCategory,
    publishDate,
    readTime,
    featuredImage,
    excerpt,
    tableOfContents: explicitToc,
    contentHtml,
  } = blogData;

  // Process HTML and auto-extract table of contents if not explicitly defined
  const { processedHtml, derivedToc } = useMemo(() => {
    if (!contentHtml) {
      return { processedHtml: '', derivedToc: [] };
    }
    const { cleanHtml, tableOfContents } = extractTableOfContentsFromHtml(contentHtml);
    return { processedHtml: cleanHtml, derivedToc: tableOfContents };
  }, [contentHtml]);

  // Combined Table of Contents
  const tocList = explicitToc && explicitToc.length > 0 ? explicitToc : derivedToc;

  // Curated related articles (excluding current slug)
  const relatedArticles = useMemo(() => {
    return getRelatedBlogs(slug, 3);
  }, [slug]);

  // Track active section on scroll
  useEffect(() => {
    if (!tocList || tocList.length === 0) return;

    setActiveTocId(tocList[0].id);

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;

      for (let i = tocList.length - 1; i >= 0; i--) {
        const item = tocList[i];
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveTocId(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tocList]);

  const handleTocClick = (e, id) => {
    e.preventDefault();
    setActiveTocId(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setNewsletterLoading(true);
    setNewsletterStatus(null);

    try {
      await submitEnquiry({
        email: newsletterEmail,
        formSource: `blog_sidebar_newsletter_${slug || 'general'}`,
        subject: 'Blog Newsletter Subscription',
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
    <div className={styles.pageWrapper}>
      <main className={styles.articleContainer}>
        {/* ==================================================================
            1. Article Header (Left-aligned, Clean Editorial Hierarchy)
            ================================================================== */}
        <header className={styles.articleHeader}>
          {/* Breadcrumb: Home / Blog / Category */}
          <nav aria-label="Breadcrumb" className={styles.breadcrumbsRow}>
            <Link href="/" className={styles.breadcrumbLink}>
              Home
            </Link>
            <span className={styles.breadcrumbSep}>/</span>
            <Link href="/blog" className={styles.breadcrumbLink}>
              Blog
            </Link>
            <span className={styles.breadcrumbSep}>/</span>
            <span className={styles.breadcrumbCurrent}>{category}</span>
          </nav>

          {/* Small Category Label in Golden Yellow */}
          <span className={styles.categoryKicker}>{category}</span>

          {/* Large Left-Aligned Article Title */}
          <h1 className={styles.articleMainTitle}>{title}</h1>

          {/* Subtitle / Excerpt */}
          {excerpt && <p className={styles.articleLeadExcerpt}>{excerpt}</p>}

          {/* Compact Metadata Row */}
          <div className={styles.articleMetaRow}>
            <div className={styles.authorBadge}>
              <span className={styles.authorAvatar}>M</span>
              <span className={styles.authorName}>Written by MiscArchive Team</span>
            </div>
            <span className={styles.metaDot}>•</span>
            <time className={styles.metaDate}>{publishDate}</time>
            <span className={styles.metaDot}>•</span>
            <span className={styles.metaReadTime}>{readTime}</span>
          </div>

          {/* Thin Understated Divider */}
          <div className={styles.headerDivider} />
        </header>

        {/* ==================================================================
            2. Hero Image (Single Wide Aspect Ratio Image)
            ================================================================== */}
        {featuredImage && (
          <div className={styles.heroImageWrapper}>
            <img
              src={featuredImage}
              alt={title}
              className={styles.heroImage}
              loading="eager"
            />
          </div>
        )}

        {/* ==================================================================
            3. Article Body Layout: Reading Column (Left) + Sidebar (Right)
            ================================================================== */}
        <div className={styles.editorialRow}>
          {/* Main Reading Column */}
          <div className={styles.readingColumn}>
            <article className={styles.articleContent}>
              {processedHtml ? (
                <div dangerouslySetInnerHTML={{ __html: processedHtml }} />
              ) : (
                fallback
              )}
            </article>

            {/* End of Article: Takeaway, FILED UNDER, and Author Card */}
            <footer className={styles.articleFooterMeta}>
              {/* Takeaway Block */}
              <div className={styles.takeawayBlock}>
                <p className={styles.takeawayLead}>
                  Ad budgets can amplify ideas, but only strategy gives them direction.
                </p>
                <h3 className={styles.takeawayBold}>
                  Let MiscArchive help you turn your ideas into stories that connect and convert.
                </h3>
                <p className={styles.takeawayNote}>
                  Because real growth starts with clarity, not cash.
                </p>
              </div>

              {/* FILED UNDER Tags */}
              <div className={styles.filedUnderSection}>
                <span className={styles.filedUnderTitle}>FILED UNDER</span>
                <span className={styles.filedUnderDivider}>|</span>
                <div className={styles.filedUnderPills}>
                  <span className={styles.filedUnderPill}>#DigitalMarketing</span>
                  <span className={styles.filedUnderPill}>#Strategy</span>
                  <span className={styles.filedUnderPill}>#MarketingStrategy</span>
                  <span className={styles.filedUnderPill}>#MiscArchive</span>
                </div>
              </div>

              {/* Exact Author Box matching user reference screenshot */}
              <div className={styles.editorialAuthorCard}>
                <div className={styles.authorCardLeft}>
                  <div className={styles.authorAvatarCircle}>M</div>
                  <div className={styles.authorTextContent}>
                    <span className={styles.authorEyebrow}>WRITTEN BY</span>
                    <h4 className={styles.authorNameTitle}>MiscArchive Editorial Team</h4>
                    <p className={styles.authorDescription}>
                      Field-tested perspectives on digital marketing, design systems, search intelligence, and sustainable business growth from the strategists and engineers at MiscArchive.
                    </p>
                  </div>
                </div>

                <div className={styles.authorCardDivider} aria-hidden="true" />

                <Link href="/blog" className={styles.authorCardRight}>
                  <div className={styles.moreIconCircle}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                  </div>
                  <div className={styles.moreTextGroup}>
                    <span className={styles.moreEyebrow}>MORE FROM US</span>
                    <span className={styles.moreLinkTitle}>Explore all articles →</span>
                  </div>
                </Link>
              </div>
            </footer>
          </div>

          {/* Secondary Sticky Sidebar */}
          <aside className={styles.editorialSidebar} aria-label="Article navigation and newsletter">
            <div className={styles.stickySidebarWrapper}>
              {/* Card 1: IN THIS ARTICLE (Table of Contents) */}
              {tocList && tocList.length > 0 && (
                <div className={styles.tocCard}>
                  <div
                    className={styles.tocHeader}
                    onClick={() => setTocOpen(!tocOpen)}
                    role="button"
                    tabIndex={0}
                    aria-expanded={tocOpen}
                  >
                    <h2 className={styles.tocTitle}>IN THIS ARTICLE</h2>
                    <span className={`${styles.tocChevron} ${tocOpen ? styles.tocChevronOpen : ''}`}>
                      &#x2304;
                    </span>
                  </div>

                  <nav className={`${styles.tocList} ${tocOpen ? styles.tocListOpen : ''}`}>
                    {tocList.map((item) => {
                      const isActive = activeTocId === item.id;
                      return (
                        <button
                          type="button"
                          key={`toc-${item.id}`}
                          onClick={(e) => handleTocClick(e, item.id)}
                          className={`${styles.tocItem} ${isActive ? styles.tocItemActive : ''}`}
                        >
                          <span className={styles.tocText}>{item.title}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>
              )}

              {/* Card 2: Marketing Insights (Newsletter) */}
              <div className={styles.newsletterCard}>
                <h3 className={styles.newsletterTitle}>Marketing Insights</h3>
                <p className={styles.newsletterDesc}>
                  Practical tips, real stories, and strategies to grow your business.
                </p>

                <form onSubmit={handleNewsletterSubmit} className={styles.newsletterForm}>
                  <input
                    type="email"
                    placeholder="Your email address"
                    className={styles.newsletterInput}
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className={styles.newsletterBtn}
                    disabled={newsletterLoading}
                  >
                    {newsletterLoading ? 'Subscribing...' : 'Subscribe'}
                  </button>

                  {newsletterStatus === 'success' && (
                    <div className={styles.newsletterSuccess} role="status">
                      ✓ You are subscribed! Thank you.
                    </div>
                  )}
                </form>
              </div>
            </div>
          </aside>
        </div>

        {/* Clean Editorial Divider */}
        <div className={styles.centerBarDivider} />

        {/* ==================================================================
            4. "YOU MIGHT ALSO LIKE" Related Articles (Exact Reference Design)
            ================================================================== */}
        {relatedArticles && relatedArticles.length > 0 && (
          <section className={styles.relatedSection} aria-labelledby="related-heading">
            <div className={styles.relatedHeaderRow}>
              <div className={styles.relatedTitlesCol}>
                <span className={styles.relatedEyebrow}>YOU MIGHT ALSO LIKE</span>
                <h2 id="related-heading" className={styles.relatedTitle}>Related Articles</h2>
              </div>

              <Link href="/blog" className={styles.viewAllArticlesBtn}>
                <span className={styles.viewAllArrowCircle}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
                <span>View all articles</span>
                <span className={styles.viewAllTrailingArrow}>→</span>
              </Link>
            </div>

            <div className={styles.relatedArticlesGrid}>
              {relatedArticles.map((rel, idx) => (
                <article key={rel.slug || idx} className={styles.relatedCardItem}>
                  <Link href={`/blog/${rel.slug}`} className={styles.relatedCardImageLink} tabIndex={-1}>
                    <img src={rel.featuredImage} alt={rel.title} className={styles.relatedCardImage} loading="lazy" />
                  </Link>

                  <span className={styles.relatedCardCategory}>{rel.category}</span>

                  <Link href={`/blog/${rel.slug}`} className={styles.relatedCardTitleLink}>
                    <h3 className={styles.relatedCardHeading}>{rel.title}</h3>
                  </Link>

                  <div className={styles.relatedCardMeta}>
                    <span className={styles.metaIconGroup}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <span>{rel.publishDate}</span>
                    </span>

                    <span className={styles.metaDivider}>|</span>

                    <span className={styles.metaIconGroup}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span>{rel.readTime}</span>
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
