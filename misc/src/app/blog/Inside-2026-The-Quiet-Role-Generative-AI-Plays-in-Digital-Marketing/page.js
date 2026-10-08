import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import Inside2026 from '@/components/blog/Inside2026';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'Inside-2026-The-Quiet-Role-Generative-AI-Plays-in-Digital-Marketing';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "Inside 2026: The Quiet Role Generative AI Plays in Digital Marketing"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<Inside2026 />} />
            <FooterSection />
        </div>
    );
}
