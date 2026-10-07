import React from 'react'
import Header from "@/components/common/Header";
import QuoteSection from "@/components/home/Quote";
import FooterSection from "@/components/common/Footer";
import SemContent from '@/components/services/DM-Subcategories/SemContent';

export default function page() {
    return (
        <div>
            <Header />
            <SemContent />
            {/* <QuoteSection /> */}
            <FooterSection />
        </div>
    )
}
