import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import HowDigitalMarketing from '@/components/blog/HowDigitalMarketing';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'How-Digital-Marketing-Builds-Trust-for-Builders';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "How Digital Marketing Builds Trust for Builders and Property Developers"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<HowDigitalMarketing />} />
            <FooterSection />
        </div>
    );
}
