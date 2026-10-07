import React from 'react'
import Header from "@/components/common/Header";
import QuoteSection from "@/components/home/Quote";
import FooterSection from "@/components/common/Footer";
import ComingSoon from '@/components/common/ComingSoon';

export const metadata = {
  title: ' Digital Marketing company in trivandrum, Kerala | Miscarchive ',
  description: 'Looking for the best digital marketing company in Trivandrum? Miscarchive offers expert SEO, social media marketing and more to grow your business online.',
  keywords: 'Digital Marketing, Marketing Solutions, Web Development, SEO, Social Media Management',
};

export default function page() {
  return (
    <div>
        <Header/>
        <ComingSoon/>
        {/* <QuoteSection/> */}
        <FooterSection/>
    </div>
  )
}
