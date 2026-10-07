import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import ChangingGoogle from '@/components/blog/ChangingGoogle';
import GoogleAdsVsMeta from '@/components/blog/GoogleAdsVsMeta';
import SpeedonSeoAndConversion from '@/components/blog/SpeedonSeoAndConversion';

export default function page() {
  return (
    <div>
        <Header/>
        <Blogtitle title="Impact of Website Speed on SEO And Conversion" />

        <SpeedonSeoAndConversion/>

        <FooterSection/>
    </div>
  )
}