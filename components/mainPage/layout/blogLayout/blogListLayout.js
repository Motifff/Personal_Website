import BlogSummaryView from "../../component/blogSummaryView";
import { useLanguage } from "@/context/LanguageContext";

export default function BlogListLayout(props) {
    const { language } = useLanguage();
    const text = {
        en: { title: "Blog" },
        zh: { title: "博客" }
    };
    const t = text[language] || text.en;

    return (
        <div
            className="PageRestriction"
            style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                padding: "24px 13.33vw 64px 13.33vw",
                alignItems: "flex-start",
                gap: "32px",
            }}
        >
            <div
                className="Title"
                style={{
                    color: "#FFF",
                    fontSize: "6.66vw",
                    fontWeight: 500,
                    lineHeight: "130%", /* 124.8px */
                    letterSpacing: "-0.96px",
                }}
            >
                {t.title}
            </div>
            {
                props.blogData && props.blogData.map((blogItem, index) => (
                    <BlogSummaryView key={index} ifFold={props.ifFold} title={blogItem.title} subtitle={blogItem.subtitle} cotegories={blogItem.type} locations={blogItem.location} image={blogItem.image} date={blogItem.date} link={blogItem.link}/>
                ))
            }
        </div>
    )
}



