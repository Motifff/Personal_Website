import { useState, useEffect, useRef } from "react";
import { useSpring, animated } from '@react-spring/web';

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

    // 滑动动画：从左往右
    const slideAnimation = useSpring({
        opacity: 1,
        transform: 'translateX(0%)',
        from: { opacity: 0.5, transform: 'translateX(5%)' },
        reset: true,
        key: currentIndex,
        config: { duration: 200 },
    });

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
                {/* 图片容器 */}
                <animated.div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url(${content[currentIndex].image})`,
                        backgroundPosition: "50% 50%",
                        backgroundSize: "cover",
                        ...slideAnimation,
                    }}
                />
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
