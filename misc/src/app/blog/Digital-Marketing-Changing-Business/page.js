import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import MarketingChangingBusiness from '@/components/blog/Marketing-Changing-Business';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'Digital-Marketing-Changing-Business';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "How Is Digital Marketing Changing Business ?"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<MarketingChangingBusiness />} />
            <FooterSection />
        </div>
    );
}
