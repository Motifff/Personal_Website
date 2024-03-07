import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import axios from "axios";

import BlogSummaryView from "../../component/blogSummaryView";
import ArticleLayout from "./openArticle/articleLayout";

function AsyncBlogPage(props) {
    const searchParams = useSearchParams();
    const search = searchParams.get('search');
    const [jsonData, setJsonData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios("https://motifff.github.io/Personal_Website/data.json"); // Assuming `.json` is in the `public` folder
            setJsonData(result.allPageData);
            console.log(result);
        };

        fetchData();
    }, []);


    function renderBlock() {
        return (
            <>
            {
                jsonData.blog.content.map((blogItem, index) => (
                    <BlogSummaryView key={index} title={blogItem.title} subtitle={blogItem.subtitle} cotegories={blogItem.type} locations={blogItem.location} date={blogItem.date} />
                ))
            }
            </>
        )
    }


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
                    
                </div>
            ) : (
                <ArticleLayout ifFold={props.ifFold} />
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