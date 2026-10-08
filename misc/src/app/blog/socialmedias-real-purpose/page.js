import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import SocialMediasRealPurpose from '@/components/blog/SocialMediasRealPurpose';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'socialmedias-real-purpose';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "A Guide to Social Media’s Real Purpose"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<SocialMediasRealPurpose />} />
            <FooterSection />
        </div>
    );
}
