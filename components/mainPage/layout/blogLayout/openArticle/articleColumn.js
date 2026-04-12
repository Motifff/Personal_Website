'use client'

import { useRef, useLayoutEffect } from "react"
import ArticleTitle from "../../../component/articleTitle"
import ContentRenderer from "@/components/mainPage/component/contentRenderer";
import { useQuoteContext } from "./articleLayout"

export default function ArticleColumn(props) {
    const articleContainerRef = useRef(null)
    const { updateQuotePosition } = useQuoteContext() || {}

    // 记录每个 Quote 的位置
    useLayoutEffect(() => {
        if (!articleContainerRef.current) return

        const container = articleContainerRef.current
        const quoteElements = container.querySelectorAll('[data-quote-index]')
        const containerRect = container.getBoundingClientRect()

        quoteElements.forEach(el => {
            const index = parseInt(el.getAttribute('data-quote-index'))
            const elRect = el.getBoundingClientRect()
            // 计算相对于容器顶部的位置
            const yPos = elRect.top - containerRect.top
            if (updateQuotePosition) {
                updateQuotePosition(index, yPos)
            }
        })
    }, [props.articleData, updateQuotePosition])

    // 统计 quote 的索引
    let quoteIndex = 0

    return (
        <div
            ref={articleContainerRef}
            style={{
                display: "flex",
                flex: "1 0 0",
                padding: "16px",
                flexDirection: "column",
                alignSelf: "stretch",
                gap: "16px"
            }}>
            <ArticleTitle
                title={props.articleData.title}
                subtitle={props.articleData.subtitle}
                locations={props.articleData.location}
                date={props.articleData.date}
                type={props.articleData.type}
            />
            {/* Render mainContent */}
            {props.articleData.mainContent.map((item, index) => {
                if (item.type === "quote") {
                    const currentQuoteIndex = quoteIndex++
                    return (
                        <div key={index} data-quote-index={currentQuoteIndex}>
                            <ContentRenderer item={item} />
                        </div>
                    )
                }
                return (
                    <div key={index}>
                        <ContentRenderer item={item} />
                    </div>
                )
            })}
        </div>
    )
}