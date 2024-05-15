/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: "build",
    images: {
        domains: ["localhost", "images.emirhangumus.com", "emirhangumus.com"],
    },
};

module.exports = nextConfig;
