import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import SmmBlog from '@/components/blog/SmmBlog';

export default function page() {
  return (
    <div>
        <Header/>
        <Blogtitle title="Why do Social Media Marketing" />
        <SmmBlog/>
        {/* <QuoteSection/> */}
        <FooterSection/>
    </div>
  )
}