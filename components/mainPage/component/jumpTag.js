export default function JumpTag(props) {
    const isPrimary = props.isPrimary !== false // 默认为一级标题

    return (
        <div className="Wrap"
            style={{
                display: "flex",
                padding: isPrimary ? "4px 0" : "4px 0 4px 8px", // 二级标题左缩进 8px
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "2px",
                alignSelf: "stretch",
                cursor: "pointer",
            }}
            onClick={props.onClick}>
            <div className="Text"
                style={{
                    color: "#FFF",
                    fontSize: isPrimary ? "14px" : "12px", // 一级14px，二级12px
                    fontStyle: "normal",
                    fontWeight: isPrimary ? "500" : "400", // 一级标题稍粗
                    lineHeight: "130%",
                    letterSpacing: "-0.1px",
                }}
            >
                {props.text}
            </div>
            <div className="dot-container"
                style={{
                    height: "2px",
                    alignSelf: "stretch",
                    borderBottom: isPrimary ? "2px white dotted" : "1px rgba(255,255,255,0.5) dotted",
                }}
            />
        </div>
    )
}