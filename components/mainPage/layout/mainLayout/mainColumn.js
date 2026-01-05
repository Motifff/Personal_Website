import { useState, useEffect } from "react";
import axios from "axios";
import { useLanguage } from "@/context/LanguageContext";

import Divider from "../../component/divider"
import HeadLineBlock from "../../component/headLineBlock"
import ProjectBlock from "../../component/projectBlock"
import { Suspense } from "react";

export default function MainColumn(props) {
    const [jsonData, setJsonData] = useState(null);
    const { language } = useLanguage();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios(`data_${language}.json`);
                setJsonData(result.data.allPageData);
            } catch (e) {
                // Fallback to data.json if specific language file fails
                const result = await axios("data.json");
                setJsonData(result.data.allPageData);
            }
        };
        fetchData();
    }, [language]);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div style={{ display: "flex", flex: "1 0 0", padding: "16px", flexDirection: "column", alignSelf: "stretch", gap: "16px" }}>
                <Divider text="Headline" />
                <HeadLineBlock content = {jsonData?.home?.main?.headline}/>
                <Divider text="Featured Projects" />
                <div
                    style={{ display: "grid", gridTemplateColumns: props.ifDouble ? "repeat(2,1fr)" : "repeat(1,1fr)", gap: "16px" }}
                >
                    {jsonData === null ? null : jsonData.home.main.projects.map((projectItem, index) => (
                        <ProjectBlock key={index} type={projectItem.type} title={projectItem.title} subtitle={projectItem.subtitle} image={projectItem.image} link={projectItem.link} />
                    ))}
                </div>
            </div>
        </Suspense>
    )
}