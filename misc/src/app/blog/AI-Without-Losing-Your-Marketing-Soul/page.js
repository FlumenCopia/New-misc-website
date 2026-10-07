import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import Hijackers from '@/components/blog/Hijackers';
import MicroViralitys from '@/components/blog/Micro-Viralitys';
import MarketingSoul from '@/components/blog/MarketingSoul';

export default function page() {
    return (
        <div>
            <Header />
            <Blogtitle title="How to Use AI Without Losing Your Marketing Soul" />
            <MarketingSoul />
            <FooterSection />
        </div>
    )
}