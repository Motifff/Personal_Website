import Divider from "../../../component/divider"
import JumpTag from "../../../component/jumpTag"

// 生成 slug 用于锚点跳转
function generateSlug(text) {
    return 'heading-' + text
        .toLowerCase()
        .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

export default function OutlineColumn(props) {
    const articleData = props.articleData

    if (!articleData || !articleData.mainContent) {
        return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                width: "256px",
                padding: "16px",
                gap: "16px",
                position: "sticky",
                top: "72px",
                height: "fit-content",
                alignSelf: "flex-start",
            }}>
                <Divider text="Outline" />
            </div>
        )
    }

    // 提取所有 heading
    const headings = articleData.mainContent
        .filter(item => item.type === "heading")
        .map(item => ({
            level: item.level,
            text: item.text,
            slug: generateSlug(item.text)
        }))

    if (headings.length === 0) {
        return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                width: "256px",
                padding: "16px",
                gap: "16px",
                position: "sticky",
                top: "72px",
                height: "fit-content",
                alignSelf: "flex-start",
            }}>
                <Divider text="Outline" />
            </div>
        )
    }

    // 找到最小的 level
    const minLevel = Math.min(...headings.map(h => h.level))

    // 确定显示的两级：minLevel 和 minLevel+1
    const primaryLevel = minLevel
    const secondaryLevel = minLevel + 1

    // 筛选出这两级的标题
    const visibleHeadings = headings.filter(h =>
        h.level === primaryLevel || h.level === secondaryLevel
    )

    // 点击跳转
    const handleJump = (slug) => {
        const element = document.getElementById(slug)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            width: "256px",
            padding: "16px",
            gap: "8px",
            position: "sticky",
            top: "72px", // 吸顶位置，避开顶部导航栏
            height: "fit-content",
            alignSelf: "flex-start",
        }}>
            <Divider text="Outline" />
            <div style={{ height: "8px" }} /> {/* 额外间距 */}
            {visibleHeadings.map((heading, index) => (
                <JumpTag
                    key={index}
                    text={heading.text}
                    isPrimary={heading.level === primaryLevel}
                    onClick={() => handleJump(heading.slug)}
                />
            ))}
        </div>
    )
}