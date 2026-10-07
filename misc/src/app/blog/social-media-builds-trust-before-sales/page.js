import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import SocialMediaBuildsTrustBeforeSales from '@/components/blog/SocialMediaBuildsTrustBeforeSales';





export default function page() {
    return (
        <div>
            <Header />
            <Blogtitle title="How Social Media Builds Trust Before Sales" />
            <SocialMediaBuildsTrustBeforeSales/>
           
            <FooterSection />
        </div>
    )
}