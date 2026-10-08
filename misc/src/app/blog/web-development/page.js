import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import WebdevelopmentBlog from '@/components/blog/webdevelopmentBlog';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'web-development';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "Why web development is essential to your internet presence"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<WebdevelopmentBlog />} />
            <FooterSection />
        </div>
    );
}
