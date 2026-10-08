import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import ChoosetheRightWebsite from '@/components/blog/ChoosetheRightWebsite';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'choose-the-right-website';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "How to Choose the Right Website"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<ChoosetheRightWebsite />} />
            <FooterSection />
        </div>
    );
}
