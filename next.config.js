/** @type {import('next').NextConfig} */
const nextConfig = {
    //remember to unquote for github pages
    basePath: "/Personal_Website",
    output: "export",  // <=== enables static exports
    reactStrictMode: true,
    images: {
      unoptimized: false,
    },
  };
  
  module.exports = nextConfig;