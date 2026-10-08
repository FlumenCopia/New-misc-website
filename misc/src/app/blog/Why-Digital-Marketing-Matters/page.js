import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import WhyDigitalMarketing from '@/components/blog/WhyDigitalMarketing';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'Why-Digital-Marketing-Matters';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "Why Digital Marketing Matters So Much for Startups"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<WhyDigitalMarketing />} />
            <FooterSection />
        </div>
    );
}
