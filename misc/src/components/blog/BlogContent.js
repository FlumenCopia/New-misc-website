'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getBlogs, resolveMediaUrl } from '@/lib/api';

const defaultBlogPosts = [
    
        
    {
      image: '/assets/images/blogs/bl63.webp',
      category: 'Digital Marketing',
      date: 'April 01, 2026',
       title: 'How Social Media Builds Trust Before Sales',
      href: '/blog/social-media-builds-trust-before-sales',
    },
    {
      image: '/assets/images/blogs/bl62.webp',
      category: 'Digital Marketing',
      date: 'March 28, 2026',
       title: 'Top 5 Reasons Strategy Beats Ad Spend',
      href: '/blog/strategy-beats-ad-spend',
    },
    {
      image: '/assets/images/blogs/bl61.webp',
      category: 'Digital Marketing',
      date: 'March 24, 2026',
       title: 'A Guide to Using AI Without Losing Marketing Sense',
      href: '/blog/ai-without-losing-marketing-sense',
    },
    {
      image: '/assets/images/blogs/bl60.webp',
      category: 'Digital Marketing',
      date: 'March 20, 2026',
       title: 'Why UI Alone Keeps Letting Websites Down',
      href: '/blog/ui-alone-keeps-letting-websites-down',
    },
    {
      image: '/assets/images/blogs/bl59.webp',
      category: 'Digital Marketing',
      date: 'March 16, 2026',
       title: 'How to Choose a Tech Stack Wisely',
      href: '/blog/choose-a-tech-stack-wisely',
    },
    {
      image: '/assets/images/blogs/bl58.webp',
      category: 'Digital Marketing',
      date: 'March 12, 2026',
       title: 'A Guide to Social Media’s Real Purpose',
      href: '/blog/socialmedias-real-purpose',
    },
    {
      image: '/assets/images/blogs/bl57.webp',
      category: 'Digital Marketing',
      date: 'March 08, 2026',
       title: 'How Strategy-First Websites Drive Real Results',
      href: '/blog/websites-drive-real-results',
    },
    {
      image: '/assets/images/blogs/bl56.webp',
      category: 'Digital Marketing',
      date: 'March 05, 2026',
       title: 'A Practical Guide to Reading Ad Metrics',
      href: '/blog/guide-to-reading-ad-metrics',
    },
    {
      image: '/assets/images/blogs/bl55.webp',
      category: 'Digital Marketing',
      date: 'March 03, 2026',
       title: 'Why Retargeting Won’t Save Bad Ads',
      href: '/blog/retargeting-wont-save-bad-ads',
    },
    {
      image: '/assets/images/blogs/bl54.webp',
      category: 'Digital Marketing',
      date: 'March 01, 2026',
       title: 'How Brand Trust Makes Ads Work',
      href: '/blog/how-brand-trust-makes-ads-work',
    },
    {
      image: '/assets/images/blogs/bl53.webp',
      category: 'Digital Marketing',
      date: 'february 27, 2026',
       title: 'How to Build a Visual Identity That Works',
      href: '/blog/build-visual-identity',
    },

     {
     image: '/assets/images/blogs/bl52.webp',
      category: 'Digital Marketing',
      date: 'february 25, 2026',
      title: 'A Guide to What Keeps Websites Running',
      href: '/blog/what-keeps-websites-running',
    },
    {
     image: '/assets/images/blogs/bl51.webp',
      category: 'Digital Marketing',
      date: 'february 23, 2026',
      title: 'Data-Driven Marketing: Turning Analytics into Revenue',
     href: '/blog/turning-analytics-into-revenue',
    },

    {
      image: '/assets/images/blogs/bl50.webp',
      category: 'Digital Marketing',
      date: 'february 21, 2026',
       title: 'How to Choose the Right Website',
      href: '/blog/choose-the-right-website',
    },
    {
      image: '/assets/images/blogs/bl49.webp',
      category: 'Digital Marketing',
      date: 'february 19, 2026',
       title: 'How to Turn Marketing Spend Into Growth',
      href: '/blog/marketing-spend-into-growth',
    },
     
    {
      image: '/assets/images/blogs/bl48.webp',
      category: 'Digital Marketing',
      date: 'february 17, 2026',
       title: 'Impact of Website Speed on SEO And Conversion',
      href: '/blog/website-speed-on-seo-and-conversion',
     
    },
    {
      image: '/assets/images/blogs/bl47.webp',
      category: 'Digital Marketing',
      date: 'february 15, 2026',
       title: 'How Local Businesses Can Compete with Big Brands Online',
      href: '/blog/compete-with-big-brands-online',
     
    },
    {
      image: '/assets/images/blogs/bl46.webp',
      category: 'Digital Marketing',
      date: 'february 13, 2026',
       title: 'How to Optimize Landing Pages That Convert',
      href: '/blog/optimize-landing-pages',
     
    },
    {
      image: '/assets/images/blogs/bl45.webp',
      category: 'Digital Marketing',
      date: 'february 11, 2026',
       title: 'Why UGC Quietly Outperforms Paid Ads',
      href: '/blog/ugc-quietly-outperforms',
     
    },
    {
      image: '/assets/images/blogs/bl44.webp',
      category: 'Digital Marketing',
      date: 'february 9, 2026',
       title: 'How Bad UX Quietly Kills Conversions',
      href: '/blog/bad-ux-quietly-kills-conversions',
     
    },
    {
      image: '/assets/images/blogs/bl43.webp',
      category: 'Digital Marketing',
      date: 'february 7, 2026',
       title: 'How to Choose Content That Actually Pays Off',
      href: '/blog/choose-content-that-actually-pays-off',
    },
    {
      image: '/assets/images/blogs/bl42.webp',
      category: 'Digital Marketing',
      date: 'february 5, 2026',
      title: 'A Guide to Mastering Voice & Visual Search',
      href: '/blog/guide-to-mastering-voice',
    },
    {
      image: '/assets/images/blogs/bl41.webp',
      category: 'Digital Marketing',
      date: 'february 3, 2026',
      title: 'Common Digital Marketing Mistakes Businesses Still Make',
      href: '/blog/common-digital-marketing-mistakes',
    },
    {
      image: '/assets/images/blogs/bl40.webp',
      category: 'Digital Marketing',
      date: 'february 1, 2026',
      title: 'How Brands Can Turn Followers into Customers',
      href: '/blog/brands-can-turn-followers-into-customers',
    },

    {
      image: '/assets/images/blogs/bl39.webp',
      category: 'Digital Marketing',
      date: 'january 30, 2026',
      title: 'Why Your Website Is Your Best Salesperson in 2026',
      href: '/blog/Website-Is-Your-Best-Salesperson',
    },

    {
      image: '/assets/images/blogs/bl38.webp',
      category: 'Digital Marketing',
      date: 'january 29, 2026',
      title: 'Content That Converts: What Actually Works in 2026',
      href: '/blog/Content-That-Converts',
    },
    {
      image: '/assets/images/blogs/bl37.webp',
      category: 'Digital Marketing',
      date: 'january 28, 2026',
      title: 'Zero-Click Searches: How Brands Can Still Win Traffic',
      href: '/blog/Zero-Click-Searches',
    },
    {
      image: '/assets/images/blogs/bl36.webp',
      category: 'Digital Marketing',
      date: 'january 23, 2026',
      title: 'Local SEO Strategies Every Business Needs in 2026',
      href: '/blog/Local-SEO-Strategies',
    },
    {
      image: '/assets/images/blogs/bl35.webp',
      category: 'Digital Marketing',
      date: 'january 21, 2026',
      title: 'How to Reduce Ad Spend While Increasing Conversions in 2026',
      href: '/blog/Reduce-Ad-Spend-While-Increasing-Conversions',
    },
    {
      image: '/assets/images/blogs/bl34.webp',
      category: 'Digital Marketing',
      date: 'january 18, 2026',
      title: 'How AI Is Redefining Digital Agencies in 2026',
      href: '/blog/How-AI-Is-Redefining-Digital-Agencies',
    },
    {
      image: '/assets/images/blogs/bl33.webp',
      category: 'Digital Marketing',
      date: 'january 17, 2026',
      title: 'Social Media Marketing in 2026: Reach Is Dead, Community Wins',
      href: '/blog/Social-Media-Marketing-in-2026',
    },
    {
      image: '/assets/images/blogs/bl32.webp',
      category: 'Digital Marketing',
      date: 'january 16, 2026',
      title: 'Google Ads vs Meta Ads: Where Should Brands Invest in 2026?',
      href: '/blog/Google-Ads-vs-Meta-Ads',
    },
    {
      image: '/assets/images/blogs/bl31.png',
      category: 'Digital Marketing',
      date: 'january 14, 2026',
      title: 'How AI Search Is Changing Google Rankings ',
      href: '/blog/How-AI-Search-Is-Changing-Google-Rankings',
    },

    {
      image: '/assets/images/blogs/bl30.png',
      category: 'Digital Marketing',
      date: 'january 13, 2026',
      title: 'From Keywords to SXO: What SEO Looks Like in 2026 ',
      href: '/blog/From-Keywords-to-SXO',
    },



    
    
    {
      image: '/assets/images/blogs/bl29.png',
      category: 'Digital Marketing',
      date: 'january 11, 2026',
      title: 'How a Digital Marketing Agency in Trivandrum Helps E-commerce Brands Grow ',
      href: '/blog/Digital-Marketing-Agency-in-Trivandrum',
    },
         {
      image: '/assets/images/blogs/bl28.png',
      category: 'Digital Marketing',
      date: 'january 10, 2026',
      title: 'What Makes a High-Converting Landing Page in 2026',
      href: '/blog/What-Makes-a-High-Converting-Landing-Page-in-2026',
    },





     {
      image: '/assets/images/blogs/bl27.png',
      category: 'Digital Marketing',
      date: 'january 09, 2026',
      title: 'Inside 2026: The Quiet Role Generative AI Plays in Digital Marketing',
      href: '/blog/Inside-2026-The-Quiet-Role-Generative-AI-Plays-in-Digital-Marketing',
    },

     {
      image: '/assets/images/blogs/bl26.png',
      category: 'Digital Marketing',
      date: 'january 08, 2026',
      title: 'Why Digital Marketing Matters So Much for Startups',
      href: '/blog/Why-Digital-Marketing-Matters ',
    },










     {
      image: '/assets/images/blogs/bl25.png',
      category: 'Digital Marketing',
      date: 'january 07, 2026',
      title: 'How Digital Marketing Builds Trust for Builders and Property Developers',
      href: '/blog/How-Digital-Marketing-Builds-Trust-for-Builders',
    },


     {
      image: '/assets/images/blogs/bl24.png',
      category: 'Digital Marketing',
      date: 'january 05, 2026',
      title: 'How LinkedIn Can Help Your Business Grow',
      href: '/blog/How-LinkedIn',
    },



     {
      image: '/assets/images/blogs/bl23.png',
      category: 'Digital Marketing',
      date: 'january 04, 2026',
      title: 'How a Poor Website Can Quietly Damage Your Brand',
      href: '/blog/Quietly-Damage-Your-Brand',
    },

 {
      image: '/assets/images/blogs/bl22.png',
      category: 'Digital Marketing',
      date: 'january 01, 2026',
      title: 'Will AI Replace Marketing People by 2026? The Truth Businesses Need to Know',
      href: '/blog/Will-AI-Replace-Marketing-People-by-2026',
    },
 {
      image: '/assets/images/blogs/bl21.png',
      category: 'Digital Marketing',
      date: 'december 30, 2025',
      title: 'Building Visibility on YouTube: A Simple SEO-First Approach ',
      href: '/blog/A-Simple-SEO-First-Approach',
    },





 {
      image: '/assets/images/blogs/bl20.png',
      category: 'Digital Marketing',
      date: 'december 28, 2025',
      title: 'How to Turn Short Videos Into Local Growth Powerhouses',
      href: '/blog/Local-Growth-Powerhouses',
    },

 {
      image: '/assets/images/blogs/bl19.png',
      category: 'Digital Marketing',
      date: 'december 26, 2025',
      title: 'How to Turn Everyday Reels Into Real Sales',
      href: '/blog/Reels-Into-Real-Sales',
    },
 {
      image: '/assets/images/blogs/bl18.png',
      category: 'Digital Marketing',
      date: 'december 23, 2025',
      title: 'How to Bring Your Brand Alive With AR & VR Magic ',
      href: '/blog/AR-&-VR-Magic',
    },





    



 {
      image: '/assets/images/blogs/bl17.png',
      category: 'Digital Marketing',
      date: 'december 18, 2025',
      title: 'The Cookieless Future Is Here: How Marketers Can Stay Smart, Ethical & Ahead ',
      href: '/blog/cookieless-future-is-here',
    },

    {
      image: '/assets/images/blogs/bl16.png',
      category: 'Digital Marketing',
      date: 'december 17, 2025',
      title: 'Game-Changing AI Tools That Will Redefine Marketing in 2026 ',
      href: '/blog/ai-tools-that-redefine-marketing',
    },

    {
      image: '/assets/images/blogs/bl15.png',
      category: 'Digital Marketing',
      date: 'december 16, 2025',
      title: 'From Data to Decisions: The Power of AI Analytics',
      href: '/blog/the-power-of-ai-analytics',
    },


    {
      image: '/assets/images/blogs/bl12.jpeg',
      category: 'Digital Marketing',
      date: 'december 14, 2025',
      title: 'How AI Is Transforming Your Agency Workflow in 2025',
      href: '/blog/How-AI-IsTransforming',
    },

    {
      image: '/assets/images/blogs/bl14.jpeg',
      category: 'Digital Marketing',
      date: 'december 12, 2025',
      title: 'How to Turn First-Party Data Into Hyper-Personalised Magic',
      href: '/blog/First-Party-Data',
    },


    {
      image: '/assets/images/blogs/bl13.jpeg',
      category: 'Digital Marketing',
      date: 'december 08, 2025',
      title: 'How to Get Your Brand Ready for Voice & Visual Search',
      href: '/blog/Your-Brand-Ready-for-Voice',
    },

                   {
      image: '/assets/images/blogs/bl11.png',
      category: 'Web Development',
      date: 'december 02, 2025',
      title: 'The Importance of Choosing the Best Web Development Company in Trivandrum',
      href: '/blog/web-Development-Company-in-Trivandrum',
    },


                   {
      image: '/assets/images/blogs/bl10.jpg',
      category: 'Digital Marketing',
      date: 'November 10, 2025',
      title: 'How to Use AI Without Losing Your Marketing Soul',
      href: '/blog/AI-Without-Losing-Your-Marketing-Soul',
    },
                {
      image: '/assets/images/blogs/bl9.jpg',
      category: 'Digital Marketing',
      date: 'November 08, 2025',
      title: 'How to Make Small Audiences Go Big: A Real Guide to Micro-Virality',
      href: '/blog/Real-Guide-to-Micro-Viralitys',
    },
            {
      image: '/assets/images/blogs/bl6.png',
      category: 'Digital Marketing',
      date: 'November 07, 2025',
      title: 'Stop Feeding the Thieves: How to Protect Your Ads from Hidden Hijackers',
      href: '/blog/Your-Ads-from-Hidden-Hijackers',
    },

        {
      image: '/assets/images/blogs/bl5.png',
      category: 'Digital Marketing',
      date: 'November 06, 2025',
      title: 'How to Turn Forums and Communities into Your Best Content Strategy Engine',
      href: '/blog/Content-Strategy-Engine',
    },

    {
      image: '/assets/images/blogs/bl4.jpg',
      category: 'Digital Marketing',
      date: 'November 05, 2025',
      title: 'Why Human Creativity Is Still Vital in the Age of AI Marketing?',
      href: '/blog/Why-Human-Creativity',
    },



    {
      image: '/assets/images/blogs/bl3.jpg',
      category: 'Digital Marketing',
      date: 'November 04, 2025',
      title: 'How Is Digital Marketing Changing Business ?',
      href: '/blog/Digital-Marketing-Changing-Business',
    },



    {
      image: '/assets/images/blogs/bl2.jpg',
      category: 'Digital Marketing',
      date: 'November 03, 2025',
      title: 'Where did my visitors disappear to? Exploring how AI-driven search results are changing visitor behaviour ',
      href: '/blog/Ai-driven-search-results',
    },

    {
      image: '/assets/images/blogs/bl1.jpg',
      category: 'Digital Marketing',
      date: 'November 02, 2025',
      title: 'SEO vs AEO: How to Win Both the Screen and the Speaker in 2025 ',
      href: '/blog/SEO-vs-AEO',
    },
    {
      image: '/assets/images/blogs/image-gen (13).jpg',
      category: 'Digital Marketing',
      date: 'November 01, 2025',
      title: 'Why Your Website Feels Invisible: A Guide to Winning Back Clicks in the AI Search Era',
      href: '/blog/AI-Search-Era',
    },

    {
      image: '/assets/images/blogs/image-gen (9).jpg',
      category: 'Digital Marketing',
      date: 'October 27, 2025',
      title: 'How to Win Search Trust in 2025 with EEAT and AEO',
      href: '/blog/EEAT-and-AEO',
    },
    {
      image: '/assets/images/envato.jpg',
      category: 'Digital Marketing',
      date: 'October 23, 2025',
      title: 'How to build powerful backlinks in 2025?',
      href: '/blog/build-powerful-backlinks',
    },

    {
      image: '/assets/images/image-gen_(2).png',
      category: 'Digital Marketing',
      date: 'October 20, 2025',
      title: 'Top 5 Reasons Creativity Still Wins in AI Marketing',
      href: '/blog/Creativity-AI-Marketing',
    },

    {
      image: '/assets/images/image-gen_(7).jpeg',
      category: 'Digital Marketing',
      date: 'October 16, 2025',
      title: 'How Voice Search is Transforming Digital Marketing',
      href: '/blog/Transforming-Digital-Marketing',
    },

  ];

