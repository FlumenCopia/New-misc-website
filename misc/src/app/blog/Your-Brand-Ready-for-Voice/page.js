import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import WebdevelopmentBlog from '@/components/blog/webdevelopmentBlog';
import YourBrandReady from '@/components/blog/YourBrandReady';

export default function page() {
  return (
    <div>
        <Header/>
        <Blogtitle title="How to Get Your Brand Ready for Voice & Visual Search" />
     {/* <WebdevelopmentBlog /> */}
        <YourBrandReady />

        <FooterSection/>
    </div>
  )
}