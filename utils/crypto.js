'use client'

/**
 * AES-256-CBC 加密/解密工具
 * 与 scripts/encrypt-link.js / encrypt-text.js 加密算法一致
 */

// 固定 salt，与加密脚本一致
const SALT = new TextEncoder().encode('PersonalWebsiteIFrameSalt2024');

/**
 * 从密码派生 AES 密钥
 */
async function deriveKey(password) {
  const passwordBuffer = new TextEncoder().encode(password);

  // 导入密码作为原始密钥
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    passwordBuffer,
    'PBKDF2',
    false,
    ['deriveKey']
  );

  // 使用 PBKDF2 派生 AES 密钥
  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: SALT,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-CBC', length: 256 },
    false,
    ['decrypt']
  );

  return key;
}

/**
 * 解密 AES-256-CBC 加密的内容
 * @param {string} encryptedBase64 - 加密的 Base64 字符串（包含 IV）
 * @param {string} password - 密码
 * @returns {Promise<string|null>} - 解密后的原始内容
 */
export async function decryptContent(encryptedBase64, password) {
  try {
    // Base64 解码
    const combined = Uint8Array.from(atob(encryptedBase64), c => c.charCodeAt(0));

    // 分离 IV（前 16 字节）和加密数据
    const iv = combined.slice(0, 16);
    const encrypted = combined.slice(16);

    // 派生密钥
    const key = await deriveKey(password);

    // AES-CBC 解密
    const decryptedBuffer = await crypto.subtle.decrypt(
      { name: 'AES-CBC', iv },
      key,
      encrypted
    );

    // 转换为字符串
    const decrypted = new TextDecoder().decode(decryptedBuffer);
    return decrypted;
  } catch (error) {
    console.error('解密失败:', error);
    return null;
  }
}

// 兼容旧命名
export const decryptLink = decryptContent;