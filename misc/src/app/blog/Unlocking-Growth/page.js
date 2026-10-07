import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import PpcBlog from '@/components/blog/PpcBlog';
import Blogtitle from '@/components/blog/Blogtitle';
import Unlocking_Growth from '@/components/blog/Unlocking_Growth';

export default function page() {
    return (
        <div>
            <Header />
            <Blogtitle title="Unlocking Growth with the Best Digital Marketing Company in Trivandrum" />
            <Unlocking_Growth />
            <FooterSection />
        </div>
    )
}