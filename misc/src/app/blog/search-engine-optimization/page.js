import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import PpcBlog from '@/components/blog/PpcBlog';
import Blogtitle from '@/components/blog/Blogtitle';
import SeoBlog from '@/components/blog/SeoBlog';

export default function page() {
  return (
    <div>
        <Header/>
        <Blogtitle title="Search Engine Optimization" />
        <SeoBlog/>
        {/* <QuoteSection/> */}
        <FooterSection/>
    </div>
  )
}