import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import PpcBlog from '@/components/blog/PpcBlog';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'pay-per-click';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "Pay Per Clicks in 2023"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<PpcBlog />} />
            <FooterSection />
        </div>
    );
}
