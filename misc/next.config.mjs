/** @type {import('next').NextConfig} */
const cmsApiUrl = process.env.NEXT_PUBLIC_CMS_API_URL || 'http://localhost:5000/api';
const cmsOrigin = cmsApiUrl.replace(/\/api\/?$/, '');

const nextConfig = {
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

