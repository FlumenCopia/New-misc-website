import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import FromKeywords from '@/components/blog/FromKeywords';

export default function page() {
  return (
    <div>
        <Header/>
        <Blogtitle title="From Keywords to SXO: What SEO Looks Like in 2026" />

<FromKeywords />

        <FooterSection/>
    </div>
  )
}