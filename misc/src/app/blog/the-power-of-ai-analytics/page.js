import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import Power_Of_Ai_Analytics from '@/components/blog/Power_Of_Ai_Analytics';



export default function page() {
    return (
        <div>
            <Header />
            <Blogtitle title="From Data to Decisions: The Power of AI Analytics " />
            <Power_Of_Ai_Analytics />
            <FooterSection />
        </div>
    )
}