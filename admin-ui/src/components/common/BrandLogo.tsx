import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
  theme?: 'on-dark' | 'on-light';
}

const WEBSITE_URL = import.meta.env.VITE_WEBSITE_URL || 'http://localhost:3000';

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showBadge = false,
  theme = 'on-dark',
}) => {
  const sizeMap = {
    sm: 'h-7',      // 28px - clear & legible for mobile
    md: 'h-9',      // 36px - balanced & bold for sidebar header
    lg: 'h-11',     // 44px - prominent for login and large banners
    xl: 'h-14',     // 56px - extra large hero branding
  };

  // High-res, tightly cropped brand logo assets (no empty padding)
  const localFile = theme === 'on-light' ? '/brand/misc-logo-black@2x.png' : '/brand/misc-logo-white@2x.png';
  const websiteFile = theme === 'on-light' ? `${WEBSITE_URL}/assets/images/misc-logo-black@2x.png` : `${WEBSITE_URL}/assets/images/misc-logo-white@2x.png`;
  const legacyFallback = theme === 'on-light' ? `${WEBSITE_URL}/assets/images/4.png` : `${WEBSITE_URL}/assets/images/logo22.png`;

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <img
        src={localFile}
        alt="MiscArchive Logo"
        className={`${sizeMap[size]} w-auto object-contain transition-transform`}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          if (target.src.indexOf('/brand/') !== -1) {
            target.src = websiteFile;
          } else if (target.src !== legacyFallback) {
            target.src = legacyFallback;
          }
        }}
      />
      {showBadge && (
        <span
          className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-md bg-[#1abc9c] text-white shadow-xs"
        >
          CMS
        </span>
      )}
    </div>
  );
};
