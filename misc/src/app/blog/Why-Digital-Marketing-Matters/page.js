import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import WhyDigitalMarketing from '@/components/blog/WhyDigitalMarketing';

export default function page() {
  return (
    <div>
        <Header/>
        <Blogtitle title="Why Digital Marketing Matters So Much for Startups" />

<WhyDigitalMarketing />

        <FooterSection/>
    </div>
  )
}