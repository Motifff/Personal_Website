import ArticleTitle from "../../../component/articleTitle"
import ContentRenderer from "@/components/mainPage/component/contentRenderer";

export default function ArticleColumn(props) {
    
    return (
        <div style={{ display: "flex", flex: "1 0 0", padding: "16px", flexDirection: "column", alignSelf: "stretch", gap: "16px" }}>
            <ArticleTitle
                title={props.articleData.title}
                subtitle={props.articleData.subtitle}
                locations={props.articleData.location}
                date={props.articleData.date}
                type={props.articleData.type}
            />
            {/* Render mainContent */}
            {props.articleData.mainContent.map((item, index) => (
                <div key={index}>
                    <ContentRenderer item={item} />
                </div>
            ))}
        </div>
    )
}