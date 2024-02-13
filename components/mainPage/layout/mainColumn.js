import { useRef, useState, useEffect } from "react";

import Divider from "../component/divider"
import HeadLineBlock from "../component/headLineBlock"
import ProjectBlock from "../component/projectBlock"

export default function MainColumn(props) {

    return (
        <div style={{ display: "flex", flex: "1 0 0", padding: "16px", flexDirection: "column", alignSelf: "stretch", gap: "16px" }}>
            <Divider text="Headline" />
            <HeadLineBlock />
            <Divider text="Design Projects" />
            <div
                style={{ display: "grid", gridTemplateColumns: props.ifDouble?"repeat(2,1fr)":"repeat(1,1fr)", gap: "16px" }}
            >
                <ProjectBlock title="Detective Rhetoric" subtitle="An interactive robot for awakening caution of expression" type="Human Computer Interaction" />
                <ProjectBlock title="Detective Rhetoric" subtitle="An interactive robot for awakening caution of expression" type="Human Computer Interaction" />
                <ProjectBlock title="Detective Rhetoric" subtitle="An interactive robot for awakening caution of expression" type="Human Computer Interaction" />
                <ProjectBlock title="Detective Rhetoric" subtitle="An interactive robot for awakening caution of expression" type="Human Computer Interaction" />
            </div>
        </div>
    )
}