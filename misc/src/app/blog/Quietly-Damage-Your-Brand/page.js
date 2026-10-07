import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import QuietlyDamage from '@/components/blog/QuietlyDamage';

export default function page() {
    return (
        <div>
            <Header />
            <Blogtitle title="How a Poor Website Can Quietly Damage Your Brand" />
        <QuietlyDamage /> 
          
            <FooterSection />
        </div>
    )
}