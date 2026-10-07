import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import SEOandAEO from '@/components/blog/SEO-and-AEO';
import Aidrivensearchresults from '@/components/blog/Ai-driven-search-results';
import MarketingChangingBusiness from '@/components/blog/Marketing-Changing-Business';

export default function page() {
    return (
        <div>
            <Header />
            <Blogtitle title="How Is Digital Marketing Changing Business ? " />
<MarketingChangingBusiness />
            <FooterSection />
        </div>
    )
}