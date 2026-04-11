import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import { useLanguage } from "@/context/LanguageContext";

import { Suspense } from "react";
import { sortByPriorityThenDate } from "../../utils/prioritySort";
import HomeProjectRow from "../../component/homeProjectRow";

export default function MainColumn(props) {
    const [jsonData, setJsonData] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const { language } = useLanguage();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (language === "zh") {
                    try {
                        const result = await axios("/Personal_Website/data_zh.json");
                        setJsonData(result.data.allPageData);
                        return;
                    } catch (e) {
                        // Fallback to default data.json
                    }
                }

                const result = await axios("/Personal_Website/data.json");
                setJsonData(result.data.allPageData);
            } catch (error) {
                console.error("Failed to load home page data:", error);
                setJsonData(null);
            }
        };
        fetchData();
    }, [language]);

    const labels = useMemo(() => {
        const dictionary = {
            en: { categories: "CATEGORIES", locations: "LOCATIONS", date: "DATE" },
            zh: { categories: "分类", locations: "地点", date: "日期" },
        };
        return dictionary[language] || dictionary.en;
    }, [language]);

    const projectRows = useMemo(() => {
        if (!jsonData) return [];
        const projects = jsonData?.home?.main?.projects || [];
        return sortByPriorityThenDate(projects);
    }, [jsonData]);

    const metaWidths = useMemo(() => {
        const longestLocationLength = projectRows.reduce((maxLength, item) => {
            const currentLength = (item?.location || "").trim().length;
            return Math.max(maxLength, currentLength);
        }, 8);

        return {
            locationWidth: `${Math.max(8, longestLocationLength)}ch`,
            dateWidth: "9ch",
        };
    }, [projectRows]);

    const handleHover = useCallback((index) => {
        setActiveIndex(index);
    }, []);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    width: "100%",
                    padding: "24px",
                }}
            >
                {projectRows.map((projectItem, index) => (
                    <HomeProjectRow
                        key={`${projectItem.link || "project"}-${index}`}
                        project={projectItem}
                        labels={labels}
                        ifFold={props.ifFold}
                        isExpanded={index === activeIndex}
                        onHover={() => handleHover(index)}
                        metaWidths={metaWidths}
                    />
                ))}
            </div>
        </Suspense>
    );
}
