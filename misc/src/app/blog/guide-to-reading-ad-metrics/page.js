import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import GuidetoReadingAdMetrics from '@/components/blog/GuidetoReadingAdMetrics';




export default function page() {
    return (
        <div>
            <Header />
            <Blogtitle title="A Practical Guide to Reading Ad Metrics" />
            <GuidetoReadingAdMetrics/>
        
            <FooterSection />
        </div>
    )
}