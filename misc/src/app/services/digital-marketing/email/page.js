import React from 'react'
import Header from "@/components/common/Header";
import QuoteSection from "@/components/home/Quote";
import FooterSection from "@/components/common/Footer";
import EmailContent from '@/components/services/DM-Subcategories/emailContent';

export default function page() {
    return (
        <div>
            <Header />
<EmailContent />
            {/* <QuoteSection /> */}
            <FooterSection />
        </div>
    )
}
