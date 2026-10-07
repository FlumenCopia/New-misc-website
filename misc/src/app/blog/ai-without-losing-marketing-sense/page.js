import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import AiWithoutLosingMarketingSense from '@/components/blog/AiWithoutLosingMarketingSense';


export const metadata = {
  title: 'How AI Is Changing Marketing Without Replacing Marketers | Misc Archive',
  description: 'AI is transforming marketing workflows, but humans still lead the strategy. Learn how marketers can use AI wisely without losing creativity or control.',
};


export default function page() {
    return (
        <div>
            <Header />
            <Blogtitle title="A Guide to Using AI Without Losing Marketing Sense" />

            <AiWithoutLosingMarketingSense/>
            <FooterSection />
        </div>
    )
}