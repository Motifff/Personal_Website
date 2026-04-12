#!/usr/bin/env node
/**
 * iframe 链接加密工具
 * 使用方法: node scripts/encrypt-link.js "链接" "密码"
 *
 * 使用 AES-256-CBC + PBKDF2 派生密钥
 * 与前端 Web Crypto API 解密算法一致
 */

const crypto = require('crypto');

if (process.argv.length < 4) {
  console.log('❌ 错误: 请提供链接和密码');
  console.log('');
  console.log('使用方法:');
  console.log('  node scripts/encrypt-link.js "链接" "密码"');
  console.log('');
  console.log('示例:');
  console.log('  node scripts/encrypt-link.js "https://youtube.com/embed/xxx" "mypassword"');
  process.exit(1);
}

const link = process.argv[2];
const password = process.argv[3];

// 使用 PBKDF2 派生密钥（与前端一致）
// salt: 固定值，确保前后端一致
const salt = Buffer.from('PersonalWebsiteIFrameSalt2024', 'utf-8');
const key = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');

// 生成随机 IV
const iv = crypto.randomBytes(16);

// AES-256-CBC 加密
const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
let encrypted = cipher.update(link, 'utf-8', 'hex');
encrypted += cipher.final('hex');

// 组合 IV + encrypted（前端需要 IV 来解密）
const combined = Buffer.concat([iv, Buffer.from(encrypted, 'hex')]);
const encryptedBase64 = combined.toString('base64');

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🔒 iframe 链接加密成功');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('');
console.log('原始链接:', link);
console.log('密码:', password);
console.log('');
console.log('加密结果 (Base64):');
console.log(encryptedBase64);
console.log('');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📋 使用说明');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('');
console.log('在 data.json 中添加 iframe 模块:');
console.log('');
console.log(JSON.stringify({
  type: "iframe",
  encryptedLink: encryptedBase64,
  aspectRatio: "16/9",
  title: "视频标题"
}, null, 2));
console.log('');
console.log('⚠️ 注意: 加密链接需要与页面 passwordHash 使用相同密码');
console.log('');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');