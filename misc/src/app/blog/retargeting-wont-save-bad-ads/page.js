import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import RetargetingWontSaveBadAds from '@/components/blog/RetargetingWontSaveBadAds';




export const metadata = {
  title: 'Why Retargeting Can’t Fix Bad Campaigns',
  description: 'Retargeting can’t rescue weak ads. Learn why campaigns fail before retargeting and how to fix the real issues for better performance.',
};


export default function page() {
    return (
        <div>
            <Header />
            <Blogtitle title="Why Retargeting Won’t Save Bad Ads" />
            <RetargetingWontSaveBadAds/>
        
            <FooterSection />
        </div>
    )
}