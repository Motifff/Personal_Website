import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProjectBlock(props) {
    const [isHover, setIsHover] = useState(false);
    const router = useRouter();

    const handleMouseEnter = () => {
        setIsHover(true);
    };
    const handleMouseLeave = () => {
        setIsHover(false);
    };

    const handleMouseClick = () => {
        router.push("/blog/"+props.link);
    }

    return (
        <a  className="Wrapper"
            onClick={handleMouseClick}
            style={{ display: "flex", flexWrap: "wrap", flexDirection: 'column', gap: 4 }}
        >
            <div className='ImageHolder' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{
                width: "100%", height: "35vh", opacity: isHover ? 1 : 0.8, backgroundImage: `url(${props.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
            }} />
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
        </a>
    )
}
