import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import Cookieless_Future from '@/components/blog/Cookieless_Future';
import ARVRMagic from '@/components/blog/AR&VRMagic';
import ReelsIntoRealSales from '@/components/blog/ReelsIntoRealSales';

export default function page() {
    return (
        <div>
            <Header />
            <Blogtitle title="How to Turn Everyday Reels Into Real Sales" />
        <ReelsIntoRealSales />
        
            <FooterSection />
        </div>
    )
}
