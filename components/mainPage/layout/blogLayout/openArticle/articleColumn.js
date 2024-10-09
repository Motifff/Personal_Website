import InArticleImage from "@/components/mainPage/component/inArticleImage";
import ArticleTitle from "../../../component/articleTitle"
import LinkJumper from "../../../component/linkJumper"
import ParaBlock from "@/components/mainPage/component/paraBlock";

export default function ArticleColumn(props) {
    const renderContent = (item) => {
        switch (item.type) {
            case "imageBed":
                return (
                    <InArticleImage ao = {item.aspectRatio} content={item.content} />
                );
            case "paragraph":
                return (
                    <ParaBlock text={item.content} credits={item.credits} />
                );
            case "link":
                return (
                    <LinkJumper text = {item.text} link={item.link} />
                );
            default:
                return null;
        }
    }
    
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
                    {renderContent(item)}
                </div>
            ))}
        </div>
    )
}