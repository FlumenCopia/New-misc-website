import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import AiRedefiningDigitalAgencies from '@/components/blog/Ai-Redefining-Digital-Agencies';
import GuideToMasteringVoice from '@/components/blog/GuideToMasteringVoice';
import ChooseContentThatActuallyPaysOff from '@/components/blog/ChooseContentThatActuallyPaysOff';
import BadUXQuietlyKillsConversions from '@/components/blog/BadUXQuietlyKillsConversions';

export default function page() {
    return (
        <div>
            <Header />
            <Blogtitle title="How Bad UX Quietly Kills Conversions" />
           <BadUXQuietlyKillsConversions/>
            <FooterSection />
        </div>
    )
}