import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import CommonDigitalMarketingMistakes from '@/components/blog/CommonDigitalMarketingMistakes';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'common-digital-marketing-mistakes';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "Common Digital Marketing Mistakes Businesses Still Make"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<CommonDigitalMarketingMistakes />} />
            <FooterSection />
        </div>
    );
}
