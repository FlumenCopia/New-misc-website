"use client";

import React from "react";
import AboutSection from "@/components/home/Aboutus";

export default function NeyyattinkaraAbout() {
  return (
    <AboutSection
      tag="THE EXPANSION"
      title="About the Venture"
      highlightWord="Venture"
      paragraphs={[
        "Misc Archive expands its journey with a new presence in Neyyattinkara, bringing its full spectrum of digital and creative services to businesses in the region. Built on strategy, creativity, and performance, Misc Archive works with brands that want more than visibility; we help you build relevance, consistency, and long-term growth in the digital space.",
        "Whether you’re launching a new business or scaling an existing one, our Neyyattinkara team is ready to support your vision with dedicated strategic collaboration.",
      ]}
      showButton={true}
      buttonLink="/contact"
      buttonText="CONNECT WITH US"
    />
  );
}
