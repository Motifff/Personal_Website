import { useState, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSpring, animated } from "@react-spring/web";
import HomeProjectMeta from "./homeProjectMeta";
import MediaMaskImage from "./mediaMaskImage";

function normalizeImageSrc(src) {
    if (!src || typeof src !== "string") return "";
    if (src.startsWith("http://") || src.startsWith("https://")) return src;
    if (src.startsWith("/")) return src;
    // 本地路径需要添加 /Personal_Website 前缀（部署在子路径）
    return `/Personal_Website/${src}`;
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
    const pathname = usePathname();
    const { project, labels, ifFold, isExpanded, onHover, metaWidths } = props;
    const [isLocallyHovered, setIsLocallyHovered] = useState(false);
    const hoverTimeoutRef = useRef(null);
    const expanded = isExpanded || isLocallyHovered;

    const imageSrc = normalizeImageSrc(project?.image);
    const discipline = getDisciplineLabel(project);

    const handleOpenProject = () => {
        if (!project?.link) return;
        const homeBasePath = pathname?.includes("!home") ? "/!home" : "/home";
        router.push(`${homeBasePath}/${project.link}`);
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
        config: { mass: 1.5, tension: 200, friction: 40 },
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
                        justifyContent: expanded && !ifFold ? "space-between" : "flex-start",
                        gap: expanded ? "16px" : "0px",
                        flexShrink: 0,
                        minHeight: expanded && !ifFold ? "256px" : "0",
                    }}
                >
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <div
                            style={{
                                color: "#FFFFFF",
                                fontWeight: "500",
                                lineHeight: "130%",
                                letterSpacing: "-0.2px",
                                fontSize: expanded ? "24px" : "16px",
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
                        }}>
                            {project?.subtitle || ""}
                        </animated.div>
                    </div>
                    <animated.div
                        style={{
                            color: "#D4D5D9",
                            fontSize: "12px",
                            fontWeight: "300",
                            lineHeight: "130%",
                            letterSpacing: "-0.12px",
                            opacity: s.progress,
                            height: s.progress.to([0, 1], [0, 16]),
                            overflow: "hidden",
                        }}
                    >
                        {discipline}
                    </animated.div>
                </div>

                {/* Center: image */}
                <animated.div
                    style={{
                        width: ifFold ? "100%" : "480px",
                        height: s.progress.to([0, 1], [0, 256]),
                        flexShrink: 0,
                        opacity: s.progress,
                        overflow: "hidden",
                    }}
                >
                    {imageSrc ? <MediaMaskImage src={imageSrc} alt={project?.title || ""} sampleSize={12} /> : null}
                </animated.div>

                {/* Right: meta (expanded) */}
                <animated.div
                    style={{
                        flex: ifFold ? "unset" : "1 0 0",
                        width: ifFold ? "100%" : "480px",
                        minWidth: 0,
                        overflow: "hidden",
                        display: "flex",
                        justifyContent: ifFold ? "flex-start" : "flex-end",
                        marginLeft: ifFold ? 0 : "auto",
                    }}
                >
                    <HomeProjectMeta
                        labels={labels}
                        category={project?.type}
                        location={project?.location}
                        date={project?.date}
                        ifFold={ifFold}
                        locationWidth={metaWidths?.locationWidth}
                        dateWidth={metaWidths?.dateWidth}
                    />
                </animated.div>
            </div>
        </article>
    );
}
