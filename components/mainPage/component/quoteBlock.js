import Image from "next/image"

import QuoteImage from "@/components/src/qm.svg"

export default function QuoteBlock(props) {
    return (
        <div style={{ display: "flex", padding: "8px 32px", alignItems: "flex-start", gap: "16px", alignSelf: "strench" }}>
            <Image 
                src = {QuoteImage}
                width={16}
                height={14}
                alt={"Quote"}
            />
            <div style={{ "color": "#D9D9D9", "fontSize": "12px", "fontStyle": "normal", "fontWeight": "300", "lineHeight": "130%", "letterSpacing": "-0.12px" }}>
                {props.text}
            </div>
        </div>
    )
}