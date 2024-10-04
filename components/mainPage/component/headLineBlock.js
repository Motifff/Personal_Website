import { useState, useEffect } from "react";
import { useSpring, animated } from '@react-spring/web';

export default function HeadLineBlock(props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        let interval;
        if (!isHovered) {
            interval = setInterval(() => {
                props.content !== undefined ?
                setCurrentIndex((prevIndex) => (prevIndex + 1) % props.content.length): null;
            }, 5000); // 5 seconds
        }

        return () => clearInterval(interval);
    }, [props.content !== undefined ? props.content.length : null, isHovered]);

    return (
        props.content !== undefined ? (
            <div
                className='Wrapper'
                style={{
                    position: "relative",
                    display: 'flex',
                    height: '35vh',
                    backgroundImage: `url(${props.content[currentIndex].image})`,
                    backgroundPosition: "50% 50%",
                    backgroundSize: "cover",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                >
                <div
                    style={{
                        display: "flex",
                        flex: "1 0 0",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        alignItems: "flex-start",
                        gap: 16,
                        padding: 16,
                        backgroundColor: isHovered? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.30)",
                        transition: 'background-color 1s ease'
                    }}>
                    <div className="Dynamic Switcher" style={{ display: "flex", flexDirection: "row", gap: 8 }}>
                    {Array.isArray(props.content) ? props.content.map((item, index) => (
                        <div key={index} style={{ width: 24, height: 2, backgroundColor: index === currentIndex ? "#FFF" : "#999" ,transition: 'background-color 1s ease'}}
                        onClick={() => setCurrentIndex(index)}
                        ></div>
                    )) : null}
                    </div>
                    <div className="Texts" style={{ display: "flex", flexDirection: "row", alignSelf: "stretch", color: "#FFF", fontSize: "16px", fontWeight: 500, lineHeight: "130%", letterSpacing: "-0.16px" }}>
                        {props.content[currentIndex].title}
                    </div>
                </div>
            </div>
        ) : null
    )
}
