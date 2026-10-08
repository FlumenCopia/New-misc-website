import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import SocialMediaMarketing from '@/components/blog/Social-Media-Marketing-2026';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'Social-Media-Marketing-in-2026';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "Social Media Marketing in 2026: Reach Is Dead, Community Wins"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<SocialMediaMarketing />} />
            <FooterSection />
        </div>
    );
}
