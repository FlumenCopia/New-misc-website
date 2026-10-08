import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import FollowersIntoCustomers from '@/components/blog/FollowersIntoCustomers';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'brands-can-turn-followers-into-customers';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "How Brands Can Turn Followers into Customers"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<FollowersIntoCustomers />} />
            <FooterSection />
        </div>
    );
}
