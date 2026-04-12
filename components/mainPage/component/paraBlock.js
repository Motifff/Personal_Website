'use client'

import { useEffect, useState } from 'react'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'
import { usePassword } from './passwordProtect'
import { decryptContent } from '@/utils/crypto'

export default function ParaBlock(props) {
    const password = usePassword()
    const [htmlContent, setHtmlContent] = useState('')
    const [isDecrypting, setIsDecrypting] = useState(false)
    const [decryptError, setDecryptError] = useState(false)

    const isEncrypted = !!props.encryptedContent
    const rawText = props.text || ''

    // 解密 + Markdown 处理
    useEffect(() => {
        const processContent = async () => {
            let textToProcess = rawText

            // 如果有加密内容且有密码，尝试解密
            if (isEncrypted && password) {
                setIsDecrypting(true)
                setDecryptError(false)

                const decrypted = await decryptContent(props.encryptedContent, password)
                if (decrypted) {
                    textToProcess = decrypted
                } else {
                    setDecryptError(true)
                }
                setIsDecrypting(false)
            }

            // Markdown 渲染
            try {
                const result = await unified()
                    .use(remarkParse)
                    .use(remarkGfm)
                    .use(remarkHtml)
                    .process(textToProcess)
                setHtmlContent(String(result))
            } catch (error) {
                setHtmlContent(textToProcess.replace(/\n/g, '<br/>'))
            }
        }

        processContent()
    }, [rawText, isEncrypted, password, props.encryptedContent])

    // 加密内容但无密码
    if (isEncrypted && !password) {
        return (
            <div style={{
                display: "flex",
                padding: "16px 0",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "10px",
                alignSelf: "stretch",
                flex: 1
            }}>
                <div style={{
                    color: "#666",
                    fontSize: "16px",
                    fontWeight: "400",
                    lineHeight: "130%",
                }}>
                    🔒 加密内容需要密码解锁
                </div>
            </div>
        )
    }

    // 解密中
    if (isDecrypting) {
        return (
            <div style={{
                display: "flex",
                padding: "16px 0",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "10px",
                alignSelf: "stretch",
                flex: 1
            }}>
                <div style={{
                    color: "#666",
                    fontSize: "16px",
                    fontWeight: "400",
                    lineHeight: "130%",
                }}>
                    解密中...
                </div>
            </div>
        )
    }

    // 解密失败
    if (decryptError) {
        return (
            <div style={{
                display: "flex",
                padding: "16px 0",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "10px",
                alignSelf: "stretch",
                flex: 1
            }}>
                <div style={{
                    color: "#FF6B6B",
                    fontSize: "16px",
                    fontWeight: "400",
                    lineHeight: "130%",
                }}>
                    解密失败
                </div>
            </div>
        )
    }

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
