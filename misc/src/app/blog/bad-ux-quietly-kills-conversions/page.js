import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import BadUXQuietlyKillsConversions from '@/components/blog/BadUXQuietlyKillsConversions';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'bad-ux-quietly-kills-conversions';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "How Bad UX Quietly Kills Conversions"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<BadUXQuietlyKillsConversions />} />
            <FooterSection />
        </div>
    );
}
