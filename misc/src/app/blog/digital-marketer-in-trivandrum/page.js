import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import MarketingBlog from '@/components/blog/MarketingBlog';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'digital-marketer-in-trivandrum';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "The Importance of Selecting the Appropriate Digital Marketing Company in Trivandrum"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<MarketingBlog />} />
            <FooterSection />
        </div>
    );
}
