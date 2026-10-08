import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import WebsiteIsYourBestSalesperson from '@/components/blog/WebsiteIsYourBestSalesperson';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'Website-Is-Your-Best-Salesperson';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "Why Your Website Is Your Best Salesperson in 2026"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<WebsiteIsYourBestSalesperson />} />
            <FooterSection />
        </div>
    );
}
