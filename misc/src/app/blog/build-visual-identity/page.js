import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import BuiltaVisualIdentity from '@/components/blog/BuiltaVisualIdentity';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'build-visual-identity';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "How to Build a Visual Identity That Works"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<BuiltaVisualIdentity />} />
            <FooterSection />
        </div>
    );
}
