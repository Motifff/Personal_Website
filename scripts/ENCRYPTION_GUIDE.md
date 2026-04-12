# 加密内容使用指南

本文档说明如何在项目中使用加密 iframe 链接和加密文字内容。

---

## 加密原理

| 类型 | 算法 | 特点 |
|------|------|------|
| **密码验证** | SHA256 哈希 | 单向，无法还原，用于验证密码正确性 |
| **内容加密** | AES-256-CBC + PBKDF2 | 可逆，密码解密后还原原始内容 |

**工作流程：**
```
用户输入密码 → SHA256验证(与passwordHash比对) → 正确 → AES解密内容 → 渲染
```

---

## 加密脚本使用

### 加密 iframe 链接

```bash
node scripts/encrypt-link.js '链接' '密码'
```

**示例：**
```bash
node scripts/encrypt-link.js 'https://www.youtube.com/embed/xxx' 'mypassword'
```

**输出：**
```
加密结果 (Base64):
7KulCg9+e/iiWNXbKalsPjerbvWfu8bv8AQ/tUfdF4UK/BGzOtV0eNvYaTM3RvZ78gDKhcKD6LoR1+U6apAn4A==
```

### 加密文字内容

使用同一脚本（支持任意字符串）：

```bash
node scripts/encrypt-link.js '要加密的文字内容' '密码'
```

---

## 注意事项

1. **使用单引号**包裹 URL 和密码（避免 shell 特殊字符解析）
2. **密码必须与 passwordHash 一致**（否则解密失败）
3. 加密后的 Base64 字符串包含 IV，每次加密结果不同（但都能正确解密）

---

## JSON 数据结构

### iframe 加密链接

```json
{
    "type": "iframe",
    "encryptedLink": "加密后的Base64字符串",
    "aspectRatio": "16/9",
    "title": "视频标题（可选）"
}
```

### iframe 明文链接（公开内容）

```json
{
    "type": "iframe",
    "link": "https://www.youtube.com/embed/xxx",
    "aspectRatio": "16/9",
    "title": "视频标题"
}
```

### 加密文字段落

```json
{
    "type": "paragraph",
    "encryptedContent": "加密后的Base64字符串",
    "credits": ""
}
```

### 明文文字段落

```json
{
    "type": "paragraph",
    "content": "普通文字内容，支持 Markdown",
    "credits": ""
}
```

---

## 页面加密配置

页面需要设置 `passwordHash` 才能启用密码保护：

```json
{
    "title": "项目名称",
    "passwordHash": "SHA256哈希值",
    "mainContent": [...]
}
```

### 生成 passwordHash

```bash
# 使用现有脚本
./scripts/genhash.sh "密码"

# 或手动
echo -n "密码" | shasum -a 256
```

---

## 完整示例

**项目 data.json：**
```json
{
    "title": "ATH",
    "subtitle": "Project description",
    "type": "Project",
    "location": "Location",
    "date": "2024",
    "passwordHash": "82bd8dcf86629a2ebd5e7bd806381ebc9bbcf2e3be064c384f30dc5642d76364",
    "mainContent": [
        {
            "type": "iframe",
            "encryptedLink": "7KulCg9+e/iiWNXbKalsPjerbvWfu8bv8AQ/tUfdF4UK/BGzOtV0eNvYaTM3RvZ78gDKhcKD6LoR1+U6apAn4A==",
            "aspectRatio": "16/9",
            "title": "ATH Video"
        },
        {
            "type": "paragraph",
            "encryptedContent": "加密的文字内容Base64..."
        }
    ]
}
```

---

## 密码管理建议

由于代码公开，建议：

1. **不同项目使用不同密码**（避免一个密码泄露影响所有项目）
2. **在 iOS 备忘录中保存密码映射**：
   ```
   🔐 ATH
   密码: xxx
   哈希: 82bd8dcf...
   ```
3. **定期更换密码**（重新加密内容 + 更新 passwordHash）

---

## 技术细节

### 加密参数

| 参数 | 值 | 说明 |
|------|-----|------|
| 算法 | AES-256-CBC | 标准对称加密 |
| 密钥派生 | PBKDF2 | 100,000 次迭代，SHA-256 |
| Salt | 固定值 | 前后端一致 |
| IV | 随机生成 | 包含在输出中，每次不同 |

### 前端解密

```javascript
import { decryptContent } from '@/utils/crypto'

// 解密
const decrypted = await decryptContent(encryptedBase64, password)
```

### 性能

- PBKDF2 派生密钥：~100ms（异步，不阻塞 UI）
- AES 解密：< 1ms

---

## 相关文件

| 文件 | 作用 |
|------|------|
| `scripts/encrypt-link.js` | 加密脚本（链接 + 文字） |
| `scripts/genhash.sh` | SHA256 哈希生成 |
| `utils/crypto.js` | 前端解密函数 |
| `components/.../iframeBlock.js` | iframe 渲染组件 |
| `components/.../paraBlock.js` | 文字段落组件（支持解密） |
| `components/.../passwordProtect.js` | 密码验证 + PasswordContext |