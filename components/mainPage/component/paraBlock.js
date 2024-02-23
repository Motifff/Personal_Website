export default function ParaBlock(props) {
    return (
        <div style={{ display: "flex", alignItems: "flex-start", gap: "32px", alignSelf: "strench" }}>
            <div style={{ "display": "flex", "padding": "16px", "flexDirection": "column", "alignItems": "flex-start", "gap": "10px", "alignSelf": "stretch" }}>
                <div style={{ "color": "#D9D9D9", "fontSize": "16px", "fontWeight": "400", "lineHeight": "130%", "letterSpacing": "-0.16px",textWrap:"balance"}}>
                    {props.text}
                </div>
            </div>
            <div style={{ "display": "flex", "width": "128px", "padding": "16px", "flexDirection": "column", "alignItems": "flex-start", "gap": "10px", "alignSelf": "stretch" }}>
                <div style={{ "color": "#D9D9D9", "fontSize": "16px", "fontStyle": "normal", "fontWeight": "500", "lineHeight": "130%", "letterSpacing": "-0.16px" }}>
                    Credits
                </div>
                <div style={{ "color": "#D9D9D9", "fontSize": "14px", "fontStyle": "normal", "fontWeight": "300", "lineHeight": "130%", "letterSpacing": "-0.14px" }}>
                    {props.credits}
                </div>
            </div>
        </div>
    )
}