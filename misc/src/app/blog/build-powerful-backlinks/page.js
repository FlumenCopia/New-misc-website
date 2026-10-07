import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import Backlinks from '@/components/blog/Backlinks';

export default function page() {
  return (
    <div>
        <Header/>
        <Blogtitle title="How to build powerful backlinks in 2025?" />

       <Backlinks />
        <FooterSection/>
    </div>
  )
}