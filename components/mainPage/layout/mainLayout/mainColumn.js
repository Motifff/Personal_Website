import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import axios from "axios";
import { useLanguage } from "@/context/LanguageContext";

import ProjectBlock from "../../component/projectBlock"
import { Suspense } from "react";
import { sortByPriorityThenDate } from "../../utils/prioritySort";

export default function MainColumn(props) {
    const [jsonData, setJsonData] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [viewport, setViewport] = useState({ width: 1440, height: 900 });
    const dragStartXRef = useRef(null);
    const suppressClickRef = useRef(false);
    const touchStartXRef = useRef(null);
    const wheelXAccumRef = useRef(0);
    const wheelLastTsRef = useRef(0);
    const { language } = useLanguage();
    const blueZoneRatio = props.ifFold ? 0.74 : 0.78125;
    const redZoneRatio = 0.7;
    const redZoneHeightPx = viewport.height * blueZoneRatio * redZoneRatio;

    useEffect(() => {
        const fetchData = async () => {
            if (language === "zh") {
                try {
                    const result = await axios("data_zh.json");
                    setJsonData(result.data.allPageData);
                    return;
                } catch (e) {
                    // Fallback to default data.json
                }
            }

            const result = await axios("data.json");
            setJsonData(result.data.allPageData);
        };
        fetchData();
    }, [language]);

    const homeProjectSource = jsonData?.home?.main?.projectStrip || jsonData?.home?.main?.projects || [];
    const sortedProjects = sortByPriorityThenDate(homeProjectSource);
    const maxIndex = Math.max(0, sortedProjects.length - 1);

    useEffect(() => {
        const updateViewport = () => setViewport({ width: window.innerWidth, height: window.innerHeight });
        updateViewport();
        window.addEventListener("resize", updateViewport);
        return () => window.removeEventListener("resize", updateViewport);
    }, []);

    useEffect(() => {
        setActiveIndex((prev) => Math.min(prev, maxIndex));
    }, [maxIndex]);

    const getWidthByDistance = useCallback((distance) => {
        if (props.ifFold) {
            if (distance === 0) return viewport.width * 0.78;
            if (distance === 1) return viewport.width * 0.62;
            if (distance === 2) return viewport.width * 0.52;
            return viewport.width * 0.44;
        }
        if (distance === 0) return viewport.width * 0.4;
        if (distance === 1) return viewport.width * 0.24;
        if (distance === 2) return viewport.width * 0.17;
        if (distance === 3) return viewport.width * 0.13;
        return viewport.width * 0.1;
    }, [props.ifFold, viewport.width]);

    const getHeightByDistance = (distance) => {
        if (props.ifFold) {
            if (distance === 0) return redZoneHeightPx * 0.92;
            if (distance === 1) return redZoneHeightPx * 0.82;
            if (distance === 2) return redZoneHeightPx * 0.72;
            return redZoneHeightPx * 0.62;
        }
        if (distance === 0) return redZoneHeightPx * 0.95;
        if (distance === 1) return redZoneHeightPx * 0.84;
        if (distance === 2) return redZoneHeightPx * 0.74;
        if (distance === 3) return redZoneHeightPx * 0.64;
        return redZoneHeightPx * 0.56;
    };

    const gap = props.ifFold ? 10 : 14;
    const cardWidths = useMemo(
        () => sortedProjects.map((_, index) => getWidthByDistance(Math.abs(index - activeIndex))),
        [sortedProjects, activeIndex, getWidthByDistance]
    );

    const translateX = useMemo(() => {
        if (sortedProjects.length === 0) return 0;
        const beforeWidth = cardWidths.slice(0, activeIndex).reduce((sum, value) => sum + value, 0);
        const centerOfActive = beforeWidth + activeIndex * gap + (cardWidths[activeIndex] || 0) / 2;
        return viewport.width / 2 - centerOfActive;
    }, [sortedProjects.length, cardWidths, activeIndex, gap, viewport.width]);

    const switchFocus = (step) => {
        setActiveIndex((prev) => {
            const next = prev + step;
            if (next < 0) return 0;
            if (next > maxIndex) return maxIndex;
            return next;
        });
    };

    const handleDragStep = (deltaX) => {
        if (Math.abs(deltaX) < 48) return;
        suppressClickRef.current = true;
        if (deltaX < 0) switchFocus(1);
        if (deltaX > 0) switchFocus(-1);
    };

    const handleMouseDown = (event) => {
        dragStartXRef.current = event.clientX;
    };

    const handleMouseMove = (event) => {
        if (dragStartXRef.current === null) return;
        const deltaX = event.clientX - dragStartXRef.current;
        if (Math.abs(deltaX) >= 48) {
            handleDragStep(deltaX);
            dragStartXRef.current = event.clientX;
        }
    };

    const handleMouseUp = () => {
        dragStartXRef.current = null;
    };

    const handleTouchStart = (event) => {
        touchStartXRef.current = event.touches[0]?.clientX ?? null;
    };

    const handleTouchEnd = (event) => {
        const startX = touchStartXRef.current;
        const endX = event.changedTouches[0]?.clientX ?? null;
        touchStartXRef.current = null;
        if (startX === null || endX === null) return;
        handleDragStep(endX - startX);
    };

    const handleTouchCancel = () => {
        touchStartXRef.current = null;
    };

    const handleWheel = (event) => {
        const absX = Math.abs(event.deltaX);
        const absY = Math.abs(event.deltaY);

        // Only react to horizontal-intent gestures (e.g. Mac trackpad two-finger swipe).
        if (absX <= 0 || absX < absY * 0.9) return;

        event.preventDefault();

        const now = Date.now();
        if (now - wheelLastTsRef.current > 240) {
            wheelXAccumRef.current = 0;
        }
        wheelLastTsRef.current = now;
        wheelXAccumRef.current += event.deltaX;

        const threshold = 42;
        if (wheelXAccumRef.current >= threshold) {
            switchFocus(1);
            wheelXAccumRef.current = 0;
            suppressClickRef.current = true;
        } else if (wheelXAccumRef.current <= -threshold) {
            switchFocus(-1);
            wheelXAccumRef.current = 0;
            suppressClickRef.current = true;
        }
    };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div style={{ display: "flex", flex: "1 0 0", padding: "0 24px 16px 24px", flexDirection: "column", alignSelf: "stretch", justifyContent: "flex-end", height: "100%" }}>
                <div
                    className="no-scrollbar"
                    style={{
                        position: "relative",
                        width: "100%",
                        height: "70%",
                        overflowX: "hidden",
                        overflowY: "hidden",
                        display: "flex",
                        alignItems: "flex-end",
                        cursor: "grab",
                    }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    onTouchCancel={handleTouchCancel}
                    onWheel={handleWheel}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "flex-end",
                            gap,
                            transform: `translate3d(${translateX}px, 0, 0)`,
                            transition: "transform 520ms cubic-bezier(0.22, 1.25, 0.36, 1)",
                            willChange: "transform",
                            height: "100%",
                            paddingTop: 8,
                            paddingBottom: 2,
                        }}
                    >
                        {jsonData === null ? null : sortedProjects.map((projectItem, index) => {
                            const distance = Math.abs(index - activeIndex);
                            const width = `${cardWidths[index]}px`;
                            const imageHeightPx = getHeightByDistance(distance);
                            const imageHeight = `${Math.max(120, Math.round(imageHeightPx))}px`;
                            const imageHeightHoverPx = distance === 0 ? Math.max(120, imageHeightPx - 56) : imageHeightPx;
                            const imageHeightHover = `${Math.round(imageHeightHoverPx)}px`;
                            const baseOpacity = distance === 0 ? 1 : distance === 1 ? 0.88 : distance === 2 ? 0.76 : 0.66;
                            const compact = distance > 0;
                            return (
                                <ProjectBlock
                                    key={`${projectItem.link}-${index}`}
                                    width={width}
                                    imageHeight={imageHeight}
                                    imageHeightHover={imageHeightHover}
                                    baseOpacity={baseOpacity}
                                    isActive={distance === 0}
                                    compact={compact}
                                    type={projectItem.type}
                                    title={projectItem.title}
                                    subtitle={projectItem.subtitle}
                                    image={projectItem.image}
                                    link={projectItem.link}
                                    onCardClick={() => {
                                        if (suppressClickRef.current) {
                                            suppressClickRef.current = false;
                                            return false;
                                        }
                                        if (index !== activeIndex) {
                                            setActiveIndex(index);
                                            return false;
                                        }
                                        return true;
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </Suspense>
    )
}
