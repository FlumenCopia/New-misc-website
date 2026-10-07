import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import PpcBlog from '@/components/blog/PpcBlog';
import Blogtitle from '@/components/blog/Blogtitle';
import Digital_Marketing_Company from '@/components/blog/Digital_Marketing_Company';
import EEATandAEO from '@/components/blog/EEATandAEO';

export default function page() {
    return (
        <div>
            <Header />
            <Blogtitle title="How to Win Search Trust in 2025 with EEAT and AEO" />
<EEATandAEO />
            <FooterSection />
        </div>
    )
}