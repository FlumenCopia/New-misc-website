import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import CompeteWithBigBrandsOnline from '@/components/blog/CompeteWithBigBrandsOnline';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'compete-with-big-brands-online';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "How Local Businesses Can Compete with Big Brands Online"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<CompeteWithBigBrandsOnline />} />
            <FooterSection />
        </div>
    );
}
