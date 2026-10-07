import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import FirstParty from '@/components/blog/FirstParty';
import AITransforming from '@/components/blog/AITransforming';
import HowLinkedIn from '@/components/blog/HowLinkedIn';
import HowDigitalMarketing from '@/components/blog/HowDigitalMarketing';

export default function page() {
  return (
    <div>
        <Header/>
        <Blogtitle title="How Digital Marketing Builds Trust for Builders and Property Developers" />

<HowDigitalMarketing />
        <FooterSection/>
    </div>
  )
}