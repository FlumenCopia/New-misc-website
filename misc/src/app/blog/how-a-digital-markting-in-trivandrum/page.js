import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import Marketingcompanytvmblog from '@/components/blog/Marketingcompanytvmblog';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'how-a-digital-markting-in-trivandrum';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "How a Digital Marketing Company in Trivandrum Can Redefine Your Brand’s Success"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<Marketingcompanytvmblog />} />
            <FooterSection />
        </div>
    );
}
