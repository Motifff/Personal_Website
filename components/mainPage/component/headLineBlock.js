import { useState, useEffect } from "react";
import { useSpring, animated } from '@react-spring/web';

import view from "/public/main/main1.jpeg"

export default function HeadLineBlock(props) {

    return (
        <div
            className='Wrapper'
            style={{
                position: "relative",
                display: 'flex',
                height: '35vh',
                backgroundImage: `url(${view.src})`,
                backgroundPosition: "50% 50%",
                backgroundSize: "cover",
            }}>
            <div
                style={{
                    display: "flex",
                    flex: "1 0 0",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    alignItems: "flex-start",
                    gap: 16,
                    padding: 16,
                    backgroundColor: "rgba(0,0,0,0.45)"
                }}>
                <div style={{display:"flex",flexDirection:"row",gap:16}}>
                    <div style={{ width: 24, height: 2, background: "linear-gradient(90deg, #FFF 0%, #FFF 37.5%, #999 100%)" }}></div>
                    <div style={{ width: 24, height: 2, background: "#999" }}></div>
                    <div style={{ width: 24, height: 2, background: "#999" }}></div>
                </div>
                <div className="Texts" style={{ display:"flex",flexDirection:"row",alignSelf:"stretch",color: "#FFF", fontSize: "16px", fontWeight: 500, lineHeight: "130%", letterSpacing: "-0.16px" }}>
                    Detective Rhetoric is exhibited in Beijing
                </div>
            </div>
        </div>
    )
}
