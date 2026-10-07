import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import ChangingGoogle from '@/components/blog/ChangingGoogle';

export default function page() {
  return (
    <div>
        <Header/>
        <Blogtitle title="How AI Search Is Changing Google Rankings" />


    <ChangingGoogle/>

        <FooterSection/>
    </div>
  )
}