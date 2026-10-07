import React from 'react'
import Header from "@/components/common/Header";
import QuoteSection from "@/components/home/Quote";
import FooterSection from "@/components/common/Footer";
import SmmContent from '@/components/services/DM-Subcategories/SmmContent';

export default function page() {
    return (
        <div>
            <Header />
            <SmmContent />
            {/* <QuoteSection /> */}
            <FooterSection />
        </div>
    )
}
