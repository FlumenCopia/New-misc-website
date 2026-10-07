import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import PpcBlog from '@/components/blog/PpcBlog';
import Blogtitle from '@/components/blog/Blogtitle';
import Digital_Marketing_tvm_blogs from '@/components/blog/Digital_Marketing_tvm_blogs';

export default function page() {
    return (
        <div>
            <Header />
            <Blogtitle title="Why Choosing the Right Digital Marketing Company in Trivandrum Can Transform Your Brand" />
            <Digital_Marketing_tvm_blogs />
            <FooterSection />
        </div>
    )
}