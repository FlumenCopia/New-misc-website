import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import MarketingSoul from '@/components/blog/MarketingSoul';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'AI-Without-Losing-Your-Marketing-Soul';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "How to Use AI Without Losing Your Marketing Soul"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<MarketingSoul />} />
            <FooterSection />
        </div>
    );
}
