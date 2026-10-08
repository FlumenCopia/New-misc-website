import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import HowLinkedIn from '@/components/blog/HowLinkedIn';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'How-LinkedIn';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "How LinkedIn Can Help Your Business Grow"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<HowLinkedIn />} />
            <FooterSection />
        </div>
    );
}
