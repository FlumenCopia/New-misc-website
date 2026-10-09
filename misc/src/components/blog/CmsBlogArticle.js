'use client';

import React, { useEffect, useState } from 'react';
import { getBlogBySlug, resolveMediaUrl } from '@/lib/api';

function cleanContentHtml(html) {
  if (!html) return '';
  // Strip React fragment syntax remnants (<> and </>) if present
  return html.replace(/<(\/?)>/g, '');
}

/**
 * Universal CMS Blog Article Renderer
 * Renders authentic rich HTML content from MongoDB/Admin API by slug,
 * preserving layout, typography, headings, images, and formatting.
 * Falls back safely to original static component if CMS is unavailable.
 */
export default function CmsBlogArticle({ slug, initialBlog, fallback }) {
  const [blog, setBlog] = useState(initialBlog || null);
  const [loading, setLoading] = useState(!initialBlog && !!slug);

  useEffect(() => {
    if (!initialBlog && slug) {
      let isMounted = true;
      getBlogBySlug(slug)
        .then((data) => {
          if (isMounted && data) {
            setBlog(data);
          }
        })
        .finally(() => {
          if (isMounted) setLoading(false);
        });
      return () => {
        isMounted = false;
      };
    }
  }, [slug, initialBlog]);

  // If blog data is not available, render the fallback original component
  if (!blog && !loading && fallback) {
    return fallback;
  }

  if (!blog) {
    return fallback || null;
  }

  const rawHtml = cleanContentHtml(blog.contentHtml || '');
  if (!rawHtml.trim()) {
    return fallback || null;
  }

  const hasOuterSection =
    rawHtml.includes('class="blog"') ||
    rawHtml.includes("class='blog'") ||
    rawHtml.includes('className="blog"') ||
    rawHtml.includes('<section');

  if (hasOuterSection) {
    return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
  }

  const hasH3 = /<h3[^>]*>/i.test(rawHtml);
  const hasImage = /<img[^>]*>/i.test(rawHtml);

  const formattedDate = blog.publishDate
    ? new Date(blog.publishDate).toLocaleDateString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
      })
    : '';

  return (
    <section className="blog">
      <div className="container mt-5 blog-mobile-padding">
        <div className="row">
          <div className="wow fadeInUp">
            <div className="blog-post">
              {!hasH3 && blog.title && <h3>{blog.title}</h3>}
              {!hasH3 && formattedDate && (
                <>
                  <small>{formattedDate}</small>{' '}
                  <span className="border d-inline-block my-2" style={{ width: '30px' }}></span>
                </>
              )}
              {!hasImage && blog.featuredImage && (
                <p>
                  <img
                    src={resolveMediaUrl(blog.featuredImage)}
                    alt={blog.title || 'blog'}
                    className="img-fluid w-100"
                    style={{ maxHeight: '400px', objectFit: 'cover' }}
                  />
                </p>
              )}
              <div dangerouslySetInnerHTML={{ __html: rawHtml }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
