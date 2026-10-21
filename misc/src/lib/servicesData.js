import { getServices, getServiceBySlug, getSubServices, resolveMediaUrl } from './api';

export const fallbackServicesCatalog = [
  {
    title: 'Digital Marketing',
    slug: 'digital-marketing',
    route: '/services/digital-marketing',
    iconImage: '/assets/images/services/service-card-02.webp',
    badge: 'DIGITAL GROWTH',
    taglineLines: ['Strategy-Led.', 'People-Focused.', 'Results-Driven.'],
    shortDescription:
      'Digital marketing works best when it feels natural, not forced. At MiscArchive, we help businesses in Trivandrum, Kerala, and beyond grow their online presence and capture qualified leads.',
    fullDescriptionHtml: `
      <div class="service-rich-body">
        <h3>Strategy-Led. People-Focused. Results-Driven.</h3>
        <p>Digital marketing works best when it feels natural not forced. At MiscArchive, we help businesses in Trivandrum, Kerala, and beyond build sustainable digital visibility that converts visitors into loyal brand advocates.</p>
        
        <h4>Our Strategic Approach</h4>
        <ul>
          <li><strong>Audience Understanding:</strong> We dive deep into buyer persona behavior, search intent, and engagement patterns.</li>
          <li><strong>Data-Backed Optimization:</strong> Ongoing A/B testing, multivariate analysis, and conversion rate optimization (CRO).</li>
          <li><strong>Channel Synergy:</strong> Unifying SEO, social, email, and paid channels into one cohesive customer acquisition funnel.</li>
        </ul>

        <h4>Key Capabilities</h4>
        <p>Whether you require targeted local reach or national scale, our integrated campaigns combine high-converting ad copy, precision targeting, and transparent performance dashboards.</p>
      </div>
    `,
    features: [
      'Search Engine Optimization (SEO)',
      'Social Media Marketing (SMM)',
      'Performance Advertising (PPC / SEM)',
      'Story-Driven Content Creation',
      'Targeted Email Marketing Automations',
      'Actionable Web Analytics & Attribution',
    ],
    subServices: [
      {
        title: 'Search Engine Optimization (SEO)',
        slug: 'seo',
        route: '/services/digital-marketing/seo',
        shortDescription: 'Rank higher on Google searches and attract high-intent organic visitors.',
      },
      {
        title: 'Social Media Marketing (SMM)',
        slug: 'smm',
        route: '/services/digital-marketing/smm',
        shortDescription: 'Build engaged communities across Instagram, LinkedIn, and Facebook.',
      },
      {
        title: 'Search Engine Marketing (SEM)',
        slug: 'sem',
        route: '/services/digital-marketing/sem',
        shortDescription: 'High ROI Google Ads and PPC campaigns optimized for real conversions.',
      },
      {
        title: 'E-mail Marketing',
        slug: 'email',
        route: '/services/digital-marketing/email',
        shortDescription: 'Automated drip sequences and newsletters that nurture leads into buyers.',
      },
    ],
    approach: {
      badge: 'OUR APPROACH',
      titleHighlight: 'Approach',
      taglineLines: ['Strategy-Led. People-Focused.', 'Results-Driven.'],
      subtitle:
        'Digital marketing works best when it feels natural not forced. At MiscArchive, we help businesses in Trivandrum, Kerala, and beyond grow their online presence.',
      steps: [
        {
          step: '01',
          title: 'Audience Understanding',
          description: "We dive deep into understanding your audience's behavior and intent.",
        },
        {
          step: '02',
          title: 'Location Strategy',
          description: 'Strategies tailored for your local and regional market.',
        },
        {
          step: '03',
          title: 'Goal Alignment',
          description: 'Every campaign supports clear business objectives.',
        },
      ],
    },
    whyPartner: {
      title: 'Why Partner With Us',
      points: [
        'Trivandrum-based core engineering and creative team.',
        'Transparent communication and sprint-based reporting.',
        'Dedicated account managers and post-launch support.',
      ],
    },
    uniqueRequirement: {
      badge: "LET'S TALK",
      title: 'Have a unique\nrequirement?',
      subtitle: 'Our consultants will review your goals and create a custom implementation blueprint.',
      btnText: 'Speak With an Expert',
      btnRoute: '/contact',
    },
    offerings: [
      {
        step: '01',
        title: 'SEO Optimization',
        description: 'Improve your organic search visibility.',
        route: '/services/digital-marketing/seo',
      },
      {
        step: '02',
        title: 'Social Media',
        description: 'Engage and grow communities.',
        route: '/services/digital-marketing/smm',
      },
      {
        step: '03',
        title: 'Performance Campaigns',
        description: 'ROI-focused paid advertising.',
        route: '/services/digital-marketing/sem',
      },
      {
        step: '04',
        title: 'Content Creation',
        description: 'Story-driven brand content.',
        route: '/services/digital-marketing',
      },
      {
        step: '05',
        title: 'Email Marketing',
        description: 'Lead nurturing campaigns.',
        route: '/services/digital-marketing/email',
      },
      {
        step: '06',
        title: 'Analytics & Reporting',
        description: 'Actionable insights.',
        route: '/services/digital-marketing',
      },
    ],
    ctaTarget: 'Digital Presence?',
    ctaSubtitle: "Let's discuss how we can help your business grow.",
    specializedPillars: {
      eyebrow: 'SPECIALIZED PILLARS',
      title: 'Explore Focused',
      titleHighlight: 'Specializations',
      subtitle:
        'From strategy to execution, our specialized digital marketing services help businesses grow with precision, creativity, and measurable results.',
      pillars: [
        {
          step: '01',
          title: 'E-mail Marketing',
          description:
            'Transform Connections into Conversions with Email Marketing. In the fast-paced digital era, email marketing remains one of the most personal and cost-effective ways to reach your audience.',
          route: '/services/digital-marketing/email',
          linkText: 'Explore Service',
        },
        {
          step: '02',
          title: 'Search Engine Marketing (SEM)',
          description:
            'Boost Visibility, Drive Traffic, and Achieve Measurable Results with Precision-Powered SEM Strategies. Dominate search engine results pages with strategic paid advertising.',
          route: '/services/digital-marketing/sem',
          linkText: 'Explore Service',
        },
        {
          step: '03',
          title: 'Search Engine Optimization (SEO)',
          description:
            'Increase organic rankings, high-intent traffic, and lasting authority across search engines. Build sustainable search presence through technical optimization and content strategy.',
          route: '/services/digital-marketing/seo',
          linkText: 'Explore Service',
        },
        {
          step: '04',
          title: 'Social Media Marketing (SMM)',
          description:
            'Unlock the power of social media to grow your brand and engage with your audience like never before. Strategic campaigns across Facebook, Instagram, LinkedIn, and more.',
          route: '/services/digital-marketing/smm',
          linkText: 'Explore Service',
        },
      ],
    },
    order: 1,
    isActive: true,
  },
  {
    title: 'Web Development',
    slug: 'web-development',
    route: '/services/web-development',
    iconImage: '/assets/images/services/service-card-03.webp',
    badge: 'ENGINEERING & UI/UX',
    taglineLines: ['Websites That Look Good', 'and Work Better.', 'Built to Scale.'],
    shortDescription:
      'Websites that look good and work better. We build ultra-fast, responsive, and conversion-optimized websites engineered for seamless user experiences and rock-solid scalability.',
    fullDescriptionHtml: `
      <div class="service-rich-body">
        <h3>Websites That Look Good and Work Better</h3>
        <p>A website is often the first interaction someone has with your brand. We design and develop websites that are not only visually appealing, but also functional, fast, and easy to navigate on every screen size.</p>
        
        <h4>Engineering Excellence</h4>
        <ul>
          <li><strong>High Performance Architecture:</strong> Built on modern frameworks like Next.js and React with sub-second page loads.</li>
          <li><strong>Mobile-First & Responsive:</strong> Fluid layouts meticulously tuned for smartphones, tablets, and wide desktop displays.</li>
          <li><strong>SEO & Accessibility Built-In:</strong> Clean semantic HTML, structured schema markup, and WCAG accessibility standards.</li>
        </ul>

        <h4>Full-Stack Capabilities</h4>
        <p>From bespoke brand showcase websites to dynamic headless CMS platforms and interactive web portals, our engineering team delivers maintainable code that scales with your growth.</p>
      </div>
    `,
    features: [
      'Intuitive UX/UI & Clear Information Architecture',
      'Mobile-Friendly Ultra-Responsive Layouts',
      'SEO-Ready Semantic Code & Speed Optimization',
      'Sub-Second Performance & High Core Web Vitals',
      'Conversion-Optimized Sales Funnels & CTAs',
      'Custom Headless CMS & API Integrations',
    ],
    approach: {
      badge: 'OUR APPROACH',
      titleHighlight: 'Approach',
      subtitle:
        'We follow an engineering-driven, user-first approach to architect and build high-performance websites that convert visitors into customers.',
      steps: [
        {
          step: '01',
          title: 'UX Architecture & Planning',
          description: 'Blueprint intuitive user journeys, wireframes, and responsive layout structures.',
        },
        {
          step: '02',
          title: 'Modern Agile Engineering',
          description: 'Develop ultra-fast, clean semantic code using modern Next.js and React frameworks.',
        },
        {
          step: '03',
          title: 'Speed & Conversion Tuning',
          description: 'Rigorous cross-device testing, SEO optimization, and sub-second page performance.',
        },
      ],
    },
    uniqueRequirement: {
      title: 'Have a project in mind?',
      subtitle: 'Our engineering team is ready to discuss your goals and architect a tailored solution.',
      btnText: 'Talk to Our Team',
      btnRoute: '/contact',
    },
    offerings: [
      {
        step: '01',
        title: 'Custom Web Applications',
        description: 'Scalable Next.js and React full-stack solutions.',
      },
      {
        step: '02',
        title: 'E-commerce Portals',
        description: 'High-conversion stores with seamless checkouts.',
      },
      {
        step: '03',
        title: 'UI/UX Design',
        description: 'User-centered interfaces with fluid animations.',
      },
      {
        step: '04',
        title: 'Headless CMS',
        description: 'Easy content editing with lightning fast loads.',
      },
      {
        step: '05',
        title: 'Speed & Core Vitals',
        description: 'Sub-second optimization and SEO performance.',
      },
      {
        step: '06',
        title: 'Cloud & Maintenance',
        description: 'Proactive updates, security, and monitoring.',
      },
    ],
    order: 2,
    isActive: true,
  },
  {
    title: 'Graphic Designing',
    slug: 'graphic-designing',
    route: '/services/graphic-designing',
    iconImage: '/assets/images/services/service-card-04.webp',
    badge: 'VISUAL IDENTITY',
    taglineLines: ['Visuals That Speak', 'Without Explaining.', 'Creative & Distinctive.'],
    shortDescription:
      'Visuals that speak without explaining. Good design does not just look attractive, it communicates. We craft distinctive brand assets and marketing visuals that improve business visibility.',
    fullDescriptionHtml: `
      <div class="service-rich-body">
        <h3>Visuals That Speak Without Explaining</h3>
        <p>Good design does not just look attractive—it communicates value in an instant. Our graphic design services help brands build an unmistakable visual identity that feels consistent, premium, and memorable.</p>
        
        <h4>Purposeful Design Philosophy</h4>
        <ul>
          <li><strong>Brand Consistency:</strong> Cohesive color theory, typography systems, and graphic motifs across all channels.</li>
          <li><strong>Scroll-Stopping Creatives:</strong> Eye-catching social and digital campaign graphics designed for modern feed habits.</li>
          <li><strong>Print & Packaging Excellence:</strong> Production-ready print layouts, brochures, catalogs, and product packaging.</li>
        </ul>

        <h4>Creative Offerings</h4>
        <p>We combine strategic art direction with creative execution to ensure your brand stands out in crowded marketplaces.</p>
      </div>
    `,
    features: [
      'Brand Identity Systems & Visual Guidelines',
      'Scroll-Stopping Social Media Creatives & Ads',
      'High-Impact Website Graphics & Custom Vectors',
      'Marketing Collateral, Brochures & Print Media',
      'Packaging Design & Physical Brand Touchpoints',
      'Motion Graphics & Presentation Deck Design',
    ],
    approach: {
      badge: 'OUR APPROACH',
      titleHighlight: 'Approach',
      subtitle:
        'We combine strategic art direction with purposeful visual design to create assets that resonate deeply with your target audience.',
      steps: [
        {
          step: '01',
          title: 'Creative Brief & Discovery',
          description: 'Understanding your visual ethos, market position, and target demographic tastes.',
        },
        {
          step: '02',
          title: 'Design Exploration',
          description: 'Developing multiple distinct concept directions with bespoke typography and palettes.',
        },
        {
          step: '03',
          title: 'Production & Brand Kit',
          description: 'Delivering versatile, pixel-perfect digital and print-ready vector files.',
        },
      ],
    },
    order: 3,
    isActive: true,
  },
  {
    title: 'Branding',
    slug: 'branding',
    route: '/services/branding',
    iconImage: '/assets/images/services/service-card-05.webp',
    badge: 'STRATEGY & IDENTITY',
    taglineLines: ['Shape Your Identity.', 'Elevate Your Impact.', 'Built For Trust.'],
    shortDescription:
      'Shape your identity and elevate your market impact. We define compelling brand narratives, distinctive logo marks, and cohesive design languages that earn customer trust.',
    fullDescriptionHtml: `
      <div class="service-rich-body">
        <h3>Shape Your Brand Identity and Elevate Your Impact</h3>
        <p>Branding is far more than a logo—it is the emotional resonance and expectation people hold about your business. MiscArchive creates timeless brand strategies that connect deeply with your audience.</p>
        
        <h4>What We Define</h4>
        <ul>
          <li><strong>Brand Positioning & Persona:</strong> Finding your distinct market wedge and authentic voice.</li>
          <li><strong>Comprehensive Identity Systems:</strong> Logo marks, iconography, color palettes, and typography.</li>
          <li><strong>Brand Guidelines Manual:</strong> Detailed usage rules ensuring complete cross-team consistency.</li>
        </ul>
      </div>
    `,
    features: [
      'Strategic Brand Positioning & Market Research',
      'Logo Mark & Typography Design',
      'Tone of Voice & Messaging Frameworks',
      'Comprehensive Brand Guidelines Book',
      'Collateral & Brand Touchpoint Alignment',
      'Rebranding & Brand Modernization',
    ],
    order: 4,
    isActive: true,
  },
  {
    title: 'Search Engine Optimisation (SEO)',
    slug: 'seo',
    route: '/services/digital-marketing/seo',
    iconImage: '/assets/images/services/service-card-06.webp',
    badge: 'ORGANIC VISIBILITY',
    taglineLines: ['Higher Rankings.', 'Targeted Traffic.', 'Measurable ROI.'],
    shortDescription:
      'SEO improves visibility, drives qualified inbound traffic, and converts searches into loyal customers. We optimize your ranking using ethical, data-backed strategies.',
    fullDescriptionHtml: `
      <div class="service-rich-body">
        <h3>Data-Driven Organic Search Domination</h3>
        <p>When potential buyers look for solutions online, being on page one makes all the difference. Our comprehensive SEO solutions combine technical site health with high-value content strategy.</p>
        
        <h4>Four Pillars of Our SEO</h4>
        <ul>
          <li><strong>Technical Audits:</strong> Crawlability, indexing, site speed, and structured data implementation.</li>
          <li><strong>Intent-Based Keyword Targeting:</strong> Aligning content with commercial and informational search intent.</li>
          <li><strong>Authoritative Backlinks:</strong> Earning authentic editorial links that build domain authority.</li>
          <li><strong>Local SEO:</strong> Google Business Profile optimization for regional dominance in Kerala and beyond.</li>
        </ul>
      </div>
    `,
    features: [
      'Comprehensive Technical SEO Audits',
      'Keyword Research & Competitor Gap Analysis',
      'On-Page Optimization & Meta Architecture',
      'High-Authority Link Building & Outreach',
      'Local Map Pack & Google Business Optimization',
      'Monthly Ranking & Organic Revenue Reporting',
    ],
    order: 5,
    isActive: true,
  },
  {
    title: 'Misc Audible',
    slug: 'miscaudibles',
    route: '/services/miscaudibles',
    iconImage: '/assets/images/services/service-card-07.webp',
    badge: 'SOUND & VOICE',
    shortDescription:
      'Sound that carries emotion. Misc Audible is our dedicated production house for podcasts, audiobooks, sound design, and sonic branding crafted by expert sound engineers.',
    fullDescriptionHtml: `
      <div class="service-rich-body">
        <h3>Sound That Carries Emotion</h3>
        <p>Audio has the power to connect instantly with listeners. Misc Audible offers end-to-end audio production from recording to post-production and distribution.</p>
        
        <h4>Audio Capabilities</h4>
        <ul>
          <li><strong>Podcast Production:</strong> Multi-track recording, editing, mixing, sound design, and show hosting.</li>
          <li><strong>Audiobook Narration:</strong> Professional voice talent casting, ACX-standard mastering, and proofing.</li>
          <li><strong>Sonic Branding:</strong> Custom audio logos, jingles, and brand soundscapes.</li>
        </ul>
      </div>
    `,
    features: [
      'Full-Cycle Podcast Production & Editing',
      'Audiobook Narration & ACX Mastering',
      'Sonic Branding & Audio Identity Logos',
      'Commercial Voiceover Recording & Casting',
      'Sound Design, Foley & Mixing for Film/Ads',
      'Multi-Language Translation & Dubbing',
    ],
    order: 6,
    isActive: true,
  },
  {
    title: 'RPA / AI Solutions',
    slug: 'rpa-ai',
    route: '/services/rpa-ai',
    iconImage: '/assets/images/services/service-card-08.webp',
    badge: 'AUTOMATION & INTELLIGENCE',
    shortDescription:
      'Automate repetitive tasks and harness intelligent machine learning. Our RPA and AI solutions streamline business processes, eliminate human error, and accelerate productivity.',
    fullDescriptionHtml: `
      <div class="service-rich-body">
        <h3>Intelligent Automation for the Modern Enterprise</h3>
        <p>Robotic Process Automation (RPA) combined with modern Artificial Intelligence (AI) allows your team to focus on high-value creative and strategic tasks while software bots handle the mundane.</p>
        
        <h4>Transformation Areas</h4>
        <ul>
          <li><strong>Workflow Automation:</strong> Automating data entry, invoice processing, and CRM sync.</li>
          <li><strong>Conversational AI:</strong> Custom enterprise chatbots and customer support assistants.</li>
          <li><strong>Predictive Analytics:</strong> Forecasting trends and customer behavior using ML models.</li>
        </ul>
      </div>
    `,
    features: [
      'Repetitive Task & Workflow Automation',
      'Custom AI Chatbots & Customer Service Agents',
      'Document Parsing & OCR Data Extraction',
      'Predictive Business Intelligence & ML Models',
      'System Integration Across ERP & CRM',
      'Employee Training & Change Management',
    ],
    order: 7,
    isActive: true,
  },
  {
    title: 'Mobile App Development',
    slug: 'mobile-app-development',
    route: '/services/mobile-app-development',
    iconImage: '/assets/images/services/service-card-03.webp',
    badge: 'NATIVE & CROSS-PLATFORM',
    shortDescription:
      'Turn your app vision into an intuitive digital experience. We engineer high-performance native and cross-platform mobile apps for iOS and Android with delightful user interactions.',
    fullDescriptionHtml: `
      <div class="service-rich-body">
        <h3>High-Performance Mobile Apps Built to Delight</h3>
        <p>From initial wireframing to App Store deployment and post-launch maintenance, we build scalable mobile apps using Flutter, React Native, and native iOS/Android toolchains.</p>
        
        <h4>Core Strengths</h4>
        <ul>
          <li><strong>Cross-Platform Efficiency:</strong> Single codebase apps with native performance and smooth 60fps animations.</li>
          <li><strong>Offline-First Resilience:</strong> Intelligent caching and local data persistence.</li>
          <li><strong>Secure Cloud Backends:</strong> Real-time syncing, push notifications, and payment gateways.</li>
        </ul>
      </div>
    `,
    features: [
      'iOS & Android Native Development',
      'Cross-Platform Flutter & React Native Apps',
      'User Journey Mapping & Mobile UI/UX Design',
      'Cloud Backend & Real-Time API Architecture',
      'Push Notifications, In-App Purchases & Analytics',
      'App Store Optimization (ASO) & Release Management',
    ],
    order: 8,
    isActive: true,
  },
  {
    title: 'Recruiting & Talent Acquisition',
    slug: 'recruiting',
    route: '/services/recruiting',
    iconImage: '/assets/images/services/service-card-09.webp',
    badge: 'HUMAN CAPITAL',
    shortDescription:
      'We connect ambitious companies with exceptional talent across digital marketing, software development, creative design, and executive leadership.',
    fullDescriptionHtml: `
      <div class="service-rich-body">
        <h3>Connecting Visionary Teams with Top-Tier Talent</h3>
        <p>Building a great organization starts with having the right people. Our recruitment division specializes in matching skilled professionals with companies where they can make a lasting impact.</p>
        
        <h4>Our Sourcing Process</h4>
        <ul>
          <li><strong>Technical & Cultural Vetting:</strong> Rigorous evaluation of technical expertise and cultural alignment.</li>
          <li><strong>Speed to Hire:</strong> Curated candidate shortlists delivered within days.</li>
          <li><strong>Flexible Staffing Models:</strong> Permanent hires, contract-to-hire, and dedicated team extensions.</li>
        </ul>
      </div>
    `,
    features: [
      'Specialized Tech & Digital Talent Sourcing',
      'Executive Search & Leadership Hiring',
      'Contract & Direct-Hire Placement',
      'Skill Assessments & Technical Screening',
      'Onboarding Support & Retention Advisory',
      'Competitive Salary Benchmarking Insights',
    ],
    order: 9,
    isActive: true,
  },
  {
    title: 'Event Management',
    slug: 'event-management',
    route: '/services/event-management',
    iconImage: '/assets/images/services/service-card-01.webp',
    badge: 'EXPERIENTIAL ACTIVATIONS',
    shortDescription:
      'End-to-end event planning, corporate conferences, product launches, and experiential marketing activations that leave lasting impressions on your audience.',
    fullDescriptionHtml: `
      <div class="service-rich-body">
        <h3>Unforgettable Corporate & Brand Experiences</h3>
        <p>From large-scale corporate summits and product launches to intimate industry roundtables, we handle venue coordination, audio-visual production, branding, and guest management.</p>
        
        <h4>Comprehensive Event Services</h4>
        <ul>
          <li><strong>Concept & Theme Development:</strong> Crafting the event narrative and visual aesthetic.</li>
          <li><strong>Production & Staging:</strong> High-end sound, lighting, LED backdrops, and live broadcast.</li>
          <li><strong>Post-Event Media:</strong> Photography, video highlights, and social media coverage.</li>
        </ul>
      </div>
    `,
    features: [
      'Corporate Conferences & Industry Summits',
      'Brand Launch & Product Activation Events',
      'Exhibition Booth Design & Fabrication',
      'Live Audio-Visual Production & Streaming',
      'VIP Guest Relations & Registration Tech',
      'Event PR, Media Coverage & Photo/Video Recap',
    ],
    order: 10,
    isActive: true,
  },
  {
    title: 'Search Engine Marketing (SEM)',
    slug: 'sem',
    route: '/services/digital-marketing/sem',
    iconImage: '/assets/images/services/service-card-02.webp',
    badge: 'PAID SEARCH & ADS',
    parentService: { title: 'Digital Marketing', route: '/services/digital-marketing' },
    shortDescription:
      'Boost visibility, drive qualified search traffic, and achieve measurable conversions with precision-powered Google Ads and paid search advertising.',
    fullDescriptionHtml: `
      <div class="service-rich-body">
        <h3>High-ROI Search Engine Marketing (SEM)</h3>
        <p>Dominate high-intent search engine results pages with strategic paid advertising. MiscArchive manages targeted Google Ads campaigns engineered to maximize return on ad spend (ROAS).</p>
        <h4>Key Focus Areas</h4>
        <ul>
          <li><strong>Google Search & Performance Max:</strong> Capturing high-intent prospective buyers actively looking for your services.</li>
          <li><strong>Keyword Bidding Optimization:</strong> Reducing cost-per-click (CPC) while scaling quality score and impression share.</li>
          <li><strong>Conversion Rate Optimization:</strong> Tailoring landing pages for maximum click-to-lead conversion.</li>
        </ul>
      </div>
    `,
    features: [
      'Targeted Google Search & Display Ads',
      'Performance Max & Shopping Campaigns',
      'Continuous Bid & Budget Optimization',
      'A/B Split Testing for Ad Copy & Landers',
      'Negative Keyword Filtering & Fraud Protection',
      'Clear Conversion & ROAS Attribution Reporting',
    ],
    order: 11,
    isActive: true,
  },
  {
    title: 'Social Media Marketing (SMM)',
    slug: 'smm',
    route: '/services/digital-marketing/smm',
    iconImage: '/assets/images/services/service-card-02.webp',
    badge: 'SOCIAL ENGAGEMENT',
    parentService: { title: 'Digital Marketing', route: '/services/digital-marketing' },
    shortDescription:
      'Unlock the power of social media to build loyal brand communities and engage your target audience across Instagram, Facebook, LinkedIn, and YouTube.',
    fullDescriptionHtml: `
      <div class="service-rich-body">
        <h3>Build Brand Equity and Active Communities</h3>
        <p>Social media is modern digital storefront where relationships are built and brand loyalty is earned. We create compelling content calendars, viral video hooks, and targeted social ad campaigns.</p>
        <h4>Strategic Approach</h4>
        <ul>
          <li><strong>Audience Segmentation:</strong> Tailoring tone and messaging per platform (LinkedIn for B2B, Instagram/Reels for B2C).</li>
          <li><strong>Community Management:</strong> Proactive engagement, comment moderation, and audience conversation nurturing.</li>
          <li><strong>Influencer & Creator Collaborations:</strong> Amplifying reach with authentic regional creators.</li>
        </ul>
      </div>
    `,
    features: [
      'Multi-Platform Content Calendar Strategy',
      'High-Engagement Reels, Shorts & Creative Posts',
      'Paid Social Ad Campaigns (Meta & LinkedIn Ads)',
      'Community Management & Follower Growth',
      'Influencer Outreach & Partnership Management',
      'Sentiment Analysis & Monthly Growth Dashboards',
    ],
    order: 12,
    isActive: true,
  },
  {
    title: 'E-mail Marketing',
    slug: 'email',
    route: '/services/digital-marketing/email',
    iconImage: '/assets/images/services/service-card-02.webp',
    badge: 'LIFETIME VALUE & RETENTION',
    parentService: { title: 'Digital Marketing', route: '/services/digital-marketing' },
    shortDescription:
      'Transform connections into conversions with automated email marketing. Reach your audience directly in their inbox with tailored nurture sequences and newsletters.',
    fullDescriptionHtml: `
      <div class="service-rich-body">
        <h3>Direct-to-Inbox Customer Retention & Nurturing</h3>
        <p>Email continues to deliver the highest ROI of any digital channel. We build intelligent automated email workflows that guide prospects from initial signup to repeat purchases.</p>
        <h4>Automations We Build</h4>
        <ul>
          <li><strong>Welcome & Onboarding Sequences:</strong> Introducing new subscribers to your brand story and core value.</li>
          <li><strong>Cart Abandonment & Re-engagement:</strong> Recovering lost revenue with timely reminder triggers.</li>
          <li><strong>Segmented Newsletters:</strong> Delivering valuable, relevant insights that keep your brand top-of-mind.</li>
        </ul>
      </div>
    `,
    features: [
      'Email List Segmentation & Health Hygiene',
      'Automated Drip Workflows & Triggered Sequences',
      'Mobile-Optimized Responsive HTML Templates',
      'Subject Line A/B Testing for Peak Open Rates',
      'Anti-Spam Compliance & High Deliverability Rates',
      'Revenue Per Subscriber Attribution Tracking',
    ],
    order: 13,
    isActive: true,
  },
];

