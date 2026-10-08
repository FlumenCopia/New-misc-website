import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import RetargetingWontSaveBadAds from '@/components/blog/RetargetingWontSaveBadAds';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'retargeting-wont-save-bad-ads';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "Why Retargeting Won’t Save Bad Ads"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<RetargetingWontSaveBadAds />} />
            <FooterSection />
        </div>
    );
}
