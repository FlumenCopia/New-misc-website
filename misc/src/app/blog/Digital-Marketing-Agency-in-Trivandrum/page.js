import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import DigitalMarketingAgencyTrivandrum from '@/components/blog/DigitalMarketingAgencyTrivandrum';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'Digital-Marketing-Agency-in-Trivandrum';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "How a Digital Marketing Agency in Trivandrum Helps E-commerce Brands Grow"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<DigitalMarketingAgencyTrivandrum />} />
            <FooterSection />
        </div>
    );
}
