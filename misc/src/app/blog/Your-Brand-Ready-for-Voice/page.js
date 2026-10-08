import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import YourBrandReady from '@/components/blog/YourBrandReady';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'Your-Brand-Ready-for-Voice';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "How to Get Your Brand Ready for Voice & Visual Search"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<YourBrandReady />} />
            <FooterSection />
        </div>
    );
}
