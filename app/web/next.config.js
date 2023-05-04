/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/warehouses/:idCompany',
        destination: '/warehouses',
      }
    ]
  }
}

module.exports = nextConfig
