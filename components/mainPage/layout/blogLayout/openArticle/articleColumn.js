import ArticleTitle from "../../../component/articleTitle"
import LinkJumper from "../../../component/linkJumper"
import HeadLineBlock from "@/components/mainPage/component/headLineBlock";
import ParaBlock from "@/components/mainPage/component/paraBlock";

export default function ArticleColumn(props) {
    const renderContent = (item) => {
        switch (item.type) {
            case "imageBed":
                return (
                    <HeadLineBlock content={item.content} />
                );
            case "paragraph":
                return (
                    <ParaBlock text={item.contents} credits={item.credits} />
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
            <LinkJumper link="https://www.google.com" text="Full Design File" />
        </div>
    )
}