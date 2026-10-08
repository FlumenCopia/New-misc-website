import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import Web_development_Company from '@/components/blog/web_development_Company';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'web-Development-Company-in-Trivandrum';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "The Importance of Choosing the Best Web Development Company in Trivandrum"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<Web_development_Company />} />
            <FooterSection />
        </div>
    );
}
