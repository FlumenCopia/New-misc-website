import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import ZeroClickSearches from '@/components/blog/ZeroClickSearches';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'Zero-Click-Searches';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "Zero-Click Searches: How Brands Can Still Win Traffic"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<ZeroClickSearches />} />
            <FooterSection />
        </div>
    );
}
