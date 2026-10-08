import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import Rpablog from '@/components/blog/Rpablog';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'ai-and-rpa';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "So What are AI and RPA"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<Rpablog />} />
            <FooterSection />
        </div>
    );
}
