export default function HomeProjectMeta(props) {
    const { labels, category, location, date, ifFold } = props;

    const itemBaseStyle = {
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        justifyContent: "flex-end",
    };

    const valueStyle = {
        color: "#D4D5D9",
        fontSize: "16px",
        fontWeight: "500",
        lineHeight: "130%",
        letterSpacing: "-0.16px",
        whiteSpace: "nowrap",
    };

    const labelStyle = {
        color: "#5D5D5D",
        fontSize: "10px",
        fontWeight: "500",
        lineHeight: "130%",
        letterSpacing: "-0.1px",
        whiteSpace: "nowrap",
    };

    return (
        <div
            style={{
                display: "flex",
                flexWrap: ifFold ? "wrap" : "nowrap",
                justifyContent: ifFold ? "space-between" : "flex-end",
                alignItems: "flex-end",
                gap: ifFold ? "16px" : "32px",
                width: "100%",
            }}
        >
            <div style={{ ...itemBaseStyle, alignItems: "flex-start" }}>
                <div style={valueStyle}>{category || "-"}</div>
                <div style={labelStyle}>{labels.categories}</div>
            </div>
            <div style={{ ...itemBaseStyle, alignItems: "flex-end" }}>
                <div style={valueStyle}>{location || "-"}</div>
                <div style={labelStyle}>{labels.locations}</div>
            </div>
            <div style={{ ...itemBaseStyle, alignItems: "flex-end" }}>
                <div style={valueStyle}>{date || "-"}</div>
                <div style={labelStyle}>{labels.date}</div>
            </div>
        </div>
    );
}
