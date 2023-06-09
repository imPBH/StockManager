/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/warehouses/:idCompany',
        destination: '/warehouses',
      },
      {
        source: '/references/:idCompany',
        destination: '/references',
      },
      {
        source: '/articles/:idWarehouse',
        destination: '/articles',
      }
    ]
  }
}

module.exports = nextConfig
