import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import AIMarketing from '@/components/blog/AI-Marketing';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'Creativity-AI-Marketing';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "Top 5 Reasons Creativity Still Wins in AI Marketing"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<AIMarketing />} />
            <FooterSection />
        </div>
    );
}
