import { useSpring, animated } from '@react-spring/web'
import { useState, useEffect } from "react";

export default function ProjectBlock(props) {

    return (
        <div className="Wrapper" style={{ display: "flex", flexWrap: "wrap", flexDirection: 'column', gap: 4 }}>
            <div className='ImageHolder' style={{ width: "100%", height: "236px", opacity: 0.2, background: '#FFF' }} />
            <div className="Type"
                style={{ color: "#FFF", fontSize: "10px", fontWeight: "200", lineHeight: "130%", letterSpacing: "-0.1px" }}>
                {props.type}
            </div>
            <div>
                <div className="Title"
                    style={{ color: "#FFF", fontSize: "32px", fontWeight: "700", lineHeight: "130%", letterSpacing: "-0.16px" }}>
                    {props.title}
                </div>
                <div className="SubTitle"
                    style={{ color: "#FFF", fontSize: "16px", fontWeight: "400", lineHeight: "130%", letterSpacing: "-0.12px" }}>
                    {props.subtitle}
                </div>
            </div>
        </div>
    )
}
