'use client'

import { useState, useEffect, createContext, useContext } from "react"
import OutlineColumn from "./outlineColumn"
import ArticleColumn from "./articleColumn"
import QuoteColumn from "./quoteColumn"
import PasswordProtect from "@/components/mainPage/component/passwordProtect"

// 创建 Context 用于共享 Quote 位置信息
const QuoteContext = createContext(null)
export const useQuoteContext = () => useContext(QuoteContext)

export default function ArticleLayout(props) {
    const articleData = props.articleData

    // 存储所有 Quote 的内容和位置
    const [quoteData, setQuoteData] = useState([])

    // 检测是否有密码保护
    const needsPassword = articleData && articleData.passwordHash

    // 从 articleData 中提取所有 quote
    useEffect(() => {
        if (!articleData || !articleData.mainContent) {
            setQuoteData([])
            return
        }

        const quotes = articleData.mainContent
            .filter(item => item.type === "quote")
            .map(item => ({
                text: item.text,
                yPos: 0 // 初始位置为0，后续由 ArticleColumn 更新
            }))

        setQuoteData(quotes)
    }, [articleData])

    // 更新某个 Quote 的位置
    const updateQuotePosition = (index, yPos) => {
        setQuoteData(prev => {
            if (prev[index] && prev[index].yPos !== yPos) {
                const updated = [...prev]
                updated[index] = { ...updated[index], yPos }
                return updated
            }
            return prev
        })
    }

    const content = (
        <QuoteContext.Provider value={{ quoteData, updateQuotePosition }}>
            {props.ifFold ? null : <OutlineColumn articleData={articleData} />}
            <ArticleColumn articleData={articleData}/>
            {props.ifFold ? null : <QuoteColumn />}
        </QuoteContext.Provider>
    )

    return (
        <>
            {needsPassword ? (
                <PasswordProtect passwordHash={articleData.passwordHash} showHeader={true}>
                    {content}
                </PasswordProtect>
            ) : (
                content
            )}
        </>
    )
}