import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import PpcBlog from '@/components/blog/PpcBlog';
import Blogtitle from '@/components/blog/Blogtitle';

export default function page() {
  return (
    <div>
        <Header/>
        <Blogtitle title="Pay Per Clicks in 2023" />
        <PpcBlog/>
        {/* <QuoteSection/> */}
        <FooterSection/>
    </div>
  )
}
