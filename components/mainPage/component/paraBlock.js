'use client'

import { useEffect, useState } from 'react'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'

export default function ParaBlock(props) {
    const [htmlContent, setHtmlContent] = useState(props.text || '')

    useEffect(() => {
        const processMarkdown = async () => {
            try {
                const result = await unified()
                    .use(remarkParse)
                    .use(remarkGfm)
                    .use(remarkHtml)
                    .process(props.text || '')
                setHtmlContent(String(result))
            } catch (error) {
                setHtmlContent((props.text || '').replace(/\n/g, '<br/>'))
            }
        }

        processMarkdown()
    }, [props.text])

    return (
        <div style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "32px",
            alignSelf: "stretch"
        }}>
            <div style={{
                display: "flex",
                padding: "16px 0",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "10px",
                alignSelf: "stretch",
                flex: 1
            }}>
                <div
                    style={{
                        color: "#D9D9D9",
                        fontSize: "16px",
                        fontWeight: "400",
                        lineHeight: "130%",
                        letterSpacing: "-0.16px",
                        textWrap: "stable",
                        width: "100%"
                    }}
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
            </div>
            {props.credits && props.credits !== "" ? (
                <div style={{
                    display: "flex",
                    width: "128px",
                    padding: "16px 0",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "10px",
                    alignSelf: "stretch",
                    flexShrink: 0
                }}>
                    <div style={{
                        color: "#D9D9D9",
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: "500",
                        lineHeight: "130%",
                        letterSpacing: "-0.16px"
                    }}>
                        Credits
                    </div>
                    <div style={{
                        color: "#D9D9D9",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "300",
                        lineHeight: "130%",
                        letterSpacing: "-0.14px"
                    }}>
                        {props.credits}
                    </div>
                </div>
            ) : null}
        </div>
    )
}
