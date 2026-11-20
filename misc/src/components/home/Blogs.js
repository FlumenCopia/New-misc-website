"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getBlogs, resolveMediaUrl } from '@/lib/api';
import styles from './Blogs.module.css';

export default function BlogSection({ initialBlogs }) {
  const mapBlogs = (list) => {
    if (!list || !Array.isArray(list)) return [];
    return list.map((b, i) => ({
      id: b._id || i,
      image: resolveMediaUrl(b.featuredImage || b.image) || '/assets/images/blogs/bl63.webp',
      category: b.category || 'Digital Marketing',
      date: new Date(b.publishDate || b.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
      }),
      title: b.title,
      description: b.excerpt || b.shortDescription || b.description || '',
      link: `/blog/${b.slug}`,
    }));
  };

  const [blogs, setBlogs] = useState(() => {
    if (initialBlogs && Array.isArray(initialBlogs) && initialBlogs.length > 0) {
      return mapBlogs(initialBlogs);
    }
    return [];
  });

  useEffect(() => {
    getBlogs({ limit: 6 })
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          setBlogs(mapBlogs(data));
        }
      })
      .catch(() => {});
  }, []);

  if (blogs.length === 0) {
    return null;
  }

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
