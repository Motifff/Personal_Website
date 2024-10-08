export default function ArticleTitle(props) {
    return (
        <div className="Wrap" style={{ display: "flex", flexDirection: 'column', justifyContent: 'flex-start', alignSelf: "strench", gap: 16 }}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "flex-start"
            }}>
                <div className="Title" style={{ color: '#D4D5D9', fontSize: 48, fontWeight: '500', lineHeight: "130%", wordWrap: 'break-word', borderTop: "1px solid #636467" }}>{props.title}</div>
                <div className="SubTitle" style={{ width: "256px", color: '#5D5D5D', fontSize: 12, fontWeight: '500', lineHeight: "130%", wordWrap: 'break-word' }}>{props.subtitle}</div>
            </div>
            <div className="Datas" style={{ display: "flex", flexWrap: "wrap", "justifyContent": "space-between", "alignItems": "flex-end", "alignSelf": "stretch" }}>
                <div style={{ "display": "flex", "flexDirection": "column", "justifyContent": "flex-end", "alignItems": "flex-start", "gap": "4px" }}>
                    <div style={{ "color": "#D4D5D9", "fontSize": 16, "fontStyle": "normal", "fontWeight": "500", "lineHeight": "130%", "letterSpacing": "-0.16px" }}>{props.type}</div>
                    <div style={{ "color": "#5D5D5D", "fontSize": 10, "fontStyle": "normal", "fontWeight": "500", "lineHeight": "130%", "letterSpacing": "-0.1px" }}>COTEGORIES</div>
                </div>
                <div style={{"display": "flex", "flexDirection": "row", "justifyContent": "flex-end", "alignItems": "flex-end", "gap": "24px"}}>
                    <div style={{ "display": "flex", "flexDirection": "column", "justifyContent": "flex-end", "alignItems": "flex-end", "gap": "4px" }}>
                        <div style={{ "color": "#D4D5D9", "fontSize": 16, "fontStyle": "normal", "fontWeight": "500", "lineHeight": "130%", "letterSpacing": "-0.16px" }}>{props.locations}</div>
                        <div style={{ "color": "#5D5D5D", "fontSize": 10, "fontStyle": "normal", "fontWeight": "500", "lineHeight": "130%", "letterSpacing": "-0.1px" }}>LOCATIONS</div>
                    </div>
                    <div style={{ "display": "flex", "flexDirection": "column", "justifyContent": "flex-end", "alignItems": "flex-end", "gap": "4px" }}>
                        <div style={{ "color": "#D4D5D9", "fontSize": 16, "fontStyle": "normal", "fontWeight": "500", "lineHeight": "130%", "letterSpacing": "-0.16px" }}>{props.date}</div>
                        <div style={{ "color": "#5D5D5D", "fontSize": 10, "fontStyle": "normal", "fontWeight": "500", "lineHeight": "130%", "letterSpacing": "-0.1px" }}>DATE</div>
                    </div>
                </div>
            </div>
        </div>
    )
}