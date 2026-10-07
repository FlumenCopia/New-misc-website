import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import UiAloneKeepsLettingWebsitesDown from '@/components/blog/UiAloneKeepsLettingWebsitesDown';


export const metadata = {
  title: 'Why UI Design Fails Without UX Thinking | Misc Archive',
  description: 'Learn why UI design alone fails without UX thinking and how user-focused experiences improve trust, engagement, and conversions.',
  
};


export default function page() {
    return (
        <div>
            <Header />
            <Blogtitle title="Why UI Alone Keeps Letting Websites Down" />
            <UiAloneKeepsLettingWebsitesDown/>
           
            <FooterSection />
        </div>
    )
}