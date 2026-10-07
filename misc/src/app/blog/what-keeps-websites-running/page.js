import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import KeepsWebsitesRunning from '@/components/blog/whatKeepsWebsitesRunning';


export const metadata = {
  title: 'Backend Stability: The Hidden Key to Website Success.',
  description: 'Backend stability keeps websites fast, secure, and reliable. Learn why it matters and how it affects performance, trust, and growth.',
  keywords: 'Digital Marketing, Marketing Solutions, Web Development, SEO, Social Media Management',
};


export default function page() {
    return (
        <div>
            <Header />
            <Blogtitle title="A Guide to What Keeps Websites Running" />

            <KeepsWebsitesRunning/>
            <FooterSection />
        </div>
    )
}