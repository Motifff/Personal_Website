/**
 * 与 next.config.js 的 basePath 一致（通过 NEXT_PUBLIC_BASE_PATH 在构建时注入）。
 *
 * - 未设置 env：默认 /Personal_Website（GitHub Pages 项目站 user.github.io/RepoName/）
 * - NEXT_PUBLIC_BASE_PATH= 空字符串：站点部署在域名根目录，无子路径
 * - NEXT_PUBLIC_BASE_PATH=/foo：自定义子路径
 */

export function getAssetBase() {
    const v = process.env.NEXT_PUBLIC_BASE_PATH;
    if (v === "") return "";
    if (v == null) return "/Personal_Website";
    const s = String(v).trim().replace(/\/$/, "");
    if (s === "") return "";
    return s.startsWith("/") ? s : `/${s}`;
}

const LEGACY_BAKED_PREFIX = "/Personal_Website";

/**
 * 请求 public 下的静态文件（含 axios/fetch）。
 * @param {string} path 以 / 开头的绝对路径，如 "/data.json"
 */
export function assetUrl(path) {
    const base = getAssetBase();
    let p = path.startsWith("/") ? path : `/${path}`;
    if (!base && p.startsWith(`${LEGACY_BAKED_PREFIX}/`)) {
        p = p.slice(LEGACY_BAKED_PREFIX.length);
    }
    if (!base) return p;
    if (p === base || p.startsWith(`${base}/`)) return p;
    return `${base}${p}`;
}

/**
 * 文章 JSON、图床里的图片 URL（可能含写死的 /Personal_Website/...）。
 */
export function resolveMediaUrl(src) {
    if (!src || typeof src !== "string") return "";
    if (src.startsWith("http://") || src.startsWith("https://")) return src;
    const base = getAssetBase();
    let p = src.startsWith("/") ? src : `/${src}`;
    if (!base && p.startsWith(`${LEGACY_BAKED_PREFIX}/`)) {
        p = p.slice(LEGACY_BAKED_PREFIX.length);
    }
    if (!base) return p;
    if (p === base || p.startsWith(`${base}/`)) return p;
    if (p.startsWith(`${LEGACY_BAKED_PREFIX}/`)) {
        return `${base}${p.slice(LEGACY_BAKED_PREFIX.length)}`;
    }
    return `${base}${p}`;
}
