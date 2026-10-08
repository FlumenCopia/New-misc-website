import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import EEATandAEO from '@/components/blog/EEATandAEO';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'EEAT-and-AEO';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "How to Win Search Trust in 2025 with EEAT and AEO"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<EEATandAEO />} />
            <FooterSection />
        </div>
    );
}
