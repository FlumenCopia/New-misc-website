import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import AISearchEra from '@/components/blog/AI-Search-Era';

export default function page() {
    return (
        <div>
            <Header />
            <Blogtitle title="Why Your Website Feels Invisible: A Guide to Winning Back Clicks in the AI Search Era" />
<AISearchEra />
            <FooterSection />
        </div>
    )
}