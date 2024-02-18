import { useSpring, animated } from '@react-spring/web'

export default function MemoBlock(props) {    
    return (
        <div className="Wrapper" style={{display:"flex",flexWrap:"wrap", width:"100%",flexDirection:'column',padding:16,gap:10}}>
            <div className="Subtitle"
                style={{ color:"#FFF", fontSize:"10px", fontWeight:"300", lineHeight:"130%", letterSpacing:"-0.1px"}}>
                    {props.subtitle}
            </div>
            <div className='ImageHolder' style={{width:"100px",height:"100px",opacity: 0.2,background: '#FFF'}}/>
            <div className="Title"
                style={{ color:"#FFF", fontSize:"16px", fontWeight:"700", lineHeight:"130%", letterSpacing:"-0.16px"}}>
                    {props.title}
            </div>
            <div className="Time"
                style={{ color:"#FFF", fontSize:"12px", fontWeight:"200", lineHeight:"130%", letterSpacing:"-0.12px"}}>
                    {props.time}
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
