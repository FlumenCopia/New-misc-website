import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import Hijackers from '@/components/blog/Hijackers';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'Your-Ads-from-Hidden-Hijackers';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "Stop Feeding the Thieves: How to Protect Your Ads from Hidden Hijackers"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<Hijackers />} />
            <FooterSection />
        </div>
    );
}
