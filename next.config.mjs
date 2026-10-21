/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/normato',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
