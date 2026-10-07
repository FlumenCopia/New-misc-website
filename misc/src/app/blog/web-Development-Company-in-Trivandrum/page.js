import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import Rpablog from '@/components/blog/Rpablog';
import Web_development_Company from '@/components/blog/web_development_Company';



export default function page() {
  return (
    <div>
        <Header/>
        <Blogtitle title="The Importance of Choosing the Best Web Development Company in Trivandrum" />
        {/* <Rpablog/> */}
<Web_development_Company />

        <FooterSection/>
    </div>
  )
}

