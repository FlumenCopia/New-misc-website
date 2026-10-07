import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import MarketingBlog from '@/components/blog/MarketingBlog';

export default function page() {
  return (
    <div>
        <Header/>
        <Blogtitle title="The Importance of Selecting the Appropriate Digital Marketing Company in Trivandrum" />
        <MarketingBlog/>
        {/* <QuoteSection/> */}
        <FooterSection/>
    </div>
  )
}