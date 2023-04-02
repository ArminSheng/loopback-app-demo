/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/server",
        destination: `http://localhost:3000/`,
      },
    ];
  },
};

module.exports = nextConfig;
