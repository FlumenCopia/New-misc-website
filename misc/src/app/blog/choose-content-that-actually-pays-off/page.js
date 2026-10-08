import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import ChooseContentThatActuallyPaysOff from '@/components/blog/ChooseContentThatActuallyPaysOff';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'choose-content-that-actually-pays-off';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "How to Choose Content That Actually Pays Off"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<ChooseContentThatActuallyPaysOff />} />
            <FooterSection />
        </div>
    );
}
