import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import ChoosetheRightWebsite from '@/components/blog/ChoosetheRightWebsite';


export default function page() {
    return (
        <div>
            <Header />
            <Blogtitle title="How to Choose the Right Website" />

            <ChoosetheRightWebsite/>
            <FooterSection />
        </div>
    )
}