import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import MicroViralitys from '@/components/blog/Micro-Viralitys';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'Real-Guide-to-Micro-Viralitys';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "How to Make Small Audiences Go Big: A Real Guide to Micro-Virality"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<MicroViralitys />} />
            <FooterSection />
        </div>
    );
}
