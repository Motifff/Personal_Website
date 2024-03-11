import { useParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import axios from "axios";

import BlogSummaryView from "../../component/blogSummaryView";
import ArticleLayout from "./openArticle/articleLayout";

function AsyncBlogPage(props) {
    const pageParams = useParams();
    const articleParams = pageParams.id;
    const [jsonData, setJsonData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (articleParams !== undefined && articleParams !== null) {
                console.log(articleParams);
                const result = await axios("./"+articleParams+"/"+"data.json"); // Assuming `.json` is in the `public` folder
                setJsonData(result.data);
            }
            else {
                const result = await axios("./data.json"); // Assuming `.json` is in the `public` folder
                setJsonData(result.data.allPageData);
                console.log(result.data.allPageData);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="mainContent" style={{ display: "flex", flexDirection: props.ifFold ? "column" : "row", backgroundColor: "#18191B" }}>
            {articleParams === undefined ? (
                <div
                    className="PageRestriction"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        padding: "0px 13.33vw",
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
                        Blog
                    </div>
                    {
                        jsonData === null ? null :
                            jsonData.blog.content.map((blogItem, index) => (
                                <BlogSummaryView key={index} ifFold={props.ifFold} title={blogItem.title} subtitle={blogItem.subtitle} cotegories={blogItem.type} locations={blogItem.location} image={blogItem.image} date={blogItem.date} link={blogItem.link}/>
                            ))
                    }
                </div>
            ) : (
                <>
                {
                    jsonData === null ? null :
                        <ArticleLayout ifFold={props.ifFold} articleData={jsonData}/>
                }
                </>
            )}
        </div>
    );
}

export default function BlogLayout(props) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AsyncBlogPage ifFold={props.ifFold} />
        </Suspense>
    );
}