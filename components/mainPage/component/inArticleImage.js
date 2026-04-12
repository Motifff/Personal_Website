import { useState, useEffect, useRef, memo } from "react";
import { useSpring, animated } from '@react-spring/web';

/**
 * 仅随 currentIndex / 图片 URL 更新，避免父组件进度条 RAF 高频 setState 打断 spring。
 * 切换时只做淡入，不用 translateX：横向百分比位移在首帧布局未稳定时容易残留，表现为静态时整体偏右，点击切换后才归位。
 */
const ArticleImageSlide = memo(function ArticleImageSlide({ imageSrc, slideKey }) {
    const slideAnimation = useSpring({
        opacity: 1,
        from: { opacity: 0.72 },
        reset: true,
        key: slideKey,
        config: { duration: 220 },
    });

    return (
        <animated.div
            style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${imageSrc})`,
                backgroundPosition: "center center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                ...slideAnimation,
            }}
        />
    );
});

export default function InArticleImage(props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [progress, setProgress] = useState(0);
    const startTimeRef = useRef(null);
    const animationFrameRef = useRef(null);

    const content = props.content;
    const totalImages = content?.length || 0;
    const duration = 5000; // 5秒切换周期

    // 使用 requestAnimationFrame 实现平滑进度
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
            if (!startTimeRef.current) {
                startTimeRef.current = currentTime;
            }

            const elapsed = currentTime - startTimeRef.current;
            const newProgress = (elapsed / duration) * 100;

            if (newProgress >= 100) {
                // 进度完成，切换下一张
                setCurrentIndex(prev => (prev + 1) % totalImages);
                setProgress(0);
                startTimeRef.current = currentTime; // 重置开始时间
            } else {
                setProgress(newProgress);
            }

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [isHovered, totalImages]);

    // 手动点击切换
    const handleClick = (index) => {
        setCurrentIndex(index);
        setProgress(0);
        startTimeRef.current = performance.now(); // 重置计时
    };

    const slide = content?.[currentIndex];

    return (
        content !== undefined ? (
            <div
                className='Wrapper'
                style={{
                    position: "relative",
                    display: 'flex',
                    aspectRatio: props.ao,
                    overflow: 'hidden',
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                >
                {/* 图片容器：独立 memo 层，避免进度条 RAF 打断 spring */}
                {slide ? (
                    <ArticleImageSlide
                        imageSrc={slide.image}
                        slideKey={currentIndex}
                    />
                ) : null}
                {/* 底部信息层 */}
                <div
                    style={{
                        display: "flex",
                        flex: "1 0 0",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        alignItems: "flex-start",
                        gap: 16,
                        padding: 16,
                        backgroundColor: isHovered ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.30)",
                        transition: 'background-color 0.5s ease',
                        position: 'relative',
                        zIndex: 1,
                        minHeight: 0,
                    }}>
                    {/* 进度条指示器 */}
                    {totalImages > 1 ? (
                        <div style={{ display: 'flex', gap: 8 }}>
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
                    {/* 图片标题 */}
                    {content[currentIndex].title !== "" ? (
                        <div style={{
                            color: "#FFF",
                            fontSize: "16px",
                            fontWeight: 500,
                            lineHeight: "130%",
                            letterSpacing: "-0.16px",
                        }}>
                            {content[currentIndex].title}
                        </div>
                    ) : null}
                </div>
            </div>
        ) : null
    )
}
