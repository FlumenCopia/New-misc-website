import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import DigitalMarketingAgencyTrivandrum from '@/components/blog/DigitalMarketingAgencyTrivandrum';
import ReduceAdSpend from '@/components/blog/ReduceAdSpend';

export default function page() {
  return (
    <div>
        <Header/>
        <Blogtitle title="How to Reduce Ad Spend While Increasing Conversions in 2026" />

        <ReduceAdSpend/>
        <FooterSection/>
    </div>
  )
}