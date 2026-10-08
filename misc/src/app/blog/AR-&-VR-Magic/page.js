import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import ARVRMagic from '@/components/blog/AR&VRMagic';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'AR-&-VR-Magic';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "How to Bring Your Brand Alive With AR & VR Magic"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<ARVRMagic />} />
            <FooterSection />
        </div>
    );
}
