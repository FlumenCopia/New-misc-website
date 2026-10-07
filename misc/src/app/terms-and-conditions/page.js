import FooterSection from '@/components/common/Footer'
import Header from '@/components/common/Header'
import TermsSection from '@/components/terms/TermsSection'
import React from 'react'

function page() {
  return (
    <div>
        <Header/>
        <TermsSection/>
        <FooterSection/>
    </div>
  )
}

export default page