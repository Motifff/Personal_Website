import { useParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import axios from "axios";
import { useLanguage } from "@/context/LanguageContext";

import BlogListLayout from "./blogListLayout";
import ArticleLayout from "./openArticle/articleLayout";

function AsyncBlogPage(props) {
    const pageParams = useParams();
    const articleParams = pageParams.id;
    const [jsonData, setJsonData] = useState(null);
    const { language } = useLanguage();

    useEffect(() => {
        const fetchData = async () => {
            if (articleParams !== undefined && articleParams !== null) {
                console.log(articleParams);
                if (language === "zh") {
                    try {
                        const result = await axios("../"+articleParams+"/data_zh.json");
                        setJsonData(result.data);
                        return;
                    } catch (e) {
                        // Fallback to default data.json
                    }
                }

                const result = await axios("../"+articleParams+"/data.json");
                setJsonData(result.data);
            }
            else {
                if (language === "zh") {
                    try {
                        const result = await axios("./data_zh.json");
                        setJsonData(result.data.allPageData);
                        return;
                    } catch (e) {
                        // Fallback to default data.json
                    }
                }

                const result = await axios("./data.json");
                setJsonData(result.data.allPageData);
            }
        };
        fetchData();
    }, [language, articleParams]);

    return (
        <div className="mainContent" style={{ display: "flex", flexDirection: props.ifFold ? "column" : "row", backgroundColor: "#18191B" }}>
            {articleParams === undefined ? (
                <BlogListLayout ifFold={props.ifFold} blogData={jsonData ? jsonData.blog.content : []} />
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
