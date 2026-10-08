"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getBlogs, resolveMediaUrl } from '@/lib/api';

const defaultBlogs = [
  {
    id: 1,
    image: '/assets/images/blogs/bl63.webp',
    category: 'Digital Marketing',
    date: 'April 01, 2026',
    title: 'How Social Media Builds Trust Before Sales',
    link: '/blog/social-media-builds-trust-before-sales',
  },
  {
    id: 2,
    image: '/assets/images/blogs/bl62.webp',
    category: 'Digital Marketing',
    date: 'March 28, 2026',
    title: 'Top 5 Reasons Strategy Beats Ad Spend',
    link: '/blog/strategy-beats-ad-spend',
  },
  {
    id: 3,
    image: '/assets/images/blogs/bl61.webp',
    category: 'Digital Marketing',
    date: 'March 24, 2026',
    title: 'A Guide to Using AI Without Losing Marketing Sense',
    link: '/blog/ai-without-losing-marketing-sense',
  },
];

export default function BlogSection({ initialBlogs }) {
  const [blogs, setBlogs] = useState(() => {
    if (initialBlogs && initialBlogs.length > 0) {
      return initialBlogs.slice(0, 3).map((b, i) => ({
        id: b._id || i,
        image: resolveMediaUrl(b.featuredImage),
        category: b.category || 'Digital Marketing',
        date: new Date(b.publishDate || b.createdAt).toLocaleDateString('en-US', {
          month: 'long',
          day: '2-digit',
          year: 'numeric',
        }),
        title: b.title,
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
              image: resolveMediaUrl(b.featuredImage),
              category: b.category || 'Digital Marketing',
              date: new Date(b.publishDate || b.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: '2-digit',
                year: 'numeric',
              }),
              title: b.title,
              link: `/blog/${b.slug}`,
            }))
          );
        }
      }).catch(() => {});
    }
  }, [initialBlogs]);


  return (
    <section className="blog py-5">
      <div className="container">
        <h2 className="text-black mb-4">Latest News</h2>
        <div className="row">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="col-xl-4 col-lg-4 col-md-6 mb-4"
            >
              <div className="service-container blog-container fadeInDown">
                <div className="service-content-wrapper position-relative">
                  <div className="service-content-wrapper-overlay position-absolute w-100 h-100"></div>
                  <div className="service-image blog-image">
                   <Link href={blog.link}> <img src={blog.image} alt="blog" style={{ height: '300px' }} /></Link>


                  </div>
                </div>
                <div className="service-info mt-3">
                  <span>{`${blog.category} / ${blog.date}`}</span>
                  <h5 className="text-black mt-2">{blog.title}</h5>
                  <Link href={blog.link} className="link">
                    READ MORE
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
