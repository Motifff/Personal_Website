import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

import BlogSummaryView from "../../component/blogSummaryView";
import ArticleLayout from "./openArticle/articleLayout";

export default function BlogLayout(props) {
    const searchParams = useSearchParams();
    const search = searchParams.get('search');
    const [jsonData, seJsonData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios("@/public/data.json"); // Assuming `.json` is in the `public` folder
            setData(result.data);
            console.log(result.data);
        };

        fetchData();
    }, []);

    

    return (
        <div className="mainContent" style={{ display: "flex", flexDirection: props.ifFold ? "column" : "row", backgroundColor: "#18191B" }}>
            {search === null ? (
                <div
                    className="PageRestriction"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        padding: "0px 13.33vw",
                        alignItems: "flex-start",
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
                        Blog
                    </div>
                    {
                        jsonData.blog.content.map((blogItem, index) => (
                            <BlogSummaryView key={index} title={blogItem.title} subtitle={blogItem.subtitle} cotegories={blogItem.type} locations={blogItem.location} date={blogItem.date}/>
                        ))
                    }
                </div>
            ) : (
                <ArticleLayout ifFold={props.ifFold} />
            )}
        </div>
    );
}