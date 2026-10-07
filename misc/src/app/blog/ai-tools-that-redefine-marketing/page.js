import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import Ai_that_redefine_marketing from '@/components/blog/Ai_that_redefine_marketing';

export default function page() {
    return (
        <div>
            <Header />
            <Blogtitle title="Game-Changing AI Tools That Will Redefine Marketing in 2026 " />

            <Ai_that_redefine_marketing />
            <FooterSection />
        </div>
    )
}