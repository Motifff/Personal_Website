import { useParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import axios from "axios";
import { useLanguage } from "@/context/LanguageContext";

import ArticleLayout from "./openArticle/articleLayout";
import { assetUrl } from "@/lib/assetBase";

function AsyncBlogPage(props) {
    const pageParams = useParams();
    const articleParams = pageParams.id;
    const [jsonData, setJsonData] = useState(null);
    const { language } = useLanguage();

    useEffect(() => {
        if (!articleParams) return;

        const fetchData = async () => {
            if (language === "zh") {
                try {
                    const result = await axios(assetUrl("/" + articleParams + "/data_zh.json"));
                    setJsonData(result.data);
                    return;
                } catch (e) {
                    // Fallback to default data.json
                }
            }

            const result = await axios(assetUrl("/" + articleParams + "/data.json"));
            setJsonData(result.data);
        };
        fetchData();
    }, [language, articleParams]);

    if (!articleParams) return null;

    return (
        <div className="mainContent" style={{ display: "flex", flexDirection: props.ifFold ? "column" : "row", backgroundColor: "#18191B" }}>
            {jsonData === null ? null : (
                <ArticleLayout ifFold={props.ifFold} articleData={jsonData} />
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
