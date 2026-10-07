import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import SEOFirstApproach from '@/components/blog/SEO-FirstApproach';

export default function page() {
    return (
        <div>
            <Header />
            <Blogtitle title="Building Visibility on YouTube: A Simple SEO-First Approach" />
        <SEOFirstApproach /> 
          
            <FooterSection />
        </div>
    )
}