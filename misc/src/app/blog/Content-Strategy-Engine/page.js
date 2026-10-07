import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';

import ContentStrategyEngine from '@/components/blog/ContentStrategyEngine';

export default function page() {
    return (
        <div>
            <Header />
            <Blogtitle title="How to Turn Forums and Communities into Your Best
Content Strategy Engine" />

            <ContentStrategyEngine />
            <FooterSection />
        </div>
    )
}