import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import ContentStrategyEngine from '@/components/blog/ContentStrategyEngine';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'Content-Strategy-Engine';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "How to Turn Forums and Communities into Your Best Content Strategy Engine"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<ContentStrategyEngine />} />
            <FooterSection />
        </div>
    );
}
