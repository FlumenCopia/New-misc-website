import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import GuideToMasteringVoice from '@/components/blog/GuideToMasteringVoice';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'guide-to-mastering-voice';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "A Guide to Mastering Voice & Visual Search"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<GuideToMasteringVoice />} />
            <FooterSection />
        </div>
    );
}
