import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import SpeedonSeoAndConversion from '@/components/blog/SpeedonSeoAndConversion';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'website-speed-on-seo-and-conversion';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "Impact of Website Speed on SEO And Conversion"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<SpeedonSeoAndConversion />} />
            <FooterSection />
        </div>
    );
}