/**
 * Normalizes a service object ensuring all expected fields exist
 */
export function normalizeService(raw, fallback = null) {
  if (!raw && !fallback) return null;
  const base = fallback || {};
  const s = raw || {};

  return {
    title: s.title || base.title || 'Service',
    slug: s.slug || base.slug || '',
    route: s.route || base.route || (s.slug ? `/services/${s.slug}` : '/services'),
    iconImage: resolveMediaUrl(
      (s.iconImage &&
      !s.iconImage.includes('devolepment') &&
      !s.iconImage.includes('dm.png') &&
      !s.iconImage.includes('seo.png')
        ? s.iconImage
        : null) ||
      s.coverImage ||
      s.image ||
      base.iconImage ||
      '/assets/images/services/service-card-01.webp'
    ),
    badge: s.badge || base.badge || 'SERVICES',
    taglineLines: Array.isArray(s.taglineLines) && s.taglineLines.length > 0
      ? s.taglineLines
      : (base.taglineLines || ['Strategy-Led.', 'People-Focused.', 'Results-Driven.']),
    shortDescription: s.shortDescription || s.description || base.shortDescription || '',
    fullDescriptionHtml: s.fullDescriptionHtml || s.descriptionHtml || base.fullDescriptionHtml || '',
    features: Array.isArray(s.features) && s.features.length > 0 ? s.features : (base.features || []),
    subServices: Array.isArray(s.subServices) && s.subServices.length > 0 ? s.subServices : (base.subServices || []),
    approach: s.approach || base.approach || {
      badge: 'OUR APPROACH',
      titleHighlight: 'Approach',
      subtitle: `We follow a structured and result-oriented approach to create strategies that work for your business, both locally and beyond.`,
      steps: [
        {
          step: '01',
          title: 'Audience Understanding',
          description: "We dive deep into understanding your audience's behavior and intent.",
        },
        {
          step: '02',
          title: 'Location Strategy',
          description: 'Strategies tailored for your local and regional market.',
        },
        {
          step: '03',
          title: 'Goal Alignment',
          description: 'Every campaign supports clear business objectives.',
        },
      ],
    },
    offerings: (Array.isArray(s.offerings) && s.offerings.length > 0)
      ? s.offerings
      : (base.offerings || (Array.isArray(s.features) ? s.features.map((f, i) => ({
          step: (i + 1).toString().padStart(2, '0'),
          title: typeof f === 'string' ? f : (f.title || `Capability ${i + 1}`),
          description: typeof f === 'object' && f.description ? f.description : 'High-impact solutions tailored for your business goals.',
          route: typeof f === 'object' && f.route ? f.route : null,
        })) : [])),
    ctaTarget: s.ctaTarget || base.ctaTarget || 'Digital Presence?',
    ctaSubtitle: s.ctaSubtitle || base.ctaSubtitle || "Let's discuss how we can help your business grow.",
    specializedPillars: s.specializedPillars || base.specializedPillars || {
      eyebrow: 'SPECIALIZED PILLARS',
      title: 'Explore Focused',
      titleHighlight: 'Specializations',
      subtitle: `From strategy to execution, our specialized ${s.title || 'digital'} services help businesses grow with precision, creativity, and measurable results.`,
      pillars: Array.isArray(s.subServices) && s.subServices.length > 0
        ? s.subServices.map((sub, idx) => ({
            step: (idx + 1).toString().padStart(2, '0'),
            title: sub.title,
            description: sub.shortDescription || 'Specialized capabilities tailored to your goals.',
            route: sub.route || `/services/${s.slug || 'service'}/${sub.slug || ''}`,
            linkText: 'Explore Service',
          }))
        : [
            {
              step: '01',
              title: 'Strategy & Consulting',
              description: 'Tailored strategic roadmap designed to accelerate business objectives and long-term positioning.',
              route: '/contact',
              linkText: 'Explore Service',
            },
            {
              step: '02',
              title: 'Core Implementation',
              description: 'End-to-end execution combining modern industry best practices, precision, and reliable delivery.',
              route: '/contact',
              linkText: 'Explore Service',
            },
            {
              step: '03',
              title: 'Quality & Optimization',
              description: 'Continuous refinement, performance audits, and high standards across all deliverables.',
              route: '/contact',
              linkText: 'Explore Service',
            },
            {
              step: '04',
              title: 'Scale & Performance',
              description: 'Sustainable growth frameworks built to handle scale and generate consistent business impact.',
              route: '/contact',
              linkText: 'Explore Service',
            },
          ],
    },
    whyPartner: s.whyPartner || base.whyPartner || {
      title: 'Why Partner With Us',
      points: [
        'Trivandrum-based core engineering and creative team.',
        'Transparent communication and sprint-based reporting.',
        'Dedicated account managers and post-launch support.',
      ],
    },
    uniqueRequirement: s.uniqueRequirement || base.uniqueRequirement || {
      badge: "LET'S TALK",
      title: 'Have a unique\nrequirement?',
      subtitle: 'Our consultants will review your goals and create a custom implementation blueprint.',
      btnText: 'Speak With an Expert',
      btnRoute: '/contact',
    },
    order: typeof s.order === 'number' ? s.order : (base.order || 0),
    isActive: s.isActive !== false,
  };
}

