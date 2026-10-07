import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import WebdevelopmentBlog from '@/components/blog/webdevelopmentBlog';

export default function page() {
  return (
    <div>
        <Header/>
        <Blogtitle title="Why web development is essential to your internet presence" />
     <WebdevelopmentBlog />
        <FooterSection/>
    </div>
  )
}