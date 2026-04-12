/** @type {import('next').NextConfig} */

/**
 * 与 lib/assetBase.js 中 getAssetBase() 规则保持一致。
 * NEXT_PUBLIC_BASE_PATH=
 *   未设置 → /Personal_Website（GitHub Pages 项目页）
 *   空字符串 → 站点在域名根目录（自定义域名常这样）
 *   /foo → 任意子路径
 */
function resolveBasePath() {
    const v = process.env.NEXT_PUBLIC_BASE_PATH;
    if (v === "") return "";
    if (v == null) return "/Personal_Website";
    const s = String(v).trim().replace(/\/$/, "");
    if (s === "") return "";
    return s.startsWith("/") ? s : `/${s}`;
}

const basePath = resolveBasePath();

const nextConfig = {
    basePath,
    // basePath for GitHub Pages deployment
    // Local: http://localhost:3000{basePath}/
    // 例: https://motifff.github.io/Personal_Website/ 或 https://你的域名/（basePath 为空）
    output: "export",
    reactStrictMode: true,
    images: {
        unoptimized: true,
    },
};

module.exports = nextConfig;
