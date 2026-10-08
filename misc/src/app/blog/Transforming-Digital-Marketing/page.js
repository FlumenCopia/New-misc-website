import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import Transforming_Digital from '@/components/blog/Transforming_Digital';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'Transforming-Digital-Marketing';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "How Voice Search is Transforming Digital Marketing"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<Transforming_Digital />} />
            <FooterSection />
        </div>
    );
}
