import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import SEOandAEO from '@/components/blog/SEO-and-AEO';
import Aidrivensearchresults from '@/components/blog/Ai-driven-search-results';

export default function page() {
  return (
    <div>
        <Header/>
        <Blogtitle title="Where did my visitors disappear to? Exploring how AI-driven search results are changing visitor behaviour" />
       
<Aidrivensearchresults />
        <FooterSection/>
    </div>
  )
}