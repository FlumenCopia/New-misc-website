import React from 'react'
import Header from "@/components/common/Header";
import QuoteSection from "@/components/home/Quote";
import FooterSection from "@/components/common/Footer";
import BlogContent from '@/components/blog/BlogContent';
import DynamicBlogList from '@/components/blogs/DynamicBlogList';

export const metadata = {
  title: 'Latest Updates | Miscarchive',
  description: 'Looking for the best digital marketing company in Trivandrum? Miscarchive offers expert SEO, social media marketing and more to grow your business online.',
  keywords: 'Digital Marketing, Marketing Solutions, Web Development, SEO, Social Media Management',
};

export default function page() {
  return (
    <div>
        <Header/>
        <DynamicBlogList />
        <FooterSection/>
    </div>
  )
}