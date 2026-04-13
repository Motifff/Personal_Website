import { useState, useEffect, useRef, useCallback } from "react";
import { resolveMediaUrl } from "@/lib/assetBase";

export default function InArticleImage(props) {
    const containerRef = useRef(null);
    const scrollTimeoutRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [progress, setProgress] = useState(0);
    const startTimeRef = useRef(null);
    const animationFrameRef = useRef(null);

    const content = props.content;
    const totalImages = content?.length || 0;
    const duration = 5000;

    // 自动轮播进度
    useEffect(() => {
        if (isHovered || totalImages <= 1) {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = null;
            }
            startTimeRef.current = null;
            return;
        }

        startTimeRef.current = performance.now();

        const animate = (currentTime) => {
            if (!startTimeRef.current) startTimeRef.current = currentTime;
            const elapsed = currentTime - startTimeRef.current;
            const newProgress = (elapsed / duration) * 100;

            if (newProgress >= 100) {
                const nextIndex = (currentIndex + 1) % totalImages;
                setCurrentIndex(nextIndex);
                setProgress(0);
                startTimeRef.current = currentTime;
                // 滚动到下一张
                if (containerRef.current) {
                    const scrollLeft = nextIndex * containerRef.current.offsetWidth;
                    containerRef.current.scrollTo({ left: scrollLeft, behavior: 'smooth' });
                }
            } else {
                setProgress(newProgress);
            }
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animationFrameRef.current = requestAnimationFrame(animate);
        return () => {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
    }, [isHovered, totalImages, currentIndex]);

    // 监听滚动 + 滚动结束吸附
    const handleScroll = useCallback(() => {
        if (!containerRef.current) return;

        const scrollLeft = containerRef.current.scrollLeft;
        const itemWidth = containerRef.current.offsetWidth;
        const newIndex = Math.round(scrollLeft / itemWidth);

        // 更新当前索引
        if (newIndex !== currentIndex && newIndex >= 0 && newIndex < totalImages) {
            setCurrentIndex(newIndex);
            setProgress(0);
            startTimeRef.current = performance.now();
        }

        // 滚动结束后吸附到最近的图片
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
            const targetScroll = newIndex * itemWidth;
            if (Math.abs(scrollLeft - targetScroll) > 5) {
                containerRef.current.scrollTo({
                    left: targetScroll,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }, [currentIndex, totalImages]);

    // 点击进度条跳转
    const handleClick = useCallback((index) => {
        if (!containerRef.current) return;

        setCurrentIndex(index);
        setProgress(0);
        startTimeRef.current = performance.now();

        const scrollLeft = index * containerRef.current.offsetWidth;
        containerRef.current.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
        });
    }, []);

    // 鼠标离开时吸附到当前图片
    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
        if (containerRef.current) {
            const scrollLeft = currentIndex * containerRef.current.offsetWidth;
            containerRef.current.scrollTo({
                left: scrollLeft,
                behavior: 'smooth'
            });
        }
    }, [currentIndex]);

    // 单张图片时不显示任何overlay
    const showOverlay = totalImages > 1;

    // aspectRatio: 可选，若未设置则图片高度自适应
    const hasAspectRatio = props.ao && props.ao !== "";
    const containerStyle = hasAspectRatio
        ? { position: "relative", aspectRatio: props.ao, overflow: 'hidden' }
        : { position: "relative", width: '100%', overflow: 'hidden' };

    return (
        content !== undefined ? (
            <div
                style={containerStyle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
            >
                {/* 横向滚动容器 */}
                <div
                    ref={containerRef}
                    onScroll={handleScroll}
                    style={{
                        display: 'flex',
                        width: '100%',
                        height: hasAspectRatio ? '100%' : 'auto',
                        overflowX: 'auto',
                        overflowY: 'hidden',
                        scrollSnapType: 'x mandatory',
                        scrollbarWidth: 'none',
                        WebkitOverflowScrolling: 'touch',
                    }}
                    className="no-scrollbar"
                >
                    {content.map((item, index) => (
                        <div
                            key={index}
                            style={{
                                flex: '0 0 100%',
                                width: '100%',
                                height: hasAspectRatio ? '100%' : 'auto',
                                scrollSnapAlign: 'start',
                                position: 'relative',
                            }}
                        >
                            <img
                                src={resolveMediaUrl(item.image)}
                                alt={item.title || ""}
                                style={{
                                    width: '100%',
                                    height: hasAspectRatio ? '100%' : 'auto',
                                    objectFit: hasAspectRatio ? 'cover' : 'contain',
                                    display: 'block',
                                }}
                            />
                        </div>
                    ))}
                </div>

                {/* 底部信息层 */}
                {showOverlay ? (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end",
                            alignItems: "flex-start",
                            gap: 16,
                            padding: 16,
                            backgroundColor: isHovered ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.30)",
                            transition: 'background-color 0.3s ease',
                            position: 'absolute',
                            inset: 0,
                            zIndex: 1,
                            pointerEvents: 'none',
                        }}>
                        {totalImages > 1 ? (
                            <div style={{ display: 'flex', gap: 8, pointerEvents: 'auto' }}>
                                {content.map((item, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            width: 24,
                                            height: 2,
                                            backgroundColor: '#666',
                                            borderRadius: 1,
                                            cursor: 'pointer',
                                            overflow: 'hidden',
                                        }}
                                        onClick={() => handleClick(index)}
                                    >
                                        <div style={{
                                            width: index === currentIndex ? `${progress}%` : (index < currentIndex ? '100%' : '0%'),
                                            height: '100%',
                                            backgroundColor: '#FFF',
                                        }} />
                                    </div>
                                ))}
                            </div>
                        ) : null}
                    </div>
                ) : null}
            </div>
        ) : null
    )
}
