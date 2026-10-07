import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import PpcBlog from '@/components/blog/PpcBlog';
import Blogtitle from '@/components/blog/Blogtitle';
import Navigating_the_Digital_Future from '@/components/blog/Navigating_the_Digital_Future';

export default function page() {
    return (
        <div>
            <Header />
            <Blogtitle title="Navigating the Digital Future: Why Choosing the Right Digital Marketing Company in Trivandrum Matters" />
            <Navigating_the_Digital_Future />
            <FooterSection />
        </div>
    )
}