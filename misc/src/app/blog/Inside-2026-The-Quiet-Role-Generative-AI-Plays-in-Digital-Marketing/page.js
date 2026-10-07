import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import Inside2026 from '@/components/blog/Inside2026';

export default function page() {
  return (
    <div>
        <Header/>
        <Blogtitle title="Inside 2026: The Quiet Role Generative AI Plays in Digital Marketing" />

<Inside2026 />
        <FooterSection/>
    </div>
  )
}