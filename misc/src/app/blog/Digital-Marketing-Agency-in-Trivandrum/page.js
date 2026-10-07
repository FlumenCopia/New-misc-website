import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import DigitalMarketingAgencyTrivandrum from '@/components/blog/DigitalMarketingAgencyTrivandrum';

export default function page() {
  return (
    <div>
        <Header/>
        <Blogtitle title="How a Digital Marketing Agency in Trivandrum Helps E-commerce Brands Grow" />

<DigitalMarketingAgencyTrivandrum />
        <FooterSection/>
    </div>
  )
}