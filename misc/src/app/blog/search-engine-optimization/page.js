import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import SeoBlog from '@/components/blog/SeoBlog';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'search-engine-optimization';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "Search Engine Optimization"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<SeoBlog />} />
            <FooterSection />
        </div>
    );
}
