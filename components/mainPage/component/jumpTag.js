export default function JumpTag(props) {
    return (
        <div className="Wrap"
            style={{
                display: "flex",
                padding: "8px 16px",
                flexDirection: "column",
                alignItems:"flex - start",
                gap:"2px",
                alignSelf:"stretch",
                cursor: "pointer",
            }}>
            <div className="Text" 
                style={{
                    color: "#FFF",
                    fontSize: "10px",
                    fontStyle: "normal",
                    fontWeight: "300",
                    lineHeight: "130%", /* 13px */
                    letterSpacing: "-0.1px",
                }}
            >
                {props.text}
            </div>
            <div className="dot-container"
                style={{
                    height:"2px",
                    alignSelf: "stretch",
                    borderBottom: "2px white dotted"
                }}
            />
        </div>
    )
}