import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import Unlocking_Growth from '@/components/blog/Unlocking_Growth';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'Unlocking-Growth';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "Unlocking Growth with the Best Digital Marketing Company in Trivandrum"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<Unlocking_Growth />} />
            <FooterSection />
        </div>
    );
}
