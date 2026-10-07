import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import Cookieless_Future from '@/components/blog/Cookieless_Future';
import ARVRMagic from '@/components/blog/AR&VRMagic';

export default function page() {
    return (
        <div>
            <Header />
            <Blogtitle title="How to Bring Your Brand Alive With AR & VR Magic" />
        
            <ARVRMagic />
            <FooterSection />
        </div>
    )
}