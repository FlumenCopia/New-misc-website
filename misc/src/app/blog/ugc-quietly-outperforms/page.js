import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import UgcQuietlyOutperforms from '@/components/blog/UgcQuietlyOutperforms';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'ugc-quietly-outperforms';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "Why UGC Quietly Outperforms Paid Ads"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<UgcQuietlyOutperforms />} />
            <FooterSection />
        </div>
    );
}
