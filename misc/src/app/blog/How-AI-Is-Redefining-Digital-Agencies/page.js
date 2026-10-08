import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import AiRedefiningDigitalAgencies from '@/components/blog/Ai-Redefining-Digital-Agencies';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'How-AI-Is-Redefining-Digital-Agencies';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "How AI Is Redefining Digital Agencies in 2026"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<AiRedefiningDigitalAgencies />} />
            <FooterSection />
        </div>
    );
}
