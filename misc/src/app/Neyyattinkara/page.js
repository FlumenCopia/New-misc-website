import React from 'react'
import Header from "@/components/common/Header";
import QuoteSection from "@/components/home/Quote";
import FooterSection from "@/components/common/Footer";
import CareerContent from '@/components/career/CareerContent';
import Neyyattinkaratemplate from '@/components/Neyyattinkara/Neyyattinkaratemplate';
import Practical from '../../components/Neyyattinkara/Practical';
import NeyyattinkaraAbout from '@/components/Neyyattinkara/NeyyattinkaraAbout';
import ServicesNeyyattinkara from '@/components/Neyyattinkara/ServicesNeyyattinkara';
import WhyChoose from '@/components/Neyyattinkara/WhyChoose';
import ProcessSection from '@/components/Neyyattinkara/ProcessSection';
import WorkWith from '@/components/Neyyattinkara/WorkWith';
import GetInTouch from '@/components/Neyyattinkara/GetInTouch';

export const metadata = {
  title: ' Career at MiscArchive | Join Our Growing Team',
  description: 'Looking for the best digital marketing company in Trivandrum? Miscarchive offers expert SEO, social media marketing and more to grow your business online.',
  keywords: 'Digital Marketing, Marketing Solutions, Web Development, SEO, Social Media Management',
};

export default function page() {
  return (
    <div>
        <Header/>

<Neyyattinkaratemplate />
<NeyyattinkaraAbout />
<ServicesNeyyattinkara />
<WhyChoose />
<ProcessSection />
<WorkWith />
{/* <GetInTouch /> */}
{/* <Practical /> */}
        {/* <QuoteSection/> */}
{/* <WhyChooseMiscarchive /> */}

        <FooterSection/>
    </div>
  )
}
