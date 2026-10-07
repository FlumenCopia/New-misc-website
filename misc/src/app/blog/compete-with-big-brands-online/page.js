import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import ChangingGoogle from '@/components/blog/ChangingGoogle';
import GoogleAdsVsMeta from '@/components/blog/GoogleAdsVsMeta';
import CompeteWithBigBrandsOnline from '@/components/blog/CompeteWithBigBrandsOnline';

export default function page() {
  return (
    <div>
        <Header/>
        <Blogtitle title="How Local Businesses Can Compete with Big Brands Online" />

        <CompeteWithBigBrandsOnline/>

        <FooterSection/>
    </div>
  )
}