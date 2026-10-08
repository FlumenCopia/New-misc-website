import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import LocalGrowthPowerhouses from '@/components/blog/LocalGrowthPowerhouses';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'Local-Growth-Powerhouses';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "How to Turn Short Videos Into Local Growth Powerhouses"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<LocalGrowthPowerhouses />} />
            <FooterSection />
        </div>
    );
}
