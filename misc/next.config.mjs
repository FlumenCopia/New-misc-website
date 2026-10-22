/** @type {import('next').NextConfig} */
const cmsApiUrl = process.env.NEXT_PUBLIC_CMS_API_URL || 'http://localhost:5000/api';
const cmsOrigin = cmsApiUrl.replace(/\/api\/?$/, '');

const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: '**' },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days cache
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: `${cmsOrigin}/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;

