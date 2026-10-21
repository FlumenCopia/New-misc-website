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
import Footer2 from "@/components/common/Footer2";
import { getBanners, getClientLogos, getSettings } from "@/lib/api";

export const metadata = {
  title: 'Digital Marketing company in trivandrum, Kerala | Miscarchive',
  description: 'Looking for the best digital marketing company in Trivandrum? Miscarchive offers expert SEO, social media marketing and more to grow your business online.',
  keywords: 'Digital Marketing, Marketing Solutions, Web Development, SEO, Social Media Management',
};

export default async function Home() {
  const [initialBanners, initialLogos, initialSettings] = await Promise.all([
    getBanners(),
    getClientLogos(),
    getSettings(),
  ]);

  return (
    <div>
     <Header settings={initialSettings}/>
     <Banner initialBanners={initialBanners}/>
     <AboutSection/>
     <LogosSection initialLogos={initialLogos}/>
     <ServicesSection/>
     <DigitalMarketingSection/>
     <BlogSection/>

     {/* <QuoteSection/> */}

     <FooterSection settings={initialSettings}/>
     {/* <Footer2 /> */}
    </div>
  );
}
