import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import AISearchEra from '@/components/blog/AI-Search-Era';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'AI-Search-Era';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "Why Your Website Feels Invisible: A Guide to Winning Back Clicks in the AI Search Era"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<AISearchEra />} />
            <FooterSection />
        </div>
    );
}
