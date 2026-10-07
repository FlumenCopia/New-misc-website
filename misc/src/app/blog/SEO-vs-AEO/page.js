import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import SEOandAEO from '@/components/blog/SEO-and-AEO';

export default function page() {
  return (
    <div>
        <Header/>
        <Blogtitle title="SEO vs AEO: How to Win Both the Screen and the Speaker in 2025 " />
       
<SEOandAEO />
        <FooterSection/>
    </div>
  )
}