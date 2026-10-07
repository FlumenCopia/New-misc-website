import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import PpcBlog from '@/components/blog/PpcBlog';
import Blogtitle from '@/components/blog/Blogtitle';
import Marketingcompanytvmblog from '@/components/blog/Marketingcompanytvmblog';

export default function page() {
  return (
    <div>
        <Header/>
        <Blogtitle title="How a Digital Marketing Company in Trivandrum Can Redefine Your Brand’s Success" />
        
<Marketingcompanytvmblog />

        <FooterSection/>
    </div>
  )
}