import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import Aidrivensearchresults from '@/components/blog/Ai-driven-search-results';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'Ai-driven-search-results';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "Where did my visitors disappear to? Exploring how AI-driven search results are changing visitor behaviour"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<Aidrivensearchresults />} />
            <FooterSection />
        </div>
    );
}
