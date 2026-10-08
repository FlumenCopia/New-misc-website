import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import ChooseaTechStackWisely from '@/components/blog/ChooseaTechStackWisely';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'choose-a-tech-stack-wisely';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "How to Choose a Tech Stack Wisely"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<ChooseaTechStackWisely />} />
            <FooterSection />
        </div>
    );
}
