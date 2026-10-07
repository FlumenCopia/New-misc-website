import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import StrategyBeatsAdSpend from '@/components/blog/StrategyBeatsAdSpend';





export default function page() {
    return (
        <div>
            <Header />
            <Blogtitle title="Top 5 Reasons Strategy Beats Ad Spend" />
            <StrategyBeatsAdSpend/>
           
            <FooterSection />
        </div>
    )
}