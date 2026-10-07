import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import Transforming_Digital from '@/components/blog/Transforming_Digital';

export default function page() {
  return (
    <div>
        <Header/>
        <Blogtitle title="How Voice Search is Transforming Digital Marketing" />
{/* <AIMarketing /> */}
<Transforming_Digital />
        <FooterSection/>
    </div>
  )
}