const BlogContent = ({ initialBlogs }) => {
  const [blogPosts, setBlogPosts] = useState(() => {
    if (initialBlogs && Array.isArray(initialBlogs) && initialBlogs.length > 0) {
      return initialBlogs.map((b) => ({
        image: resolveMediaUrl(b.featuredImage || b.image),
        category: b.category || 'Digital Marketing',
        date: b.publishDate ? new Date(b.publishDate).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }) : '',
        title: b.title,
        href: `/blog/${b.slug}`,
      }));
    }
    return defaultBlogPosts;
  });

  useEffect(() => {
    let isMounted = true;
    getBlogs({ limit: 100 }).then((data) => {
      if (isMounted && data && Array.isArray(data) && data.length > 0) {
        setBlogPosts(data.map((b) => ({
          image: resolveMediaUrl(b.featuredImage || b.image) || '/assets/images/blogs/bl63.webp',
          category: b.category || 'Digital Marketing',
          date: b.publishDate ? new Date(b.publishDate).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }) : '',
          title: b.title,
          href: `/blog/${b.slug}`,
        })));
      }
    }).catch(() => {});
    return () => { isMounted = false; };
  }, []);

  return (
    <>
      <header className='yellow-bg' >
        <div className="container" style={{ paddingTop: "130px" }}>
          <div className="row">
            <div className="col-xs-12">
              <h2 className="title" style={{color:"#333"}}>BLOG</h2> <br />
              {/* <h5 className="sub-title">Digital experiences are continually</h5> */}
            </div>
          </div>
        </div>
      </header>

      <section className="blog">
        <div className="container">
          <div className="row">
            {blogPosts.map((post, index) => (
              <div key={index} className="col-xl-4 col-lg-4 col-md-6">
                <div className="service-container blog-container fadeInDown">
                  <div className="service-content-wrapper">
                    <div className="service-content-wrapper-overlay "></div>
                    <div className="service-image blog-image">
                      <Link href={post.href}> <img src={post.image} alt="blog" style={{ height: '300px' }} /></Link>
                    </div>
                  </div>
                  <div className="service-info">
                    <span>{post.category} / {post.date}</span>
                    <h5>{post.title}</h5>
                    <Link href={post.href} className="link">READ MORE</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogContent;
