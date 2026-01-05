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
                try {
                    const result = await axios("../"+articleParams+"/"+"data_" + language + ".json");
                    setJsonData(result.data);
                } catch (e) {
                    // Fallback
                    const result = await axios("../"+articleParams+"/"+"data.json");
                    setJsonData(result.data);
                }
            }
            else {
                try {
                    const result = await axios("./data_" + language + ".json");
                    setJsonData(result.data.allPageData);
                } catch (e) {
                    // Fallback
                    const result = await axios("./data.json");
                    setJsonData(result.data.allPageData);
                }
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