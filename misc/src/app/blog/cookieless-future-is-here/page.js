import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import Cookieless_Future from '@/components/blog/Cookieless_Future';

export default function page() {
    return (
        <div>
            <Header />
            <Blogtitle title="The Cookieless Future Is Here: How Marketers Can Stay Smart, Ethical & Ahead" />
            <Cookieless_Future />
            
            <FooterSection />
        </div>
    )
}