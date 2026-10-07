import mongoose, { Document, Schema } from "mongoose";

export interface IWebsiteSettings extends Document {
  siteName: string;
  tagline: string;
  logos: {
    whiteNonSticky: string;
    blackNonSticky: string;
    whiteSticky: string;
    blackSticky: string;
    favicon: string;
  };
  contact: {
    addressPrimary: string;
    addressSecondary: string;
    phones: string[];
    regionalPhone: string;
    whatsappNumber: string;
    emails: string[];
    workingHours: string;
  };
  socialLinks: {
    twitter: string;
    facebook: string;
    instagram: string;
    linkedin: string;
  };
  externalLinks: {
    portfolio: string;
    audibles: string;
    partnerAgency: string;
  };
  tracking: {
    googleAnalyticsId: string;
    googleTagManagerId: string;
  };
  googleMapsEmbedUrl: string;
  copyrightText: string;
  termsContentHtml?: string;
  createdAt: Date;
  updatedAt: Date;
}

const WebsiteSettingsSchema = new Schema<IWebsiteSettings>(
  {
    siteName: { type: String, default: "MiscArchive" },
    tagline: {
      type: String,
      default: "IT Solution | Digital Marketing Agency | Audibles",
    },
    logos: {
      whiteNonSticky: { type: String, default: "/assets/images/logo2.png" },
      blackNonSticky: { type: String, default: "/assets/images/42.png" },
      whiteSticky: { type: String, default: "/assets/images/logo22.png" },
      blackSticky: { type: String, default: "/assets/images/4.png" },
      favicon: { type: String, default: "/favicon.ico" },
    },
    contact: {
      addressPrimary: {
        type: String,
        default:
          "Rohini, MRA E34, Mele kuzhivila lane, Maruthankuzhy Brg, Kanjirampara, Thiruvananthapuram, Kerala 695030",
      },
      addressSecondary: {
        type: String,
        default:
          "Gautham villa T.c 7/82, Kanjirampara P.O, Kanjirampara Thiruvananthapuram, Kerala 695030",
      },
      phones: {
        type: [String],
        default: ["+91 8907634900", "+91 8848608726"],
      },
      regionalPhone: { type: String, default: "+91 99958 62504" },
      whatsappNumber: { type: String, default: "918848608726" },
      emails: {
        type: [String],
        default: ["contact@miscarchive.com", "contactmiscarchive@gmail.com"],
      },
      workingHours: { type: String, default: "Mon-Sat 9.30am - 6.30pm" },
    },
    socialLinks: {
      twitter: { type: String, default: "https://twitter.com/misc_archive" },
      facebook: {
        type: String,
        default: "https://www.facebook.com/miscarchives",
      },
      instagram: {
        type: String,
        default:
          "https://www.instagram.com/misc_archive_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      },
      linkedin: {
        type: String,
        default: "https://www.linkedin.com/company/89500431/admin/feed/posts/",
      },
    },
    externalLinks: {
      portfolio: {
        type: String,
        default: "https://miscarchiveportfolio.com/",
      },
      audibles: {
        type: String,
        default: "https://audible.miscarchive.com/",
      },
      partnerAgency: { type: String, default: "https://flumenx.com/" },
    },
    tracking: {
      googleAnalyticsId: { type: String, default: "G-NKFNZX5W56" },
      googleTagManagerId: { type: String, default: "GTM-KCWBVHW" },
    },
    googleMapsEmbedUrl: {
      type: String,
      default:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.817829742477!2d76.9749134744944!3d8.517061096793476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bb3682df7b0b%3A0x883771e7a4c3fd4f!2sMisc%20Archive!5e0!3m2!1sen!2sin!4v1751711918093!5m2!1sen!2sin",
    },
    copyrightText: {
      type: String,
      default:
        "Copyright © 2023, MiscArchive | IT Solution | Digital Marketing Agency | Audibles",
    },
    termsContentHtml: { type: String, default: "" },
  },
  { timestamps: true }
);

export const WebsiteSettings = mongoose.model<IWebsiteSettings>(
  "WebsiteSettings",
  WebsiteSettingsSchema
);