/**
 * Retrieve unified service data by slug (CMS + Seed fallback)
 */
export async function getUnifiedService(slug) {
  if (!slug) return null;
  const normalizedSlug = slug.toLowerCase().trim();
  const fallback = fallbackServicesCatalog.find(
    (s) => s.slug.toLowerCase() === normalizedSlug || s.route.toLowerCase().endsWith(normalizedSlug)
  );

  try {
    const cmsService = await getServiceBySlug(normalizedSlug);
    if (cmsService) {
      return normalizeService(cmsService, fallback);
    }
  } catch (err) {
    console.warn(`[servicesData] CMS fetch failed for ${normalizedSlug}:`, err.message);
  }

  return fallback ? normalizeService(null, fallback) : null;
}

/**
 * Retrieve all active unified services (CMS + Seed fallback)
 */
export async function getAllUnifiedServices() {
  let cmsServices = null;
  try {
    cmsServices = await getServices(true);
  } catch (err) {
    console.warn('[servicesData] CMS getServices failed:', err.message);
  }

  if (Array.isArray(cmsServices) && cmsServices.length > 0) {
    // Map CMS items and fill in any seed items not present
    const combined = cmsServices.map((cmsItem) => {
      const match = fallbackServicesCatalog.find(
        (f) => f.slug === cmsItem.slug || (f.title && f.title.toLowerCase() === cmsItem.title?.toLowerCase())
      );
      return normalizeService(cmsItem, match);
    });

    // Also include any fallback services missing from CMS
    fallbackServicesCatalog.forEach((fb) => {
      const exists = combined.some((c) => c.slug === fb.slug);
      if (!exists && fb.slug !== 'main-services') {
        combined.push(normalizeService(null, fb));
      }
    });

    return combined.sort((a, b) => a.order - b.order);
  }

  return fallbackServicesCatalog.map((fb) => normalizeService(null, fb));
}
