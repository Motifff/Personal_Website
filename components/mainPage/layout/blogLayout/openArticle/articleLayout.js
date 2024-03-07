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