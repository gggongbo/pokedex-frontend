/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/pokemons", //초기 라우팅 페이지
        permanent: true,
      },
    ];
  },
  devIndicators: {
    buildActivity: false,
  },
  images: {
    domains: ["raw.githubusercontent.com"],
  },
};

module.exports = nextConfig;
