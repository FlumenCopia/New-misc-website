import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import FirstParty from '@/components/blog/FirstParty';
import AITransforming from '@/components/blog/AITransforming';
import HowLinkedIn from '@/components/blog/HowLinkedIn';

export default function page() {
  return (
    <div>
        <Header/>
        <Blogtitle title="How LinkedIn Can Help Your Business Grow" />
<HowLinkedIn />
{/* <FirstParty /> */}
        <FooterSection/>
    </div>
  )
}