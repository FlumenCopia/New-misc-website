import React from 'react';
import styles from './CommonBlogTemplate.module.css';

const SocialMediaBuildsTrustBeforeSales = () => {
  return (
    <>
      <p>
        Have you noticed how quickly you decide whether you like a brand online? Sometimes it takes just a few seconds. A glance at their posts, a few comments, or the way they respond to people. A feeling of good or bad forms almost instantly.
      </p>

      <p>
        And here&apos;s the thing: you don&apos;t consciously analyse it. You just feel whether you trust them.
      </p>

      <p>
        That&apos;s exactly how people experience your brand on social media too. Long before they think about buying, they&apos;re quietly deciding whether you feel real, consistent, and worth paying attention to. This blog is about that moment, because if trust isn&apos;t built there, sales rarely follow.
      </p>

      {/* Section 01: Why Trust Matters More Than Reach (Text on Left, Image on Right) */}
      <section className={styles.splitSection} id="why-trust-matters">
        <div className={styles.splitTextCol}>
          <div className={styles.sectionHeadingWrapper}>
            <div className={styles.sectionTitleBox}>
              <h2 className={styles.sectionTitle}>Why Trust Matters More Than Reach</h2>
              <span className={styles.sectionBar}></span>
            </div>
          </div>
          <p>
            It&apos;s tempting to chase numbers. More followers. More views. More impressions. But visibility without trust is like being loudly introduced to a room full of strangers. People notice you, but they don&apos;t move closer.
          </p>
          <p>
            Trust creates comfort. It turns followers into an audience that listens, engages, and eventually takes action. On social media, trust is the bridge between attention and opportunity.
          </p>
        </div>
        <div className={styles.sectionImageWrapper}>
          <img
            src="/assets/images/blogs/blog_phone_desk.jpg"
            alt="Smartphone on office desk showing social media apps"
            className={styles.sectionImage}
            loading="lazy"
          />
        </div>
      </section>

      {/* Section 02: What Happens When Trust Is Missing (Image on Left, Text on Right) */}
      <section className={styles.splitSectionReverse} id="what-happens-when-trust-is-missing">
        <div className={styles.sectionImageWrapper}>
          <img
            src="/assets/images/blogs/blog_trust_notes.jpg"
            alt="Brand strategy board with consistency, authenticity, engagement, and trust"
            className={styles.sectionImage}
            loading="lazy"
          />
        </div>
        <div className={styles.splitTextCol}>
          <div className={styles.sectionHeadingWrapper}>
            <div className={styles.sectionTitleBox}>
              <h2 className={styles.sectionTitle}>What Happens When Trust Is Missing</h2>
              <span className={styles.sectionBar}></span>
            </div>
          </div>
          <p>
            When trust isn&apos;t part of your social strategy, things start to feel frustrating. Posts go out regularly, but engagement stays low. Ads run, but leads don&apos;t convert. Followers increase, but conversations don&apos;t.
          </p>
          <p>
            It can feel like shouting into the void, because in a way, you are. People see you, but they don&apos;t feel connected enough to respond.
          </p>
        </div>
      </section>

      {/* Section 03: How Social Media Builds Trust */}
      <section id="how-social-media-builds-trust" style={{ margin: '40px 0' }}>
        <div className={styles.sectionHeadingWrapper}>
          <div className={styles.sectionTitleBox}>
            <h2 className={styles.sectionTitle}>How Social Media Builds Trust</h2>
            <span className={styles.sectionBar}></span>
          </div>
        </div>
        <p><strong>1. Showing Up Like You Mean It</strong></p>
        <p>Consistency signals reliability. When your brand appears regularly, not perfectly, just honestly, it becomes familiar. Familiarity breeds comfort, and comfort leads to trust.</p>

        <p><strong>2. Talking Like a Human</strong></p>
        <p>People trust voices that feel real. Not scripted captions. Not corporate language. Write the way you&apos;d explain your work to someone sitting across from you.</p>

        <p><strong>3. Offering Value Without Expectation</strong></p>
        <p>Helpful insights, simple explanations, and relatable observations show confidence. When you stop pushing and start helping, people lean in naturally.</p>

        <p><strong>4. Letting Your Audience Speak</strong></p>
        <p>Comments, replies, and shared posts do more for credibility than polished graphics ever could. When others engage openly, trust forms without you having to say a word.</p>

        <p><strong>5. Being Present in Conversations</strong></p>
        <p>Responding to comments and DMs tells people they&apos;re not just numbers. Trust is built one reply at a time.</p>
      </section>

      {/* Section 04: Real Ways to Build Trust on Social Media */}
      <section id="real-ways-to-build-trust" style={{ margin: '40px 0' }}>
        <div className={styles.sectionHeadingWrapper}>
          <div className={styles.sectionTitleBox}>
            <h2 className={styles.sectionTitle}>Real Ways to Build Trust on Social Media</h2>
            <span className={styles.sectionBar}></span>
          </div>
        </div>
        <p>You don&apos;t need trends or viral formats. You need intention.</p>
        <p>Ask yourself:</p>
        <ul>
          <li>Does this content sound like us?</li>
          <li>Are we sharing because it&apos;s useful, or because we want something?</li>
          <li>Would I trust this brand if I found it today?</li>
        </ul>
      </section>

      {/* Section 05: The Long-Term Impact on Sales */}
      <section id="long-term-impact-on-sales" style={{ margin: '40px 0' }}>
        <div className={styles.sectionHeadingWrapper}>
          <div className={styles.sectionTitleBox}>
            <h2 className={styles.sectionTitle}>The Long-Term Impact on Sales</h2>
            <span className={styles.sectionBar}></span>
          </div>
        </div>
        <p>
          The <strong>best digital marketing agency in Trivandrum</strong> understands that social media isn&apos;t about pushing people forward; it&apos;s about walking with them. A thoughtful <strong>digital marketing agency in Thiruvananthapuram</strong> knows that trust compounds quietly, but powerfully.
        </p>
        <p>
          At Misc Archive, we treat social media like a long conversation, not a loud announcement. Every post, every reply, every pause has a purpose, like conducting an orchestra where timing matters just as much as sound.
        </p>
      </section>

      {/* Section 06: Final Thoughts */}
      <section id="final-thoughts" style={{ margin: '40px 0' }}>
        <div className={styles.sectionHeadingWrapper}>
          <div className={styles.sectionTitleBox}>
            <h2 className={styles.sectionTitle}>Final Thoughts</h2>
            <span className={styles.sectionBar}></span>
          </div>
        </div>
        <blockquote>
          &ldquo;Trust doesn&apos;t shout. It stays.&rdquo;
        </blockquote>
        <p>
          <strong>Let Misc Archive help you turn your ideas into stories that connect and convert.</strong>
        </p>
      </section>
    </>
  );
};

export default SocialMediaBuildsTrustBeforeSales;