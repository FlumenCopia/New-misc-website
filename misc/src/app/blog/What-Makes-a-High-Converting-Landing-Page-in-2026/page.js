import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import HighConvertingLanding from '@/components/blog/HighConvertingLanding';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'What-Makes-a-High-Converting-Landing-Page-in-2026';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "What Makes a High-Converting Landing Page in 2026"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<HighConvertingLanding />} />
            <FooterSection />
        </div>
    );
}
