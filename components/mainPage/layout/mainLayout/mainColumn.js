import { useState, useEffect } from "react";
import axios from "axios";

import Divider from "../../component/divider"
import HeadLineBlock from "../../component/headLineBlock"
import ProjectBlock from "../../component/projectBlock"

export default function MainColumn(props) {
    const [jsonData, setJsonData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios("data.json"); // Assuming `.json` is in the `public` folder
            setJsonData(result.data.allPageData);
            console.log(result.data.allPageData);
        };
        fetchData();
    }, []); 

    return (
        <div style={{ display: "flex", flex: "1 0 0", padding: "16px", flexDirection: "column", alignSelf: "stretch", gap: "16px" }}>
            <Divider text="Headline" />
            <HeadLineBlock />
            <Divider text="Featured Projects" />
            <div
                style={{ display: "grid", gridTemplateColumns: props.ifDouble ? "repeat(2,1fr)" : "repeat(1,1fr)", gap: "16px" }}
            >
                {jsonData === null ? null : jsonData.home.main.projects.map((projectItem, index) => (
                    <ProjectBlock key={index} type={projectItem.type} title={projectItem.title} subtitle={projectItem.subtitle} image={projectItem.image} link={projectItem.link}/>
                ))}
            </div>
        </div>
    )
}