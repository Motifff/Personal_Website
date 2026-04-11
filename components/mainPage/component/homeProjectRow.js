import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSpring, animated } from "@react-spring/web";
import HomeProjectMeta from "./homeProjectMeta";

function normalizeImageSrc(src) {
    if (!src || typeof src !== "string") return "";
    if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("/")) return src;
    return `/${src}`;
}

function getDisciplineLabel(project) {
    if (project?.discipline) return project.discipline;
    if (!project?.type) return "";
    const type = project.type.toUpperCase();
    if (type.includes("HCI") || type.includes("UX")) return "Human Computer Interaction";
    if (type.includes("INDUSTRIAL")) return "Industrial Design";
    if (type.includes("RESEARCH")) return "Research";
    return project.type;
}

export default function HomeProjectRow(props) {
    const router = useRouter();
    const { project, labels, ifFold, isExpanded, onHover } = props;
    const [isLocallyHovered, setIsLocallyHovered] = useState(false);
    const hoverTimeoutRef = useRef(null);
    const expanded = isExpanded || isLocallyHovered;

    const imageSrc = normalizeImageSrc(project?.image);
    const discipline = getDisciplineLabel(project);

    const handleOpenProject = () => {
        if (!project?.link) return;
        router.push(`/home/${project.link}`);
    };

    const handleMouseEnter = useCallback(() => {
        clearTimeout(hoverTimeoutRef.current);
        setIsLocallyHovered(true);
        if (onHover) onHover();
    }, [onHover]);

    const handleMouseLeave = useCallback(() => {
        hoverTimeoutRef.current = setTimeout(() => setIsLocallyHovered(false), 120);
    }, []);

    const s = useSpring({
        progress: expanded ? 1 : 0,
        config: { mass: 1, tension: 300, friction: 30 },
    });

    return (
        <article
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleOpenProject}
            style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                cursor: project?.link ? "pointer" : "default",
            }}
        >
            {/* Divider */}
            <div style={{ width: "100%", height: "1px", opacity: 0.4, background: "#FFFFFF", flexShrink: 0 }} />

            {/* Main row */}
            <div
                style={{
                    display: "flex",
                    flexDirection: ifFold ? "column" : "row",
                    gap: ifFold ? "16px" : "36px",
                    alignItems: "flex-start",
                    width: "100%",
                    padding: "10px 0",
                }}
            >
                {/* Left: title area */}
                <div
                    style={{
                        width: ifFold ? "100%" : "360px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        gap: "16px",
                        flexShrink: 0,
                        minHeight: expanded && !ifFold ? "256px" : "0",
                    }}
                >
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        {/* Type label - collapsed style fades out, expanded style fades in */}
                        <animated.div style={{
                            color: "#D4D5D9",
                            fontSize: "10px",
                            fontWeight: "500",
                            lineHeight: "130%",
                            letterSpacing: "-0.1px",
                            opacity: s.progress.to([0, 1], [0.6, 0]),
                            height: s.progress.to([0, 1], [14, 0]),
                            overflow: "hidden",
                        }}>
                            {project?.type || ""}
                        </animated.div>
                        <div
                            style={{
                                color: "#FFFFFF",
                                fontWeight: "500",
                                lineHeight: "130%",
                                letterSpacing: "-0.2px",
                                fontSize: expanded ? (ifFold ? "clamp(36px, 8vw, 48px)" : "48px") : "20px",
                                transition: "font-size 400ms cubic-bezier(0.22, 1, 0.36, 1)",
                                maxWidth: ifFold ? "100%" : (expanded ? "360px" : "480px"),
                            }}
                        >
                            {project?.title || "-"}
                        </div>
                        <animated.div style={{
                            color: "#D4D5D9",
                            fontSize: "10px",
                            fontWeight: "500",
                            lineHeight: "130%",
                            letterSpacing: "-0.1px",
                            maxWidth: ifFold ? "100%" : "360px",
                            opacity: s.progress,
                        }}>
                            {project?.subtitle || ""}
                        </animated.div>
                    </div>
                    <animated.div style={{
                        color: "#D4D5D9",
                        fontSize: "12px",
                        fontWeight: "300",
                        lineHeight: "130%",
                        letterSpacing: "-0.12px",
                        opacity: s.progress,
                    }}>
                        {discipline}
                    </animated.div>
                </div>

                {/* Center: image */}
                <animated.div
                    style={{
                        width: ifFold ? "100%" : "480px",
                        height: s.progress.to([0, 1], [0, 256]),
                        backgroundColor: "#08050E",
                        backgroundImage: imageSrc ? `url(${imageSrc})` : "none",
                        backgroundSize: "cover",
                        backgroundPosition: "center center",
                        flexShrink: 0,
                        opacity: s.progress,
                        overflow: "hidden",
                    }}
                />

                {/* Right: meta (expanded) */}
                <animated.div
                    style={{
                        flex: ifFold ? "unset" : "1 0 0",
                        width: ifFold ? "100%" : "auto",
                        minWidth: 0,
                        opacity: s.progress,
                        overflow: "hidden",
                    }}
                >
                    <HomeProjectMeta
                        labels={labels}
                        category={project?.type}
                        location={project?.location}
                        date={project?.date}
                        ifFold={ifFold}
                    />
                </animated.div>

                {/* Collapsed right info (location + date) */}
                <animated.div
                    style={{
                        display: "flex",
                        gap: ifFold ? "16px" : "32px",
                        alignItems: "baseline",
                        flexShrink: 0,
                        opacity: s.progress.to([0, 1], [1, 0]),
                    }}
                >
                    <div style={{ color: "#D4D5D9", fontSize: "12px", fontWeight: "300", lineHeight: "130%", letterSpacing: "-0.12px", opacity: 0.5, whiteSpace: "nowrap" }}>
                        {project?.location || ""}
                    </div>
                    <div style={{ color: "#D4D5D9", fontSize: "12px", fontWeight: "300", lineHeight: "130%", letterSpacing: "-0.12px", opacity: 0.5, whiteSpace: "nowrap" }}>
                        {project?.date || ""}
                    </div>
                </animated.div>
            </div>
        </article>
    );
}
