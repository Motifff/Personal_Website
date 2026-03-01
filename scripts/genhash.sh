#!/bin/bash
# 快速生成密码哈希工具
# 使用方法: ./scripts/genhash.sh "你的密码"

if [ -z "$1" ]; then
  echo "❌ 错误: 请提供密码"
  echo ""
  echo "使用方法:"
  echo "  ./scripts/genhash.sh \"你的密码\""
  echo ""
  echo "示例:"
  echo "  ./scripts/genhash.sh \"hello123\""
  exit 1
fi

PASSWORD="$1"
HASH=$(echo -n "$PASSWORD" | shasum -a 256 | awk '{print $1}')

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔐 密码哈希生成成功"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "原始密码: $PASSWORD"
echo ""
echo "SHA256 哈希:"
echo "$HASH"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 使用说明"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. 将上面的哈希值复制到数据文件的 passwordHash 字段"
echo "2. 在 iOS 备忘录中保存密码和哈希（格式如下）:"
echo ""
echo "   标题: 🔐 Qwen Chat Mock"
echo "   密码: $PASSWORD"
echo "   哈希: $HASH"
echo ""
echo "3. 提交代码到 GitHub"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
