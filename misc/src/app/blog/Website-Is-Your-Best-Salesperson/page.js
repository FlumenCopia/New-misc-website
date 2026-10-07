import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import WebsiteIsYourBestSalesperson from '@/components/blog/WebsiteIsYourBestSalesperson';


export default function page() {
  return (
    <div>
        <Header/>
        <Blogtitle title="Why Your Website Is Your Best Salesperson in 2026" />

      <WebsiteIsYourBestSalesperson/>
        <FooterSection/>
    </div>
  )
}