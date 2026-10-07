import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import Rpablog from '@/components/blog/Rpablog';



export default function page() {
  return (
    <div>
        <Header/>
        <Blogtitle title="So What are AI and RPA" />
        <Rpablog/>
        {/* <QuoteSection/> */}
        <FooterSection/>
    </div>
  )
}