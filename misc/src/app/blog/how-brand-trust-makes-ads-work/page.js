import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import BrandTrustMakesAdsWork from '@/components/blog/BrandTrustMakesAdsWork';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'how-brand-trust-makes-ads-work';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "How Brand Trust Makes Ads Work"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<BrandTrustMakesAdsWork />} />
            <FooterSection />
        </div>
    );
}
