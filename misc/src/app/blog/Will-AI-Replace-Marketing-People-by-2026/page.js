import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import ReplaceMarketing from '@/components/blog/ReplaceMarketing';

export default function page() {
    return (
        <div>
            <Header />
            <Blogtitle title="Will AI Replace Marketing People by 2026? The Truth Businesses Need to Know" />
        <ReplaceMarketing /> 
          
            <FooterSection />
        </div>
    )
}