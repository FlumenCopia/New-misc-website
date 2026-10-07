import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import HighConvertingLanding from '@/components/blog/HighConvertingLanding';

export default function page() {
  return (
    <div>
        <Header/>
        <Blogtitle title="What Makes a High-Converting Landing Page in 2026" />

<HighConvertingLanding />

        <FooterSection/>
    </div>
  )
}