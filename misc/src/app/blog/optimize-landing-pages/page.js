import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import OptimizeLandingPages from '@/components/blog/OptimizeLandingPages';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'optimize-landing-pages';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "How to Optimize Landing Pages That Convert"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<OptimizeLandingPages />} />
            <FooterSection />
        </div>
    );
}
