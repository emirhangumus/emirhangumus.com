/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: "build",
    images: {
        domains: ["localhost", "images.emirhangumus.com", "emirhangumus.com"],
        //formats: ["image/webp", "image/png", "image/jpeg", "image/gif"],
    },
    output: "standalone",
    devIndicators: {
        buildActivity: false,
    },
};

module.exports = nextConfig;
