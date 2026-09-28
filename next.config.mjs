/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [75, 92],
  },
  turbopack: {
    root: import.meta.dirname,
  },
}

export default nextConfig
