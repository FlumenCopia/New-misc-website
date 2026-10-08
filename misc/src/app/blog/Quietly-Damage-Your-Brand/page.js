import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import QuietlyDamage from '@/components/blog/QuietlyDamage';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'Quietly-Damage-Your-Brand';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "How a Poor Website Can Quietly Damage Your Brand"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<QuietlyDamage />} />
            <FooterSection />
        </div>
    );
}
