import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import FirstParty from '@/components/blog/FirstParty';

export default function page() {
  return (
    <div>
        <Header/>
        <Blogtitle title="How to Turn First-Party Data Into Hyper-Personalised Magic" />
     {/* <WebdevelopmentBlog /> */}
{/* <YourBrandReady /> */}

<FirstParty />
        <FooterSection/>
    </div>
  )
}