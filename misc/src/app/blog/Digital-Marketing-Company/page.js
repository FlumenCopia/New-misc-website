import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import Digital_Marketing_Company from '@/components/blog/Digital_Marketing_Company';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'Digital-Marketing-Company';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "Why Choosing the Right Digital Marketing Company in Trivandrum Can Transform Your Business"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<Digital_Marketing_Company />} />
            <FooterSection />
        </div>
    );
}
