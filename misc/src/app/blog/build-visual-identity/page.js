import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import BuiltaVisualIdentity from '@/components/blog/BuiltaVisualIdentity';


export default function page() {
  return (
    <div>
        <Header/>
        <Blogtitle title="How to Build a Visual Identity That Works" />

        <BuiltaVisualIdentity/>

        <FooterSection/>
    </div>
  )
}