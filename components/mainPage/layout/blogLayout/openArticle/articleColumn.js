import ArticleTitle from "../../../component/articleTitle"
import HeadLineBlock from "../../../component/headLineBlock"
import LinkJumper from "../../../component/linkJumper"
import ParaBlock from "../../../component/paraBlock"
import QuoteBlock from "../../../component/quoteBlock"

export default function ArticleColumn(props) {
    return (
        <div style={{ display: "flex", flex: "1 0 0", padding: "16px", flexDirection: "column", alignSelf: "stretch", gap: "16px" }}>
            <ArticleTitle
                title={props.articleData.title}
                subtitle={props.articleData.subtitle}
                locations={props.articleData.location}
                date={props.articleData.date}
            />
            <LinkJumper link="https://www.google.com" text="Full Design File" />
        </div>
    )
}