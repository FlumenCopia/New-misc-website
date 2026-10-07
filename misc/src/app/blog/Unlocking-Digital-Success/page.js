import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import PpcBlog from '@/components/blog/PpcBlog';
import Blogtitle from '@/components/blog/Blogtitle';
import Unlocking_Digital_Success from '@/components/blog/Unlocking_Digital_Success';

export default function page() {
    return (
        <div>
            <Header />
            <Blogtitle title="Unlocking Digital Success: Why Choosing the Right Digital Marketing Company in Trivandrum Matters" />
            <Unlocking_Digital_Success />
            <FooterSection />
        </div>
    )
}