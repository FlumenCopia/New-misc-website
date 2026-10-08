import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import ContentThatConverts from '@/components/blog/ContentThatConverts';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'Content-That-Converts';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "Content That Converts: What Actually Works in 2026"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<ContentThatConverts />} />
            <FooterSection />
        </div>
    );
}
