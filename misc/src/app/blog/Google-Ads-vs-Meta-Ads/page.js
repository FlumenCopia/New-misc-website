import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import ChangingGoogle from '@/components/blog/ChangingGoogle';
import GoogleAdsVsMeta from '@/components/blog/GoogleAdsVsMeta';

export default function page() {
  return (
    <div>
        <Header/>
        <Blogtitle title="Google Ads vs Meta Ads: Where Should Brands Invest in 2026?" />

        <GoogleAdsVsMeta/>

        <FooterSection/>
    </div>
  )
}