/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "api.qrserver.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  typescript: { ignoreBuildErrors: true },
  // eslint: { ignoreDuringBuilds: true }, ❌ remove this line in Next 16
};

module.exports = nextConfig;
