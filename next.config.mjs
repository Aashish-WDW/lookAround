/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/proxy',
        destination: '/api/proxy'
      }
    ]
  }
};

export default nextConfig;
