import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import FirstParty from '@/components/blog/FirstParty';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'First-Party-Data';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "How to Turn First-Party Data Into Hyper-Personalised Magic"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<FirstParty />} />
            <FooterSection />
        </div>
    );
}
