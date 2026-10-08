import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import Backlinks from '@/components/blog/Backlinks';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'build-powerful-backlinks';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "How to build powerful backlinks in 2025?"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<Backlinks />} />
            <FooterSection />
        </div>
    );
}
