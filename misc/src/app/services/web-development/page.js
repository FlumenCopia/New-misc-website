import React from 'react'
import Header from "@/components/common/Header";
import QuoteSection from "@/components/home/Quote";
import FooterSection from "@/components/common/Footer";
import Service_Web from '@/components/services/Service_Web';
import WebDevelopmentServices from '@/components/webdevelopment/WebDevelopmentServices';



export default function page() {
  return (
    <div>
        <Header/>
        <Service_Web/>

<WebDevelopmentServices />

        <FooterSection/>
    </div>
  )
}
