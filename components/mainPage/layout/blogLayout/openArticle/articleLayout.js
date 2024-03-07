import OutlineColumn from "./outlineColumn"
import ArticleColumn from "./articleColumn"
import QuoteColumn from "./quoteColumn"

export default function ArticleLayout(props) {
    return (
        <>
        {
            props.ifFold ? null : <OutlineColumn />
        }
        < ArticleColumn />
        {
            props.ifFold ? null : <QuoteColumn />
        }
        </>
    )
}