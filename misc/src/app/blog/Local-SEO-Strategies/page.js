import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import DigitalMarketingAgencyTrivandrum from '@/components/blog/DigitalMarketingAgencyTrivandrum';
import ReduceAdSpend from '@/components/blog/ReduceAdSpend';
import LocalSeoStrategies from '@/components/blog/LocalSeoStrategies';

export default function page() {
  return (
    <div>
        <Header/>
        <Blogtitle title="Local SEO Strategies Every Business Needs in 2026" />

        <LocalSeoStrategies/>
        <FooterSection/>
    </div>
  )
}