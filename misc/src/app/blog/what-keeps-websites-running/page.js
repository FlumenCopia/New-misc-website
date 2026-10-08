import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import KeepsWebsitesRunning from '@/components/blog/whatKeepsWebsitesRunning';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'what-keeps-websites-running';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "A Guide to What Keeps Websites Running"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<KeepsWebsitesRunning />} />
            <FooterSection />
        </div>
    );
}
