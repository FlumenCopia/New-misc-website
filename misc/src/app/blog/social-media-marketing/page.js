import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import SmmBlog from '@/components/blog/SmmBlog';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'social-media-marketing';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "Why do Social Media Marketing"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<SmmBlog />} />
            <FooterSection />
        </div>
    );
}
