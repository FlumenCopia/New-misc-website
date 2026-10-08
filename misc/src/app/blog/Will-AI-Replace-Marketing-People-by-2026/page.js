import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import ReplaceMarketing from '@/components/blog/ReplaceMarketing';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'Will-AI-Replace-Marketing-People-by-2026';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "Will AI Replace Marketing People by 2026? The Truth Businesses Need to Know"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<ReplaceMarketing />} />
            <FooterSection />
        </div>
    );
}
