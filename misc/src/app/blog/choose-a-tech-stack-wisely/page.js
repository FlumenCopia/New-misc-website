import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import ChooseaTechStackWisely from '@/components/blog/ChooseaTechStackWisely';


export const metadata = {
  title: 'How to Choose the Right Tech Stack Wisely',
  description: 'Choosing the right tech stack impacts website speed, stability, and growth. Learn how to make smart, long-term technology choices for your business.',
};


export default function page() {
    return (
        <div>
            <Header />
            <Blogtitle title="How to Choose a Tech Stack Wisely" />

            <ChooseaTechStackWisely/>
            <FooterSection />
        </div>
    )
}