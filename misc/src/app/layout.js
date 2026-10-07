import WhatsAppButton from "@/components/common/WhatsappButton";
import ScrollToTopButton from "@/components/common/ScrollToTopButton";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>

         {/* Google tag (gtag.js) */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-NKFNZX5W56" />
        <Script>
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-NKFNZX5W56');
          `}
        </Script>


        <link rel="stylesheet" href="/assets/css/animate.css" />
        <link rel="stylesheet" href="/assets/css/bootstrap.css" />
        <link rel="stylesheet" href="/assets/css/bootstrap.cssmap" />
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/ionicons.css" />
        <link rel="stylesheet" href="/assets/css/jquery.fancybox.css" />
        <link rel="stylesheet" href="/assets/css/owl.carousel.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
        <link rel="stylesheet" href="/assets/css/settings.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.0/css/all.min.css" integrity="sha512-DxV+EoADOkOygM4IR9yXP8Sb2qwgidEmeqAEmDKIOfPRQZOWbXCzLC6vjbZyy0vPisbH2SyW27+ddLVCN+OMzQ==" crossOrigin="anonymous" referrerPolicy="no-referrer" />


      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <WhatsAppButton/>
        <ScrollToTopButton/>

        {/* <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js" integrity="sha384-ndDqU0Gzau9qJ1lfW4pNLlhNTkCfHzAVBReH9diLvGRem5+R9g2FzA8ZGN954O5Q" crossorigin="anonymous"></Script> */}
        
        <Script src="/assets/js/jquery.min.js"></Script>
        <Script src="/assets/js/jquery.validate.min.js"></Script>


        <Script src="/assets/js/bootstrap.js"></Script>
        <Script src="/assets/js/bootstrap.min.js"></Script>
        <Script src="/assets/js/contact-form.js"></Script>
        <Script src="/assets/js/contact-form2.js"></Script>
        <Script src="/assets/js/google-maps.js"></Script>
        <Script src="/assets/js/isotope.min.js"></Script>
        <Script src="/assets/js/jquery.counterup.min.js"></Script>
        <Script src="/assets/js/jquery.fancybox.js"></Script>
        <Script src="/assets/js/jquery.form.js"></Script>
        <Script src="/assets/js/jquery.stellar.js"></Script>
        <Script src="/assets/js/jquery.themepunch.revolution.min.js"></Script>
        <Script src="/assets/js/jquery.themepunch.tools.min.js"></Script>
        <Script src="/assets/js/masonry.js"></Script>
        {/* <Script src="/assets/js/npm.js"></Script> */}
        <Script src="/assets/js/owl.carousel.js"></Script>
        <Script src="/assets/js/prefixfree.min.js"></Script>
        <Script src="/assets/js/scripts.js"></Script>
        <Script src="/assets/js/settings.js"></Script>
        <Script src="/assets/js/waypoints.min.js"></Script>
        {/* <Script src="/assets/js/wow.js"></Script> */}
      </body>
    </html>
  );
}
