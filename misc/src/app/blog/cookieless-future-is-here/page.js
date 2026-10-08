import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import Cookieless_Future from '@/components/blog/Cookieless_Future';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'cookieless-future-is-here';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "The Cookieless Future Is Here: How Marketers Can Stay Smart, Ethical & Ahead"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<Cookieless_Future />} />
            <FooterSection />
        </div>
    );
}
