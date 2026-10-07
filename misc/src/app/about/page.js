

import React from 'react'
import Header from "@/components/common/Header";
import QuoteSection from "@/components/home/Quote";
import FooterSection from "@/components/common/Footer";
import AboutUs from '@/components/about/About_about';
import AboutBanner from '@/components/about/AboutBanner';
import LogosSection from '@/components/home/Logo';

export const metadata = {
  title: 'Learn More About Us | Miscarchive',
  description: 'Looking for the best digital marketing company in Trivandrum? Miscarchive offers expert SEO, social media marketing and more to grow your business online.',
  keywords: 'Digital Marketing, Marketing Solutions, Web Development, SEO, Social Media Management',
};


export default function page() {
  return (
    <div>
        <Header/>
        <AboutBanner/>
        <AboutUs/>
        <LogosSection/>
        {/* <QuoteSection/> */}
        <FooterSection/>
    </div>
  )
}
