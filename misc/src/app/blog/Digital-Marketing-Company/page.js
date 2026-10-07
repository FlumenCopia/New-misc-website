import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import PpcBlog from '@/components/blog/PpcBlog';
import Blogtitle from '@/components/blog/Blogtitle';
import Digital_Marketing_Company from '@/components/blog/Digital_Marketing_Company';

export default function page() {
    return (
        <div>
            <Header />
            <Blogtitle title="Why Choosing the Right Digital Marketing Company in Trivandrum Can Transform Your Business" />
          <Digital_Marketing_Company />
            <FooterSection />
        </div>
    )
}