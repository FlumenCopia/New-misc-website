import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import FirstParty from '@/components/blog/FirstParty';
import AITransforming from '@/components/blog/AITransforming';

export default function page() {
  return (
    <div>
        <Header/>
        <Blogtitle title="How AI Is Transforming Your Agency Workflow in 2025" />
     {/* <WebdevelopmentBlog /> */}
{/* <YourBrandReady /> */}
<AITransforming />
{/* <FirstParty /> */}
        <FooterSection/>
    </div>
  )
}