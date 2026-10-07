import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import Hijackers from '@/components/blog/Hijackers';

export default function page() {
    return (
        <div>
            <Header />
            <Blogtitle title="Stop Feeding the Thieves: How to Protect Your Ads from Hidden Hijackers" />
<Hijackers />
            <FooterSection />
        </div>
    )
}