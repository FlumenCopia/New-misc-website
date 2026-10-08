import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import WhyHumanCreativity from '@/components/blog/Why-Human-Creativity';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'Why-Human-Creativity';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "Why Human Creativity Is Still Vital in the Age of AI Marketing?"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<WhyHumanCreativity />} />
            <FooterSection />
        </div>
    );
}
