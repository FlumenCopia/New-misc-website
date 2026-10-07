import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import Hijackers from '@/components/blog/Hijackers';
import MicroViralitys from '@/components/blog/Micro-Viralitys';

export default function page() {
    return (
        <div>
            <Header />
            <Blogtitle title="How to Make Small Audiences Go Big: A Real Guide to Micro-Virality
" />
<MicroViralitys />
            <FooterSection />
        </div>
    )
}