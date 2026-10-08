import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import ReelsIntoRealSales from '@/components/blog/ReelsIntoRealSales';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'Reels-Into-Real-Sales';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "How to Turn Everyday Reels Into Real Sales"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<ReelsIntoRealSales />} />
            <FooterSection />
        </div>
    );
}
