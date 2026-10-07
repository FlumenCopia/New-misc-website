import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import PpcBlog from '@/components/blog/PpcBlog';
import Blogtitle from '@/components/blog/Blogtitle';
import Blogmiscarchive from '@/components/blog/Blogmiscarchive';

export default function page() {
    return (
        <div>
            <Header />
            <Blogtitle title="Why Choosing the Right Digital Marketing Company in Trivandrum Matters for Your Business Growth" />

            <Blogmiscarchive />
            <FooterSection />
        </div>
    )
}