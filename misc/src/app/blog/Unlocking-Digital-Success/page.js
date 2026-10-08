import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import Unlocking_Digital_Success from '@/components/blog/Unlocking_Digital_Success';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'Unlocking-Digital-Success';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "Unlocking Digital Success: Why Choosing the Right Digital Marketing Company in Trivandrum Matters"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<Unlocking_Digital_Success />} />
            <FooterSection />
        </div>
    );
}
