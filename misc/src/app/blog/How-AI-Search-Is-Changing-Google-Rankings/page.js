import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import ChangingGoogle from '@/components/blog/ChangingGoogle';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'How-AI-Search-Is-Changing-Google-Rankings';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "How AI Search Is Changing Google Rankings"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<ChangingGoogle />} />
            <FooterSection />
        </div>
    );
}
