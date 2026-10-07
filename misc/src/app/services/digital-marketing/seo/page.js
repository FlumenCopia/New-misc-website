import React from 'react'
import Header from "@/components/common/Header";
import QuoteSection from "@/components/home/Quote";
import FooterSection from "@/components/common/Footer";
import SeoContent from '@/components/services/DM-Subcategories/SeoContent';

export default function page() {
  return (
    <div>
        <Header/>
        <SeoContent/>
        {/* <QuoteSection/> */}
        <FooterSection/>
    </div>
  )
}
