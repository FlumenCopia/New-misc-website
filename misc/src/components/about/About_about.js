'use client';

// components/AboutUs.js or pages/about-us.js

import React, { useState, useEffect } from 'react';
import { getTeamMembers, resolveMediaUrl } from '@/lib/api';

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
  {
    name: 'Akhil G V',
    designation: 'Vice President, Creative Head',
    photoImage: '/assets/images/akhil (1).webp',
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
      <section className="about-us">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 left-side" data-stellar-background-ratio="0.5">
              {/* Background Image or Left Content can be handled via CSS */}
            </div>
            <div className="col-md-6 right-side">
              <div className="table fadeInUp">
                <div className="inner">
                  <h3>ABOUT <span>MiscArchive</span></h3>
                  <p>
                    Our goal is to emerge as the first and excellent choice for enterprise-wide solutions as
                    a Branding agency and a broadcasting partner in Trivandrum with our team of closely-knit
                    yet enthusiastic individuals.
                  </p>
                  <p>
                    At MiscArchive, we provide high-quality or innovative value-added solutions within the
                    domains of digital marketing services, Web Designing, Web Development, Social Media
                    management, and other comparable miscellaneous services. We assist our clients through
                    expert-level ideation, comprehensive project execution, seamless work experience, easy
                    interactive team collaboration, and overall team transparency for absolutely everyone
                    involved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {team && team.length > 0 && (
        <section className="team-members">
          <div style={{ padding: '100px 0' }}></div>
          <div className="container fadeInUp">
            <div className="row">
              {team.map((member, idx) => (
                <div className="col-md-3 col-sm-3" key={member._id || idx}>
                  <figure>
                    <img
                      src={resolveMediaUrl(member.photoImage || member.image) || member.photoImage || member.image}
                      alt={member.name}
                    />
                    <figcaption>
                      <h3>{member.name}</h3>
                      <h6>{member.designation || member.role}</h6>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default AboutUs;
