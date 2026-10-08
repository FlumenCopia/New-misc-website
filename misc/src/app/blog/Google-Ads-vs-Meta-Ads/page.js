import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import GoogleAdsVsMeta from '@/components/blog/GoogleAdsVsMeta';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'Google-Ads-vs-Meta-Ads';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "Google Ads vs Meta Ads: Where Should Brands Invest in 2026?"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<GoogleAdsVsMeta />} />
            <FooterSection />
        </div>
    );
}
