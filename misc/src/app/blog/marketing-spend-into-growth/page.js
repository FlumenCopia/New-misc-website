import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import UgcQuietlyOutperforms from '@/components/blog/UgcQuietlyOutperforms';
import OptimizeLandingPages from '@/components/blog/OptimizeLandingPages';
import MarketingSpendIntoGrowth from '@/components/blog/MarketingSpendIntoGrowth';


export default function page() {
    return (
        <div>
            <Header />
            <Blogtitle title="How to Turn Marketing Spend Into Growth" />
            <MarketingSpendIntoGrowth/>
            <FooterSection />
        </div>
    )
}