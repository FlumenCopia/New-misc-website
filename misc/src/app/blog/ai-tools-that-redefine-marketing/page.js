import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import Ai_that_redefine_marketing from '@/components/blog/Ai_that_redefine_marketing';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'ai-tools-that-redefine-marketing';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "Game-Changing AI Tools That Will Redefine Marketing in 2026"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<Ai_that_redefine_marketing />} />
            <FooterSection />
        </div>
    );
}
