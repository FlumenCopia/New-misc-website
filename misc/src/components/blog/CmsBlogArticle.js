'use client';

import React from 'react';
import CommonBlogTemplate from './CommonBlogTemplate';

/**
 * Universal CMS Blog Article Renderer
 * Bridges existing static blog pages and future CMS MongoDB data
 * into the state-of-the-art CommonBlogTemplate.
 */
export default function CmsBlogArticle({ slug, initialBlog = null, fallback = null }) {
  return (
    <CommonBlogTemplate
      slug={slug}
      initialBlog={initialBlog}
      fallback={fallback}
    />
  );
}
