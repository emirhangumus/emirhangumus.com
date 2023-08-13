/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    distDir: "build",
    images: {
        domains: ["localhost", "res.cloudinary.com"],
        //formats: ["image/webp", "image/png", "image/jpeg", "image/gif"],
    },
    output: "standalone",
    devIndicators: {
        buildActivity: false,
    },
};

module.exports = nextConfig;
