'use client';

import React, { useEffect, useState } from 'react';
import { getBlogBySlug } from '@/lib/api';

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

  return (
    <section className="blog">
      <div className="container mt-5 blog-mobile-padding">
        <div className="row">
          <div className="wow fadeInUp">
            <div dangerouslySetInnerHTML={{ __html: rawHtml }} />
          </div>
        </div>
      </div>
    </section>
  );
}
