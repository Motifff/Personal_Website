import ArticleColumn from "./articleColumn";
import OutlineColumn from "./outlineColumn";
import QuoteColumn from "./quoteColumn";

export default function BlogLayout(props) {

    return (
        <div className="mainContent" style={{ display: "flex", flexDirection: props.ifFold ? "column" : "row", backgroundColor: "#18191B" }}>
            {
                props.ifFold ? null : <OutlineColumn/>
            }
            <ArticleColumn/>
            {
                props.ifFold ? null : <QuoteColumn/>
            }
        </div>
    )
}