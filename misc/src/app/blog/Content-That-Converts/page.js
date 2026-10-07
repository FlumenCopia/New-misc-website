import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';

import ContentThatConverts from '@/components/blog/ContentThatConverts';

export default function page() {
  return (
    <div>
        <Header/>
        <Blogtitle title="Content That Converts: What Actually Works in 2026" />

       <ContentThatConverts/>

        <FooterSection/>
    </div>
  )
}