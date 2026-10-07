import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import WebsitesDriveRealResults from '@/components/blog/WebsitesDriveRealResults';


export default function page() {
    return (
        <div>
            <Header />
            <Blogtitle title="How Strategy-First Websites Drive Real Results" />

            <WebsitesDriveRealResults/>
            <FooterSection />
        </div>
    )
}