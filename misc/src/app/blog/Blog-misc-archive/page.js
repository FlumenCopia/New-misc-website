import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import Blogmiscarchive from '@/components/blog/Blogmiscarchive';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'Blog-misc-archive';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "Why Choosing the Right Digital Marketing Company in Trivandrum Matters for Your Business Growth"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<Blogmiscarchive />} />
            <FooterSection />
        </div>
    );
}
