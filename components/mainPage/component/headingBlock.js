export default function HeadingBlock(props) {
    const { level = 3, text } = props

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
        <div style={{
            color: "#FFF",
            width: "100%",
            ...style
        }}>
            {text}
        </div>
    )
}
