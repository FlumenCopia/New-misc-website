import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import AITransforming from '@/components/blog/AITransforming';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'How-AI-IsTransforming';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "How AI Is Transforming Your Agency Workflow in 2025"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<AITransforming />} />
            <FooterSection />
        </div>
    );
}
