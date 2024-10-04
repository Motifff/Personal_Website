import { useSpring, animated } from '@react-spring/web'

// 格式化时间的函数
function formatTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        return "today";
    } else {
        return `${diffDays} days ago`;
    }
}

export default function InfoBlock(props) {
    const formattedTime = formatTime(props.time);

    return (
        <div className="Wrapper" style={{display:"flex",flexWrap:"wrap", width:"100%",flexDirection:'column',padding:16,gap:10}}>
            <div className="Subtitle"
                style={{ color:"#FFF", fontSize:"10px", fontWeight:"300", lineHeight:"130%", letterSpacing:"-0.1px"}}>
                    {props.subtitle}
            </div>
            <div className="Title"
                style={{ color:"#FFF", fontSize:"16px", fontWeight:"700", lineHeight:"130%", letterSpacing:"-0.16px"}}>
                    {props.title}
            </div>
            <div className="Time"
                style={{ color:"#FFF", fontSize:"12px", fontWeight:"200", lineHeight:"130%", letterSpacing:"-0.12px"}}>
                    {formattedTime}
            </div>
            <animated.div className="dot-container"
                style={{
                    height:"2px",
                    alignSelf: "stretch",
                    borderBottom: "2px white dotted"
                }}
            />
        </div>
    )
}
