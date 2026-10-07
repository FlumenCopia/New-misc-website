import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import AIMarketing from '@/components/blog/AI-Marketing';

export default function page() {
  return (
    <div>
        <Header/>
        <Blogtitle title="Top 5 Reasons Creativity Still Wins in AI Marketing" />
<AIMarketing />

        <FooterSection/>
    </div>
  )
}