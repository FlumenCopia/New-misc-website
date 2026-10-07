import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import SocialMediasRealPurpose from '@/components/blog/SocialMediasRealPurpose';


export const metadata = {
  title: 'The Real Purpose of Social Media for Businesses | Misc Archive',
  description: 'Discover the real purpose of social media for businesses and how trust, consistency, and relevance drive long-term growth beyond likes and sales.',
  
};


export default function page() {
    return (
        <div>
            <Header />
            <Blogtitle title="A Guide to Social Media’s Real Purpose" />
            <SocialMediasRealPurpose/>

            <FooterSection />
        </div>
    )
}