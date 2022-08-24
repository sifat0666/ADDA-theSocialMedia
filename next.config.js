/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'www.facebook.com',
      'scontent.fdac41-1.fna.fbcdn.net',
      'cdn.sanity.io',
      'lh3.googleusercontent.com'
    ]
  }
}

module.exports = nextConfig
