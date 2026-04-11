// 生成 slug 用于锚点跳转
function generateSlug(text) {
    return 'heading-' + text
        .toLowerCase()
        .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-') // 保留中文、英文、数字
        .replace(/^-+|-+$/g, '') // 去除首尾连字符
}

export default function HeadingBlock(props) {
    const { level = 3, text } = props
    const slug = generateSlug(text)

    // 根据标题级别设置样式
    const headingStyles = {
        1: {
            fontSize: "48px",
            fontWeight: "bold",
            lineHeight: "1.2",
            marginBottom: "24px",
            marginTop: "32px"
        },
        2: {
            fontSize: "36px",
            fontWeight: "600",
            lineHeight: "1.3",
            marginBottom: "20px",
            marginTop: "28px"
        },
        3: {
            fontSize: "28px",
            fontWeight: "600",
            lineHeight: "1.4",
            marginBottom: "16px",
            marginTop: "24px"
        },
        4: {
            fontSize: "22px",
            fontWeight: "500",
            lineHeight: "1.4",
            marginBottom: "12px",
            marginTop: "20px"
        },
        5: {
            fontSize: "18px",
            fontWeight: "500",
            lineHeight: "1.4",
            marginBottom: "10px",
            marginTop: "16px"
        }
    }

    const style = headingStyles[level] || headingStyles[3]

    return (
        <div id={slug} style={{
            color: "#FFF",
            width: "100%",
            scrollMarginTop: "88px", // 预留 header 高度 + 16px 间距
            ...style
        }}>
            {text}
        </div>
    )
}
