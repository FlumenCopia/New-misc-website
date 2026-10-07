import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import UgcQuietlyOutperforms from '@/components/blog/UgcQuietlyOutperforms';


export default function page() {
    return (
        <div>
            <Header />
            <Blogtitle title="Why UGC Quietly Outperforms Paid Ads" />
            <UgcQuietlyOutperforms/>
            <FooterSection />
        </div>
    )
}