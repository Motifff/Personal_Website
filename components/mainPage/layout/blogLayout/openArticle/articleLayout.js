import OutlineColumn from "./outlineColumn"
import ArticleColumn from "./articleColumn"
import QuoteColumn from "./quoteColumn"
import PasswordProtect from "@/components/mainPage/component/passwordProtect"

export default function ArticleLayout(props) {
    const articleData = props.articleData

    // 检测是否有密码保护
    // 如果 articleData 中包含 passwordHash 字段，则需要密码验证
    const needsPassword = articleData && articleData.passwordHash

    // 如果需要密码保护，包装内容
    const content = (
        <>
            {props.ifFold ? null : <OutlineColumn />}
            <ArticleColumn articleData={articleData}/>
            {props.ifFold ? null : <QuoteColumn />}
        </>
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