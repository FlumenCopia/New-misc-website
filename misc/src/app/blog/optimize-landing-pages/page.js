import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import UgcQuietlyOutperforms from '@/components/blog/UgcQuietlyOutperforms';
import OptimizeLandingPages from '@/components/blog/OptimizeLandingPages';


export default function page() {
    return (
        <div>
            <Header />
            <Blogtitle title="How to Optimize Landing Pages That Convert" />
            <OptimizeLandingPages/>
            <FooterSection />
        </div>
    )
}