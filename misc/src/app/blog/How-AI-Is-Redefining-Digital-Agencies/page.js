import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import Hijackers from '@/components/blog/Hijackers';
import MicroViralitys from '@/components/blog/Micro-Viralitys';
import MarketingSoul from '@/components/blog/MarketingSoul';
import AiRedefiningDigitalAgencies from '@/components/blog/Ai-Redefining-Digital-Agencies';

export default function page() {
    return (
        <div>
            <Header />
            <Blogtitle title="How AI Is Redefining Digital Agencies in 2026" />
            {/* <MarketingSoul /> */}
            <AiRedefiningDigitalAgencies/>
            <FooterSection />
        </div>
    )
}