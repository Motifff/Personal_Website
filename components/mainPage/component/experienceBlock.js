
export default function ExpBlock(props) {
    return (
        <div className="Datas" style={{ display: "flex", flexWrap: "wrap", "justifyContent": "space-between", "alignItems": "flex-end", "alignSelf": "stretch", gap: 16 }}>
            <div style={{ "display": "flex", "flexDirection": "column", justifyContent: "flex-start", alignItems: "flex-start", "gap": "4px" }}>
                <div style={{ flexWrap:"wrap","color": "#D4D5D9", "fontSize": 16, "fontStyle": "normal", "fontWeight": "500", "lineHeight": "130%", "letterSpacing": "-0.16px" }}>{props.roleText}</div>
                <div style={{ "color": "#5D5D5D", "fontSize": 10, "fontStyle": "normal", "fontWeight": "500", "lineHeight": "130%", "letterSpacing": "-0.1px" }}>ROLE</div>
            </div>
            <div style={{ width: props.fold ? "100%" : null, justifyContent: props.fold ? "space-between" : "flex-end", "display": "flex", "flexDirection": "row", "alignItems": "flex-end", "gap": "8vw" }}>
                <div style={{ "display": "flex", "flexDirection": "column", alignItems: props.fold ? "flex-start" : "flex-end", "gap": "4px" }}>
                    <div style={{ "color": "#D4D5D9", "fontSize": 16, "fontStyle": "normal", "fontWeight": "500", "lineHeight": "130%", "letterSpacing": "-0.16px" }}>{props.locationText}</div>
                    <div style={{ width:"fit-content","color": "#5D5D5D", "fontSize": 10, "fontStyle": "normal", "fontWeight": "500", "lineHeight": "130%", "letterSpacing": "-0.1px" }}>BASE LOCATION</div>
                </div>
                <div style={{ width:"135px","display": "flex", "flexDirection": "column", "justifyContent": "flex-end", "alignItems": "flex-end", "gap": "4px" }}>
                    <div style={{ "color": "#D4D5D9", "fontSize": 16, "fontStyle": "normal", "fontWeight": "500", "lineHeight": "130%", "letterSpacing": "-0.16px" }}>{props.timeText}</div>
                    <div style={{ "color": "#5D5D5D", "fontSize": 10, "fontStyle": "normal", "fontWeight": "500", "lineHeight": "130%", "letterSpacing": "-0.1px" }}>TIME</div>
                </div>
            </div>
        </div>
    );
}