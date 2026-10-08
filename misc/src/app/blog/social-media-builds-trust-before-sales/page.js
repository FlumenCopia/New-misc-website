import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import SocialMediaBuildsTrustBeforeSales from '@/components/blog/SocialMediaBuildsTrustBeforeSales';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'social-media-builds-trust-before-sales';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "How Social Media Builds Trust Before Sales"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<SocialMediaBuildsTrustBeforeSales />} />
            <FooterSection />
        </div>
    );
}
