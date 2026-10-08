import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import WebsitesDriveRealResults from '@/components/blog/WebsitesDriveRealResults';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'websites-drive-real-results';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "How Strategy-First Websites Drive Real Results"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<WebsitesDriveRealResults />} />
            <FooterSection />
        </div>
    );
}
