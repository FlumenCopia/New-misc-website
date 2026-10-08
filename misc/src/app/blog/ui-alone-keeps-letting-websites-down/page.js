import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import UiAloneKeepsLettingWebsitesDown from '@/components/blog/UiAloneKeepsLettingWebsitesDown';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'ui-alone-keeps-letting-websites-down';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "Why UI Alone Keeps Letting Websites Down"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<UiAloneKeepsLettingWebsitesDown />} />
            <FooterSection />
        </div>
    );
}
