'use client'

import Divider from "../../../component/divider"
import { useQuoteContext } from "./articleLayout"

export default function QuoteColumn(props) {
    const { quoteData } = useQuoteContext() || {}

    // 没有 quote 数据时不显示任何内容
    if (!quoteData || quoteData.length === 0) {
        return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                width: "256px",
                padding: "16px",
            }} />
        )
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            width: "256px",
            padding: "16px",
            position: "relative",
            alignSelf: "stretch",
        }}>
            <Divider text="Quote" />
            {quoteData.map((quote, index) => (
                <div
                    key={index}
                    style={{
                        position: "absolute",
                        top: quote.yPos,
                        left: "16px",
                        right: "16px",
                    }}
                >
                    <div style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "8px",
                    }}>
                        <span style={{
                            color: "#666",
                            fontSize: "24px",
                            lineHeight: "1",
                        }}>
                            &quot;
                        </span>
                        <div style={{
                            color: "#D9D9D9",
                            fontSize: "12px",
                            fontWeight: "300",
                            lineHeight: "130%",
                            letterSpacing: "-0.12px",
                        }}>
                            {quote.text}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
