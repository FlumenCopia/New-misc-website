


import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import ChangingGoogle from '@/components/blog/ChangingGoogle';
import GoogleAdsVsMeta from '@/components/blog/GoogleAdsVsMeta';
import SocialMediaMarketing from '@/components/blog/Social-Media-Marketing-2026';

export default function page() {
  return (
    <div>
        <Header/>
        <Blogtitle title="Social Media Marketing in 2026: Reach Is Dead, Community Wins" />

        <SocialMediaMarketing/>

        <FooterSection/>
    </div>
  )
}