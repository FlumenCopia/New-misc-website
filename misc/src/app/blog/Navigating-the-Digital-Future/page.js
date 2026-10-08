import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import Navigating_the_Digital_Future from '@/components/blog/Navigating_the_Digital_Future';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'Navigating-the-Digital-Future';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "Navigating the Digital Future: Why Choosing the Right Digital Marketing Company in Trivandrum Matters"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<Navigating_the_Digital_Future />} />
            <FooterSection />
        </div>
    );
}
