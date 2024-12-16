/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // images: {
  //   domains: ["res.cloudinary.com"], // Добавьте сюда домен Cloudinary
  // }, // Отключение режима строгой проверки
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    //чтобы картинки не оптимизировались
    unoptimized: true,
  },
}

export default nextConfig
