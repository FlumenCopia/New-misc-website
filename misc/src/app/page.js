import Image from "next/image";
import styles from "./page.module.css";
import Header from "@/components/common/Header";
import Banner from "@/components/home/Banner";
import AboutSection from "@/components/home/Aboutus";
import LogosSection from "@/components/home/Logo";
import ServicesSection from "@/components/home/Services";
import DigitalMarketingSection from "@/components/home/LatestNews";
import BlogSection from "@/components/home/Blogs";
import QuoteSection from "@/components/home/Quote";
import FooterSection from "@/components/common/Footer";
import WhatsAppButton from "@/components/common/WhatsappButton";
import Faqs from "@/components/home/Faqs";
import Footer2 from "@/components/common/Footer2";

export const metadata = {
  title: 'Digital Marketing company in trivandrum, Kerala | Miscarchive',
  description: 'Looking for the best digital marketing company in Trivandrum? Miscarchive offers expert SEO, social media marketing and more to grow your business online.',
  keywords: 'Digital Marketing, Marketing Solutions, Web Development, SEO, Social Media Management',
};

export default function Home() {
  return (
   <div>
    <Header/>
    <Banner/>
    <AboutSection/>
    <LogosSection/>
    <ServicesSection/>
    <DigitalMarketingSection/>
      {/* <Faqs /> */}
    <BlogSection/>

    {/* <QuoteSection/> */}

    {/* <WhatsAppButton/> */}
    <FooterSection/>
    {/* <Footer2 /> */}
   </div>
  );
}
