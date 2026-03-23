import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProjectBlock(props) {
    const [isHover, setIsHover] = useState(false);
    const router = useRouter();
    const showMeta = props.isActive && isHover;
    const resolvedImageHeight = showMeta && props.imageHeightHover
        ? props.imageHeightHover
        : (props.imageHeight || "35vh");

    const handleMouseEnter = () => {
        setIsHover(true);
    };
    const handleMouseLeave = () => {
        setIsHover(false);
    };

    const handleMouseClick = () => {
        if (props.onCardClick) {
            const shouldContinue = props.onCardClick();
            if (shouldContinue === false) return;
        }
        router.push("/blog/"+props.link);
    }

    const springEase = "cubic-bezier(0.22, 1.25, 0.36, 1)";

    return (
        <a  className="Wrapper"
            onClick={handleMouseClick}
            style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: 'column',
                gap: 4,
                width: props.width || "100%",
                ...props.wrapperStyle,
                transition: `width 520ms ${springEase}, opacity 360ms ease`,
                willChange: "width, opacity",
                overflow: "visible",
            }}
        >
            {showMeta ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 4 }}>
                    <div className="Title"
                        style={{
                            color: "#FFF",
                            fontSize: "20px",
                            fontWeight: "500",
                            lineHeight: "130%",
                            letterSpacing: "-0.16px"
                        }}>
                        {props.title}
                    </div>
                    <div className="SubTitle"
                        style={{
                            color: "#FFF",
                            fontSize: "12px",
                            fontWeight: "400",
                            lineHeight: "130%",
                            letterSpacing: "-0.12px",
                            opacity: 0.88
                        }}>
                        {props.subtitle}
                    </div>
                </div>
            ) : null}
                <div className='ImageHolder' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{
                width: "100%",
                height: resolvedImageHeight,
                opacity: isHover ? 1 : (props.baseOpacity ?? 0.7),
                backgroundImage: `url(${props.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
                transition: `height 520ms ${springEase}, opacity 420ms ease, transform 300ms ease`,
                cursor: "pointer",
                transform: isHover ? "translateY(-2px)" : "translateY(0px)"
            }} />
            <div className="Type"
                style={{
                    color: "#FFF",
                    fontSize: "9px",
                    fontWeight: "400",
                    lineHeight: "130%",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    opacity: 0.9
                }}>
                {props.type}
            </div>
        </a>
    )
}
