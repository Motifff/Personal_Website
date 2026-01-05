/** @type {import('next').NextConfig} */
const nextConfig = {
    // basePath for GitHub Pages deployment
    // Local: http://localhost:3000/Personal_Website/
    // Production: https://motifff.github.io/Personal_Website/
    basePath: "/Personal_Website",
    output: "export",  // <=== enables static exports
    reactStrictMode: true,
    images: {
      unoptimized: true,  // Disable image optimization for GitHub Pages
    },
  };

module.exports = nextConfig;