'use client';

// components/AboutUs.js or pages/about-us.js

import React, { useState, useEffect } from 'react';
import { getTeamMembers, resolveMediaUrl } from '@/lib/api';

import AboutSection from '@/components/home/Aboutus';

import MeetOurFounders from '@/components/about/MeetOurFounders';

const DEFAULT_TEAM = [
  {
    name: 'Anoop D Anil',
    designation: 'Vice President, CFO',
    photoImage: '/assets/images/sunny.webp',
  },
  {
    name: 'Anoop Krishna',
    designation: 'CEO, FOUNDER',
    photoImage: '/assets/images/anoop.webp',
  },
  {
    name: 'Rohini A Pillai',
    designation: 'Co-Founder, COO',
    photoImage: '/assets/images/anju.webp',
  },
];

const AboutUs = ({ initialTeam }) => {
  const [team, setTeam] = useState(initialTeam && initialTeam.length > 0 ? initialTeam : DEFAULT_TEAM);

  useEffect(() => {
    let isMounted = true;
    getTeamMembers(true).then((data) => {
      if (isMounted && data && Array.isArray(data) && data.length > 0) {
        setTeam(data);
      }
    }).catch(() => {});
    return () => { isMounted = false; };
  }, []);

  return (
    <>
      <AboutSection
        tag="ABOUT US"
        title="ABOUT MiscArchive"
        paragraphs={[
          `Our goal is to emerge as the first and excellent choice for enterprise-wide solutions as a Branding agency and a broadcasting partner in Trivandrum with our team of closely-knit yet enthusiastic individuals.`,
          `At MiscArchive, we provide high-quality or innovative value-added solutions within the domains of digital marketing services, Web Designing, Web Development, Social Media management, and other comparable miscellaneous services. We assist our clients through expert-level ideation, comprehensive project execution, seamless work experience, easy interactive team collaboration, and overall team transparency for absolutely everyone involved.`,
        ]}
        showButton={false}
      />

      <MeetOurFounders team={team} />
    </>
  );
};

export default AboutUs;
