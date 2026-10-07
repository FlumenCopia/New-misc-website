import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import AiRedefiningDigitalAgencies from '@/components/blog/Ai-Redefining-Digital-Agencies';
import GuideToMasteringVoice from '@/components/blog/GuideToMasteringVoice';
import ChooseContentThatActuallyPaysOff from '@/components/blog/ChooseContentThatActuallyPaysOff';

export default function page() {
    return (
        <div>
            <Header />
            <Blogtitle title="How to Choose Content That Actually Pays Off" />
           <ChooseContentThatActuallyPaysOff/>
            <FooterSection />
        </div>
    )
}