"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getBlogs, resolveMediaUrl } from '@/lib/api';
import styles from './Blogs.module.css';

const defaultBlogs = [
  {
    id: 1,
    image: '/assets/images/blogs/bl63.webp',
    category: 'Digital Marketing',
    date: 'April 01, 2026',
    title: 'How Social Media Builds Trust Before Sales',
    description: 'Discover how genuine engagement, consistent messaging, and community building on social media can help.',
    link: '/blog/social-media-builds-trust-before-sales',
  },
  {
    id: 2,
    image: '/assets/images/blogs/bl62.webp',
    category: 'Digital Marketing',
    date: 'March 28, 2026',
    title: 'Top 5 Reasons Strategy Beats Ad Spend',
    description: 'Learn why a well-planned strategy can deliver better results than a bigger budget in digital marketing.',
    link: '/blog/strategy-beats-ad-spend',
  },
  {
    id: 3,
    image: '/assets/images/blogs/bl61.webp',
    category: 'Digital Marketing',
    date: 'March 24, 2026',
    title: 'A Guide to Using AI Without Losing Marketing Sense',
    description: 'Explore practical ways to use AI in marketing while keeping human creativity, strategy, and authenticity at the core.',
    link: '/blog/ai-without-losing-marketing-sense',
  },
];

export default function BlogSection({ initialBlogs }) {
  const [blogs, setBlogs] = useState(() => {
    if (initialBlogs && initialBlogs.length > 0) {
      return initialBlogs.slice(0, 3).map((b, i) => ({
        id: b._id || i,
        image: resolveMediaUrl(b.featuredImage || b.image) || defaultBlogs[i % 3].image,
        category: b.category || 'Digital Marketing',
        date: new Date(b.publishDate || b.createdAt).toLocaleDateString('en-US', {
          month: 'long',
          day: '2-digit',
          year: 'numeric',
        }),
        title: b.title,
        description: b.excerpt || b.description || defaultBlogs[i % 3].description,
        link: `/blog/${b.slug}`,
      }));
    }
    return defaultBlogs;
  });

  useEffect(() => {
    if (!initialBlogs) {
      getBlogs({ limit: 3 }).then((data) => {
        if (data && data.length > 0) {
          setBlogs(
            data.slice(0, 3).map((b, i) => ({
              id: b._id || i,
              image: resolveMediaUrl(b.featuredImage || b.image) || defaultBlogs[i % 3].image,
              category: b.category || 'Digital Marketing',
              date: new Date(b.publishDate || b.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: '2-digit',
                year: 'numeric',
              }),
              title: b.title,
              description: b.excerpt || b.description || defaultBlogs[i % 3].description,
              link: `/blog/${b.slug}`,
            }))
          );
        }
      }).catch(() => {});
    }
  }, [initialBlogs]);

  return (
    <section className={styles.blogSection} id="blogs">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.heading}>
            Latest <span className={styles.highlightText}>News</span>
          </h2>

          <p className={styles.subtitle}>
            Stay updated with our latest insights, tips, and trends in digital marketing. Explore our blog to learn, grow, and stay ahead in the ever-evolving digital world.
          </p>
        </div>

        {/* 3-Column Card Grid */}
        <div className={styles.grid}>
          {blogs.map((blog) => (
            <article key={blog.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Link href={blog.link}>
                  <img src={blog.image} alt={blog.title} className={styles.cardImage} />
                </Link>
                <span className={styles.categoryBadge}>{blog.category}</span>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.dateRow}>
                  <svg className={styles.calendarIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span className={styles.dateText}>{blog.date}</span>
                </div>

                <Link href={blog.link} style={{ textDecoration: 'none' }}>
                  <h3 className={styles.cardTitle}>{blog.title}</h3>
                </Link>

                <p className={styles.cardExcerpt}>{blog.description}</p>

                <div className={styles.cardFooter}>
                  <Link href={blog.link} className={styles.readMoreLink}>
                    READ MORE
                  </Link>

                  <Link href={blog.link} className={styles.arrowCircleBtn} aria-label={`Read more about ${blog.title}`}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Blogs Pill Button */}
        <div className={styles.viewAllWrapper}>
          <Link href="/blog" className={styles.viewAllBtn}>
            <span>VIEW ALL BLOGS</span>
            <span className={styles.viewAllIconCircle}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
