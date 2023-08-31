/** @type {import('next').NextConfig} */
const nextConfig = {}

// module.exports = {
//     images: {
//       remotePatterns: [
//         {
//           protocol: 'https',
//           hostname: 'images.unsplash.com',
//         //   port: '',
//         //   pathname: '/account123/**',
//         },
//       ],
//     },
//   }
  module.exports = {
    images: {
      domains: ["images.unsplash.com", "images.unsplash.com", "firebasestorage.googleapis.com"],
    },
  };