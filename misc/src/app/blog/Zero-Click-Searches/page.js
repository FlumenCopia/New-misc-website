import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import DigitalMarketingAgencyTrivandrum from '@/components/blog/DigitalMarketingAgencyTrivandrum';
import ReduceAdSpend from '@/components/blog/ReduceAdSpend';
import LocalSeoStrategies from '@/components/blog/LocalSeoStrategies';
import ZeroClickSearches from '@/components/blog/ZeroClickSearches';

export default function page() {
  return (
    <div>
        <Header/>
        <Blogtitle title="Zero-Click Searches: How Brands Can Still Win Traffic" />

        <ZeroClickSearches/>
        <FooterSection/>
    </div>
  )
}