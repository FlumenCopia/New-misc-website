import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import BrandTrustMakesAdsWork from '@/components/blog/BrandTrustMakesAdsWork';


export default function page() {
    return (
        <div>
            <Header />
            <Blogtitle title="How Brand Trust Makes Ads Work" />

   <BrandTrustMakesAdsWork/>
            <FooterSection />
        </div>
    )
}